import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'node:crypto';
import type { LoginDto } from './dto/login.dto.js';
import type { RegisterDto } from './dto/register.dto.js';
import type { AuthResponse, SafeUser, User } from './auth.types.js';

@Injectable()
export class AuthService {
  private readonly users: User[] = [];

  constructor(private readonly jwtService: JwtService) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const normalizedEmail = dto.email.trim().toLowerCase();
    const existingUser = this.findUserByEmail(normalizedEmail);

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

    this.users.push(newUser);

    const accessToken = await this.generateToken(newUser);
    return {
      accessToken,
      user: this.toSafeUser(newUser),
    };
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const normalizedEmail = dto.email.trim().toLowerCase();
    const user = this.findUserByEmail(normalizedEmail);

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

  findUserById(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  findUserByEmail(email: string): User | undefined {
    return this.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
  }

  getProfile(userId: string): SafeUser {
    const user = this.findUserById(userId);
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

  private async generateToken(user: User): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload);
  }
}
