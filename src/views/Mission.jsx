'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Eye, Check, ArrowRight, HeartHandshake, Sparkles } from 'lucide-react';
import { ROUTES } from '../config/routes';

export default function Mission() {
  return (
    <div className="container" style={{ paddingBlock: 'var(--space-12)' }}>
      <header className="page-header" style={{ marginBottom: 'var(--space-12)', textAlign: 'center' }}>
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
          Mandate & Direction
        </span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 3.8rem)', fontWeight: 900, lineHeight: 1.15 }}>
          Mission &amp; <span style={{ color: 'var(--color-primary)' }}>Vision</span>
        </h1>
        <p style={{ maxWidth: '650px', margin: '0.8rem auto 0', color: 'var(--color-text-light)', fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', lineHeight: 1.6 }}>
          Our strategic mandate for equipping African youth with the tools, leadership, and knowledge to lead transformative climate action.
        </p>
      </header>

      {/* Mission & Vision Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          marginBottom: 'clamp(3rem, 6vw, 5rem)',
        }}
      >
        {/* Mission Card */}
        <div
          style={{
            padding: 'clamp(1.8rem, 4vw, 2.8rem)',
            backgroundColor: 'var(--color-primary-50)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-primary-100)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Compass size={40} color="var(--color-primary-600)" style={{ marginBottom: 'var(--space-4)' }} />
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--color-primary-900)', marginBottom: 'var(--space-4)', fontWeight: 800 }}>
            Our Mission
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 'var(--leading-relaxed)', color: 'var(--color-primary-800)', margin: 0 }}>
            To mobilize, educate, and equip young people with the leadership skills, scientific knowledge,
            and practical tools required to lead transformative climate resilience actions in vulnerable communities.
          </p>
        </div>

        {/* Vision Card */}
        <div
          style={{
            padding: 'clamp(1.8rem, 4vw, 2.8rem)',
            backgroundColor: 'var(--color-secondary-50)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-secondary-100)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Eye size={40} color="var(--color-secondary-600)" style={{ marginBottom: 'var(--space-4)' }} />
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--color-secondary-900)', marginBottom: 'var(--space-4)', fontWeight: 800 }}>
            Our Vision
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 'var(--leading-relaxed)', color: 'var(--color-secondary-800)', margin: 0 }}>
            A regenerative, ecologically resilient future shaped by empowered, informed youth whose collective actions safeguard the planet for generations to come.
          </p>
        </div>
      </div>

      {/* Strategic Pillars */}
      <section style={{ maxWidth: '850px', marginInline: 'auto', marginBottom: 'clamp(4rem, 8vw, 6rem)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-8)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900 }}>
          Strategic Pillars
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {[
            {
              title: 'Practical Ecological Education',
              desc: 'Translating climate theory into accessible field learning experiences that spark direct community solutions.',
            },
            {
              title: 'Frontline Community Leadership',
              desc: 'Fostering decentralized youth chapters that identify and resolve hyper-local environmental threats.',
            },
            {
              title: 'Evidence & Policy Advocacy',
              desc: 'Training youth advocates to engage constructively with regional stakeholders and civic institutions.',
            },
            {
              title: 'Transparent Collaboration',
              desc: 'Working openly with grassroots allies, educators, and community elders to protect natural commons.',
            },
          ].map((pillar, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 'var(--space-4)',
                padding: 'clamp(1rem, 3vw, 1.5rem)',
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                alignItems: 'flex-start',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                style={{
                  backgroundColor: 'var(--color-primary-100)',
                  color: 'var(--color-primary-700)',
                  padding: '8px',
                  borderRadius: 'var(--radius-full)',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                <Check size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '4px' }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)', margin: 0 }}>
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          padding: 'clamp(2.5rem, 6vw, 4.5rem) clamp(1.5rem, 4vw, 3rem)',
          borderRadius: 'var(--radius-xl)',
          textAlign: 'center',
          maxWidth: '850px',
          marginInline: 'auto',
          boxShadow: '0 10px 30px rgba(15, 76, 58, 0.25)',
        }}
      >
        <Sparkles size={36} color="var(--color-accent)" style={{ margin: '0 auto 1rem' }} />
        <h2 style={{ color: 'white', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 900, marginBottom: '1rem' }}>
          Be Part of Our Mission
        </h2>
        <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1.1rem', opacity: 0.95, lineHeight: 1.6 }}>
          Join hands with passionate young leaders across Kenya. Whether you want to volunteer, host a local workshop, or fund a conservation initiative, your participation matters.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href={ROUTES.JOIN}
            className="btn btn-primary"
            style={{
              padding: '0.85rem 2rem',
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-primary)',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              border: 'none',
            }}
          >
            Become a Hero <ArrowRight size={18} />
          </Link>
          <Link
            href={ROUTES.DONATE}
            className="btn"
            style={{
              padding: '0.85rem 2rem',
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid white',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
            }}
          >
            <HeartHandshake size={18} /> Support Us
          </Link>
        </div>
      </section>
    </div>
  );
}
