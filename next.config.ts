import type { NextConfig } from "next";
import vercel from "./vercel.json";

const nextConfig: NextConfig = {
  // Security headers live in vercel.json; Next.js applies them itself so they also work outside Vercel (Infaris Cloud).
  poweredByHeader: false,
  async headers() {
    return vercel.headers ?? [];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
