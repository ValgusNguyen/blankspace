import type { Context } from "hono";
import type { Env as Logger } from "hono-pino";

export type AppContext = Context<{
  Variables: object;
}> &
  Logger;
