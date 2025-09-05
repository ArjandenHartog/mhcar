import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io']
  },
  // ISR is enabled by default in Next.js 15
};

export default nextConfig;
