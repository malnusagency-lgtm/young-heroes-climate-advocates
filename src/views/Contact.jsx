'use client';

import React, { useState } from 'react';
import { useSubmissions } from '../hooks/useSubmissions';
import { isSupabaseConfigured } from '../config/supabase';
import { ORG } from '../config/constants';
import FormField from '../components/forms/FormField';
import Button from '../components/ui/Button';
import { CheckCircle, AlertCircle, MapPin } from 'lucide-react';

const SUBJECT_OPTIONS = [
  'General Inquiry',
  'Partnership & Funding',
  'Tree Planting & Conservation Drives',
  'Eco-Literacy Workshops',
  'Youth Climate Advocacy & Policy',
  'Media & Press Inquiries',
  'Volunteer Opportunities',
];

export default function Contact() {
  const { submitContactForm } = useSubmissions();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please complete all required fields.' });
      return;
    }

    if (!isSupabaseConfigured) {
      setStatus({
        type: 'info',
        message: 'Online inquiry service is currently being updated. Please try again shortly.',
      });
      return;
    }

    setLoading(true);
    setStatus(null);
    try {
      await submitContactForm(formData);
      setStatus({
        type: 'success',
        message: 'Your inquiry has been received. Our coordination team will get back to you shortly.',
      });
      setFormData({ full_name: '', email: '', subject: 'General Inquiry', message: '' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Could not send message. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingBlock: 'var(--space-12)' }}>
      <header className="page-header" style={{ marginBottom: 'var(--space-12)' }}>
        <h1>Contact Us</h1>
        <p>Have questions about our initiatives, workshops, or partnership opportunities?</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-12)', maxWidth: '960px', marginInline: 'auto' }}>
        {/* Contact info column */}
        <div>
          <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)' }}>Get in Touch</h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-sm)' }}>
            We welcome inquiries from educators, community leaders, potential volunteers, and environmental partners.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
              <div style={{ padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-primary-100)', color: 'var(--color-primary-700)' }}>
                <MapPin size={20} />
              </div>
              <div>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'block' }}>Location</span>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', fontWeight: '500' }}>
                  {ORG.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--space-8)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-6)' }}>Send a Message</h2>

          {status && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-4)',
                backgroundColor: status.type === 'error' ? '#fdf2f2' : status.type === 'success' ? '#e8f5ec' : '#fef9e7',
                border: `1px solid ${status.type === 'error' ? '#f5c6cb' : status.type === 'success' ? '#c8e6d0' : '#ffeeba'}`,
                color: status.type === 'error' ? '#721c24' : status.type === 'success' ? '#1a5632' : '#856404',
                fontSize: 'var(--text-sm)',
              }}
            >
              {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              <span>{status.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <FormField
              label="Your Name"
              name="full_name"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              placeholder="Your full name"
            />

            <FormField
              label="Email Address"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
            />

            <FormField
              label="Subject"
              name="subject"
              type="select"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              options={SUBJECT_OPTIONS}
            />

            <FormField
              label="Message"
              name="message"
              type="textarea"
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="How can we collaborate?"
            />

            <Button type="submit" variant="primary" size="md" loading={loading} style={{ width: '100%' }}>
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
