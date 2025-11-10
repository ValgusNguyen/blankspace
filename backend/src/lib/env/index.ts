import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.url(),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().default(3001),
});

export const env = envSchema.parse(process.env);
