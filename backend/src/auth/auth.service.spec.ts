import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthService } from './auth.service.js';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService({
      secret: 'test-secret-key',
      signOptions: { expiresIn: '1h' },
    });
    authService = new AuthService(jwtService);
  });

  describe('register', () => {
    it('đăng ký thành công tài khoản mới, băm mật khẩu và trả về accessToken kèm SafeUser', async () => {
      const response = await authService.register({
        email: 'customer@brewlite.vn',
        password: 'password123',
      });

      expect(response).toHaveProperty('accessToken');
      expect(typeof response.accessToken).toBe('string');
      expect(response.accessToken.length).toBeGreaterThan(0);

      expect(response.user).toHaveProperty('id');
      expect(response.user.id).toMatch(/^USR-[0-9A-F]{8}$/);
      expect(response.user.email).toBe('customer@brewlite.vn');
      expect(response.user.loyaltyPoints).toBe(0);
      expect(
        (response.user as Record<string, unknown>).passwordHash,
      ).toBeUndefined();

      const decoded = jwtService.verify<{ sub: string; email: string }>(
        response.accessToken,
      );
      expect(decoded.sub).toBe(response.user.id);
      expect(decoded.email).toBe('customer@brewlite.vn');
    });

    it('ném lỗi ConflictException khi email đã tồn tại', async () => {
      await authService.register({
        email: 'duplicate@brewlite.vn',
        password: 'password123',
      });

      await expect(
        authService.register({
          email: 'duplicate@brewlite.vn',
          password: 'anotherpassword',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('đăng nhập thành công với thông tin chính xác và phát hành JWT', async () => {
      await authService.register({
        email: 'user1@brewlite.vn',
        password: 'correctpassword',
      });

      const response = await authService.login({
        email: 'user1@brewlite.vn',
        password: 'correctpassword',
      });

      expect(response).toHaveProperty('accessToken');
      expect(response.user.email).toBe('user1@brewlite.vn');
    });

    it('ném lỗi UnauthorizedException khi email không tồn tại', async () => {
      await expect(
        authService.login({
          email: 'notfound@brewlite.vn',
          password: 'password123',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('ném lỗi UnauthorizedException khi sai mật khẩu', async () => {
      await authService.register({
        email: 'user2@brewlite.vn',
        password: 'correctpassword',
      });

      await expect(
        authService.login({
          email: 'user2@brewlite.vn',
          password: 'wrongpassword',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('getProfile', () => {
    it('trả về SafeUser của user khi userId hợp lệ', async () => {
      const reg = await authService.register({
        email: 'profile@brewlite.vn',
        password: 'password123',
      });

      const profile = authService.getProfile(reg.user.id);
      expect(profile.id).toBe(reg.user.id);
      expect(profile.email).toBe('profile@brewlite.vn');
      expect((profile as Record<string, unknown>).passwordHash).toBeUndefined();
    });
  });
});
