import { serverEnvSchema } from "./schema";

export const serverEnv = serverEnvSchema.parse(process.env);
