import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import { ConnectionStatus } from "@/components/connection-status"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "AgriLink - Agricultural Marketplace",
  description: "Connect landowners, farmers, and agricultural workers",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <AuthProvider>
            {children}
            <ConnectionStatus />
          </AuthProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
