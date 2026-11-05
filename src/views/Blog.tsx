'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { User, Clock, ChevronRight } from 'lucide-react';
import { useBlogs } from '../hooks/useBlogs';
import { BlogPost } from '../types';

export default function Blog() {
  const { fetchPublishedBlogs } = useBlogs();
  const [articles, setArticles] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchPublishedBlogs().then(setArticles);
  }, [fetchPublishedBlogs]);

  return (
    <div style={{ paddingTop: 'clamp(20px, 5vh, 40px)', backgroundColor: '#fdfdfd', minHeight: '100vh', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: 'var(--color-primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem' }}>
            From the Field
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 3.5rem)', marginTop: '0.8rem', fontWeight: 900 }}>
            Latest <span style={{ color: 'var(--color-primary)' }}>Stories &amp; Dispatches</span>
          </h1>
          <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: 'var(--color-text-light)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Perspectives, field project reflections, and ecological updates from YCHA youth champions across Kenya and East Africa.
          </p>
        </div>

        {/* Articles Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: '1100px', margin: '0 auto' }}>
          {articles.map((art, i) => (
            <article
              key={art.id || i}
              style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                border: '1px solid #f1f5f9',
                display: 'flex',
                flexDirection: 'column',
                opacity: 1,
              }}
            >
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden', backgroundColor: '#e2e8f0' }}>
                <img
                  src={art.image}
                  alt={art.title}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/hero-bg.jpg';
                  }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'var(--color-primary)',
                  color: 'white',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '2rem',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                }}>
                  {art.category}
                </div>
              </div>

              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--color-text-light)', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><User size={14} /> {art.author}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} /> {art.readTime}</div>
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', fontWeight: 800, lineHeight: 1.3, color: 'var(--color-primary)' }}>
                  {art.title}
                </h3>
                <p style={{ color: 'var(--color-text-light)', marginBottom: '1.5rem', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  {art.excerpt}
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>{art.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--color-primary)', fontWeight: 800, fontSize: '0.85rem' }}>
                    Field Dispatch <ChevronRight size={16} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

