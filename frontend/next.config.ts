import { envSchema } from "@/lib/env/schema";
import type { NextConfig } from "next";

envSchema.parse(process.env);

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
