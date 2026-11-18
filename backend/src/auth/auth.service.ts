import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'node:crypto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import type { LoginDto } from './dto/login.dto.js';
import type { RegisterDto } from './dto/register.dto.js';
import type { AuthResponse, SafeUser, User } from './auth.types.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const normalizedEmail = dto.email.trim().toLowerCase();
    const existingUser = await this.findUserByEmail(normalizedEmail);

    if (existingUser) {
      throw new ConflictException(
        `Email '${normalizedEmail}' đã được sử dụng. Vui lòng chọn email khác.`,
      );
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.password, salt);

    const newUser: User = Object.freeze({
      id: `USR-${randomBytes(4).toString('hex').toUpperCase()}`,
      email: normalizedEmail,
      passwordHash,
      loyaltyPoints: 0,
      createdAt: new Date().toISOString(),
    });

    try {
      await this.prisma.user.create({
        data: {
          id: newUser.id,
          email: newUser.email,
          passwordHash: newUser.passwordHash,
          loyaltyPoints: newUser.loyaltyPoints,
          createdAt: new Date(newUser.createdAt),
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `Email '${normalizedEmail}' đã được sử dụng. Vui lòng chọn email khác.`,
        );
      }
      throw error;
    }

    const accessToken = await this.generateToken(newUser);
    return {
      accessToken,
      user: this.toSafeUser(newUser),
    };
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const normalizedEmail = dto.email.trim().toLowerCase();
    const user = await this.findUserByEmail(normalizedEmail);

    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác.');
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác.');
    }

    const accessToken = await this.generateToken(user);
    return {
      accessToken,
      user: this.toSafeUser(user),
    };
  }

  async findUserById(id: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? this.toUser(user) : undefined;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    return user ? this.toUser(user) : undefined;
  }

  async getProfile(userId: string): Promise<SafeUser> {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new NotFoundException('Không tìm thấy thông tin người dùng.');
    }
    return this.toSafeUser(user);
  }

  toSafeUser(user: User): SafeUser {
    return Object.freeze({
      id: user.id,
      email: user.email,
      loyaltyPoints: user.loyaltyPoints,
      createdAt: user.createdAt,
    });
  }

  private toUser(user: {
    id: string;
    email: string;
    passwordHash: string;
    loyaltyPoints: number;
    createdAt: Date;
  }): User {
    return {
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      loyaltyPoints: user.loyaltyPoints,
      createdAt: user.createdAt.toISOString(),
    };
  }

  private async generateToken(user: User): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload);
  }
}
