/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
    ppr: 'incremental',

  },
  "include": [
    "next-env.d.ts",
    "**/*.js",
    "**/*.jsx",  // Include .jsx files
    "**/*.ts",
    "**/*.tsx"   // Include .tsx files
  ],

  images: {

    loader: "default",
    domains: ["res.cloudinary.com"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "www.pexels.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ]
  },
};

export default nextConfig;
