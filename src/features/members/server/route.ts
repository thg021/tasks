import { Hono } from 'hono';
import { map, size } from 'lodash';
import { z } from 'zod';
import { getUserByEmail } from '@/features/auth/services/user';
import { getMemberById } from '@/features/members/services/get-member-by-id';
import { getWorkspaceById } from '@/features/workspaces/services';
import { db } from '@/lib/db.prisma';
import { isWorkspaceAdmin } from '@/lib/is-workspace-admin';
import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import { createMemberSchema } from '../schemas';
import { deleteMember } from '../services/delete-member';
import { getMembers } from '../services/get-members';

const app = new Hono()
  .get(
    '/',
    sessionMiddleware,
    isWorkspaceAdmin,
    zValidator('query', z.object({ workspaceId: z.string() })),
    async (c) => {
      const { workspaceId } = c.req.valid('query');

      const members = await getMembers({ workspaceId });
      const filteredMembers = map(members, (member) => {
        return {
          id: member.id,
          name: member.user.name || '',
          email: member.user.email,
          role: member.role,
          image: member.user.image,
          emailVerified: member.user.emailVerified
        };
      });

      return c.json({
        data: [...filteredMembers],
        total: size(filteredMembers)
      });
    }
  )
  .get('/:memberId', sessionMiddleware, isWorkspaceAdmin, async (c) => {
    const { memberId } = c.req.param();
    const member = await getMemberById({ userId: memberId });

    return c.json({
      data: member,
      total: size(member)
    });
  })
  .post('/', zValidator('json', createMemberSchema), sessionMiddleware, async (c) => {
    const { name, email, workspaceId, projectId } = c.req.valid('json');

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return c.json(
        {
          error: 'Email já cadastrado'
        },
        400
      );
    }

    const member = await db.user.create({
      data: {
        name,
        email,
        projects: {
          connect: projectId?.map((id) => ({ id })) // Conecte cada projeto individualmente
        },
        members: {
          create: {
            role: 'USER',
            workspaces: {
              connect: {
                id: workspaceId
              }
            }
          }
        }
      }
    });

    return c.json({
      data: { ...member, workspaceId }
    });
  })
  .delete('/:workspaceId/:memberId', sessionMiddleware, isWorkspaceAdmin, async (c) => {
    const user = c.get('user');
    const { memberId, workspaceId } = c.req.param();

    if (!memberId) {
      return c.json(
        {
          error: 'Não autorizado: membro inválido'
        },
        401
      );
    }

    const workspace = await getWorkspaceById({ userId: user.id, workspaceId });

    if (!workspace) {
      return c.json(
        {
          error: 'Não autorizado: Você não tem permissão para deletar o cadastro.'
        },
        401
      );
    }

    await deleteMember({ memberId });

    return c.json({
      data: {
        memberId,
        workspaceId
      }
    });
  });

export default app;
