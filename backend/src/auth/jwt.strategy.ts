import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service.js';
import type { JwtPayload, SafeUser } from './auth.types.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'brewlite-super-secret-key-2026',
    });
  }

  validate(payload: JwtPayload): SafeUser {
    const user = this.authService.findUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException(
        'Tài khoản không tồn tại hoặc phiên làm việc đã hết hạn.',
      );
    }
    return this.authService.toSafeUser(user);
  }
}
