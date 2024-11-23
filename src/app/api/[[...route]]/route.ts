import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { handle } from 'hono/vercel';
import authRoutes from '@/features/auth/server/route';
import membersRoutes from '@/features/members/server/route';
import projectsRoutes from '@/features/projects/server/route';
import workspacesRoutes from '@/features/workspaces/server/route';
import { authHandler, verifyAuth } from '@hono/auth-js';

//export const runtime = "edge";

const app = new Hono().basePath('/api');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route('/authenticated', authRoutes)
  .route('/workspace', workspacesRoutes)
  .route('/members', membersRoutes)
  .route('/projects', projectsRoutes);

app.use('/api/auth/*', authHandler());

app.use('/api/*', verifyAuth());

app.onError((err, c) => {
  console.error(err);
  if (err instanceof HTTPException) {
    // Get the custom response
    return err.getResponse();
  }

  return c.text('Custom Error Message', 500);
});

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
