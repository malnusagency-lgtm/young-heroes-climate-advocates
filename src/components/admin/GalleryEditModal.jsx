'use client';

import React, { useState } from 'react';
import { useGallery } from '../../hooks/useGallery';
import { GALLERY_CATEGORIES } from '../../config/constants';
import FormField from '../forms/FormField';
import Button from '../ui/Button';
import { X, AlertCircle, Star } from 'lucide-react';

export default function GalleryEditModal({ item, isOpen, onClose, onSuccess }) {
  const { updateGalleryItem } = useGallery();
  const [title, setTitle] = useState(item?.title || '');
  const [caption, setCaption] = useState(item?.caption || '');
  const [altText, setAltText] = useState(item?.alt_text || '');
  const [category, setCategory] = useState(item?.category || GALLERY_CATEGORIES[1]);
  const [eventAssociation, setEventAssociation] = useState(item?.event_association || '');
  const [isPublished, setIsPublished] = useState(item?.is_published ?? true);
  const [isFeatured, setIsFeatured] = useState(item?.is_featured ?? false);
  const [sortOrder, setSortOrder] = useState(item?.sort_order ?? 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !item) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !altText) {
      setError('Title and descriptive Alt Text are mandatory.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await updateGalleryItem(item.id, {
        title,
        caption,
        alt_text: altText,
        category,
        event_association: eventAssociation,
        is_published: isPublished,
        is_featured: isFeatured,
        sort_order: parseInt(sortOrder, 10) || 0,
      });

      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update gallery record.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Edit Gallery Item"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 'var(--z-modal)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '650px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: 'var(--space-8)',
          boxShadow: 'var(--shadow-xl)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 'var(--space-4)', right: 'var(--space-4)', background: 'transparent', border: 'none', cursor: 'pointer' }}
          aria-label="Close edit dialog"
        >
          <X size={22} />
        </button>

        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)' }}>Edit Gallery Record</h2>

        {error && (
          <div style={{ display: 'flex', gap: '8px', padding: 'var(--space-3)', backgroundColor: '#fdf2f2', border: '1px solid #f5c6cb', color: '#721c24', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <div style={{ marginBottom: 'var(--space-4)', textAlign: 'center', backgroundColor: '#000', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          <img src={item.image_url} alt="" style={{ maxHeight: '180px', objectFit: 'contain', marginInline: 'auto' }} />
        </div>

        <form onSubmit={handleSubmit}>
          <FormField
            label="Photo Title"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <FormField
            label="Alt Text (Required for Accessibility)"
            name="altText"
            required
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <FormField
              label="Category"
              name="category"
              type="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={GALLERY_CATEGORIES.filter((c) => c !== 'All').map((c) => ({ value: c, label: c }))}
            />

            <FormField
              label="Display Sort Priority"
              name="sortOrder"
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            />
          </div>

          <FormField
            label="Event or Project Association"
            name="eventAssociation"
            value={eventAssociation}
            onChange={(e) => setEventAssociation(e.target.value)}
          />

          <FormField
            label="Caption / Context Note"
            name="caption"
            type="textarea"
            rows={2}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer', fontSize: 'var(--text-sm)' }}>
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                style={{ accentColor: 'var(--color-primary-500)' }}
              />
              <span>Published on public site</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer', fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--color-secondary-800)' }}>
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                style={{ accentColor: 'var(--color-secondary-500)' }}
              />
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={16} fill="currentColor" /> Feature on Home Page Showcase
              </span>
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
            <Button variant="ghost" size="md" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" loading={loading}>
              Save Modifications
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
