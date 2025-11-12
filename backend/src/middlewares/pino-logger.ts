import { env } from "@/lib/env";
import { pinoLogger as logger } from "hono-pino";
import pino from "pino";
import pretty from "pino-pretty";

export function pinoLogger() {
  return logger({
    pino: pino({}, env.NODE_ENV === "development" ? pretty() : undefined),
  });
}
