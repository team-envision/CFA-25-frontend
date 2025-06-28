// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '**', // Allow any path from this hostname
      },
      // Add other hostnames if you use images from different external sources
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      // },
    ],
  },
};

module.exports = nextConfig;
