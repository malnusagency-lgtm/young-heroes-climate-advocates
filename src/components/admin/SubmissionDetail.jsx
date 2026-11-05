'use client';

import React from 'react';
import StatusBadge from '../ui/StatusBadge';
import Button from '../ui/Button';
import { X, Calendar, Mail, Phone, User, CheckCircle, Archive } from 'lucide-react';

export default function SubmissionDetail({ submission, isOpen, onClose, onUpdateStatus }) {
  if (!isOpen || !submission) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Submission Detail"
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
          maxWidth: '600px',
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
          aria-label="Close details"
        >
          <X size={22} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          <StatusBadge status={submission.status} />
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            Type: {submission.submission_type === 'join' ? 'Volunteer Application' : 'General Contact'}
          </span>
        </div>

        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-1)' }}>
          {submission.full_name}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBlock: 'var(--space-4)', padding: 'var(--space-4)', backgroundColor: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={16} color="var(--color-text-muted)" />
            <a href={`mailto:${submission.email}`}>{submission.email}</a>
          </div>

          {submission.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={16} color="var(--color-text-muted)" />
              <span>{submission.phone}</span>
            </div>
          )}

          {submission.age_group && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={16} color="var(--color-text-muted)" />
              <span>Age Group: {submission.age_group}</span>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={16} color="var(--color-text-muted)" />
            <span>Received: {new Date(submission.created_at).toLocaleString()}</span>
          </div>
        </div>

        {submission.interests && submission.interests.length > 0 && (
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <strong style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '6px' }}>
              Selected Focus Areas:
            </strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {submission.interests.map((it, i) => (
                <span key={i} style={{ padding: '2px 8px', backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary-700)', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)' }}>
                  {it}
                </span>
              ))}
            </div>
          </div>
        )}

        {submission.subject && (
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <strong style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>
              Subject:
            </strong>
            <p style={{ fontSize: 'var(--text-sm)', fontWeight: '500' }}>{submission.subject}</p>
          </div>
        )}

        <div style={{ marginBottom: 'var(--space-6)' }}>
          <strong style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>
            Message / Statement of Intent:
          </strong>
          <p style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', color: 'var(--color-text-secondary)', whiteSpace: 'pre-wrap' }}>
            {submission.message || 'No additional statement provided.'}
          </p>
        </div>

        {/* Status Actions */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          {submission.status !== 'in_review' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateStatus(submission.submission_type, submission.id, 'in_review')}
            >
              Mark In Review
            </Button>
          )}

          {submission.status !== 'completed' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onUpdateStatus(submission.submission_type, submission.id, 'completed')}
            >
              <CheckCircle size={14} /> Complete & Onboard
            </Button>
          )}

          {submission.status !== 'archived' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onUpdateStatus(submission.submission_type, submission.id, 'archived')}
            >
              <Archive size={14} /> Archive
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
