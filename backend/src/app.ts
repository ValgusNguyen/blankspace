import { pinoLogger } from "@/middlewares/pino-logger";
import { apiRoutes } from "@/routes";
import type { AppContext } from "@/types/context";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";

export const app = new OpenAPIHono<AppContext>();

app.use(pinoLogger());
app.onError((error, c) => {
  if (error instanceof HTTPException) {
    c.var.logger.debug(error.message);
    return c.json({ message: error.message }, error.status);
  }

  c.var.logger.error(error.message);
  return c.json({ message: error.message }, 500);
});

app.route("/api", apiRoutes);
app.doc("/openapi.json", {
  openapi: "3.1.0",
  info: {
    version: "1.0.0",
    title: "Blankspace API",
    description: "API documentation generated with Hono and Zod",
  },
});
app.get("/docs", swaggerUI({ url: "/openapi.json" }));
