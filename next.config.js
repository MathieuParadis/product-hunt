/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ph-files.imgix.net'],
    // formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
