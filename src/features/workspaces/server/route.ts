import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createWorkspaceSchema } from "../schemas";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, IMAGES_ID, MEMBERS_ID, WORKSPACE_ID } from "@/config";
import { ID, Query } from "node-appwrite";
import { MemberRole } from "@/features/members/types";
import { map, size } from "lodash";
import { db } from "@/lib/db.prisma";
import { createWorkspace, getWorkspacesById } from "../services";

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
.post("/", zValidator("form", createWorkspaceSchema), sessionMiddleware, async (c) => {
  const user = c.get("user");
  const storage = c.get("storage");

  const { name, image } = c.req.valid("form");

  let uploadedImageUrl: string | undefined;

  if (image instanceof File) {
    const file = await storage.createFile(IMAGES_ID, ID.unique(), image); 
    const arrayBuffer = await storage.getFilePreview(IMAGES_ID, file.$id);
    uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
  }
      
  const workspace = await createWorkspace({ name, imageUrl: uploadedImageUrl, userId: user.$id, role: MemberRole.ADMIN });
  
  return c.json({
    data: workspace,
  });
})

export default app