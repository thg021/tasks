import { Hono } from 'hono';
import { db } from '@/lib/db.prisma';
import { sessionMiddleware } from '@/lib/session-middleware';

const app = new Hono()
  .get('/:projectId', sessionMiddleware, async (c) => {
    const { projectId } = c.req.param();
    const sprints = await db.sprint.findMany({
      where: { projectId }
    });

    return c.json({
      data: sprints
    });
  })
  .get('/workspace/:workspaceId', sessionMiddleware, async (c) => {
    const { workspaceId } = c.req.param();
    const sprints = await db.sprint.findMany({
      where: { workspaceId }
    });

    return c.json({
      data: sprints
    });
  });

export default app;
