import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createWorkspaceSchema, updateWorkspaceSchema } from "@/features/workspaces/schemas";
import { sessionMiddleware } from "@/lib/session-middleware";
import { MemberRole } from "@/features/members/types";
import { size } from "lodash";
import { db } from "@/lib/db.prisma";
import { createWorkspace, deleteWorkspace, getWorkspaceById, getWorkspacesById } from "@/features/workspaces/services";
import type { Prisma } from "@prisma/client";
import type { CreateWorkspaceProps } from "@/features/workspaces/types";
import { getMemberById } from "@/features/members/services/get-member-by-id";

const app = new Hono()
.get("/", sessionMiddleware, async (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({
      data: [],
      total: 0,
    });
  }

 const workspaces = await getWorkspacesById(user.id);

  return c.json({
    data: workspaces,
    total: size(workspaces)
  });
})
.get("/:workspaceId", sessionMiddleware, async (c) => {
  const user = c.get("user");
 
  const { workspaceId } = c.req.param()
  const workspace = await getWorkspaceById({userId: user.id, workspaceId} );
  
   return c.json({
    data: workspace,
    total: size(workspace)
  });
})
.post("/", zValidator("form", createWorkspaceSchema), sessionMiddleware, async (c) => {
  const user = c.get("user");
  const { name, image } = c.req.valid("form");

  let uploadedImageUrl: string | undefined;
  const createWorkspacesData: CreateWorkspaceProps = { name, userId: user.id, role: MemberRole.ADMIN }
  // if (image instanceof File) {
  //   const file = await storage.createFile(IMAGES_ID, ID.unique(), image); 
  //   const arrayBuffer = await storage.getFilePreview(IMAGES_ID, file.$id);
  //   uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
  //   createWorkspacesData.imageUrl = uploadedImageUrl;
  //   createWorkspacesData.storageId = file.$id;
  // }

  const workspace = await createWorkspace(createWorkspacesData);
  
  return c.json({
    data: workspace,
 
  });
})
.patch("/:workspaceId", sessionMiddleware, zValidator('form', updateWorkspaceSchema), async (c) => {
  const user = c.get("user");
  // // const storage = c.get("storage");
  const { workspaceId } = c.req.param()
  const { name, image } = c.req.valid("form");

  const member = await db.member.findFirst({
    where: {
      userId: user.id,
      workspaces: {
        some: {
          id: workspaceId,
        },
      },
    }
  });

  if (!member) {
    return c.json({ 
      error: "Não autorizado: Somente administrator pode atualizar o cadastro" 
    }, 401);
  }

  const workspace = await getWorkspaceById({userId: user.id, workspaceId});
  if (!workspace) {
    return c.json({
      error: "Workspace não existe"
    }, 404);
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
    data: updateData,
   });

  return c.json({
    data: updatedWorkspace,
  });

})
.delete("/:workspaceId", sessionMiddleware, async (c) => {
  const user = c.get("user");
  const { workspaceId } = c.req.param()

  if (!workspaceId) {
    return c.json({ 
      error: "Não autorizado: WorkspaceId inválido" 
    }, 401);
  }

  if (user.role !== "ADMIN") {
    return c.json({ 
      error: "Não autorizado: Somente administrator pode deletar o cadastro" 
    }, 401);
  }

  const workspace = await getWorkspaceById({userId: user.id, workspaceId});

  if (!workspace) {
    return c.json({
       error: "Não autorizado: Você não tem permissão para deletar o cadastro."
    }, 401);
  }

  deleteWorkspace({ workspaceId });

  await db.workspace.delete({
    where: { id: workspaceId }
   });

  return c.json({
    data: workspaceId,
  });

})

export default app