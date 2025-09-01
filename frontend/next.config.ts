import type { NextConfig } from "next";

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3333";

const nextConfig: NextConfig = {
  // Rewrites to proxy requests to the backend API
  /*
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Match anything starting with /api
        destination: `${BACKEND_URL}/api/:path*`, // Redirect to backend API running on port 3333
      },
      {
        source: "/icons/:path*",
        destination: `${BACKEND_URL}/icons/:path*`, // proxy to backend for icons
      },
    ];
  },
  */
  // Other Next.js configurations can go here
  reactStrictMode: true, // Just an example of an additional config option

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3333",
        pathname: "/icons/**",
      },
      {
        protocol: "https",
        hostname: "**", // allow any host in prod (safe for icons)
        pathname: "/icons/**",
      },
    ],
  },
};

export default nextConfig;
// This configuration file sets up a proxy for API requests to the backend server.
