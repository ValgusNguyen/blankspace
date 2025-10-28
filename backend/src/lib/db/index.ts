import { drizzle } from "drizzle-orm/node-postgres";
import { serverEnv } from "@/lib/env/server";

export const db = drizzle(serverEnv.DATABASE_URL);
