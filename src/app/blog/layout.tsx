import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | LittleGo - Tips & Guides for Melbourne Parents',
  description: 'Discover the best playgrounds, activities, and family-friendly events across Melbourne. Expert tips and guides for parents with young children.',
  keywords: 'Melbourne families, playgrounds, activities, toddlers, parenting tips, family events, Melbourne parents',
  openGraph: {
    title: 'Blog | LittleGo - Tips & Guides for Melbourne Parents',
    description: 'Discover the best playgrounds, activities, and family-friendly events across Melbourne. Expert tips and guides for parents with young children.',
    type: 'website',
    locale: 'en_AU',
  },
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}