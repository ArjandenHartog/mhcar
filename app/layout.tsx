import type { Metadata } from "next";
import "./globals.css";
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { usePathname } from 'next/navigation'

export const metadata: Metadata = {
  title: "MH Car Cleaning - Auto Detailing Opheusden",
  description: "Professionele auto detailing service in Opheusden. Wij maken uw auto grondig schoon, zowel van binnen als van buiten!",
};

function LayoutContent({ children }: { children: React.ReactNode }) {
  'use client'
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')

  if (isAdminPage) {
    return <>{children}</>
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="antialiased">
        <LayoutContent>
          {children}
        </LayoutContent>
      </body>
    </html>
  );
}
