/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mui/x-charts'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'airapplecart-dev.s3.eu-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'tf-staging-airapplecart-public.s3.eu-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'aac-production-s3.s3.eu-west-2.amazonaws.com',
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
};

module.exports = nextConfig;
