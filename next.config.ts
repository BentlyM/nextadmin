import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns: [
      {
        protocol:"https",
        hostname: 'external-content.duckduckgo.com'
      }
    ]
  }
};

export default nextConfig;
