'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { usePathname } from 'next/navigation';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  return (
    <html lang="en">
      
      <body >
   
        {children}
        
        </body>
    </html>
  )
}
