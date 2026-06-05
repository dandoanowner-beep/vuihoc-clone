import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // Set NEXT_PUBLIC_BASE_PATH to /repo-name when deploying to GitHub Pages subdirectory
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
};

export default nextConfig;
