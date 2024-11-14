import { Hono } from "hono";
import { handle } from "hono/vercel";
import { HTTPException } from "hono/http-exception";

import auth from "@/features/auth/server/route";
import workspaces from "@/features/workspaces/server/route";

//export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app.route("/auth", auth).route("/workspace", workspaces);

app.onError((err, c) => {
  console.error(err);
  if (err instanceof HTTPException) {
    // Get the custom response
    return err.getResponse();
  }

  return c.text("Custom Error Message", 500);
});

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);

export type AppType = typeof routes;
