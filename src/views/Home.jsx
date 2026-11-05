'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Users,
  Shield,
  Award,
  Calendar,
  MapPin,
  ArrowRight,
  Star,
  Maximize2,
  X,
  Trees,
  Sparkles,
  GraduationCap,
  Sprout,
  Megaphone,
  Quote,
} from 'lucide-react';
import { ROUTES } from '../config/routes';
import { ORG } from '../config/constants';
import { useGallery, INITIAL_FALLBACK_ITEMS, sanitizeItem } from '../hooks/useGallery';

export default function Home() {
  const { fetchFeaturedGallery } = useGallery();
  const [featuredPhotos, setFeaturedPhotos] = useState(() =>
    INITIAL_FALLBACK_ITEMS.filter((i) => i.is_featured).map(sanitizeItem)
  );
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    fetchFeaturedGallery().then(setFeaturedPhotos);
  }, [fetchFeaturedGallery]);

  // Lock scroll & handle Esc key when photo is opened
  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setSelectedPhoto(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedPhoto]);

  const upcomingEvents = [
    {
      date: 'Jan 28',
      month: '2026',
      title: 'Nairobi Reforestation Workshop',
      location: 'Karura Forest, Nairobi',
      type: 'Field Action',
      color: '#0F4C3A',
    },
    {
      date: 'Feb 12',
      month: '2026',
      title: 'Youth Policy Summit',
      location: 'Kenyatta ICC',
      type: 'Advocacy',
      color: '#2E86AB',
    },
    {
      date: 'Mar 05',
      month: '2026',
      title: 'Eco-Literacy School Tour',
      location: 'Mombasa County',
      type: 'Education',
      color: '#F4D35E',
    },
  ];

  // 8 Verified Voices of Impact Testimonials
  const testimonials = [
    {
      quote: "YHCA gave me the tools to turn my concern into a community forest. We've planted 500 trees in our village.",
      author: 'Sarah M.',
      role: 'Climate Hero · Reforestation',
    },
    {
      quote: 'I never thought my voice mattered until I was part of the YHCA Policy Lab. Now I advocate for change locally.',
      author: 'David O.',
      role: 'Youth Advocate · Policy Lab',
    },
    {
      quote: 'Our school eco-club started with 15 students and now has over 200 members protecting local water catchment basins.',
      author: 'Amina K.',
      role: 'Eco-Literacy Coordinator · Mombasa',
    },
    {
      quote: 'Marching through Nairobi with the Clean Air youth banner proved that our collective breath is a political priority.',
      author: 'Brian N.',
      role: 'Clean Air Champion · Nairobi',
    },
    {
      quote: 'Restoring degraded mangrove shorelines showed me that practical conservation creates immediate coastal protection.',
      author: 'Faith W.',
      role: 'Coastal Volunteer · Kilifi',
    },
    {
      quote: 'We diverted over 4 tons of organic community waste into productive neighborhood composting pits this year.',
      author: 'Kevin T.',
      role: 'Circularity Lead · Urban Hub',
    },
    {
      quote: 'Planting indigenous seed varieties taught us that biodiversity is our best defense against extreme drought cycles.',
      author: 'Mercy J.',
      role: 'Indigenous Tree Steward · Kajiado',
    },
    {
      quote: 'Representing frontline youth at the national climate roundtable gave grassroots communities a direct seat at the table.',
      author: 'Samuel L.',
      role: 'Youth Climate Delegate · UNEA',
    },
  ];

  const sdgItems = [
    'Goal 4: Quality Education',
    'Goal 13: Climate Action',
    'Goal 15: Life on Land',
    'Goal 17: Partnerships',
  ];

  return (
    <div className="home-page" style={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <header
        className="hero"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.38) 0%, rgba(0, 0, 0, 0.58) 100%), url('/hero-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          marginTop: '0',
          padding: '2rem 1rem',
        }}
      >
        <div className="container" style={{ maxWidth: '900px', width: '100%' }}>
          <div style={{ opacity: 1 }}>
            <span
              style={{
                textTransform: 'uppercase',
                letterSpacing: 'clamp(2px, 1vw, 4px)',
                fontSize: 'clamp(0.72rem, 2vw, 0.9rem)',
                fontWeight: 800,
                color: 'var(--color-accent)',
                display: 'block',
                marginBottom: '0.8rem',
              }}
            >
              Join the Movement
            </span>

            <h1
              style={{
                fontSize: 'clamp(1.85rem, 6.5vw, 4.2rem)',
                marginBottom: '1.2rem',
                color: '#ffffff',
                textShadow: '0 4px 15px rgba(0,0,0,0.5)',
                lineHeight: 1.15,
                fontWeight: 900,
                overflowWrap: 'break-word',
                wordBreak: 'break-word',
              }}
            >
              Protecting Our <span style={{ color: 'var(--color-accent)' }}>Planet</span> <br className="desktop-only" /> Today for a Greener <span style={{ color: 'var(--color-accent)' }}>Tomorrow</span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)',
                marginBottom: '2.5rem',
                fontWeight: '500',
                opacity: 0.95,
                maxWidth: '750px',
                margin: '0 auto 2.5rem',
                lineHeight: 1.6,
                color: '#ffffff',
              }}
            >
              Young Heroes Climate Advocates is empowering African youth to lead reforestation, policy change, and environmental education.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                justifyContent: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
                maxWidth: '520px',
                margin: '0 auto',
              }}
            >
              <div style={{ flex: '1 1 200px', minWidth: '160px' }}>
                <Link
                  href={ROUTES.JOIN}
                  className="btn btn-primary"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-primary)',
                    fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
                    padding: '0.85rem 1.2rem',
                    width: '100%',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                    fontWeight: 800,
                    display: 'block',
                    textDecoration: 'none',
                    textAlign: 'center',
                  }}
                >
                  Become a Hero
                </Link>
              </div>
              <div style={{ flex: '1 1 200px', minWidth: '160px' }}>
                <Link
                  href={ROUTES.ABOUT}
                  className="btn"
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid white',
                    color: 'white',
                    fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
                    padding: '0.85rem 1.2rem',
                    width: '100%',
                    fontWeight: 600,
                    display: 'block',
                    textDecoration: 'none',
                    textAlign: 'center',
                  }}
                >
                  Our Story
                </Link>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .hero { min-height: 90vh !important; }
          }
        `}</style>
      </header>

      {/* SDG Alignment Ribbon - Static Label + Marquee Goals */}
      <section
        style={{
          backgroundColor: '#111',
          color: 'white',
          borderTop: '4px solid var(--color-accent)',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          minHeight: 'clamp(40px, 7vw, 48px)',
          padding: '0.35rem 0',
        }}
      >
        {/* Static Left Label (Original Cloned Styling) */}
        <div
          style={{
            flexShrink: 0,
            backgroundColor: '#111',
            padding: '0.45rem clamp(0.5rem, 2vw, 1.2rem)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            borderRight: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '8px 0 14px rgba(0,0,0,0.6)',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(0.68rem, 2vw, 0.82rem)',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: 'clamp(1px, 0.5vw, 2px)',
              opacity: 0.75,
              color: 'white',
            }}
          >
            Committed to SDGs:
          </span>
        </div>

        {/* Marquee Goals Track (Original Cloned Styling) */}
        <div
          className="sdg-marquee-container"
          style={{
            flex: 1,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className="sdg-marquee-track">
            {[...sdgItems, ...sdgItems, ...sdgItems, ...sdgItems].map((sdg, i) => (
              <span key={i} className="sdg-marquee-item">
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(0.78rem, 2vw, 0.9rem)',
                    fontWeight: 700,
                    color: 'var(--color-accent)',
                    marginInline: 'clamp(0.6rem, 2vw, 1.6rem)',
                  }}
                >
                  {sdg}
                </span>
                <span style={{ color: 'rgba(244, 211, 94, 0.4)', marginInline: '0.4rem' }}>•</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Act Section */}
      <section
        className="section"
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '850px' }}>
          <h2
            style={{ fontSize: 'clamp(1.85rem, 5vw, 3rem)', marginBottom: '1.2rem', fontWeight: 900 }}
          >
            Why We Act
          </h2>
          <p
            style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', color: 'var(--color-text-light)', marginBottom: '2rem', lineHeight: 1.7 }}
          >
            Climate change is the defining crisis of our time, disproportionately affecting communities across Africa.
            We organize the energy of the youth into decentralized, high-impact regional actions that drive tangible change.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: 'clamp(1.2rem, 3vw, 2rem)',
              textAlign: 'left',
              marginTop: '2.5rem',
            }}
          >
            {[
              {
                icon: GraduationCap,
                title: 'Awareness',
                text: 'Building climate literacy among 5,000+ students to foster a generation of sustainability-first thinkers.',
              },
              {
                icon: Sprout,
                title: 'Action',
                text: '12,000+ indigenous trees planted and counting. Local action with a global impact footprint.',
              },
              {
                icon: Megaphone,
                title: 'Advocacy',
                text: 'Representing regional youth interests at policy summits to ensure high-level decisions reflect our future.',
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="card"
                  style={{
                    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                    borderRadius: 'var(--radius-lg)',
                    background: '#f8fafc',
                    transition: 'all 0.3s ease',
                    border: '1px solid #f1f5f9',
                  }}
                >
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(15, 76, 58, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.2rem',
                    }}
                  >
                    <Icon size={26} color="var(--color-primary)" />
                  </div>
                  <h3 style={{ color: 'var(--color-secondary)', marginBottom: '0.8rem', fontWeight: 800 }}>{item.title}</h3>
                  <p style={{ color: 'var(--color-text-light)', lineHeight: 1.6 }}>{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Field Showcase (Label changed to "Impact") */}
      <section className="section" style={{ backgroundColor: '#fcfdfc', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem',
                color: 'var(--color-primary)',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '2.5px',
                backgroundColor: 'rgba(15, 76, 58, 0.08)',
                padding: '0.35rem 1rem',
                borderRadius: '2rem',
                marginBottom: '0.8rem',
              }}
            >
              <Star size={15} fill="var(--color-accent)" color="var(--color-accent)" /> Impact
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, lineHeight: 1.2 }}>
              Highlights from <span style={{ color: 'var(--color-primary)' }}>the Ground</span>
            </h2>
            <p style={{ color: 'var(--color-text-light)', marginTop: '0.6rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Curated visual records of youth leadership, clean air campaigns, and tree stewardship.
            </p>
          </div>

          {featuredPhotos.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {featuredPhotos.slice(0, 6).map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View photo: ${photo.title}`}
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  className="featured-photo-card"
                >
                  {/* Photo Container - 100% visible, completely unfaded */}
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                    <img
                      src={photo.image_url || photo.src}
                      alt={photo.title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = '/hero-bg.jpg';
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <Link
                      href={`/gallery?category=${encodeURIComponent(photo.category)}`}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        backgroundColor: 'rgba(15, 76, 58, 0.95)',
                        color: '#F4D35E',
                        padding: '0.28rem 0.75rem',
                        borderRadius: '2rem',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        textDecoration: 'none',
                        zIndex: 2,
                        touchAction: 'manipulation',
                      }}
                      title={`View ${photo.category} in Gallery`}
                    >
                      {photo.category}
                    </Link>
                  </div>

                  {/* Photo Details Footer - Clean, no fade wash over photo */}
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
                      {photo.title}
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
                        {photo.event_association || 'Field Dispatches'}
                      </span>
                      <Maximize2 size={14} color="var(--color-primary)" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#f8fafc', borderRadius: '16px' }}>
              <p style={{ color: 'var(--color-text-light)' }}>Featured field photos will appear here.</p>
            </div>
          )}

          {/* Bottom CTA for Gallery on Home */}
          <div
            style={{
              marginTop: '3rem',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Link
              href={ROUTES.GALLERY}
              className="btn btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.85rem clamp(1.6rem, 4vw, 2.4rem)',
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(15, 76, 58, 0.2)',
                transition: 'all 0.25s ease',
                touchAction: 'manipulation',
              }}
            >
              Explore Full Gallery <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="section" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <span style={{ color: 'var(--color-primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>
                Get Involved
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginTop: '0.5rem', fontWeight: 900 }}>
                Upcoming <span style={{ color: 'var(--color-primary)' }}>Actions</span>
              </h2>
            </div>
            <Link
              href={ROUTES.EVENTS}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: 800, textDecoration: 'none' }}
            >
              View All Events <ArrowRight size={20} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(1rem, 3vw, 2rem)' }}>
            {upcomingEvents.map((event, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 'clamp(1rem, 3vw, 1.5rem)',
                  padding: 'clamp(1.2rem, 3vw, 2rem)',
                  backgroundColor: '#fcfdfc',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid #f1f5f9',
                  position: 'relative',
                  overflow: 'hidden',
                  opacity: 1,
                }}
              >
                <div style={{ textAlign: 'center', color: event.color, flexShrink: 0 }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, lineHeight: 1 }}>{event.date.split(' ')[1]}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase' }}>{event.date.split(' ')[0]}</div>
                </div>

                <div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: event.color, background: `${event.color}15`, padding: '0.3rem 0.8rem', borderRadius: '2rem', marginBottom: '0.8rem', display: 'inline-block' }}>
                    {event.type}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.8rem', fontWeight: 800 }}>{event.title}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--color-text-light)', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar size={14} /> {event.month}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MapPin size={14} /> {event.location}
                    </div>
                  </div>
                </div>

                <div style={{ position: 'absolute', bottom: '0', left: '0', height: '4px', width: '100%', backgroundColor: event.color, opacity: 0.3 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voices of Impact - 8 Cards 30s Continuous Marquee Scroll */}
      <section className="section" style={{ backgroundColor: '#f3f4f6', overflow: 'hidden' }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ color: 'var(--color-primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>
            Grassroots Testimonials
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginTop: '0.4rem' }}>
            Voices of <span style={{ color: 'var(--color-primary)' }}>Impact</span>
          </h2>
          <p style={{ color: 'var(--color-text-light)', marginTop: '0.5rem', fontSize: '1.05rem' }}>
            Direct reflections from youth heroes leading tree planting, policy roundtables, and eco-literacy across Africa.
          </p>
        </div>

        {/* 30s Marquee Track */}
        <div className="testimonials-marquee-wrapper">
          <div className="testimonials-marquee-track">
            {[...testimonials, ...testimonials].map((story, i) => (
              <div
                key={i}
                className="testimonial-card"
                style={{
                  width: '340px',
                  minWidth: '340px',
                  backgroundColor: '#ffffff',
                  padding: '2.2rem 2rem',
                  borderRadius: '16px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                  border: '1px solid #e5e7eb',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  marginRight: '1.5rem',
                  flexShrink: 0,
                }}
              >
                <div style={{ marginBottom: '0.8rem' }}>
                  <Quote size={28} color="#0F4C3A" style={{ fill: '#0F4C3A' }} />
                </div>
                <p
                  style={{
                    fontSize: '1.05rem',
                    fontStyle: 'italic',
                    marginBottom: '1.5rem',
                    lineHeight: 1.6,
                    color: '#2D3142',
                  }}
                >
                  {story.quote}
                </p>
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                  <h4 style={{ margin: '0 0 2px', fontWeight: 800, color: 'var(--color-primary)', fontSize: '1rem' }}>
                    {story.author}
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {story.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Funder or Partner Section (Using Gallery Photo Background) */}
      <section
        className="section"
        style={{
          position: 'relative',
          backgroundImage: `linear-gradient(rgba(10, 38, 25, 0.72), rgba(10, 38, 25, 0.80)), url('/gallery/WhatsApp%20Image%202026-01-14%20at%201.02.45%20AM.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#0F4C3A',
          color: '#ffffff',
          overflow: 'hidden',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '3.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{ flex: 1.5, minWidth: 'min(100%, 300px)' }}>
            <span
              style={{
                backgroundColor: 'rgba(244, 211, 94, 0.2)',
                color: 'var(--color-accent)',
                padding: '0.35rem 1rem',
                borderRadius: '2rem',
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                display: 'inline-block',
                marginBottom: '1rem',
              }}
            >
              Institutional Alliance
            </span>
            <h2 style={{ color: 'white', marginBottom: '1.2rem', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, lineHeight: 1.15 }}>
              Become a Funder or Partner
            </h2>
            <p style={{ marginBottom: '2.5rem', fontSize: '1.15rem', lineHeight: 1.7, opacity: 0.92, maxWidth: '620px' }}>
              We are looking for institutional partners and visionary donors who believe in scaling youth-led solutions.
              Join our ecosystem and co-create a sustainable, regenerative future for Africa.
            </p>
            <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={ROUTES.DONATE}
                  className="btn"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-primary)',
                    border: 'none',
                    padding: '1rem 2.4rem',
                    fontWeight: 800,
                    fontSize: '1rem',
                    display: 'inline-block',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                  }}
                >
                  Support Our Mission
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={ROUTES.JOIN}
                  className="btn"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'white',
                    border: '2px solid white',
                    padding: '1rem 2.4rem',
                    fontWeight: 800,
                    fontSize: '1rem',
                    display: 'inline-block',
                    borderRadius: '8px',
                    textDecoration: 'none',
                  }}
                >
                  Partner With Us
                </Link>
              </motion.div>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 'min(100%, 280px)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1.2rem' }}>
              {[
                { icon: Shield, label: 'Accountable' },
                { icon: Globe, label: 'Scalable' },
                { icon: Users, label: 'Youth-Led' },
                { icon: Award, label: 'Impact-First' },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(8px)',
                    padding: '1.8rem 1rem',
                    borderRadius: 'var(--radius-lg)',
                    textAlign: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    transition: 'transform 0.2s',
                  }}
                >
                  <item.icon color="var(--color-accent)" size={32} style={{ marginBottom: '0.8rem' }} />
                  <p style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'white', margin: 0 }}>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Animations Style */}
      <style>{`
        /* SDG Marquee */
        .sdg-marquee-container {
          display: flex;
          overflow: hidden;
          width: 100%;
          user-select: none;
        }
        .sdg-marquee-track {
          display: flex;
          align-items: center;
          white-space: nowrap;
          animation: sdgScroll 28s linear infinite;
        }
        .sdg-marquee-item {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
        }
        @keyframes sdgScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Testimonials 30s Marquee */
        .testimonials-marquee-wrapper {
          display: flex;
          overflow: hidden;
          width: 100%;
          padding: 0.5rem 0 1rem;
          user-select: none;
        }
        .testimonials-marquee-track {
          display: flex;
          animation: testimonialScroll 30s linear infinite;
        }
        .testimonials-marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes testimonialScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width: 600px) {
          .testimonial-card {
            width: clamp(260px, 80vw, 290px) !important;
            min-width: clamp(260px, 80vw, 290px) !important;
            padding: 1.5rem 1.2rem !important;
          }
        }
      `}</style>

      {/* Lightbox for Home Featured Photo */}
      <AnimatePresence>
        {selectedPhoto && (
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
              background: 'rgba(0,0,0,0.98)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer', zIndex: 10 }}
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '1000px', width: '100%', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <img
                src={selectedPhoto.image_url || selectedPhoto.src}
                alt={selectedPhoto.title}
                style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-sm)', maxHeight: '72vh', objectFit: 'contain' }}
              />
              <div style={{ color: 'white', marginTop: '1.5rem', textAlign: 'center', maxWidth: '700px' }}>
                <span style={{ color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, fontSize: '0.8rem' }}>
                  {selectedPhoto.category}
                </span>
                <h3 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', marginTop: '0.5rem', color: 'white' }}>{selectedPhoto.title}</h3>
                {(selectedPhoto.caption || selectedPhoto.description) && (
                  <p style={{ opacity: 0.85, marginTop: '0.8rem', lineHeight: 1.6, fontSize: '1rem' }}>
                    {selectedPhoto.caption || selectedPhoto.description}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
