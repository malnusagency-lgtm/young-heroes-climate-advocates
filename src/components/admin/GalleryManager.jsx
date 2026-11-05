'use client';

import React, { useEffect, useState } from 'react';
import { useGallery } from '../../hooks/useGallery';
import { GALLERY_CATEGORIES } from '../../config/constants';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from '../ui/EmptyState';
import StatusBadge from '../ui/StatusBadge';
import Button from '../ui/Button';
import GalleryUpload from './GalleryUpload';
import GalleryEditModal from './GalleryEditModal';
import { Image, Plus, Trash2, Edit2, Eye, EyeOff, Search, Star } from 'lucide-react';

export default function GalleryManager() {
  const { fetchAllGallery, updateGalleryItem, toggleFeatured, deleteGalleryItem, loading } = useGallery();
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');
  const [featuredFilter, setFeaturedFilter] = useState('all');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadItems = () => {
    fetchAllGallery().then(setItems);
  };

  useEffect(() => {
    loadItems();
  }, [fetchAllGallery]);

  const handleTogglePublish = async (item) => {
    try {
      await updateGalleryItem(item.id, { is_published: !item.is_published });
      loadItems();
    } catch (err) {
      alert(`Toggle failed: ${err.message}`);
    }
  };

  const handleToggleFeatured = async (item) => {
    try {
      await toggleFeatured(item.id, Boolean(item.is_featured));
      loadItems();
    } catch (err) {
      alert(`Featured toggle failed: ${err.message}`);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Are you certain you wish to permanently delete "${item.title}"?`)) {
      return;
    }
    setDeletingId(item.id);
    try {
      await deleteGalleryItem(item.id, item.image_path);
      loadItems();
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.caption && item.caption.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'published' && item.is_published) ||
      (statusFilter === 'draft' && !item.is_published);
    const matchesFeatured =
      featuredFilter === 'all' ||
      (featuredFilter === 'featured' && item.is_featured) ||
      (featuredFilter === 'not_featured' && !item.is_featured);

    return matchesSearch && matchesCategory && matchesStatus && matchesFeatured;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: '4px' }}>Gallery & Home Showcase Manager</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
            Curate field photography and select which images are featured on the Home Page Showcase.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={() => setIsUploadOpen(true)}>
          <Plus size={16} /> Add Photograph
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            placeholder="Search by photo title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: 'var(--space-2) var(--space-3) var(--space-2) 36px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              fontSize: 'var(--text-sm)',
            }}
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', fontSize: 'var(--text-sm)' }}
        >
          {GALLERY_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              Category: {c}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', fontSize: 'var(--text-sm)' }}
        >
          <option value="all">Status: All</option>
          <option value="published">Published Only</option>
          <option value="draft">Drafts Only</option>
        </select>

        <select
          value={featuredFilter}
          onChange={(e) => setFeaturedFilter(e.target.value)}
          style={{ padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', fontSize: 'var(--text-sm)', fontWeight: '500' }}
        >
          <option value="all">Showcase: All Items</option>
          <option value="featured">★ Featured on Home Page</option>
          <option value="not_featured">Regular Gallery Only</option>
        </select>
      </div>

      {loading && items.length === 0 ? (
        <LoadingSpinner message="Loading gallery items..." />
      ) : filteredItems.length > 0 ? (
        <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 'var(--text-sm)' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-bg-alt)', borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ padding: 'var(--space-3) var(--space-4)', width: '70px' }}>Image</th>
                <th style={{ padding: 'var(--space-3) var(--space-4)' }}>Title & Context</th>
                <th style={{ padding: 'var(--space-3) var(--space-4)' }}>Category</th>
                <th style={{ padding: 'var(--space-3) var(--space-4)' }}>Status</th>
                <th style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'center' }}>Home Showcase</th>
                <th style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                  <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                    <img
                      src={item.image_url}
                      alt=""
                      style={{ width: '52px', height: '52px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                    />
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                    <div style={{ fontWeight: '600', color: 'var(--color-text)' }}>{item.title}</div>
                    {item.event_association && (
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                        {item.event_association}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                      {item.category || 'General'}
                    </span>
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                    <StatusBadge status={item.is_published ? 'published' : 'draft'} />
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'center' }}>
                    <button
                      onClick={() => handleToggleFeatured(item)}
                      title={item.is_featured ? 'Click to remove from Home Showcase' : 'Click to feature on Home Showcase'}
                      style={{
                        background: item.is_featured ? '#fef9e7' : 'transparent',
                        border: `1px solid ${item.is_featured ? '#f39c12' : 'var(--color-border)'}`,
                        borderRadius: 'var(--radius-full)',
                        padding: '4px 10px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: 'var(--text-xs)',
                        fontWeight: item.is_featured ? '600' : 'normal',
                        color: item.is_featured ? '#b7791f' : 'var(--color-text-muted)',
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      <Star size={14} fill={item.is_featured ? '#f39c12' : 'none'} color={item.is_featured ? '#f39c12' : 'currentColor'} />
                      <span>{item.is_featured ? 'Featured' : 'Add to Home'}</span>
                    </button>
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => handleTogglePublish(item)}
                        title={item.is_published ? 'Unpublish' : 'Publish'}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--color-text-secondary)' }}
                      >
                        {item.is_published ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>

                      <button
                        onClick={() => setEditingItem(item)}
                        title="Edit metadata"
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--color-text-secondary)' }}
                      >
                        <Edit2 size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(item)}
                        title="Delete record"
                        disabled={deletingId === item.id}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', color: '#e74c3c' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon={Image}
          title="No Matching Photographs"
          description="Upload photographs or adjust filters above."
          action={
            <Button variant="outline" size="sm" onClick={() => setIsUploadOpen(true)}>
              Upload Image
            </Button>
          }
        />
      )}

      {/* Upload Modal */}
      <GalleryUpload
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={loadItems}
      />

      {/* Edit Modal */}
      {editingItem && (
        <GalleryEditModal
          item={editingItem}
          isOpen={Boolean(editingItem)}
          onClose={() => setEditingItem(null)}
          onSuccess={loadItems}
        />
      )}
    </div>
  );
}
