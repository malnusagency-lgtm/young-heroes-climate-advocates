'use client';

import React, { useState } from 'react';
import { useSubmissions } from '../hooks/useSubmissions';
import { isSupabaseConfigured } from '../config/supabase';
import { ORG } from '../config/constants';
import FormField from '../components/forms/FormField';
import Button from '../components/ui/Button';
import { CheckCircle, AlertCircle, Shield } from 'lucide-react';

export default function Join() {
  const { submitJoinForm } = useSubmissions();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    age_group: '18-24',
    interests: [],
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const interestOptions = [
    'Climate Literacy Workshops',
    'Community Tree Planting',
    'Waste Clean-up & Circularity',
    'Field Photography & Media',
    'Advocacy & Public Communication',
  ];

  const handleInterestToggle = (opt) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(opt);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((i) => i !== opt)
          : [...prev.interests, opt],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name || !formData.email) {
      setStatus({ type: 'error', message: 'Please provide both your name and email address.' });
      return;
    }

    if (!isSupabaseConfigured) {
      setStatus({
        type: 'info',
        message: 'Online volunteer applications are temporarily being updated. Please check back shortly.',
      });
      return;
    }

    setLoading(true);
    setStatus(null);
    try {
      await submitJoinForm(formData);
      setStatus({
        type: 'success',
        message: 'Thank you for your application! A member of the YCHA organizing committee will reach out to review onboarding opportunities.',
      });
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        age_group: '18-24',
        interests: [],
        message: '',
      });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Submission failed. Please check your connection and try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingBlock: 'var(--space-12)' }}>
      <header className="page-header" style={{ marginBottom: 'var(--space-8)' }}>
        <h1>Join Young Heroes Climate Advocates</h1>
        <p>Become part of our grassroots youth coalition for community climate resilience.</p>
      </header>

      <div style={{ maxWidth: '650px', marginInline: 'auto' }}>
        {status?.type === 'success' ? (
          <div
            style={{
              padding: 'var(--space-8)',
              backgroundColor: 'var(--color-primary-50)',
              border: '1px solid var(--color-primary-200)',
              borderRadius: 'var(--radius-xl)',
              textAlign: 'center',
            }}
          >
            <CheckCircle size={48} color="var(--color-success)" style={{ marginInline: 'auto', marginBottom: 'var(--space-3)' }} />
            <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>Application Received</h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
              {status.message}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: 'var(--color-surface)',
              padding: 'var(--space-8)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {status && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-3)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 'var(--space-6)',
                  backgroundColor: status.type === 'error' ? '#fdf2f2' : '#fef9e7',
                  border: `1px solid ${status.type === 'error' ? '#f5c6cb' : '#ffeeba'}`,
                  color: status.type === 'error' ? '#721c24' : '#856404',
                  fontSize: 'var(--text-sm)',
                }}
              >
                <AlertCircle size={18} />
                <span>{status.message}</span>
              </div>
            )}

            <FormField
              label="Full Name"
              name="full_name"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              placeholder="Your name"
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
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+254 700 000 000"
              helpText="Used only for coordinator communication regarding local field activities."
            />

            <FormField
              label="Age Bracket"
              name="age_group"
              type="select"
              value={formData.age_group}
              onChange={(e) => setFormData({ ...formData, age_group: e.target.value })}
              options={[
                { value: 'under-18', label: 'Under 18' },
                { value: '18-24', label: '18 – 24 years' },
                { value: '25-30', label: '25 – 30 years' },
                { value: 'over-30', label: '30+ years (Supporter / Mentor)' },
              ]}
            />

            <div style={{ marginBottom: 'var(--space-6)' }}>
              <label style={{ display: 'block', fontWeight: '500', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>
                Areas of Interest (Select all that apply)
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {interestOptions.map((opt) => (
                  <label
                    key={opt}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      fontSize: 'var(--text-sm)',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(opt)}
                      onChange={() => handleInterestToggle(opt)}
                      style={{ accentColor: 'var(--color-primary-500)' }}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <FormField
              label="Why do you want to join YCHA?"
              name="message"
              type="textarea"
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us briefly about your motivation or past environmental activities..."
            />

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-2)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--space-6)',
              }}
            >
              <Shield size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>
                <strong>Privacy Commitment:</strong> Your personal information is kept strictly confidential, accessed only by authorized YCHA coordinators, and will never be shared.
              </span>
            </div>

            <Button type="submit" variant="primary" size="lg" loading={loading} style={{ width: '100%' }}>
              Submit Volunteer Application
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
