import { env } from "@/lib/env";
import { pinoLogger as logger } from "hono-pino";
import pino, { type LoggerOptions } from "pino";

const baseOptions: LoggerOptions = {
  level: env.NODE_ENV === "production" ? "info" : "debug",
};

const devConfig: LoggerOptions = {
  transport: {
    target: "hono-pino/debug-log",
  },
};

const prodConfig: LoggerOptions = {
  level: "info",
};

const pinoConfig =
  env.NODE_ENV === "development"
    ? { ...baseOptions, ...devConfig }
    : { ...baseOptions, ...prodConfig };

export function pinoLogger() {
  return logger({
    pino: pino(pinoConfig),
  });
}
