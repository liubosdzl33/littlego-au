import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LittleGo - Smart Playground Finder",
  description: "Find the best playground for your kids right now — based on age, shade, weather & UV. Australia's smartest playground finder for parents.",
  keywords: "playground finder, kids activities, family fun, outdoor play, Australia, weather, UV safety",
  authors: [{ name: "LittleGo Team" }],
  openGraph: {
    title: "LittleGo - Smart Playground Finder",
    description: "Find the best playground for your kids right now — based on age, shade, weather & UV",
    url: "https://littlego.com.au",
    siteName: "LittleGo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LittleGo - Smart Playground Finder", 
    description: "Find the best playground for your kids right now",
  },
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
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}