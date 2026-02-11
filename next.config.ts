import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ph-files.imgix.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.nextmedia.com.au",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.imgix.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.railway.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "appifyglobalbackend-production.up.railway.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "t3.storageapi.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;