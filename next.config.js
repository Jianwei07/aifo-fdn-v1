/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      source: "/api/:path*", // Match all `/api/...` routes
      destination: "http://127.0.0.1:8000/api/:path*", // Forward to FastAPI
    },
  ],
};

module.exports = nextConfig;
