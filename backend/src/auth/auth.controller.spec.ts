import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import type { AuthResponse, SafeUser } from './auth.types.js';

describe('AuthController', () => {
  let controller: AuthController;
  let registerMock: ReturnType<typeof vi.fn>;
  let loginMock: ReturnType<typeof vi.fn>;
  let getProfileMock: ReturnType<typeof vi.fn>;

  const mockSafeUser: SafeUser = {
    id: 'USR-ABCD1234',
    email: 'test@brewlite.vn',
    loyaltyPoints: 0,
    createdAt: new Date().toISOString(),
  };

  const mockAuthResponse: AuthResponse = {
    accessToken: 'mock-jwt-token-xyz',
    user: mockSafeUser,
  };

  beforeEach(async () => {
    registerMock = vi.fn().mockResolvedValue(mockAuthResponse);
    loginMock = vi.fn().mockResolvedValue(mockAuthResponse);
    getProfileMock = vi.fn().mockResolvedValue(mockSafeUser);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: registerMock,
            login: loginMock,
            getProfile: getProfileMock,
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('gọi authService.register và trả về AuthResponse', async () => {
      const dto = { email: 'test@brewlite.vn', password: 'password123' };
      const result = await controller.register(dto);
      expect(registerMock).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockAuthResponse);
    });
  });

  describe('login', () => {
    it('gọi authService.login và trả về AuthResponse', async () => {
      const dto = { email: 'test@brewlite.vn', password: 'password123' };
      const result = await controller.login(dto);
      expect(loginMock).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockAuthResponse);
    });
  });

  describe('getProfile', () => {
    it('trả về user hiện tại', async () => {
      const result = await controller.getProfile(mockSafeUser.id);
      expect(getProfileMock).toHaveBeenCalledWith(mockSafeUser.id);
      expect(result).toEqual(mockSafeUser);
    });
  });
});
