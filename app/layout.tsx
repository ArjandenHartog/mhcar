import type { Metadata } from "next";
import "./globals.css";
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: "MH Car Cleaning - Professionele Auto Detailing Opheusden | Exterieur & Interieur Reiniging",
  description: "Premium auto detailing service in Opheusden en omgeving. Professionele exterieur reiniging, interieur detailing, coating services en volledige autopakketten. Ervaren specialisten, kwalitatieve producten, scherpe prijzen vanaf €80. Bel voor afspraak!",
  keywords: "auto detailing, car cleaning, autopoeteren, interieur reiniging, exterieur detailing, auto coating, Opheusden, Wageningen, Rhenen, auto schoonmaken, professioneel",
  authors: [{ name: "MH Car Cleaning" }],
  creator: "MH Car Cleaning",
  publisher: "MH Car Cleaning",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.mhcarcleaning.nl'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "MH Car Cleaning - Professionele Auto Detailing Opheusden",
    description: "Premium auto detailing service in Opheusden. Exterieur, interieur, coating services. Ervaren specialisten, kwalitatieve producten, scherpe prijzen.",
    url: 'https://www.mhcarcleaning.nl',
    siteName: 'MH Car Cleaning',
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "MH Car Cleaning - Professionele Auto Detailing Opheusden",
    description: "Premium auto detailing service in Opheusden. Exterieur, interieur, coating services.",
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
};

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
        <Footer />
      </body>
    </html>
  );
}
