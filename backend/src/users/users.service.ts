import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { User } from './users.types.js';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  findByEmail(email: string): User | undefined {
    return this.users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  create(email: string, passwordHash: string): User {
    const user: User = {
      id: randomUUID(),
      email: email.toLowerCase(),
      passwordHash,
      createdAt: new Date(),
    };

    this.users.push(user);
    return user;
  }
}
