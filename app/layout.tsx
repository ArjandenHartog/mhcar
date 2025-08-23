import type { Metadata } from "next";
import "./globals.css";
import Navigation from '@/components/navigation'

export const metadata: Metadata = {
  title: "MH Car Cleaning - Auto Detailing Opheusden",
  description: "Professionele auto detailing service in Opheusden. Wij maken uw auto grondig schoon, zowel van binnen als van buiten!",
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
      </body>
    </html>
  );
}
