/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['https://drivee-files.s3.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drivee-files.s3.amazonaws.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
