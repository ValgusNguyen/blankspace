import * as schema from "@/lib/db/schema";
import { env } from "@/lib/env";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(env.DATABASE_URL, {
  casing: "snake_case",
  schema,
});

export type DBOrTx =
  | typeof db
  | Parameters<Parameters<typeof db.transaction>[0]>[0];
