/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com', 'picsum.photos'],
    unoptimized: true, // Necesario para Netlify
  },
  output: 'export', // Generar archivos estáticos para Netlify
  trailingSlash: true, // Añadir slash final a las URLs
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/sw.js',
        destination: '/app/sw.js',
      },
    ]
  },
}

module.exports = nextConfig