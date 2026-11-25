import fs from "fs";
import path from "path";

const hasSvgLogo = fs.existsSync(path.join(process.cwd(), "public", "logo.svg"));
const hasPngLogo = fs.existsSync(path.join(process.cwd(), "public", "logo.png"));
const resolvedLogoPath = hasSvgLogo && !hasPngLogo ? "/logo.svg" : hasPngLogo ? "/logo.png" : hasSvgLogo ? "/logo.svg" : "/logo.png";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_LOGO_PATH: resolvedLogoPath,
  },
};

export default nextConfig;

