import 'server-only';

import { getToken } from 'next-auth/jwt';
import { createMiddleware } from 'hono/factory';
import type { Role } from '@prisma/client';

type User = {
  id: string
  name?: string
  email?: string
  avatarUrl?: string
  role: Role
}
type AdditionalContext = {
  Variables: {
    user: User
  };
};

export const sessionMiddleware = createMiddleware<AdditionalContext>(
  async (c, next) => {
    const token = await getToken({ req: c.req.raw, secret: process.env.AUTH_SECRET });
  
    if (!token) {
      return c.json({ error: 'Acesso não autorizado' }, 401);
    }

    const user = {
      id: token.sub!,
      name: token.name!,
      email: token.email!,
      role: token.role,
      avatarUrl: token.picture ?? undefined
    };
    c.set('user', user);
    await next();
  }
);
