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
      <body className="bg-creamBg text-slate-900">
        {children}
      </body>
    </html>
  )
}
