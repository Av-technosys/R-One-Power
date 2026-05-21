import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dg2suxnbcr839.cloudfront.net",
      },
    ],
  },};

export default nextConfig;
