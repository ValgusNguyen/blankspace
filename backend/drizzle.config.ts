import { defineConfig } from "drizzle-kit";
import { env } from "@/lib/env/index.ts";

export default defineConfig({
  out: "./src/lib/db/migrations",
  schema: "./src/lib/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
