import { apiRoutes } from "@/routes";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";

export const app = new OpenAPIHono();

app.use(logger());
app.onError((error, c) => {
  if (error instanceof HTTPException) {
    return c.json({ message: error.message }, error.status);
  }

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
