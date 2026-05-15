export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  category: 'playgrounds' | 'activities' | 'events' | 'tips' | 'reviews' | 'Guides' | 'Weekend Planner' | 'Seasonal' | 'Parenting Tips';
  content: string;
  imageUrl: string;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: string;
  publishedAt?: string;
  updatedAt?: string;
}
