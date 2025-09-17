/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'picsum.photos'],
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
}

module.exports = nextConfig