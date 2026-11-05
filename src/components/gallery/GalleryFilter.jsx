import React from 'react';
import { GALLERY_CATEGORIES } from '../../config/constants';

export default function GalleryFilter({ activeCategory, onSelectCategory }) {
  return (
    <div
      role="tablist"
      aria-label="Gallery categories"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--space-2)',
        justifyContent: 'center',
        marginBlock: 'var(--space-6)',
      }}
    >
      {GALLERY_CATEGORIES.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectCategory(category)}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-full)',
              border: '1px solid',
              borderColor: isActive ? 'var(--color-primary-500)' : 'var(--color-border)',
              backgroundColor: isActive ? 'var(--color-primary-500)' : 'var(--color-surface)',
              color: isActive ? '#ffffff' : 'var(--color-text-secondary)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

