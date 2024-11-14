import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createWorkspaceSchema, updateWorkspaceSchema } from "../schemas";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, IMAGES_ID, MEMBERS_ID, WORKSPACE_ID } from "@/config";
import { ID, Query } from "node-appwrite";
import { MemberRole } from "@/features/members/types";
import { map, size } from "lodash";
import { db } from "@/lib/db.prisma";
import { createWorkspace, getWorkspaceById, getWorkspacesById } from "../services";
import type { Prisma } from "@prisma/client";
import type { CreateWorkspaceProps, Workspace } from "../types";

const app = new Hono()
.get("/", sessionMiddleware, async (c) => {
  const user = c.get("user");
  const workspaces = await getWorkspacesById(user.$id);
  
  if(size(workspaces) === 0) {
    return c.json({
      data: [],
      total: 0,
    });
  }

  return c.json({
    data: workspaces,
    total: size(workspaces)
  });
})
.get("/:workspaceId", sessionMiddleware, async (c) => {
  const user = c.get("user");
  const { workspaceId } = c.req.param()
  const workspace = await getWorkspaceById({userId: user.$id, workspaceId} );
  
   return c.json({
    data: workspace,
    total: size(workspace)
  });
})
.post("/", zValidator("form", createWorkspaceSchema), sessionMiddleware, async (c) => {
  const user = c.get("user");
  const storage = c.get("storage");

  const { name, image } = c.req.valid("form");

  let uploadedImageUrl: string | undefined;
  const createWorkspacesData: CreateWorkspaceProps = { name, userId: user.$id, role: MemberRole.ADMIN }
  if (image instanceof File) {
    const file = await storage.createFile(IMAGES_ID, ID.unique(), image); 
    const arrayBuffer = await storage.getFilePreview(IMAGES_ID, file.$id);
    uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
    createWorkspacesData.imageUrl = uploadedImageUrl;
    createWorkspacesData.storageId = file.$id;
  }

  const workspace = await createWorkspace(createWorkspacesData);
  
  return c.json({
    data: workspace,
  });
})
.patch("/:workspaceId", sessionMiddleware, zValidator('form', updateWorkspaceSchema), async (c) => {
  const user = c.get("user");
  const storage = c.get("storage");
  const { workspaceId } = c.req.param()
  const { name, image } = c.req.valid("form");

  const member = await db.member.findFirst({
    where: {
      userId: user.$id,
      workspaceId,
      role: "ADMIN"
    }
  });

  if (!member) {
    return c.json({ 
      error: "Não autorizado: Somente administrator pode atualizar o cadastro" 
    }, 401);
  }

  const workspace = await getWorkspaceById({userId: user.$id, workspaceId});
  if (!workspace) {
    return c.json({
      error: "Workspace não encontrado"
    }, 404);
  }

  const updateData: Prisma.WorkspaceUpdateInput = {};
  updateData.imageUrl = workspace.imageUrl;
  if (name) {
    updateData.name = name;
  }

  if ((image instanceof File || !!image) && workspace.storageId) {
    console.log("deletando arquivo")
    // try {
    //   await storage.deleteFile(IMAGES_ID, workspace.storageId);
    // } catch (error) {
    //   console.log(error)
    // }
    updateData.imageUrl = "";
  }

  if (image instanceof File) {
    const file = await storage.createFile(IMAGES_ID, ID.unique(), image); 
    const arrayBuffer = await storage.getFilePreview(IMAGES_ID, file.$id);
    updateData.imageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
    updateData.storageId = file.$id;
  }

  const updatedWorkspace = await db.workspace.update({
    where: { id: workspaceId },
    data: updateData,
   });

  return c.json({
    data: updatedWorkspace,
  });

})

export default app