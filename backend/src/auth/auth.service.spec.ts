
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service.js';
import { UsersService } from '../users/users.service.js';

vi.mock('bcrypt', () => ({
  hash: vi.fn(),
  compare: vi.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;

  const usersService = {
    findByEmail: vi.fn(),
    create: vi.fn(),
  };

  const jwtService = {
    signAsync: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    authService = new AuthService(
      usersService as unknown as UsersService,
      jwtService as unknown as JwtService,
    );
  });

  describe('register', () => {
    it('đăng ký thành công và mã hóa mật khẩu', async () => {
      usersService.findByEmail.mockReturnValue(null);
      vi.mocked(bcrypt.hash).mockResolvedValue('hashed-password' as never);

      usersService.create.mockReturnValue({
        id: 'user-1',
        email: 'test@example.com',
        passwordHash: 'hashed-password',
        createdAt: new Date(),
      });

      const result = await authService.register({
        email: 'TEST@example.com',
        password: 'Password123!',
      });

      expect(usersService.findByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
      expect(bcrypt.hash).toHaveBeenCalledWith('Password123!', 10);
      expect(usersService.create).toHaveBeenCalledWith(
        'test@example.com',
        'hashed-password',
      );
      expect(result.message).toBe('Đăng ký thành công');
      expect(result.user.email).toBe('test@example.com');
      expect(result.user).not.toHaveProperty('passwordHash');
    });

    it('từ chối đăng ký nếu email đã tồn tại', async () => {
      usersService.findByEmail.mockReturnValue({
        id: 'user-1',
        email: 'test@example.com',
      });

      await expect(
        authService.register({
          email: 'test@example.com',
          password: 'Password123!',
        }),
      ).rejects.toThrow(BadRequestException);

      expect(usersService.create).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('đăng nhập thành công và trả về JWT', async () => {
      usersService.findByEmail.mockReturnValue({
        id: 'user-1',
        email: 'test@example.com',
        passwordHash: 'hashed-password',
      });

      vi.mocked(bcrypt.compare).mockResolvedValue(true as never);
      jwtService.signAsync.mockResolvedValue('mock-jwt-token');

      const result = await authService.login({
        email: 'test@example.com',
        password: 'Password123!',
      });

      expect(bcrypt.compare).toHaveBeenCalledWith(
        'Password123!',
        'hashed-password',
      );
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: 'user-1',
        email: 'test@example.com',
      });
      expect(result.accessToken).toBe('mock-jwt-token');
      expect(result.tokenType).toBe('Bearer');
      expect(result.user.email).toBe('test@example.com');
    });

    it('từ chối đăng nhập nếu email không tồn tại', async () => {
      usersService.findByEmail.mockReturnValue(null);

      await expect(
        authService.login({
          email: 'unknown@example.com',
          password: 'Password123!',
        }),
      ).rejects.toThrow(UnauthorizedException);

      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    it('từ chối đăng nhập nếu mật khẩu không chính xác', async () => {
      usersService.findByEmail.mockReturnValue({
        id: 'user-1',
        email: 'test@example.com',
        passwordHash: 'hashed-password',
      });

      vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

      await expect(
        authService.login({
          email: 'test@example.com',
          password: 'wrong-password',
        }),
      ).rejects.toThrow(UnauthorizedException);

      expect(jwtService.signAsync).not.toHaveBeenCalled();
    });
  });
});
