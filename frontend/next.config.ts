import { envSchema } from "@/lib/env";
import type { NextConfig } from "next";

envSchema.parse(process.env);

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
