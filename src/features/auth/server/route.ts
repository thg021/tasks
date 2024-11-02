import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { LoginSchema } from "@/features/auth/schemas";
const app = new Hono().post(
  "/login",
  zValidator("json", LoginSchema),
  async (c) => {
    const { email, password } = c.req.valid("json");

    console.log(email, password);
    return c.json({
      email,
      password,
    });
  }
);

export default app;
