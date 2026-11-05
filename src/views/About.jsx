'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Target, Eye, Sparkles, Compass, Milestone, Users2 } from 'lucide-react';
import { ROUTES } from '../config/routes';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 1 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  const journey = [
    { year: '2023', title: 'The Spark', desc: 'Founded by 5 passionate students in Nairobi with a single goal: reforestation.' },
    { year: '2024', title: 'Scaling Up', desc: 'Partnered with 10 regional schools to launch the Eco-Literacy Network.' },
    { year: '2025', title: 'Regional Impact', desc: 'Expanded to 3 neighboring regions, planting 12,000+ indigenous trees.' },
    { year: '2026', title: 'Policy Voices', desc: 'Launched the Youth Policy Lab to influence national climate strategy.' },
  ];

  return (
    <motion.div
      className="about-page"
      style={{ paddingTop: 'clamp(20px, 5vh, 40px)', backgroundColor: '#fdfdfd' }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container" style={{ padding: 'clamp(2rem, 5vw, 6rem) 1rem' }}>

        {/* Hero Header */}
        <motion.div style={{ textAlign: 'center', marginBottom: 'clamp(4rem, 12vw, 8rem)' }} variants={itemVariants}>
          <motion.span style={{ color: 'var(--color-primary)', fontWeight: 800, letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.9rem', display: 'block', marginBottom: '1rem' }}>
            Our Story
          </motion.span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 10vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1 }}>
            Advocating for <br />
            <span style={{ color: 'var(--color-primary)' }}>Nature&apos;s Future</span>
          </h1>
        </motion.div>

        {/* Mission & Vision Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: 'clamp(6rem, 15vw, 10rem)',
        }}>
          <motion.div
            variants={itemVariants}
            style={{ background: 'var(--color-primary)', color: 'white', padding: '3rem', borderRadius: 'var(--radius-lg)', position: 'relative', overflow: 'hidden' }}
          >
            <Target size={120} style={{ position: 'absolute', right: '-20px', top: '-20px', opacity: 0.1 }} />
            <h2 style={{ color: 'var(--color-accent)', marginBottom: '1.5rem', fontSize: '2rem' }}>Our Mission</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, opacity: 0.95 }}>
              To empower African youth through climate literacy, decentralized conservation actions, and high-level policy advocacy,
              ensuring the next generation leads the global environmental movement.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            style={{ background: 'white', border: '2px solid #f1f5f9', padding: '3rem', borderRadius: 'var(--radius-lg)', position: 'relative', overflow: 'hidden' }}
          >
            <Eye size={120} style={{ position: 'absolute', right: '-20px', top: '-20px', opacity: 0.05, color: 'var(--color-primary)' }} />
            <h2 style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', fontSize: '2rem' }}>Our Vision</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text-light)' }}>
              A sustainable and resilient Africa where every young person is an environmental steward, supported by
              equitable policy framework and local-led conservation initiatives.
            </p>
          </motion.div>
        </div>

        {/* The Split Section: Image + Values */}
        <div style={{
          display: 'flex',
          gap: 'clamp(2.5rem, 6vw, 5rem)',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: 'clamp(4rem, 12vw, 8rem)',
        }}>
          <motion.div
            style={{ flex: 1, minWidth: 'min(100%, 280px)' }}
            variants={itemVariants}
          >
            <div style={{ position: 'relative', display: 'inline-block', width: '100%', paddingRight: 'clamp(10px, 3vw, 30px)', paddingBottom: 'clamp(10px, 3vw, 30px)' }}>
              <img
                src="/hero-bg.jpg"
                onError={(e) => {
                  e.currentTarget.src = '/api/assets/hero-bg.jpg';
                }}
                alt="YHCA Action"
                loading="lazy"
                decoding="async"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  width: '100%',
                  maxHeight: '450px',
                  objectFit: 'cover',
                  boxShadow: 'clamp(12px, 3vw, 32px) clamp(12px, 3vw, 32px) 0 var(--color-accent)',
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '0px',
                right: '0px',
                background: 'white',
                padding: 'clamp(0.8rem, 2.5vw, 1.4rem)',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
              }}>
                <Users2 color="var(--color-primary)" size={28} />
                <div>
                  <h4 style={{ margin: 0, fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'var(--color-primary)', fontWeight: 800 }}>5,000+</h4>
                  <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7, color: '#2D3142' }}>Active Youth Heroes</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ flex: 1, minWidth: 'min(100%, 280px)' }} variants={itemVariants}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Our Core Pillars</h2>
            <div style={{ display: 'grid', gap: '2rem' }}>
              {[
                { icon: Sparkles, title: 'Youth Empowerment', desc: 'Training young leaders to handle the climate challenges of tomorrow.' },
                { icon: Compass, title: 'Field Action', desc: 'Measurable reforestation and water solution projects across Kenya.' },
                { icon: Milestone, title: 'Policy Advocacy', desc: 'Connecting grassroots voices with national and global policy tables.' },
              ].map((pill, p) => (
                <div key={p} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ background: '#f1fdf4', padding: '0.8rem', borderRadius: '12px', flexShrink: 0 }}>
                    <pill.icon size={24} color="var(--color-primary)" />
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '0.5rem', fontSize: '1.2rem', color: 'var(--color-primary)' }}>{pill.title}</h4>
                    <p style={{ color: 'var(--color-text-light)', lineHeight: 1.6 }}>{pill.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Journey Timeline */}
        <div style={{ marginTop: '8rem', textAlign: 'center' }}>
          <motion.h2 variants={itemVariants} style={{ fontSize: '2.5rem', marginBottom: '4rem' }}>
            The Journey Since Day One
          </motion.h2>
          <div className="timeline-container" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
            position: 'relative',
            paddingTop: '2rem',
          }}>
            <div className="timeline-line desktop-only" style={{ position: 'absolute', top: '0px', left: '0', width: '100%', height: '4px', background: '#f1f5f9', zIndex: -1 }}></div>
            {journey.map((step, s) => (
              <motion.div
                key={s}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                style={{
                  background: 'white',
                  padding: '2.5rem 1.5rem',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                  border: '1px solid #f1f5f9',
                }}
              >
                <span style={{ color: 'var(--color-primary)', fontWeight: 900, fontSize: '1.5rem', display: 'block', marginBottom: '1rem' }}>{step.year}</span>
                <h4 style={{ marginBottom: '0.8rem', fontSize: '1.1rem', color: '#2D3142' }}>{step.title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', lineHeight: 1.5 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leadership / Call to Action Overlay */}
        <motion.div
          variants={itemVariants}
          style={{
            marginTop: 'clamp(6rem, 15vw, 12rem)',
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)',
            color: 'white',
            padding: 'clamp(3rem, 10vw, 6rem) 2rem',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
          }}
        >
          <h2 style={{ color: 'white', fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '1.5rem', fontWeight: 900 }}>
            Join the Movement
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.2rem', opacity: 0.9 }}>
            We are building a future where young hands protect the green heart of Africa.
            Whether as a partner, donor, or volunteer, your advocacy matters.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href={ROUTES.JOIN}
              className="btn btn-primary"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-primary)',
                border: 'none',
                padding: '1rem 3rem',
                fontWeight: 800,
              }}
            >
              Become a Hero
            </Link>
            <Link
              href={ROUTES.DONATE}
              className="btn"
              style={{
                border: '2px solid white',
                color: 'white',
                padding: '1rem 3rem',
                fontWeight: 700,
              }}
            >
              Support Us
            </Link>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
