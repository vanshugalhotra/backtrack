import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Rewrites to proxy requests to the backend API
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Match anything starting with /api
        destination: "http://localhost:3333/api/:path*", // Redirect to backend API running on port 3333
      },
      {
        source: "/icons/:path*",
        destination: "http://localhost:3333/icons/:path*", // proxy to backend for icons
      },
    ];
  },

  // Other Next.js configurations can go here
  reactStrictMode: true, // Just an example of an additional config option
};

export default nextConfig;
// This configuration file sets up a proxy for API requests to the backend server.
