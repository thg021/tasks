import 'server-only';

import { getToken } from 'next-auth/jwt';
import { createMiddleware } from 'hono/factory';
import { MemberRole } from '@/features/members/types';
import type { Role } from '@prisma/client';
import { db } from './db.prisma';

type Member = {
  id: string;
  created: Date;
  updated: Date;
  role: Role;
  userId: string;
};
type AdditionalContext = {
  Variables: {
    member: Member;
  };
};

export const isWorkspaceAdmin = createMiddleware<AdditionalContext>(async (c, next) => {
  try {
    const token = await getToken({ req: c.req.raw, secret: process.env.AUTH_SECRET });

    if (!token) {
      return c.json({ error: 'Acesso não autorizado' }, 401);
    }

    const workspaceId = c.req.param('workspaceId') || c.req.query('workspaceId');
    if (!workspaceId) {
      return c.json({ error: 'WorkspaceId não fornecido' }, 400);
    }

    const member = await db.member.findFirst({
      where: {
        userId: token.sub,
        workspaces: {
          some: {
            id: workspaceId
          }
        }
      }
    });

    if (!member || member.role !== MemberRole.ADMIN) {
      return c.json(
        {
          error: 'Não autorizado: Somente administrator pode realizar esta ação'
        },
        401
      );
    }
    c.set('member', member);

    await next();
  } catch (error) {
    console.error('Erro ao verificar permissões:', error);
    return c.json({ error: 'Erro interno do servidor' }, 500);
  }
});
