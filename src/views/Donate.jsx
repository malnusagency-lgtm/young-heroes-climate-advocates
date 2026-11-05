'use client';

import React from 'react';
import { ORG } from '../config/constants';
import { HeartHandshake, Mail, Sparkles, Sprout, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { ROUTES } from '../config/routes';

export default function Donate() {
  return (
    <div className="container" style={{ paddingBlock: 'var(--space-12)' }}>
      <header className="page-header" style={{ marginBottom: 'var(--space-8)', textAlign: 'center' }}>
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
          Partner With Us
        </span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 3.8rem)', fontWeight: 900, lineHeight: 1.15 }}>
          Support <span style={{ color: 'var(--color-primary)' }}>Youth Climate Action</span>
        </h1>
        <p style={{ maxWidth: '650px', margin: '0.8rem auto 0', color: 'var(--color-text-light)', fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', lineHeight: 1.6 }}>
          Fuel grassroots youth mobilization, native sapling planting, and school ecology workshops across Kenya.
        </p>
      </header>

      <div style={{ maxWidth: '720px', marginInline: 'auto' }}>
        {/* Partnership & In-Kind Support Card */}
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(1.5rem, 5vw, 2.5rem)',
            marginBottom: 'var(--space-8)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
            <div style={{ padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-primary-100)', color: 'var(--color-primary-600)' }}>
              <HeartHandshake size={28} />
            </div>
            <div>
              <h2 style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)', fontWeight: 800, margin: 0 }}>Direct Partnership &amp; Community Support</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: '4px 0 0' }}>
                Empowering grassroots youth conservation in Kenya
              </p>
            </div>
          </div>

          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-6)' }}>
            We welcome direct institutional partnerships, conservation equipment donations (seedling bags, shovels, gloves, watering cans), and educational materials for youth climate workshops.
          </p>

          <div style={{ backgroundColor: 'var(--color-bg-alt)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', marginBottom: 'var(--space-6)' }}>
            <div><strong>Executive Director:</strong> {ORG.founder}</div>
            <div style={{ marginTop: '6px', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
              <strong>Regional Base:</strong> {ORG.address}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <Button href={ROUTES.CONTACT} variant="primary" size="md">
              <Mail size={16} /> Contact Us Directly to Support
            </Button>
            <Button href={ROUTES.PROGRAMS} variant="outline" size="md">
              See How Funds Are Used
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
