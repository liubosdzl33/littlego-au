'use client';

import { useState } from 'react';
import Link from 'next/link';
import { blogPosts, getCategories, formatDate, type BlogPost } from '@/data/blog/posts';

const categoryDisplayNames: Record<BlogPost['category'], string> = {
  'playgrounds': 'Playgrounds',
  'activities': 'Activities', 
  'events': 'Events',
  'tips': 'Tips',
  'reviews': 'Reviews'
};

const categoryColors: Record<BlogPost['category'], string> = {
  'playgrounds': 'var(--color-green-medium)',
  'activities': 'var(--color-coral)',
  'events': '#8b5cf6',
  'tips': '#f59e0b',
  'reviews': '#06b6d4'
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<BlogPost['category'] | 'all'>('all');
  
  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <>
      {/* SEO Head would be handled by Next.js metadata API */}
      <div className="site-wrapper">
        <main className="main-content">
          {/* Hero Section */}
          <section className="bg-cream py-3xl">
            <div className="container">
              <div className="pure-g">
                <div className="pure-u-1 pure-u-lg-2-3">
                  <div className="text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h1 style={{ marginBottom: 'var(--space-lg)' }}>
                      Tips & Guides for Melbourne Parents
                    </h1>
                    <p className="lead" style={{ marginBottom: 'var(--space-xl)' }}>
                      Discover the best playgrounds, activities, and family-friendly events across Melbourne. 
                      From sun-safe playgrounds to rainy day activities, we've got your family adventures covered.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Category Filter */}
          <section className="py-xl bg-white">
            <div className="container">
              <div className="pure-g">
                <div className="pure-u-1">
                  <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 'var(--space-2xl)' }}>
                    <button 
                      onClick={() => setSelectedCategory('all')}
                      className={`category-filter ${selectedCategory === 'all' ? 'active' : ''}`}
                    >
                      All Posts
                    </button>
                    {getCategories().map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
                        style={selectedCategory === category ? { 
                          backgroundColor: categoryColors[category],
                          color: 'white'
                        } : {}}
                      >
                        {categoryDisplayNames[category]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Blog Posts Grid */}
              <div className="pure-g">
                {filteredPosts.map((post) => (
                  <div key={post.slug} className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3" style={{ padding: 'var(--space-md)' }}>
                    <article className="blog-card">
                      <div className="blog-card-content">
                        <div className="blog-meta" style={{ marginBottom: 'var(--space-sm)' }}>
                          <span 
                            className="blog-category-tag"
                            style={{ backgroundColor: categoryColors[post.category] }}
                          >
                            {categoryDisplayNames[post.category]}
                          </span>
                          <span className="blog-date">
                            {formatDate(post.publishedAt)}
                          </span>
                        </div>
                        
                        <h3 style={{ marginBottom: 'var(--space-md)', fontSize: 'var(--text-xl)' }}>
                          <Link 
                            href={`/blog/${post.slug}`}
                            style={{ 
                              textDecoration: 'none', 
                              color: 'inherit',
                              transition: 'color 0.2s ease'
                            }}
                            className="blog-post-link"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        
                        <p style={{ 
                          marginBottom: 'var(--space-lg)', 
                          color: 'var(--color-text-medium)',
                          lineHeight: '1.6'
                        }}>
                          {post.excerpt}
                        </p>
                        
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div className="blog-tags">
                            {post.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="blog-tag">
                                #{tag.replace(' ', '')}
                              </span>
                            ))}
                          </div>
                          
                          <Link 
                            href={`/blog/${post.slug}`}
                            className="read-more-link"
                          >
                            Read More →
                          </Link>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-2xl">
                  <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-medium)' }}>
                    No posts found in this category yet. Check back soon for more content!
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="bg-gradient-green py-3xl">
            <div className="container">
              <div className="pure-g">
                <div className="pure-u-1 pure-u-lg-2-3" style={{ margin: '0 auto' }}>
                  <div className="text-center" style={{ color: 'white' }}>
                    <h2 style={{ marginBottom: 'var(--space-lg)' }}>
                      Never Miss a Family Adventure
                    </h2>
                    <p style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-xl)', opacity: '0.9' }}>
                      Get weekly updates on the best family activities, playground reviews, and local events in Melbourne.
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--space-md)', maxWidth: '400px', margin: '0 auto', flexWrap: 'wrap' }}>
                      <input 
                        type="email" 
                        placeholder="Your email address"
                        style={{
                          flex: '1',
                          minWidth: '200px',
                          padding: 'var(--space-md)',
                          borderRadius: 'var(--radius-full)',
                          border: 'none',
                          fontSize: 'var(--text-base)'
                        }}
                      />
                      <button 
                        className="btn btn-secondary"
                        style={{
                          backgroundColor: 'white',
                          color: 'var(--color-green-medium)',
                          border: 'none'
                        }}
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      
      <style jsx>{`
        .category-filter {
          border-radius: 32px;
          border: 1px solid #ddd;
          padding: 8px 16px;
          background: white;
          color: #666;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 14px;
          font-weight: 500;
        }
        
        .category-filter:hover {
          border-color: #52b788;
          color: #52b788;
        }
        
        .category-filter.active {
          font-weight: 600;
        }
        
        .blog-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          height: 100%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: 1px solid #f0f0f0;
        }
        
        .blog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }
        
        .blog-card-content {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .blog-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        
        .blog-category-tag {
          color: white;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .blog-date {
          color: #888;
          font-size: 14px;
        }
        
        .blog-post-link:hover {
          color: #52b788 !important;
        }
        
        .blog-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        
        .blog-tag {
          color: #666;
          font-size: 12px;
          opacity: 0.8;
        }
        
        .read-more-link {
          color: #52b788;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: color 0.2s ease;
        }
        
        .read-more-link:hover {
          color: #2d6a4f;
        }
        
        /* Grid responsiveness */
        @media (max-width: 768px) {
          .pure-u-md-1-2 {
            width: 100% !important;
          }
        }
        
        @media (max-width: 1024px) {
          .pure-u-lg-1-3 {
            width: 50% !important;
          }
        }
      `}</style>
    </>
  );
}