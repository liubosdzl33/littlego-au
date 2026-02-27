import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPostBySlug, getRelatedPosts, formatDate, blogPosts } from '@/data/blog/posts';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const categoryDisplayNames = {
  'playgrounds': 'Playgrounds',
  'activities': 'Activities', 
  'events': 'Events',
  'tips': 'Tips',
  'reviews': 'Reviews'
};

const categoryColors = {
  'playgrounds': 'var(--color-green-medium)',
  'activities': 'var(--color-coral)',
  'events': '#8b5cf6',
  'tips': '#f59e0b',
  'reviews': '#06b6d4'
};

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found | LittleGo',
      description: 'The requested blog post could not be found.',
    };
  }

  const seoTitle = post.seoTitle || post.title;
  const seoDescription = post.seoDescription || post.excerpt;

  return {
    title: `${seoTitle} | LittleGo`,
    description: seoDescription,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'article',
      locale: 'en_AU',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: post.featuredImage ? [
        {
          url: post.featuredImage,
          alt: post.title,
        }
      ] : undefined,
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug);

  // JSON-LD structured data for rich results
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: 'https://littlego.melbourne',
    },
    publisher: {
      '@type': 'Organization',
      name: 'LittleGo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://littlego.melbourne/logo.png',
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://littlego.melbourne/blog/${post.slug}`,
    },
    keywords: post.tags,
    articleSection: categoryDisplayNames[post.category],
    image: post.featuredImage ? {
      '@type': 'ImageObject',
      url: post.featuredImage,
      alt: post.title,
    } : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="site-wrapper">
        <main className="main-content">
          {/* Back Navigation */}
          <section className="py-lg bg-cream-light">
            <div className="container">
              <div className="pure-g">
                <div className="pure-u-1">
                  <Link 
                    href="/blog" 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: 'var(--space-xs)',
                      textDecoration: 'none',
                      color: 'var(--color-text-medium)',
                      fontSize: 'var(--text-sm)',
                      transition: 'color 0.2s ease'
                    }}
                    className="back-link"
                  >
                    ← Back to Blog
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Article Header */}
          <section className="py-3xl bg-white">
            <div className="container">
              <div className="pure-g">
                <div className="pure-u-1 pure-u-lg-3-4" style={{ margin: '0 auto' }}>
                  <article>
                    <header style={{ marginBottom: 'var(--space-2xl)', textAlign: 'center' }}>
                      <div className="blog-meta" style={{ marginBottom: 'var(--space-lg)', justifyContent: 'center' }}>
                        <span 
                          className="blog-category-tag"
                          style={{ backgroundColor: categoryColors[post.category] }}
                        >
                          {categoryDisplayNames[post.category]}
                        </span>
                        <time dateTime={post.publishedAt} className="blog-date">
                          {formatDate(post.publishedAt)}
                        </time>
                      </div>
                      
                      <h1 style={{ 
                        marginBottom: 'var(--space-lg)',
                        maxWidth: '800px',
                        margin: '0 auto var(--space-lg)'
                      }}>
                        {post.title}
                      </h1>
                      
                      <p className="lead" style={{ 
                        maxWidth: '600px', 
                        margin: '0 auto',
                        color: 'var(--color-text-medium)'
                      }}>
                        {post.excerpt}
                      </p>
                      
                      <div style={{ 
                        marginTop: 'var(--space-xl)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-light)'
                      }}>
                        By {post.author}
                        {post.updatedAt && post.updatedAt !== post.publishedAt && (
                          <span style={{ margin: '0 var(--space-sm)' }}>
                            • Updated {formatDate(post.updatedAt)}
                          </span>
                        )}
                      </div>
                    </header>

                    {/* Article Content */}
                    <div 
                      className="blog-content"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                      style={{
                        maxWidth: '720px',
                        margin: '0 auto',
                        lineHeight: '1.7',
                      }}
                    />

                    {/* Tags */}
                    <footer style={{ 
                      marginTop: 'var(--space-3xl)', 
                      paddingTop: 'var(--space-xl)',
                      borderTop: '1px solid var(--color-cream)',
                      textAlign: 'center'
                    }}>
                      <div className="blog-tags">
                        {post.tags.map(tag => (
                          <span key={tag} className="blog-tag">
                            #{tag.replace(' ', '')}
                          </span>
                        ))}
                      </div>
                    </footer>
                  </article>
                </div>
              </div>
            </div>
          </section>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="py-3xl bg-cream-light">
              <div className="container">
                <div className="pure-g">
                  <div className="pure-u-1">
                    <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
                      More {categoryDisplayNames[post.category]} Articles
                    </h2>
                  </div>
                </div>
                
                <div className="pure-g">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.slug} className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3" style={{ padding: 'var(--space-md)' }}>
                      <article className="blog-card">
                        <div className="blog-card-content">
                          <div className="blog-meta" style={{ marginBottom: 'var(--space-sm)' }}>
                            <span 
                              className="blog-category-tag"
                              style={{ backgroundColor: categoryColors[relatedPost.category] }}
                            >
                              {categoryDisplayNames[relatedPost.category]}
                            </span>
                            <span className="blog-date">
                              {formatDate(relatedPost.publishedAt)}
                            </span>
                          </div>
                          
                          <h3 style={{ marginBottom: 'var(--space-md)', fontSize: 'var(--text-lg)' }}>
                            <Link 
                              href={`/blog/${relatedPost.slug}`}
                              style={{ 
                                textDecoration: 'none', 
                                color: 'inherit',
                                transition: 'color 0.2s ease'
                              }}
                              className="blog-post-link"
                            >
                              {relatedPost.title}
                            </Link>
                          </h3>
                          
                          <p style={{ 
                            marginBottom: 'var(--space-lg)', 
                            color: 'var(--color-text-medium)',
                            fontSize: 'var(--text-sm)',
                            lineHeight: '1.6'
                          }}>
                            {relatedPost.excerpt.substring(0, 120)}...
                          </p>
                          
                          <Link 
                            href={`/blog/${relatedPost.slug}`}
                            className="read-more-link"
                          >
                            Read More →
                          </Link>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </>
  );
}