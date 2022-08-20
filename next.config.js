/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeFonts: true,
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
