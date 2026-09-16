import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Link from "next/link"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Claude Learning OS",
  description: "Anthropic certification study platform — practice questions, explanations, and progress tracking.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        <nav style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
          <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 font-semibold text-sm tracking-tight" style={{ color: "var(--foreground)" }}>
              <span className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ background: "var(--accent)", color: "#fff" }}>CL</span>
              Claude Learning OS
            </Link>
            <div className="flex items-center gap-5 text-sm" style={{ color: "var(--muted)" }}>
              <Link href="/" className="hover:opacity-80 transition-opacity">Home</Link>
              <Link href="/progress" className="hover:opacity-80 transition-opacity">Progress</Link>
            </div>
          </div>
        </nav>
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  )
}
