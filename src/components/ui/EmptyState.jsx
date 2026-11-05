import React from 'react';

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--space-12) var(--space-6)',
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px dashed var(--color-border)',
        marginBlock: 'var(--space-6)',
      }}
    >
      {Icon && (
        <div
          style={{
            color: 'var(--color-neutral-400)',
            marginBottom: 'var(--space-4)',
          }}
        >
          <Icon size={48} strokeWidth={1.5} />
        </div>
      )}
      <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
        {title}
      </h3>
      {description && (
        <p
          style={{
            color: 'var(--color-text-secondary)',
            maxWidth: '450px',
            marginBottom: action ? 'var(--space-6)' : 0,
            fontSize: 'var(--text-sm)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}

