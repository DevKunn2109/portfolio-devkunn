import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/vi", destination: "/", permanent: true },
      { source: "/en", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
