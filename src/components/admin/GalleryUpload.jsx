'use client';

import React, { useState } from 'react';
import { useGallery } from '../../hooks/useGallery';
import { GALLERY_CATEGORIES, UPLOAD_CONFIG } from '../../config/constants';
import FormField from '../forms/FormField';
import Button from '../ui/Button';
import { UploadCloud, Link as LinkIcon, X, AlertCircle, Star, Sparkles, Check, Wand2 } from 'lucide-react';

export default function GalleryUpload({ isOpen, onClose, onSuccess }) {
  const { uploadGalleryImage, createGalleryItem } = useGallery();
  const [sourceType, setSourceType] = useState('upload'); // 'upload' | 'url'
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [externalUrl, setExternalUrl] = useState('');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [altText, setAltText] = useState('');
  const [category, setCategory] = useState(GALLERY_CATEGORIES[1]);
  const [eventAssociation, setEventAssociation] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [isFeatured, setIsFeatured] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiPolishing, setAiPolishing] = useState(false);
  const [aiStatus, setAiStatus] = useState(null);

  const handleAiPolish = async () => {
    if (!caption && !title) {
      setError('Please provide at least a Title or draft Caption first so the AI assistant can polish it.');
      return;
    }
    setError(null);
    setAiPolishing(true);
    setAiStatus(null);
    try {
      const res = await fetch('/api/ai/polish-caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption, title, category }),
      });
      const data = await res.json();
      if (data.polished) {
        setCaption(data.polished);
        if (!altText) {
          setAltText(`Photograph depicting ${title || 'youth climate advocates'}: ${data.polished.slice(0, 90)}`);
        }
        setAiStatus(data.provider ? `Polished by ${data.provider}` : 'Polished successfully!');
        setTimeout(() => setAiStatus(null), 4000);
      } else {
        setError(data.error || 'Could not polish caption.');
      }
    } catch (err) {
      setError('Failed to connect to AI assistant: ' + err.message);
    } finally {
      setAiPolishing(false);
    }
  };

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!UPLOAD_CONFIG.allowedTypes.includes(selected.type)) {
      setError(`Invalid format. Allowed: ${UPLOAD_CONFIG.allowedTypes.join(', ')}`);
      return;
    }

    if (selected.size > UPLOAD_CONFIG.maxSizeBytes) {
      setError('File exceeds the 5MB maximum limit.');
      return;
    }

    setError(null);
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const handleExternalUrlChange = (e) => {
    const url = e.target.value;
    setExternalUrl(url);
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sourceType === 'upload' && !file) {
      setError('Please select an authentic photograph file to upload.');
      return;
    }
    if (sourceType === 'url' && !externalUrl) {
      setError('Please provide a valid direct image URL.');
      return;
    }
    if (!title || !altText) {
      setError('Title and descriptive Alt Text are mandatory.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      let filePath = null;
      let finalImageUrl = null;

      if (sourceType === 'upload') {
        const uploadResult = await uploadGalleryImage(file);
        filePath = uploadResult.filePath;
        finalImageUrl = uploadResult.publicUrl;
      } else {
        filePath = `external/${Date.now()}`;
        finalImageUrl = externalUrl;
      }

      await createGalleryItem({
        image_path: filePath,
        image_url: finalImageUrl,
        title,
        caption,
        alt_text: altText,
        category,
        event_association: eventAssociation,
        is_published: isPublished,
        is_featured: isFeatured,
        original_filename: file?.name || 'external-link',
        file_size_bytes: file?.size || null,
      });

      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Image upload failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Upload Gallery Photograph"
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
          maxWidth: '680px',
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
          aria-label="Close upload dialog"
        >
          <X size={22} />
        </button>

        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)' }}>Add Field Photograph</h2>

        {/* Source Mode Toggle */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
          <button
            type="button"
            onClick={() => setSourceType('upload')}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid',
              borderColor: sourceType === 'upload' ? 'var(--color-primary-500)' : 'var(--color-border)',
              backgroundColor: sourceType === 'upload' ? 'var(--color-primary-50)' : '#ffffff',
              color: sourceType === 'upload' ? 'var(--color-primary-800)' : 'var(--color-text-secondary)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <UploadCloud size={16} />
            <span>Upload Photo from Device</span>
          </button>

          <button
            type="button"
            onClick={() => setSourceType('url')}
            style={{
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid',
              borderColor: sourceType === 'url' ? 'var(--color-primary-500)' : 'var(--color-border)',
              backgroundColor: sourceType === 'url' ? 'var(--color-primary-50)' : '#ffffff',
              color: sourceType === 'url' ? 'var(--color-primary-800)' : 'var(--color-text-secondary)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <LinkIcon size={16} />
            <span>Direct Image / Cloud Link</span>
          </button>
        </div>

        {error && (
          <div style={{ display: 'flex', gap: '8px', padding: 'var(--space-3)', backgroundColor: '#fdf2f2', border: '1px solid #f5c6cb', color: '#721c24', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {sourceType === 'upload' ? (
            /* File Picker Zone */
            <div
              style={{
                border: '2px dashed var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-6)',
                textAlign: 'center',
                backgroundColor: 'var(--color-bg-alt)',
                marginBottom: 'var(--space-6)',
                cursor: 'pointer',
              }}
              onClick={() => document.getElementById('gallery-file-input').click()}
            >
              <input
                id="gallery-file-input"
                type="file"
                accept={UPLOAD_CONFIG.allowedTypes.join(',')}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              {previewUrl && file ? (
                <div>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{ maxHeight: '180px', marginInline: 'auto', borderRadius: 'var(--radius-md)', objectFit: 'contain' }}
                  />
                  <p style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                    Selected: {file.name} ({Math.round(file.size / 1024)} KB) — Click to replace
                  </p>
                </div>
              ) : (
                <div>
                  <UploadCloud size={38} color="var(--color-primary-500)" style={{ marginInline: 'auto', marginBottom: 'var(--space-2)' }} />
                  <p style={{ fontWeight: '500', fontSize: 'var(--text-sm)' }}>Click to select field photograph</p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    JPEG, PNG, WebP up to 5MB
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* External URL Input */
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <FormField
                label="Direct Image or Google Hosted URL"
                name="externalUrl"
                type="url"
                required
                value={externalUrl}
                onChange={handleExternalUrlChange}
                placeholder="https://example.com/photos/field-event.jpg"
                helpText="Paste a publicly accessible image URL or shared cloud photo link"
              />
              {previewUrl && (
                <div style={{ textAlign: 'center', padding: 'var(--space-3)', backgroundColor: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)' }}>
                  <img
                    src={previewUrl}
                    alt="External Preview"
                    onError={() => setError('Could not preview image from this URL. Verify the link is publicly accessible.')}
                    style={{ maxHeight: '160px', marginInline: 'auto', borderRadius: 'var(--radius-md)', objectFit: 'contain' }}
                  />
                </div>
              )}
            </div>
          )}

          <FormField
            label="Photo Title"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Student sapling planting drive in Kiambu"
          />

          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-1)' }}>
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)' }}>
                Caption & Context
              </label>
              <button
                type="button"
                onClick={handleAiPolish}
                disabled={aiPolishing}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 10px',
                  backgroundColor: aiPolishing ? '#f3f4f6' : 'rgba(15, 76, 58, 0.08)',
                  color: 'var(--color-primary-700)',
                  border: '1px solid rgba(15, 76, 58, 0.2)',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: aiPolishing ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                }}
                title="Polish caption into inspiring environmental tone using AI"
              >
                <Sparkles size={13} color="var(--color-primary)" />
                {aiPolishing ? 'Polishing...' : 'AI Polish Caption'}
              </button>
            </div>
            {aiStatus && (
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-primary-800)',
                  backgroundColor: 'rgba(15, 76, 58, 0.1)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  marginBottom: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: 600,
                }}
              >
                <Check size={12} /> {aiStatus}
              </div>
            )}
            <textarea
              name="caption"
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Describe who is in the photo, location, and the environmental impact."
              style={{
                width: '100%',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                fontFamily: 'inherit',
                fontSize: 'var(--text-sm)',
                marginBottom: 'var(--space-4)',
              }}
            />
          </div>

          <FormField
            label="Accessibility Alt Text"
            name="altText"
            required
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="e.g. Young volunteers watering newly planted indigenous saplings in prepared soil"
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            <FormField
              label="Category"
              name="category"
              type="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={GALLERY_CATEGORIES.filter((c) => c !== 'All')}
            />

            <FormField
              label="Event / Campaign Association"
              name="eventAssociation"
              value={eventAssociation}
              onChange={(e) => setEventAssociation(e.target.value)}
              placeholder="e.g. National Tree Growing Day 2026"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBlock: 'var(--space-4)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer', fontSize: 'var(--text-sm)' }}>
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
              />
              <span>Publish immediately to public gallery</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer', fontSize: 'var(--text-sm)', color: 'var(--color-primary-800)', fontWeight: 'var(--font-weight-medium)' }}>
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
              />
              <Star size={16} fill={isFeatured ? 'currentColor' : 'none'} color="#c17817" />
              <span>Feature on Home Page showcase</span>
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
            <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Adding Photo...' : 'Add to Gallery'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
