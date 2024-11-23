import { AuthError } from 'next-auth';
import { Hono } from 'hono';
import type { StatusCode } from 'hono/utils/http-status';
import { LoginSchema, RegisterSchema } from '@/features/auth/schemas';
import { getUserByEmail } from '@/features/auth/services/user';
import { signIn } from '@/lib/auth';
import { db } from '@/lib/db.prisma';
import { hashPassword } from '@/lib/hashPassword';
import { sessionMiddleware } from '@/lib/session-middleware';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { zValidator } from '@hono/zod-validator';

const app = new Hono()
  .get('/current', sessionMiddleware, async (c) => {
    const user = c.get('user');
    if (!user) {
      return c.json(
        {
          error: 'Acesso não autorizado'
        },
        401
      );
    }
    return c.json({
      data: user
    });
  })
  .post('/login', zValidator('json', LoginSchema), async (c) => {
    const { email, password } = c.req.valid('json');

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return c.json(
        {
          success: false
        },
        401
      );
    }

    try {
      await signIn('credentials', {
        email,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT
      });
    } catch (error) {
      const errorStatusMap: Record<string, StatusCode> = {
        CredentialsSignin: 401,
        AccessDenied: 403
      };

      const code: StatusCode =
        error instanceof AuthError ? (errorStatusMap[error.type] ?? 500) : 500;

      return c.json(
        {
          success: false
        },
        code
      );
    }
    return c.json({
      success: true
    });
  })
  .post('/register', zValidator('json', RegisterSchema), async (c) => {
    const { name, email, password } = c.req.valid('json');

    const hashedPassword = await hashPassword(password);
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return c.json(
        {
          success: false,
          message: 'Email já cadastrado'
        },
        401
      );
    }

    await db.user.create({
      data: { email, password: hashedPassword, name }
    });

    return c.json({
      success: true
    });
  });

export default app;
