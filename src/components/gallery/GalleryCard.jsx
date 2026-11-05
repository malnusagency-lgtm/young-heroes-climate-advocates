import React from 'react';
import StatusBadge from '../ui/StatusBadge';

export default function GalleryCard({ item, onClick }) {
  return (
    <div
      tabIndex={0}
      role="button"
      onClick={() => onClick(item)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(item);
        }
      }}
      aria-label={`View photo: ${item.title}`}
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        cursor: 'pointer',
        transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '220px', backgroundColor: 'var(--color-neutral-100)' }}>
        <img
          src={item.image_url}
          alt={item.alt_text || item.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {item.category && (
          <span
            style={{
              position: 'absolute',
              top: 'var(--space-2)',
              left: 'var(--space-2)',
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              color: '#ffffff',
              padding: '0.2rem 0.6rem',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-xs)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {item.category}
          </span>
        )}
      </div>
      <div style={{ padding: 'var(--space-4)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-1)' }}>
          {item.title}
        </h3>
        {item.caption && (
          <p style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--leading-relaxed)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {item.caption}
          </p>
        )}
      </div>
    </div>
  );
}

