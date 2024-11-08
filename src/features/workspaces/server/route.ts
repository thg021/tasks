import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createWorkspaceSchema } from "../schemas";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, IMAGES_ID, MEMBERS_ID, WORKSPACE_ID } from "@/config";
import { ID, Query } from "node-appwrite";
import { MemberRole } from "@/features/members/types";
import { map } from "lodash";

const app = new Hono()
.get("/", sessionMiddleware, async (c) => {
  const databases = c.get("databases");
  const user = c.get("user");

  const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
    Query.equal("userId", user.$id),
  ]);
  
  if(members.total === 0) {
    return c.json({
      data: [],
      total: 0,
    });
  }

  const workspaceIds = map(members.documents, (member) => member.workspaceId);

  const workspaces = await databases.listDocuments(DATABASE_ID, WORKSPACE_ID, [
    Query.orderDesc("$createdAt"),
    Query.contains("$id", workspaceIds),
  ]);

  return c.json({
    data: workspaces.documents,
  });
})
.post("/", zValidator("form", createWorkspaceSchema), sessionMiddleware, async (c) => {
  const databases = c.get("databases");
  const user = c.get("user");
  const storage = c.get("storage");

  const { name, image } = c.req.valid("form");

  let uploadedImageUrl: string | undefined;

  if (image instanceof File) {
    const file = await storage.createFile(IMAGES_ID, ID.unique(), image);
    
    const arrayBuffer = await storage.getFilePreview(IMAGES_ID, file.$id);
    uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
  }


  const database = await databases.createDocument(DATABASE_ID, WORKSPACE_ID, ID.unique(), {
    name,
    imageUrl: uploadedImageUrl,
    userId: user.$id,
  });

  await databases.createDocument(DATABASE_ID, MEMBERS_ID, ID.unique(), {
    userId: user.$id,
    workspaceId: database.$id,
    role: MemberRole.ADMIN,
  });

  return c.json({
    data: {
      database,
    },
  });
})

export default app