import { serve } from "@hono/node-server";
import { app } from "./app";
import { env } from "./lib/env";

const port = env.PORT;
const server = serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);

const shutdown = () => {
  console.log("\nShutting down server blankspace...");
  server.close((err) => {
    if (err) {
      console.error("Error during server close", err);
      process.exit(1);
    }
  });
  console.log("Server close successfully.");
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
