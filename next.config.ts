import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["172.26.64.1"],
  experimental: {
    cpus: 1,
  },
};

export default nextConfig;
