import type { Metadata } from "next";
import "./globals.css";
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { getSiteSettings } from '@/lib/sanity'
import DatabuddyClient from '@/components/DatabuddyClient'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  if (!settings) {
    // Fallback metadata
    return {
      title: "MH Car Cleaning - Professionele Auto Detailing",
      description: "Premium auto detailing service",
    }
  }

  return {
    title: settings.title,
    description: settings.description,
    keywords: settings.keywords,
    authors: [{ name: settings.companyInfo.name }],
    creator: settings.companyInfo.name,
    publisher: settings.companyInfo.name,
    icons: {
      icon: [
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(settings.siteUrl),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: settings.title,
      description: settings.description,
      url: settings.siteUrl,
      siteName: settings.companyInfo.name,
      locale: 'nl_NL',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.title,
      description: settings.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body
        className="antialiased"
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <DatabuddyClient />
        <Footer />
      </body>
    </html>
  );
}
