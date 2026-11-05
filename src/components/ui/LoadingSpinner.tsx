import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({ message = 'Loading...', size = 'md' }: LoadingSpinnerProps) {
  const sizeMap: Record<string, string> = {
    sm: '24px',
    md: '40px',
    lg: '56px',
  };

  return (
    <div
      role="status"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-3)',
        padding: 'var(--space-8)',
      }}
    >
      <div
        style={{
          width: sizeMap[size] || sizeMap.md,
          height: sizeMap[size] || sizeMap.md,
          border: '3px solid var(--color-neutral-200)',
          borderTopColor: 'var(--color-primary-500)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      {message && (
        <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          {message}
        </span>
      )}
      <span className="sr-only">{message}</span>
    </div>
  );
}

