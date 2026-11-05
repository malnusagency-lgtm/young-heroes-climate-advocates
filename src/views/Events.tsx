'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar as CalendarIcon, MapPin, Clock, ChevronRight, Info, AlertCircle } from 'lucide-react';
import { ROUTES } from '../config/routes';
import { useEvents } from '../hooks/useEvents';
import { EventItem } from '../types';

export default function Events() {
  const { fetchAllEvents } = useEvents();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchAllEvents().then(setEvents);
  }, [fetchAllEvents]);

  const filteredEvents = events.filter((ev) => filter === 'All' || ev.type === filter);

  return (
    <div
      style={{ paddingTop: 'clamp(20px, 5vh, 40px)', minHeight: '100vh', backgroundColor: '#fcfdfc' }}
    >
      <div className="container" style={{ padding: '0 1rem 6rem' }}>

        {/* Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span
            style={{ color: '#0F4C3A', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem' }}
          >
            Save the Date
          </span>
          <h1
            style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 900, marginTop: '1rem' }}
          >
            Our Action <span style={{ color: '#0F4C3A' }}>Calendar</span>
          </h1>
        </div>

        {/* Filter Toggles */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginBottom: 'clamp(2rem, 5vw, 4rem)',
          }}
        >
          <div
            className="filter-scroll-container"
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              gap: '0.6rem',
              overflowX: 'auto',
              paddingInline: 'clamp(1rem, 3vw, 1.5rem)',
              paddingBottom: '0.5rem',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch',
              maxWidth: '100%',
            }}
          >
            {['All', 'Field Action', 'Advocacy', 'Education'].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                style={{
                  padding: '0.6rem 1.4rem',
                  borderRadius: '8px',
                  border: filter === f ? '2px solid #0F4C3A' : '1px solid #e2e8f0',
                  background: filter === f ? 'rgba(15, 76, 58, 0.08)' : 'white',
                  color: filter === f ? '#0F4C3A' : '#4F5D75',
                  cursor: 'pointer',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  transition: 'all 0.25s',
                  whiteSpace: 'nowrap',
                  minHeight: '40px',
                  flexShrink: 0,
                  touchAction: 'manipulation',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Events Listing */}
        <div style={{ display: 'grid', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="event-card"
              style={{
                backgroundColor: 'white',
                padding: 'clamp(1.5rem, 5vw, 3rem)',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                borderLeft: `6px solid ${ev.color}`,
                display: 'flex',
                gap: 'clamp(1.5rem, 5vw, 4rem)',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              {/* Date Box */}
              <div className="mobile-center" style={{ textAlign: 'center', minWidth: '80px', width: '100%', flex: '0 0 auto' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#64748b' }}>{ev.month}</div>
                <div style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1, color: '#2D3142' }}>{ev.date}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: '0.5rem', opacity: 0.6 }}>{ev.year}</div>
              </div>

              {/* Content */}
              <div className="mobile-center" style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', justifyContent: 'inherit' }}>
                  <span style={{
                    background: `${ev.color}15`,
                    color: ev.color,
                    padding: '0.4rem 1rem',
                    borderRadius: '2rem',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                  }}>
                    {ev.type}
                  </span>
                </div>
                <h3 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.6rem)', fontWeight: 800, marginBottom: '1.2rem' }}>{ev.title}</h3>
                <p style={{ color: '#4F5D75', marginBottom: '2rem', lineHeight: 1.6, fontSize: '1.05rem' }}>{ev.desc}</p>

                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'inherit' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#4F5D75' }}>
                    <MapPin size={16} color="#0F4C3A" /> {ev.location}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#4F5D75' }}>
                    <Clock size={16} color="#0F4C3A" /> {ev.time}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div style={{ textAlign: 'right', width: '100%', marginTop: '1rem' }} className="mobile-center">
                <Link
                  href={ROUTES.JOIN}
                  className="btn btn-primary"
                  style={{
                    padding: '0.8rem 2rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    margin: '0 0 0 auto',
                    backgroundColor: '#0F4C3A',
                    color: 'white',
                    borderRadius: '8px',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  Register / Details <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 768px) {
            .event-card {
              flex-direction: column !important;
              text-align: center;
              border-left: none !important;
              border-top: 6px solid;
              border-top-color: inherit;
            }
            .event-card > div {
              width: 100% !important;
              text-align: center !important;
            }
            .event-card button, .event-card a {
              margin: 0 auto !important;
            }
          }
          @media (min-width: 769px) {
            .event-card > div:first-child {
              width: 80px !important;
            }
            .event-card > div:last-child {
              width: auto !important;
            }
          }
        `}</style>

        {filteredEvents.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', background: '#f8fafc', borderRadius: '16px' }}>
            <AlertCircle size={48} color="#94a3b8" style={{ marginBottom: '1rem' }} />
            <h3>No events found in this category.</h3>
            <button onClick={() => setFilter('All')} style={{ background: 'none', border: 'none', color: '#0F4C3A', fontWeight: 800, cursor: 'pointer', marginTop: '1rem' }}>Show All Events</button>
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      <div
        style={{
          margin: '0 1rem 6rem',
          background: '#0F4C3A',
          padding: '3rem',
          borderRadius: '16px',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          maxWidth: '1200px',
          marginInline: 'auto',
        }}
      >
        <Info style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.1 }} size={160} />
        <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>Organize in Your Local Area</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1.1rem', opacity: 0.9 }}>
          Don&apos;t see an event near you? Learn how to start a regional youth chapter or propose a local action.
        </p>
        <Link href={ROUTES.PROGRAMS} className="btn" style={{
          padding: '1rem 3rem',
          backgroundColor: 'transparent',
          border: '2px solid #0F4C3A',
          color: '#0F4C3A',
          borderRadius: '8px',
          fontWeight: 700,
          background: '#F4D35E',
          borderColor: '#F4D35E',
        }}>
          Partner Toolkit
        </Link>
      </div>
    </div>
  );
}

