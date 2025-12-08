import { env } from "@/lib/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/lib/db/migrations",
  schema: "./src/lib/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  casing: "snake_case",
});
