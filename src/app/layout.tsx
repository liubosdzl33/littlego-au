import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LittleGo — Find the Best Playground for Your Kids Right Now",
  description: "Smart playground finder for Australian parents. Real-time weather, UV index, shade ratings, and age suitability. Enter your postcode and go!",
  keywords: "playground finder, kids activities, family fun, outdoor play, Australia, weather, UV safety, shade, Melbourne playgrounds, Sydney playgrounds",
  authors: [{ name: "LittleGo Team" }],
  metadataBase: new URL('https://littlego.com.au'),
  openGraph: {
    title: "LittleGo — Find the Best Playground for Your Kids Right Now",
    description: "Smart playground finder for Australian parents. Real-time weather, UV index, shade ratings, and age suitability. Enter your postcode and go!",
    url: "https://littlego.com.au",
    siteName: "LittleGo",
    type: "website",
    locale: "en_AU",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LittleGo - Smart Playground Finder for Australian Parents',
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "LittleGo — Find the Best Playground for Your Kids Right Now", 
    description: "Smart playground finder for Australian parents. Real-time weather, UV index, shade ratings, and age suitability.",
    images: ['/og-image.jpg'],
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
  category: 'family',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFD93D',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 text-gray-900`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}