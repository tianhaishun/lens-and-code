/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'github.com'],
  },
  basePath: process.env.NODE_ENV === 'production' ? '/lens-and-code' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/lens-and-code' : '',
}

module.exports = nextConfig
