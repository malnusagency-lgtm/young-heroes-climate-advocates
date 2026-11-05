'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Columns3,
  Rows3,
  ExternalLink,
  FolderArchive,
  ArrowUpRight,
} from 'lucide-react';
import { useGallery, INITIAL_FALLBACK_ITEMS, sanitizeItem } from '../hooks/useGallery';
import { ORG } from '../config/constants';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const GOOGLE_DRIVE_URL =
  ORG.googleDriveArchiveUrl ||
  'https://drive.google.com/drive/folders/1mMI2p1uUds9mVDhOWG8ptW2g4HHDHnAn?usp=sharing';

const VIEW_STYLES = [
  { id: 'feed', label: 'Feed', icon: Rows3 },
  { id: 'masonry', label: 'Masonry', icon: Columns3 },
  { id: 'grid', label: 'Grid', icon: LayoutGrid },
];

const PAGE_BASE = 5;

export default function Gallery() {
  const { fetchPublishedGallery, loading } = useGallery();
  const [photos, setPhotos] = useState(() => INITIAL_FALLBACK_ITEMS.map(sanitizeItem));
  const [selectedImg, setSelectedImg] = useState(null);
  const [filter, setFilter] = useState('All');
  const [viewStyle, setViewStyle] = useState('feed'); // Reversed order: 'feed' is now first
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPublishedGallery('All').then(setPhotos);
  }, [fetchPublishedGallery]);

  // Read URL query parameter on load (e.g., /gallery?category=Environment)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category') || params.get('cat');
      if (catParam) {
        const decoded = decodeURIComponent(catParam);
        setFilter(decoded);
      }
    }
  }, []);

  const categories = ['All', 'Environment', 'Community', 'Training', 'Events', 'Advocacy'];
  const filteredPhotos = filter === 'All' ? photos : photos.filter((p) => p.category === filter);

  // Progressive pagination: Page 1 = 5 items, Page 2 = 10 (double), Page 3 = 15 (triple)...
  const displayedCount = page * PAGE_BASE;
  const visiblePhotos = filteredPhotos.slice(0, displayedCount);
  const hasMore = displayedCount < filteredPhotos.length;
  const totalPages = Math.ceil(filteredPhotos.length / PAGE_BASE) || 1;

  const handleFilterChange = (cat) => {
    setFilter(cat);
    setPage(1);
    if (typeof window !== 'undefined') {
      const newUrl = cat === 'All' ? '/gallery' : `/gallery?category=${encodeURIComponent(cat)}`;
      window.history.replaceState(null, '', newUrl);
    }
  };

  const openLightbox = (img) => setSelectedImg(img);
  const closeLightbox = () => setSelectedImg(null);

  const handleNext = (e) => {
    e.stopPropagation();
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedImg.id);
    if (currentIndex < filteredPhotos.length - 1) {
      setSelectedImg(filteredPhotos[currentIndex + 1]);
    } else {
      setSelectedImg(filteredPhotos[0]);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedImg.id);
    if (currentIndex > 0) {
      setSelectedImg(filteredPhotos[currentIndex - 1]);
    } else {
      setSelectedImg(filteredPhotos[filteredPhotos.length - 1]);
    }
  };

  // Keyboard navigation & Esc-to-close for Lightbox
  useEffect(() => {
    if (!selectedImg) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') {
        const idx = filteredPhotos.findIndex((p) => p.id === selectedImg.id);
        setSelectedImg(idx < filteredPhotos.length - 1 ? filteredPhotos[idx + 1] : filteredPhotos[0]);
      }
      if (e.key === 'ArrowLeft') {
        const idx = filteredPhotos.findIndex((p) => p.id === selectedImg.id);
        setSelectedImg(idx > 0 ? filteredPhotos[idx - 1] : filteredPhotos[filteredPhotos.length - 1]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImg, filteredPhotos]);

  // Lock background scrolling when Lightbox is open
  useEffect(() => {
    if (selectedImg) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImg]);

  return (
    <section
      className="gallery-section section"
      style={{
        backgroundColor: '#fbfcfb',
        overflow: 'hidden',
        paddingTop: 'clamp(1.5rem, 5vw, 3rem)',
        paddingBottom: 'clamp(3rem, 8vw, 6rem)',
      }}
    >
      <div className="container" style={{ paddingInline: 'clamp(1rem, 3vw, 2rem)' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
          <span
            style={{
              color: 'var(--color-primary)',
              fontWeight: 800,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
              display: 'inline-block',
              marginBottom: '0.5rem',
            }}
          >
            Impact in Motion
          </span>
          <h1
            style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              marginTop: '0.4rem',
              fontWeight: 900,
              lineHeight: 1.15,
            }}
          >
            Project <span style={{ color: 'var(--color-primary)' }}>Visibility</span>
          </h1>
          <p
            style={{
              maxWidth: '650px',
              margin: '0.8rem auto 0',
              color: 'var(--color-text-light)',
              fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
              lineHeight: 1.6,
            }}
          >
            Direct visual dispatches from our youth tree planting drives, community clean-air marches, school eco-literacy workshops, and policy assemblies.
          </p>
        </div>

        {/* Controls Toolbar: Filters & View Switcher */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
            marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
          }}
        >
          {/* Mobile-Friendly Category Filters */}
          <div
            className="filter-scroll-container"
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: '0.6rem',
              overflowX: 'auto',
              width: '100%',
              maxWidth: '1100px',
              paddingInline: 'clamp(0.5rem, 2vw, 1rem)',
              paddingBlock: '0.5rem',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-x',
            }}
          >
            {categories.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleFilterChange(cat)}
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: '2rem',
                    fontSize: 'clamp(0.82rem, 2vw, 0.92rem)',
                    border: active ? '2px solid var(--color-primary)' : '1px solid #d1d5db',
                    backgroundColor: active ? 'var(--color-primary)' : '#ffffff',
                    color: active ? '#ffffff' : 'var(--color-text)',
                    fontWeight: 800,
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    minHeight: '42px',
                    minWidth: '55px',
                    boxShadow: active ? '0 2px 8px rgba(15, 76, 58, 0.3)' : '0 1px 2px rgba(0,0,0,0.04)',
                    flexShrink: 0,
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher in Reversed Order (Showing Count Text Removed) */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              maxWidth: '1100px',
              paddingTop: '0.5rem',
              borderTop: '1px solid #e5e7eb',
            }}
          >
            {/* View Mode Switcher Buttons */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '3px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
              role="radiogroup"
              aria-label="Gallery View Style"
            >
              {VIEW_STYLES.map((style) => {
                const Icon = style.icon;
                const isSelected = viewStyle === style.id;
                return (
                  <button
                    key={style.id}
                    onClick={() => setViewStyle(style.id)}
                    title={`${style.label} View`}
                    aria-checked={isSelected}
                    role="radio"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: isSelected ? 'var(--color-primary)' : 'transparent',
                      color: isSelected ? '#ffffff' : '#64748b',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      minHeight: '32px',
                    }}
                  >
                    <Icon size={15} />
                    <span className="view-mode-label">{style.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && photos.length === 0 ? (
          <LoadingSpinner message="Loading gallery photos..." />
        ) : visiblePhotos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#64748b' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>No photographs found in this category.</p>
            <button
              onClick={() => handleFilterChange('All')}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1.2rem',
                borderRadius: '2rem',
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Show All Categories
            </button>
          </div>
        ) : (
          <>
            {/* ====================================================
               1. FEED / EDITORIAL VIEW MODE (Default / First)
               ==================================================== */}
            {viewStyle === 'feed' && (
              <div
                style={{
                  maxWidth: '720px',
                  margin: '0 auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(1.5rem, 4vw, 2.5rem)',
                }}
              >
                {visiblePhotos.map((img) => (
                  <article
                    key={img.id}
                    onClick={() => openLightbox(img)}
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                    }}
                    className="feed-item"
                  >
                    <div style={{ position: 'relative', width: '100%', maxHeight: '480px', overflow: 'hidden' }}>
                      <img
                        src={img.image_url || img.src}
                        alt={img.title}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.src = '/hero-bg.jpg';
                        }}
                        style={{ width: '100%', height: 'auto', maxHeight: '480px', objectFit: 'cover', display: 'block' }}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFilterChange(img.category);
                        }}
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          backgroundColor: 'var(--color-primary)',
                          color: '#F4D35E',
                          padding: '0.3rem 0.8rem',
                          borderRadius: '2rem',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          border: 'none',
                          cursor: 'pointer',
                          zIndex: 2,
                          touchAction: 'manipulation',
                        }}
                        title={`Filter by ${img.category}`}
                      >
                        {img.category}
                      </button>
                    </div>
                    <div style={{ padding: 'clamp(1.2rem, 3vw, 1.8rem)' }}>
                      <h3 style={{ fontSize: 'clamp(1.15rem, 3vw, 1.4rem)', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                        {img.title}
                      </h3>
                      <p style={{ color: 'var(--color-text-light)', lineHeight: 1.6, fontSize: '0.95rem', margin: 0 }}>
                        {img.caption || img.description}
                      </p>
                      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '0.8rem' }}>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
                          {img.event_association || 'YCHA Field Action'}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 800 }}>
                          Inspect Full View <Maximize2 size={14} />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* ====================================================
               2. MASONRY VIEW MODE (Second)
               ==================================================== */}
            {viewStyle === 'masonry' && (
              <div className="gallery-masonry-layout">
                {visiblePhotos.map((img) => (
                  <div
                    key={img.id}
                    onClick={() => openLightbox(img)}
                    style={{
                      breakInside: 'avoid',
                      marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                      border: '1px solid #e2e8f0',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                    className="masonry-item"
                  >
                    <div style={{ position: 'relative', width: '100%' }}>
                      <img
                        src={img.image_url || img.src}
                        alt={img.title}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.src = '/hero-bg.jpg';
                        }}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFilterChange(img.category);
                        }}
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          backgroundColor: 'rgba(15, 76, 58, 0.95)',
                          color: '#F4D35E',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '1rem',
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          border: 'none',
                          cursor: 'pointer',
                          zIndex: 2,
                          touchAction: 'manipulation',
                        }}
                        title={`Filter by ${img.category}`}
                      >
                        {img.category}
                      </button>
                    </div>
                    <div style={{ padding: '1rem' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.3rem' }}>
                        {img.title}
                      </h4>
                      {img.caption && (
                        <p style={{ fontSize: '0.82rem', color: 'var(--color-text-light)', lineHeight: 1.5, margin: 0 }}>
                          {img.caption}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ====================================================
               3. GRID VIEW MODE (Third - Fully Visible, No Fade)
               ==================================================== */}
            {viewStyle === 'grid' && (
              <motion.div
                layout
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
                }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 'clamp(1rem, 3vw, 1.75rem)',
                }}
              >
                <AnimatePresence mode="popLayout">
                  {visiblePhotos.map((img) => (
                    <motion.div
                      layout
                      key={img.id}
                      variants={{
                        hidden: { opacity: 0, scale: 0.95 },
                        show: { opacity: 1, scale: 1 },
                      }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      style={{
                        position: 'relative',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                      onClick={() => openLightbox(img)}
                    >
                      {/* Photo Container - 100% visible, no bottom fade overlay */}
                      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                        <img
                          src={img.image_url || img.src}
                          alt={img.title}
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.src = '/hero-bg.jpg';
                          }}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFilterChange(img.category);
                          }}
                          style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            backgroundColor: 'rgba(15, 76, 58, 0.95)',
                            color: '#F4D35E',
                            padding: '0.28rem 0.7rem',
                            borderRadius: '2rem',
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            border: 'none',
                            cursor: 'pointer',
                            zIndex: 2,
                            touchAction: 'manipulation',
                          }}
                          title={`Filter by ${img.category}`}
                        >
                          {img.category}
                        </button>
                      </div>

                      {/* Photo Details Card Footer */}
                      <div style={{ padding: '0.95rem 1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <h4
                          style={{
                            color: 'var(--color-primary)',
                            margin: '0 0 0.4rem',
                            fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                            fontWeight: 800,
                            lineHeight: 1.3,
                          }}
                        >
                          {img.title}
                        </h4>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '0.4rem',
                            paddingTop: '0.5rem',
                            borderTop: '1px solid #f1f5f9',
                          }}
                        >
                          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                            {img.event_association || 'Field Dispatches'}
                          </span>
                          <Maximize2 size={14} color="var(--color-primary)" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ====================================================
               PROGRESSIVE PAGINATION / VIEW MORE CTA
               (Page 1: 5 images, Page 2: 10, Page 3: 15...)
               ==================================================== */}
            {hasMore && (
              <div
                style={{
                  textAlign: 'center',
                  marginTop: 'clamp(2.5rem, 6vw, 4rem)',
                  marginBottom: '1rem',
                }}
              >
                <button
                  type="button"
                  onClick={() => setPage((prev) => prev + 1)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.95rem 2.5rem',
                    backgroundColor: 'var(--color-primary)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '50px',
                    fontWeight: 800,
                    fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(15, 76, 58, 0.25)',
                    transition: 'all 0.25s ease',
                    minHeight: '48px',
                  }}
                  className="btn-view-more"
                >
                  <span>View More</span>
                  <span
                    style={{
                      backgroundColor: 'rgba(244, 211, 94, 0.25)',
                      color: '#F4D35E',
                      padding: '2px 9px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                    }}
                  >
                    +{Math.min(PAGE_BASE, filteredPhotos.length - displayedCount)}
                  </span>
                </button>
                <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                  Page {page} of {totalPages} • Showing {visiblePhotos.length} of {filteredPhotos.length}
                </div>
              </div>
            )}
          </>
        )}

        {/* ====================================================
           BOTTOM CTA SECTION: GOOGLE DRIVE "BROWSE MORE"
           ==================================================== */}
        <section
          style={{
            marginTop: 'clamp(3rem, 8vw, 5rem)',
            background: 'linear-gradient(135deg, #0F4C3A 0%, #175e48 100%)',
            borderRadius: '20px',
            padding: 'clamp(2rem, 6vw, 3.5rem) clamp(1.2rem, 5vw, 3rem)',
            color: '#ffffff',
            textAlign: 'center',
            boxShadow: '0 12px 35px rgba(15, 76, 58, 0.25)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle watermark */}
          <FolderArchive
            size={180}
            style={{
              position: 'absolute',
              right: '-30px',
              bottom: '-30px',
              opacity: 0.08,
              color: '#ffffff',
            }}
          />

          <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <span
              style={{
                backgroundColor: 'rgba(244, 211, 94, 0.18)',
                color: '#F4D35E',
                padding: '0.35rem 1rem',
                borderRadius: '2rem',
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                display: 'inline-block',
                marginBottom: '1rem',
              }}
            >
              Cloud Media Archive
            </span>

            <h2
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.75rem, 5vw, 2.6rem)',
                fontWeight: 900,
                lineHeight: 1.2,
                marginBottom: '1rem',
              }}
            >
              Explore Our Complete Photographic Archive
            </h2>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
                lineHeight: 1.65,
                opacity: 0.92,
                marginBottom: '2rem',
                maxWidth: '620px',
                marginInline: 'auto',
              }}
            >
              Access raw event albums, high-definition press photographs, full-resolution documentary files, and community outreach records directly on Google Drive.
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <a
                href={GOOGLE_DRIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.95rem 2.4rem',
                  backgroundColor: '#F4D35E',
                  color: '#0F4C3A',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  minHeight: '48px',
                  transition: 'all 0.25s ease',
                }}
              >
                <span>Browse More</span>
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Responsive and Layout Styles */}
      <style>{`
        /* Masonry Multi-Column CSS */
        .gallery-masonry-layout {
          column-count: 1;
          column-gap: 1.25rem;
        }
        @media (min-width: 580px) {
          .gallery-masonry-layout {
            column-count: 2;
          }
        }
        @media (min-width: 992px) {
          .gallery-masonry-layout {
            column-count: 3;
          }
        }

        .masonry-item:hover, .feed-item:hover {
          transform: translateY(-4px);
        }

        .btn-view-more:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }

        .filter-scroll-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0,0,0,0.97)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(0.75rem, 3vw, 1.5rem)',
            }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              style={{
                position: 'absolute',
                top: 'clamp(1rem, 3vw, 1.75rem)',
                right: 'clamp(1rem, 3vw, 1.75rem)',
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                zIndex: 20,
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={closeLightbox}
              aria-label="Close Lightbox"
            >
              <X size={26} />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              style={{
                position: 'absolute',
                left: 'clamp(0.5rem, 2vw, 1.5rem)',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.18)',
                border: 'none',
                color: '#ffffff',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                cursor: 'pointer',
                zIndex: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Previous Photo"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              style={{
                position: 'absolute',
                right: 'clamp(0.5rem, 2vw, 1.5rem)',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.18)',
                border: 'none',
                color: '#ffffff',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                cursor: 'pointer',
                zIndex: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Next Photo"
            >
              <ChevronRight size={28} />
            </button>

            {/* Main Content */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '960px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingInline: 'clamp(0.5rem, 2vw, 2rem)',
              }}
            >
              <img
                src={selectedImg.image_url || selectedImg.src}
                alt={selectedImg.title}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  maxHeight: '68vh',
                  objectFit: 'contain',
                }}
              />
              <div
                style={{
                  color: '#ffffff',
                  marginTop: '1.2rem',
                  textAlign: 'center',
                  maxWidth: '720px',
                  width: '100%',
                }}
              >
                <span
                  style={{
                    color: 'var(--color-accent)',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                  }}
                >
                  {selectedImg.category}
                </span>
                <h3
                  style={{
                    fontSize: 'clamp(1.25rem, 4vw, 1.9rem)',
                    marginTop: '0.4rem',
                    color: '#ffffff',
                    fontWeight: 800,
                  }}
                >
                  {selectedImg.title}
                </h3>
                {(selectedImg.caption || selectedImg.description) && (
                  <p
                    style={{
                      opacity: 0.85,
                      marginTop: '0.6rem',
                      lineHeight: 1.6,
                      fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                    }}
                  >
                    {selectedImg.caption || selectedImg.description}
                  </p>
                )}
                <div
                  style={{
                    marginTop: '1.2rem',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                  }}
                >
                  <a
                    href={GOOGLE_DRIVE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--color-accent)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    <span>Open in Google Drive</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
