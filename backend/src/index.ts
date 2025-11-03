import { apiRoutes } from "@/routes";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger());
app.onError((error, c) => {
  if (error instanceof HTTPException) {
    return c.json({ message: error.message }, error.status);
  }

  return c.json({ message: error.message }, 500);
});

app.route("/api", apiRoutes);

const server = serve(
  {
    fetch: app.fetch,
    port: 3001,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);

process.on("SIGINT", () => {
  server.close();
  process.exit(0);
});

process.on("SIGTERM", () => {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
});
