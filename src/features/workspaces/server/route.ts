import { Hono } from 'hono';
import { size } from 'lodash';
import { MemberRole } from '@/features/members/types';
import { createWorkspaceSchema, updateWorkspaceSchema } from '@/features/workspaces/schemas';
import {
  createWorkspace,
  deleteWorkspace,
  getWorkspaceById,
  getWorkspacesById
} from '@/features/workspaces/services';
import type { CreateWorkspaceProps } from '@/features/workspaces/types';
import { db } from '@/lib/db.prisma';
import { isWorkspaceAdmin } from '@/lib/is-workspace-admin';
import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import type { Prisma } from '@prisma/client';

const app = new Hono()
  .get('/', sessionMiddleware, async (c) => {
    const user = c.get('user');
    if (!user) {
      return c.json({
        data: [],
        total: 0
      });
    }

    const workspaces = await getWorkspacesById(user.id);

    return c.json({
      data: workspaces,
      total: size(workspaces)
    });
  })
  .get('/:workspaceId', sessionMiddleware, async (c) => {
    const user = c.get('user');

    const { workspaceId } = c.req.param();
    const workspace = await getWorkspaceById({ userId: user.id, workspaceId });
    const totalMembers = size(workspace?.members);
    return c.json({
      data: { workspace, totalMembers },
      total: size(workspace)
    });
  })
  .post('/', zValidator('form', createWorkspaceSchema), sessionMiddleware, async (c) => {
    const user = c.get('user');
    const { name } = c.req.valid('form');

    //let uploadedImageUrl: string | undefined;
    const createWorkspacesData: CreateWorkspaceProps = {
      name,
      userId: user.id,
      role: MemberRole.ADMIN
    };
    // if (image instanceof File) {
    //   const file = await storage.createFile(IMAGES_ID, ID.unique(), image);
    //   const arrayBuffer = await storage.getFilePreview(IMAGES_ID, file.$id);
    //   uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
    //   createWorkspacesData.imageUrl = uploadedImageUrl;
    //   createWorkspacesData.storageId = file.$id;
    // }

    const workspace = await createWorkspace(createWorkspacesData);

    return c.json({
      data: workspace
    });
  })
  .patch(
    '/:workspaceId',
    sessionMiddleware,
    isWorkspaceAdmin,
    zValidator('form', updateWorkspaceSchema),
    async (c) => {
      const user = c.get('user');

      const { workspaceId } = c.req.param();
      const { name } = c.req.valid('form');

      const workspace = await getWorkspaceById({ userId: user.id, workspaceId });
      if (!workspace) {
        return c.json(
          {
            error: 'Workspace não existe'
          },
          404
        );
      }

      const updateData: Prisma.WorkspaceUpdateInput = {};
      updateData.imageUrl = workspace.imageUrl;
      if (name) {
        updateData.name = name;
      }

      //TODO: implementar upload de imagem

      // if ((image instanceof File || !!image) && workspace.storageId) {
      //   console.log("deletando arquivo")
      //   // try {
      //   //   await storage.deleteFile(IMAGES_ID, workspace.storageId);
      //   // } catch (error) {
      //   //   console.log(error)
      //   // }
      //   updateData.imageUrl = "";
      // }

      // if (image instanceof File) {
      //   const file = await storage.createFile(IMAGES_ID, ID.unique(), image);
      //   const arrayBuffer = await storage.getFilePreview(IMAGES_ID, file.$id);
      //   updateData.imageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
      //   updateData.storageId = file.$id;
      // }

      const updatedWorkspace = await db.workspace.update({
        where: { id: workspaceId },
        data: updateData
      });

      return c.json({
        data: updatedWorkspace
      });
    }
  )
  .delete('/:workspaceId', sessionMiddleware, isWorkspaceAdmin, async (c) => {
    const user = c.get('user');
    const { workspaceId } = c.req.param();

    if (!workspaceId) {
      return c.json(
        {
          error: 'Não autorizado: WorkspaceId inválido'
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

    await deleteWorkspace({ workspaceId });

    return c.json({
      data: workspaceId
    });
  });

export default app;
