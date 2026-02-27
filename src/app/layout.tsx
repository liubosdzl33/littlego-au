import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "LittleGo - Discover Amazing Places for Kids in Australia",
  description: "The ultimate platform for parents to discover playgrounds, parks, indoor play centres, kid-friendly cafes and activities. Weather-aware suggestions, reviews, and smart filtering for 1-4 year olds across Australia.",
  keywords: "kids activities Australia, playground finder, indoor play centres, kid-friendly cafes, family activities Melbourne, weather-aware suggestions, parent reviews",
  authors: [{ name: "LittleGo Team" }],
  metadataBase: new URL('https://littlego.com.au'),
  openGraph: {
    title: "LittleGo - Discover Amazing Places for Kids in Australia",
    description: "The ultimate platform for parents to discover playgrounds, parks, indoor play centres, kid-friendly cafes and activities. Melbourne first, expanding nationally.",
    url: "https://littlego.com.au",
    siteName: "LittleGo",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LittleGo - Discover Amazing Places for Kids in Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LittleGo - Discover Amazing Places for Kids in Australia", 
    description: "Weather-aware suggestions for kid-friendly places across Australia",
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
  themeColor: '#10b981',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} font-sans antialiased bg-white text-gray-900`}>
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