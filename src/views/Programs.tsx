'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Users, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { ROUTES } from '../config/routes';

interface ProgramItem {
  id: string;
  icon: any;
  badge: string;
  badgeColor: string;
  title: string;
  tagline: string;
  description: string;
  targetAudience: string;
  outcomes: string[];
  note: string;
}

export default function Programs() {
  const programsList: ProgramItem[] = [
    {
      id: 'workshops',
      icon: BookOpen,
      badge: 'Education & Literacy',
      badgeColor: '#0F4C3A',
      title: 'Climate Literacy & Science Workshops',
      tagline: 'Bridging classroom theory with frontline ecological realities',
      description: 'Hands-on training series conducted in regional secondary schools and community hubs covering the core fundamentals of climate dynamics, local biodiversity loss, and actionable waste reduction.',
      targetAudience: 'Secondary and tertiary students aged 14–24',
      outcomes: [
        'Enhanced scientific literacy on regional climate impacts',
        'Student-led school conservation and tree stewardship clubs',
        'Practical household energy and waste audit techniques',
      ],
      note: 'Curriculum modules updated in collaboration with environmental educators.',
    },
    {
      id: 'restoration',
      icon: Users,
      badge: 'Frontline Conservation',
      badgeColor: '#175e48',
      title: 'Community Ecosystem Restoration Drives',
      tagline: 'Direct, measurable field interventions with long-term survival tracking',
      description: 'Mobilizing organized youth cohorts for direct ecological restoration: indigenous tree seedling planting, urban green corridor expansion, and clean-up campaigns across public common areas.',
      targetAudience: 'Community youth, neighborhood associations, and active volunteers',
      outcomes: [
        'Local public park and riverbank greening',
        'Post-planting stewardship, watering cycles, and tree survival tracking',
        'Neighborhood organic waste composting and circularity networks',
      ],
      note: 'All field operations follow indigenous reforestation guidelines.',
    },
    {
      id: 'leadership',
      icon: Compass,
      badge: 'Advocacy & Policy',
      badgeColor: '#2E86AB',
      title: 'Youth Climate Advocates Fellowship',
      tagline: 'Equipping emerging leaders for policy engagement and community mobilization',
      description: 'An intensive leadership track focused on public communication, non-partisan environmental advocacy, community survey techniques, and project management for sustainable development.',
      targetAudience: 'Emerging advocates, student leaders, and community organizers',
      outcomes: [
        'Public speaking and media representation training',
        'Direct representation in regional stakeholder forums & UNEA events',
        'Grassroots mobilization and civic campaign toolkits',
      ],
      note: 'Cohort sizes are intentionally curated for high-impact mentorship.',
    },
  ];

  return (
    <div style={{ backgroundColor: '#fcfdfc', minHeight: '100vh', paddingBlock: 'clamp(2rem, 5vw, 4rem)' }}>
      <div className="container" style={{ paddingInline: 'clamp(1rem, 3vw, 2rem)' }}>
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}>
          <span
            style={{
              backgroundColor: 'rgba(15, 76, 58, 0.08)',
              color: 'var(--color-primary)',
              padding: '0.35rem 1rem',
              borderRadius: '2rem',
              fontSize: '0.85rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              display: 'inline-block',
              marginBottom: '0.8rem',
            }}
          >
            Core Action Tracks
          </span>
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 6vw, 3.8rem)',
              color: 'var(--color-primary)',
              fontWeight: 900,
              lineHeight: 1.15,
            }}
          >
            Our <span style={{ color: 'var(--color-primary)' }}>Programs</span>
          </h1>
          <p
            style={{
              maxWidth: '680px',
              margin: '0.8rem auto 0',
              color: 'var(--color-text-light)',
              fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
              lineHeight: 1.6,
            }}
          >
            Evidence-based, youth-led initiatives designed to foster active stewardship, community resilience, and practical conservation skills across Kenya.
          </p>
        </header>

        {/* Programs Listing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem, 5vw, 3.5rem)', maxWidth: '960px', marginInline: 'auto' }}>
          {programsList.map((prog) => {
            const Icon = prog.icon;
            return (
              <article
                key={prog.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '18px',
                  border: '1px solid #e2e8f0',
                  padding: 'clamp(1.5rem, 4vw, 2.8rem)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Accent line on top of each card */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', backgroundColor: prog.badgeColor }} />

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
                  <div
                    style={{
                      backgroundColor: 'rgba(15, 76, 58, 0.1)',
                      color: 'var(--color-primary)',
                      padding: '0.9rem',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={30} />
                  </div>
                  <div style={{ flex: 1, minWidth: 'min(100%, 260px)' }}>
                    <span
                      style={{
                        backgroundColor: `${prog.badgeColor}15`,
                        color: prog.badgeColor,
                        padding: '0.25rem 0.75rem',
                        borderRadius: '2rem',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        display: 'inline-block',
                        marginBottom: '0.4rem',
                      }}
                    >
                      {prog.badge}
                    </span>
                    <h2 style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)', fontWeight: 800, color: 'var(--color-primary)', margin: '0 0 0.3rem' }}>
                      {prog.title}
                    </h2>
                    <p style={{ color: '#0F4C3A', fontSize: '0.95rem', fontWeight: 700, margin: 0, opacity: 0.85 }}>
                      {prog.tagline}
                    </p>
                  </div>
                </div>

                <p style={{ color: '#334155', lineHeight: 1.7, fontSize: '1.05rem', marginBottom: '1.8rem' }}>
                  {prog.description}
                </p>

                {/* Sub details boxes */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '1.8rem' }}>
                  <div style={{ backgroundColor: '#f8fafc', padding: '1.2rem', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                    <h3 style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800 }}>
                      Target Participants
                    </h3>
                    <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>
                      {prog.targetAudience}
                    </p>
                  </div>

                  <div style={{ backgroundColor: '#f8fafc', padding: '1.2rem', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                    <h3 style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800 }}>
                      Key Focus Outcomes
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {prog.outcomes.map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#334155', lineHeight: 1.4 }}>
                          <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0 }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card footer CTA */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.2rem' }}>
                  <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 500 }}>
                    {prog.note}
                  </span>
                  <Link
                    href={ROUTES.JOIN}
                    className="btn btn-primary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.65rem 1.6rem',
                      backgroundColor: 'var(--color-primary)',
                      color: '#ffffff',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                    }}
                  >
                    <span>Apply to Participate</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA to Partner or Join - Site Logo replaces AI Sparkle */}
        <div
          style={{
            marginTop: 'clamp(3rem, 6vw, 5rem)',
            textAlign: 'center',
            backgroundColor: '#ffffff',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            borderRadius: '16px',
            border: '2px dashed #cbd5e1',
            maxWidth: '800px',
            marginInline: 'auto',
          }}
        >
          <img
            src="/logo.jpeg"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/favicon.svg';
            }}
            alt="YCHA Logo"
            width={64}
            height={64}
            style={{
              margin: '0 auto 1.2rem',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--color-primary)',
              boxShadow: '0 4px 12px rgba(15, 76, 58, 0.15)',
              display: 'block',
            }}
          />
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.8rem' }}>
            Want to Host a Workshop in Your Community?
          </h2>
          <p style={{ color: 'var(--color-text-light)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '580px', margin: '0 auto 2rem' }}>
            We collaborate with schools, community associations, and regional hubs to bring climate literacy and tree stewardship toolkits to local youth.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href={ROUTES.CONTACT}
              className="btn btn-primary"
              style={{
                padding: '0.85rem 2rem',
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                borderRadius: '8px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Contact Our Organizing Team
            </Link>
            <Link
              href={ROUTES.JOIN}
              className="btn btn-secondary"
              style={{
                padding: '0.85rem 2rem',
                border: '2px solid var(--color-primary)',
                color: 'var(--color-primary)',
                borderRadius: '8px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Volunteer as a Mentor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

