'use client';

import React, { useEffect, useState } from 'react';
import { useBlogs } from '../../hooks/useBlogs';
import { BlogPost } from '../../types';
import LoadingSpinner from '../ui/LoadingSpinner';
import Button from '../ui/Button';
import FormField from '../forms/FormField';
import { Newspaper, Plus, Edit2, Trash2, Eye, EyeOff, X, Check, Clock, User } from 'lucide-react';

export default function BlogManager() {
  const { fetchAllBlogs, createBlog, updateBlog, deleteBlog, loading } = useBlogs();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<BlogPost, 'id'>>({
    image: '/hero-bg.jpg',
    category: 'Conservation',
    title: '',
    excerpt: '',
    content: '',
    author: 'Field Conservation Team',
    readTime: '5 min read',
    date: 'Feb 2026',
    is_published: true,
  });

  const loadBlogs = () => {
    fetchAllBlogs().then(setBlogs);
  };

  useEffect(() => {
    loadBlogs();
  }, [fetchAllBlogs]);

  const handleOpenAdd = () => {
    setEditingBlog(null);
    setFormData({
      image: '/hero-bg.jpg',
      category: 'Conservation',
      title: '',
      excerpt: '',
      content: '',
      author: 'Field Conservation Team',
      readTime: '5 min read',
      date: 'Feb 2026',
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b: BlogPost) => {
    setEditingBlog(b);
    setFormData({
      image: b.image || '/hero-bg.jpg',
      category: b.category,
      title: b.title,
      excerpt: b.excerpt,
      content: b.content || '',
      author: b.author,
      readTime: b.readTime,
      date: b.date,
      is_published: b.is_published ?? true,
    });
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (b: BlogPost) => {
    try {
      await updateBlog(b.id!, { is_published: !b.is_published });
      loadBlogs();
    } catch (err: any) {
      alert(`Toggle failed: ${err.message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.excerpt) {
      alert('Please fill in required title and excerpt fields.');
      return;
    }

    try {
      if (editingBlog) {
        await updateBlog(editingBlog.id!, formData);
      } else {
        await createBlog(formData);
      }
      setIsModalOpen(false);
      loadBlogs();
    } catch (err: any) {
      alert(`Operation failed: ${err.message}`);
    }
  };

  const handleDelete = async (id: string | number, title: string) => {
    if (!window.confirm(`Permanently remove article "${title}"?`)) return;
    try {
      await deleteBlog(id);
      loadBlogs();
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  return (
    <div>
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-6)',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
        }}
      >
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: '4px' }}>Blog &amp; Field Dispatches</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
            Publish project stories, conservation milestones, and youth advocacy articles.
          </p>
        </div>
        <Button variant="primary" size="md" onClick={handleOpenAdd}>
          <Plus size={16} /> New Article
        </Button>
      </div>

      {loading && blogs.length === 0 ? (
        <LoadingSpinner message="Loading articles..." />
      ) : (
        <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
          {blogs.map((b) => (
            <div
              key={b.id}
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                padding: 'clamp(1rem, 3vw, 1.5rem)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              {/* Left Image & Info */}
              <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', minWidth: '240px', flex: 1 }}>
                <img
                  src={b.image}
                  alt={b.title}
                  onError={(e) => {
                    e.currentTarget.src = '/hero-bg.jpg';
                  }}
                  style={{
                    width: '80px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    flexShrink: 0,
                    backgroundColor: '#e2e8f0',
                  }}
                />
                <div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                    <span
                      style={{
                        backgroundColor: 'var(--color-primary-100)',
                        color: 'var(--color-primary-700)',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                      }}
                    >
                      {b.category}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: b.is_published !== false ? '#16a34a' : '#d97706',
                      }}
                    >
                      {b.is_published !== false ? '• Published' : '• Draft'}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 4px', color: 'var(--color-text)' }}>
                    {b.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '0.8rem', color: '#64748b' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <User size={13} /> {b.author}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} /> {b.readTime}
                    </span>
                    <span>{b.date}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => handleTogglePublish(b)}
                  title={b.is_published !== false ? 'Unpublish to draft' : 'Publish to live site'}
                  style={{
                    padding: '0.45rem 0.8rem',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-surface)',
                    color: b.is_published !== false ? '#16a34a' : '#64748b',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {b.is_published !== false ? <Eye size={14} /> : <EyeOff size={14} />}
                  <span>{b.is_published !== false ? 'Live' : 'Draft'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenEdit(b)}
                  style={{
                    padding: '0.45rem 0.8rem',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-surface)',
                    color: 'var(--color-text)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Edit2 size={14} /> Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(b.id!, b.title)}
                  style={{
                    padding: '0.45rem 0.8rem',
                    borderRadius: '6px',
                    border: '1px solid #fecaca',
                    background: '#fef2f2',
                    color: '#dc2626',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Add / Edit */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(1.5rem, 4vw, 2rem)',
              maxWidth: '640px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                {editingBlog ? 'Edit Dispatch' : 'Write New Dispatch'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <FormField
                label="Article Title"
                name="title"
                required
                value={formData.title}
                onChange={(e: any) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Grassroots Mangrove Restoration at Kilifi"
              />

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                <FormField
                  label="Category"
                  name="category"
                  type="select"
                  value={formData.category}
                  onChange={(e: any) => setFormData({ ...formData, category: e.target.value })}
                  options={['Conservation', 'Policy', 'Education', 'Community', 'Advocacy']}
                />

                <FormField
                  label="Author / Desk"
                  name="author"
                  required
                  value={formData.author}
                  onChange={(e: any) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Field Conservation Team"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <FormField
                  label="Read Time"
                  name="readTime"
                  value={formData.readTime}
                  onChange={(e: any) => setFormData({ ...formData, readTime: e.target.value })}
                  placeholder="5 min read"
                />

                <FormField
                  label="Date String"
                  name="date"
                  value={formData.date}
                  onChange={(e: any) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="Feb 2026"
                />
              </div>

              <FormField
                label="Cover Image Path or URL"
                name="image"
                value={formData.image}
                onChange={(e: any) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/hero-bg.jpg or full image URL"
              />

              <FormField
                label="Summary / Excerpt"
                name="excerpt"
                type="textarea"
                rows={2}
                required
                value={formData.excerpt}
                onChange={(e: any) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="One to two sentences summarizing the field action or policy impact."
              />

              <FormField
                label="Full Article Content"
                name="content"
                type="textarea"
                rows={4}
                value={formData.content}
                onChange={(e: any) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Full article body paragraphs..."
              />

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '1.2rem' }}>
                <Button variant="outline" size="md" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md">
                  <Check size={16} /> Save Dispatch
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

