import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createWorkspaceSchema } from "../schemas";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, IMAGES_ID, WORKSPACE_ID } from "@/config";
import { ID } from "node-appwrite";

const app = new Hono().post("/", zValidator("form", createWorkspaceSchema), sessionMiddleware, async (c) => {
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
  return c.json({
    data: {
      database,
    },
  });
})

export default app