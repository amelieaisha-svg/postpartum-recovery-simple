import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PostpartumRecovery - Support & Community',
  description: 'Connect with moms, join activities, and get peer support for your postpartum journey',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-creamBg text-slate-900">
        {children}
      </body>
    </html>
  )
}
