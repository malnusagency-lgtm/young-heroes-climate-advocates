import React from 'react';
import GalleryCard from './GalleryCard';

export default function GalleryGrid({ items, onItemClick }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 'var(--space-6)',
        marginBlock: 'var(--space-6)',
      }}
    >
      {items.map((item) => (
        <GalleryCard key={item.id} item={item} onClick={onItemClick} />
      ))}
    </div>
  );
}

