import React from 'react';

export default function StatusBadge({ status }) {
  const styles = {
    new: { bg: '#e8f4fd', color: '#2980b9', label: 'New' },
    in_review: { bg: '#fdf3e7', color: '#c17817', label: 'In Review' },
    completed: { bg: '#e8f5ec', color: '#27ae60', label: 'Completed' },
    archived: { bg: '#f1f3f5', color: '#6c757d', label: 'Archived' },
    published: { bg: '#e8f5ec', color: '#1a5632', label: 'Published' },
    draft: { bg: '#fdf3e7', color: '#864f0e', label: 'Draft' },
  };

  const config = styles[status] || {
    bg: 'var(--color-neutral-100)',
    color: 'var(--color-neutral-700)',
    label: status,
  };

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0.2rem 0.6rem',
        borderRadius: 'var(--radius-full)',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--font-weight-medium)',
        backgroundColor: config.bg,
        color: config.color,
        textTransform: 'capitalize',
        lineHeight: 1.2,
      }}
    >
      {config.label}
    </span>
  );
}

