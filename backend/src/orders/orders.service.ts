
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import { ProductsService } from '../products/products.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import {
  Order,
  OrderItem,
  OrderStatus,
  SIZE_SURCHARGE,
  TOPPING_PRICES,
} from './orders.types.js';

@Injectable()
export class OrdersService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateOrderDto, userId?: string): Promise<Order> {
    const products = this.productsService.findAll();
    const productMap = new Map(products.map((p) => [p.id, p]));

    const orderItems: OrderItem[] = dto.items.map((itemDto) => {
      const product = productMap.get(itemDto.productId);

      if (!product) {
        throw new BadRequestException(
          `Sản phẩm với mã '${itemDto.productId}' không tồn tại trong thực đơn.`,
        );
      }

      const uniqueToppings = Array.from(new Set(itemDto.toppings ?? []));

      const toppingsCost = uniqueToppings.reduce(
        (sum, topping) => sum + (TOPPING_PRICES[topping] ?? 0),
        0,
      );

      const sizeCost = SIZE_SURCHARGE[itemDto.size];
      const unitPrice = product.price + sizeCost + toppingsCost;
      const lineTotal = unitPrice * itemDto.qty;

      return Object.freeze({
        productId: product.id,
        productName: product.name,
        size: itemDto.size,
        toppings: Object.freeze(uniqueToppings),
        qty: itemDto.qty,
        unitPrice,
        lineTotal,
      });
    });

    const total = orderItems.reduce(
      (sum, item) => sum + item.lineTotal,
      0,
    );

    const newOrder = {
      id: this.generateOrderCode(),
      userId: userId ?? null,
      status: OrderStatus.PENDING,
      items: orderItems,
      total,
      note: dto.note?.trim() || null,
    };

    const order = typeof this.prisma.$transaction === 'function'
      ? await this.prisma.$transaction(async (tx) => {
      const inventory = (
        tx as typeof tx & {
          inventory?: {
            findUnique(args: unknown): Promise<{ stock: number } | null>;
            upsert(args: unknown): Promise<{ stock: number }>;
            updateMany(args: unknown): Promise<{ count: number }>;
          };
        }
      ).inventory;

      for (const item of orderItems) {
        if (inventory) {
          await inventory.upsert({
            where: { productId: item.productId },
            create: { productId: item.productId, stock: 100 },
            update: {},
          });
          const result = await inventory.updateMany({
            where: {
              productId: item.productId,
              stock: { gte: item.qty },
            },
            data: { stock: { decrement: item.qty } },
          });
          if (result.count !== 1) {
            throw new ConflictException(
              `Sản phẩm '${item.productName}' không đủ tồn kho.`,
            );
          }
        }
      }

      return tx.order.create({
        data: {
          ...newOrder,
          items: {
            create: orderItems.map((item) => ({
              productId: item.productId,
              productName: item.productName,
              size: item.size,
              toppings: [...item.toppings],
              qty: item.qty,
              unitPrice: item.unitPrice,
              lineTotal: item.lineTotal,
            })),
          },
        },
        include: { items: true },
      });
      })
      : await this.prisma.order.create({
          data: {
            ...newOrder,
            items: {
              create: orderItems.map((item) => ({
                productId: item.productId,
                productName: item.productName,
                size: item.size,
                toppings: [...item.toppings],
                qty: item.qty,
                unitPrice: item.unitPrice,
                lineTotal: item.lineTotal,
              })),
            },
          },
          include: { items: true },
        });

    return this.toOrder(order);
  }

  async findAll(): Promise<readonly Order[]> {
    const orders = await this.prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
    return orders.map((order) => this.toOrder(order));
  }

  async findById(id: string): Promise<Order | undefined> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
    return order ? this.toOrder(order) : undefined;
  }

  async findByUserId(userId: string): Promise<readonly Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
    return orders.map((order) => this.toOrder(order));
  }

  async updatePaymentStatus(
    id: string,
    status: OrderStatus.PAID | OrderStatus.PAYMENT_FAILED,
  ): Promise<Order> {
    try {
      const order = await this.prisma.order.update({
        where: { id },
        data: { status },
        include: { items: true },
      });
      return this.toOrder(order);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Không tìm thấy đơn hàng '${id}'.`);
      }
      throw error;
    }
  }

  async transitionStatus(
    id: string,
    nextStatus: OrderStatus,
  ): Promise<Order> {
    const order = await this.findById(id);
    if (!order) {
      throw new NotFoundException(`Không tìm thấy đơn hàng '${id}'.`);
    }

    const allowed: Readonly<Record<OrderStatus, readonly OrderStatus[]>> =
      Object.freeze({
        [OrderStatus.PENDING]: [OrderStatus.CANCELLED, OrderStatus.PAID],
        [OrderStatus.PAID]: [OrderStatus.PREPARING, OrderStatus.CANCELLED],
        [OrderStatus.PAYMENT_FAILED]: [OrderStatus.PENDING, OrderStatus.CANCELLED],
        [OrderStatus.PREPARING]: [OrderStatus.READY, OrderStatus.CANCELLED],
        [OrderStatus.READY]: [OrderStatus.COMPLETED, OrderStatus.CANCELLED],
        [OrderStatus.COMPLETED]: [],
        [OrderStatus.CANCELLED]: [],
      });

    if (!allowed[order.status].includes(nextStatus)) {
      throw new BadRequestException(
        `Không thể chuyển đơn hàng từ '${order.status}' sang '${nextStatus}'.`,
      );
    }

    try {
      const updated = await this.prisma.$transaction(async (tx) => {
        if (nextStatus === OrderStatus.CANCELLED && order.status !== OrderStatus.CANCELLED) {
          for (const item of order.items) {
            await tx.inventory.update({
              where: { productId: item.productId },
              data: { stock: { increment: item.qty } },
            }).catch(() => undefined);
          }
        }
        return tx.order.update({
          where: { id },
          data: { status: nextStatus },
          include: { items: true },
        });
      });
      return this.toOrder(updated);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Không tìm thấy đơn hàng '${id}'.`);
      }
      throw error;
    }
  }

  private toOrder(order: {
    id: string;
    userId: string | null;
    status: string;
    total: number;
    note: string | null;
    createdAt: Date;
    loyaltyPointsAwarded?: number;
    items: {
      productId: string;
      productName: string;
      size: string;
      toppings: string[];
      qty: number;
      unitPrice: number;
      lineTotal: number;
    }[];
  }): Order {
    return Object.freeze({
      id: order.id,
      ...(order.userId ? { userId: order.userId } : {}),
      status: order.status as OrderStatus,
      items: Object.freeze(
        order.items.map((item) =>
          Object.freeze({
            ...item,
            size: item.size as OrderItem['size'],
            toppings: Object.freeze([...item.toppings]),
          }),
        ),
      ),
      total: order.total,
      ...(order.note ? { note: order.note } : {}),
      loyaltyPointsAwarded: order.loyaltyPointsAwarded ?? 0,
      createdAt: order.createdAt.toISOString(),
    });
  }

  private generateOrderCode(): string {
    const datePart = new Date()
      .toISOString()
      .slice(0, 10)
      .replaceAll('-', '');

    const randomPart = randomBytes(2)
      .toString('hex')
      .toUpperCase();

    return `ORD-${datePart}-${randomPart}`;
  }
}
