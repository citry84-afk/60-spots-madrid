import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '60 Spots - Descubre Madrid en 60 segundos',
  description: 'Una app visual para descubrir lugares curiosos cerca de ti en Madrid. Simplicidad como Apple.',
  manifest: '/manifest.json',
  themeColor: '#007AFF',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
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
