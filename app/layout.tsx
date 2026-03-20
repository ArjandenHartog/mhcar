import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MH Car Cleaning",
  description: "Professionele Auto Detailing Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
