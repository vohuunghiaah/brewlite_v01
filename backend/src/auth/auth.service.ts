import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase();

    if (this.usersService.findByEmail(email)) {
      throw new BadRequestException('Email đã được đăng ký');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = this.usersService.create(email, passwordHash);

    return {
      message: 'Đăng ký thành công',
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = this.usersService.findByEmail(dto.email);

    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return {
      message: 'Đăng nhập thành công',
      accessToken,
      tokenType: 'Bearer',
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}
