import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '60secondstrip — Descubre el mundo en 60 segundos',
  description: 'App visual, mobile-first, para descubrir lugares y curiosidades cerca de ti en 60 segundos. Simplicidad como Apple.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '60 Spots',
  },
  icons: {
    icon: '/icon-192x192.png',
    apple: '/icon-192x192.png',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
  openGraph: {
    title: '60secondstrip — Descubre el mundo en 60 segundos',
    description: 'Explora spots cercanos con vídeos de 60s. Visual-first, zero cognitive load.',
    url: 'https://60secondstrip-app.netlify.app',
    siteName: '60secondstrip',
    images: [
      { url: '/icon-512x512.png', width: 1200, height: 630, alt: '60secondstrip' },
    ],
    type: 'website',
    locale: 'es_ES',
  },
}

export const viewport: Viewport = {
  themeColor: '#007AFF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sf-pro antialiased">
        {children}
      </body>
    </html>
  )
}
