
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes } from 'node:crypto';
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
  private readonly orders: Order[] = [];

  constructor(private readonly productsService: ProductsService) {}

  create(dto: CreateOrderDto, userId?: string): Order {
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

    const newOrder: Order = Object.freeze({
      id: this.generateOrderCode(),
      ...(userId ? { userId } : {}),
      status: OrderStatus.PENDING,
      items: Object.freeze(orderItems),
      total,
      ...(dto.note?.trim() ? { note: dto.note.trim() } : {}),
      createdAt: new Date().toISOString(),
    });

    this.orders.push(newOrder);

    return newOrder;
  }

  findAll(): readonly Order[] {
    return Object.freeze([...this.orders]);
  }

  findById(id: string): Order | undefined {
    return this.orders.find((order) => order.id === id);
  }

  // Cập nhật trạng thái thanh toán của đơn hàng
  updatePaymentStatus(
    id: string,
    status: OrderStatus.PAID | OrderStatus.PAYMENT_FAILED,
  ): Order {
    const orderIndex = this.orders.findIndex(
      (order) => order.id === id,
    );

    if (orderIndex === -1) {
      throw new NotFoundException(
        `Không tìm thấy đơn hàng '${id}'.`,
      );
    }

    const currentOrder = this.orders[orderIndex];

    const updatedOrder: Order = Object.freeze({
      ...currentOrder,
      status,
    });

    this.orders[orderIndex] = updatedOrder;

    return updatedOrder;
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
