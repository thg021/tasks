import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { LoginSchema, RegisterSchema } from "@/features/auth/schemas";
import { sessionMiddleware } from "@/lib/session-middleware";
import { getUserByEmail } from "@/features/auth/services/user";
import { signIn } from "@/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import type { StatusCode } from "hono/utils/http-status";
import { hashPassword } from "@/lib/hashPassword";
import { db } from "@/lib/db.prisma";

const app = new Hono()
  .get("/current", sessionMiddleware, async (c) => {
    const user = c.get("user");
    if (!user) {
      return c.json({
        error: "Acesso não autorizado",
      }, 401);
    }
    return c.json({
      data: user,
    });
  })
  .post("/login", zValidator("json", LoginSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return c.json({
        success: false,
      }, 401);
    }

    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      });
    } catch (error) {
      let code: StatusCode = 500
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            code = 401
          case "AccessDenied":
           code = 403 
          default:
           code = 500
        }
      }
  
      return c.json({
        success: false
      }, code);
    }
    return c.json({
      success: true,
    });
  })
  .post("/register", zValidator("json", RegisterSchema), async (c) => {
    const { name, email, password } = c.req.valid("json");
   
    const hashedPassword = await hashPassword(password);
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return c.json({
        success: false,
        message: "Email já cadastrado",
      }, 401);
    }

    await db.user.create({
      data: { email, password: hashedPassword, name },
    });

    return c.json({
      success: true,
    });
  })

export default app;
