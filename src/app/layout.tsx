import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })




export const metadata: Metadata = {
  title: 'Bhasha Bridge',
  description: 'Translate text into Hindi effortlessly with Bhasha Bridge. Simplify language barriers and connect with India\'s rich culture. Try it now!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
