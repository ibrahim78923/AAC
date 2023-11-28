/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mui/x-charts'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['airapplecart-public.s3.eu-west-2.amazonaws.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
