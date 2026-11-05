'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ORG } from '../../config/constants';
import { ROUTES } from '../../config/routes';
import { supabase, isSupabaseConfigured } from '../../config/supabase';
import { Facebook, Instagram, Twitter, Linkedin, MapPin } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'info' | 'success'; text: string } | null>(null);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    if (!isSupabaseConfigured) {
      setMessage({
        type: 'info',
        text: 'Newsletter subscription service is being configured. Please check back soon.',
      });
      return;
    }

    setSubmitting(true);
    setMessage(null);
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email: email.trim().toLowerCase() }]);

      if (error) {
        if (error.code === '23505') {
          setMessage({ type: 'info', text: 'You are already subscribed to updates!' });
        } else {
          throw error;
        }
      } else {
        setMessage({ type: 'success', text: 'Thank you for subscribing to YCHA updates!' });
        setEmail('');
      }
    } catch {
      setMessage({ type: 'error', text: 'Subscription failed. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer style={{
      backgroundColor: '#0F4C3A',
      color: 'white',
      padding: 'clamp(3rem, 8vw, 5rem) 0 2rem',
      borderTop: '4px solid #F4D35E',
      marginTop: 'auto',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
          gap: 'clamp(2rem, 4vw, 3rem)',
          marginBottom: '3rem',
        }}>
          {/* Col 1: About with Logo */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
              <img
                src="/logo.jpeg"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/favicon.svg';
                }}
                alt={ORG.name}
                loading="lazy"
                decoding="async"
                width={50}
                height={50}
                style={{
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #F4D35E',
                  flexShrink: 0,
                }}
              />
              <div>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#F4D35E',
                  display: 'block',
                  lineHeight: 1.1,
                }}>
                  Young Heroes
                </span>
                <span style={{
                  color: 'white',
                  opacity: 0.9,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}>
                  Climate Advocates
                </span>
              </div>
            </div>
            <p style={{ opacity: 0.8, lineHeight: 1.6, fontSize: '0.95rem' }}>
              A youth-led movement dedicated to environmental conservation, reforestation,
              and climate advocacy across Kenya and Africa.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ marginBottom: '1.5rem', color: 'white', fontWeight: 700 }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                { name: 'Home', href: ROUTES.HOME },
                { name: 'About Us', href: ROUTES.ABOUT },
                { name: 'Programs', href: ROUTES.PROGRAMS },
                { name: 'Our Mission', href: ROUTES.MISSION },
                { name: 'Gallery', href: ROUTES.GALLERY },
                { name: 'Join Now', href: ROUTES.JOIN },
              ].map((link, i) => (
                <li key={i} style={{ marginBottom: '0.8rem' }}>
                  <Link
                    href={link.href}
                    style={{
                      color: 'white',
                      opacity: 0.7,
                      textDecoration: 'none',
                      transition: 'opacity 0.2s',
                    }}
                    onMouseOver={(e: any) => (e.target.style.opacity = '1')}
                    onMouseOut={(e: any) => (e.target.style.opacity = '0.7')}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Connect With Us */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontWeight: 700 }}>Connect With Us</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '1.2rem', opacity: 0.9, display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <MapPin size={20} color="#F4D35E" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem' }}>Regional Youth Hub, <br />Kitengela, Kajiado County, Kenya</span>
              </li>
            </ul>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1.2rem' }}>
              <a href="#" style={{ background: 'white', padding: '0.6rem', borderRadius: '50%', display: 'flex', transition: 'transform 0.2s' }} onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')} onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')} aria-label="Facebook">
                <Facebook size={20} color="#1877F2" fill="#1877F2" />
              </a>
              <a href="#" style={{ background: 'white', padding: '0.6rem', borderRadius: '50%', display: 'flex', transition: 'transform 0.2s' }} onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')} onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')} aria-label="Instagram">
                <Instagram size={20} color="#E4405F" />
              </a>
              <a href="#" style={{ background: 'white', padding: '0.6rem', borderRadius: '50%', display: 'flex', transition: 'transform 0.2s' }} onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')} onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')} aria-label="Twitter">
                <Twitter size={20} color="#1DA1F2" fill="#1DA1F2" />
              </a>
              <a href="#" style={{ background: 'white', padding: '0.6rem', borderRadius: '50%', display: 'flex', transition: 'transform 0.2s' }} onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')} onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')} aria-label="LinkedIn">
                <Linkedin size={20} color="#0077B5" fill="#0077B5" />
              </a>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '1.5rem', fontWeight: 700 }}>Stay Updated</h4>
            <p style={{ opacity: 0.8, lineHeight: 1.6, fontSize: '0.9rem', marginBottom: '1rem' }}>
              Subscribe to get frontline dispatches, workshop dates, and environmental action alerts.
            </p>
            <form onSubmit={handleNewsletter} style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: '1 1 180px',
                    padding: '0.65rem 1rem',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '4px',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    fontSize: '0.9rem',
                    minHeight: '44px',
                    boxSizing: 'border-box',
                  }}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: '#F4D35E',
                    color: '#0F4C3A',
                    border: 'none',
                    padding: '0.65rem 1.4rem',
                    borderRadius: '4px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    minHeight: '44px',
                  }}
                >
                  {submitting ? '...' : 'Subscribe'}
                </button>
              </div>
              {message && (
                <p style={{
                  marginTop: '0.5rem',
                  fontSize: '0.8rem',
                  color: message.type === 'error' ? '#ff6b6b' : message.type === 'success' ? '#69db7c' : '#F4D35E',
                }}>
                  {message.text}
                </p>
              )}
            </form>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '2rem',
          textAlign: 'center',
          opacity: 0.5,
          fontSize: '0.85rem',
        }}>
          &copy; {new Date().getFullYear()} Young Heroes Climate Advocates. <br className="mobile-only" />
          Empowering Youth for a Greener Africa.
        </div>
      </div>
    </footer>
  );
}

