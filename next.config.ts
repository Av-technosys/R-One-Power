import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
        unoptimized: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "dg2suxnbcr839.cloudfront.net",
        pathname: "/public/rone001/**",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
};

export default nextConfig;
