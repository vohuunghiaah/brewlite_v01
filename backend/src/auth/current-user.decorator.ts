import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { SafeUser } from './auth.types.js';

export const CurrentUser = createParamDecorator(
  (data: keyof SafeUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user?: SafeUser }>();
    const user = request.user;
    if (!user) {
      return undefined;
    }
    return data ? user[data] : user;
  },
);
