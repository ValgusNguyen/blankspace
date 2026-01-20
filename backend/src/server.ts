import { serve } from "bun";
import { app } from "./app";
import { env } from "./lib/env";

const port = env.PORT ?? 3001;
const server = serve({
  fetch: app.fetch,
  port,
});

console.log(`Server is running on http://localhost:${server.port}`);

const shutdown = () => {
  console.log("\nShutting down server blankspace...");
  server.stop();

  console.log("Server close successfully.");
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
