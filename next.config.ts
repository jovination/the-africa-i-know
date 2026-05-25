import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Disable /_next/image — Google Drive and other remote URLs fail with
    // INVALID_IMAGE_OPTIMIZE_REQUEST on Vercel. Story images use plain <img>.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Production domain configuration
  productionBrowserSourceMaps: false,
  // Environment-specific configuration
  ...(process.env.NODE_ENV === 'production' && {
    assetPrefix: undefined,
    trailingSlash: true,
  }),
};

export default nextConfig;
