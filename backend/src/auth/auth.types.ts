export interface User {
  readonly id: string;
  readonly email: string;
  readonly passwordHash: string;
  readonly loyaltyPoints: number;
  readonly createdAt: string;
}

export type SafeUser = Omit<User, 'passwordHash'>;

export interface JwtPayload {
  readonly sub: string;
  readonly email: string;
}

export interface AuthResponse {
  readonly accessToken: string;
  readonly user: SafeUser;
}
