'use client';

import React from 'react';
import Link from 'next/link';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  type = 'button',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ...props
}) {
  const baseClasses = 'btn';
  const variantClass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  const classes = [baseClasses, variantClass, sizeClass, className].filter(Boolean).join(' ');

  const styles = `
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-weight: var(--font-weight-medium);
      border-radius: var(--radius-md);
      border: 1px solid transparent;
      cursor: pointer;
      transition: all var(--transition-fast);
      text-decoration: none;
      line-height: 1;
    }
    .btn:disabled, .btn[aria-disabled="true"] {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .btn--sm {
      padding: var(--space-2) var(--space-3);
      font-size: var(--text-sm);
    }
    .btn--md {
      padding: var(--space-3) var(--space-5);
      font-size: var(--text-base);
    }
    .btn--lg {
      padding: var(--space-4) var(--space-8);
      font-size: var(--text-lg);
    }
    .btn--primary {
      background-color: var(--color-primary-500);
      color: #ffffff;
    }
    .btn--primary:hover:not(:disabled) {
      background-color: var(--color-primary-600);
      color: #ffffff;
    }
    .btn--secondary {
      background-color: var(--color-secondary-500);
      color: #ffffff;
    }
    .btn--secondary:hover:not(:disabled) {
      background-color: var(--color-secondary-600);
      color: #ffffff;
    }
    .btn--outline {
      border-color: var(--color-primary-500);
      color: var(--color-primary-500);
      background: transparent;
    }
    .btn--outline:hover:not(:disabled) {
      background-color: var(--color-primary-50);
    }
    .btn--ghost {
      background: transparent;
      color: var(--color-text-secondary);
    }
    .btn--ghost:hover:not(:disabled) {
      background-color: var(--color-neutral-100);
      color: var(--color-text);
    }
    .btn--danger {
      background-color: var(--color-error);
      color: #ffffff;
    }
    .btn--danger:hover:not(:disabled) {
      background-color: #a93226;
    }
  `;

  const content = (
    <>
      <style>{styles}</style>
      {loading ? (
        <>
          <span className="spinner-border" aria-hidden="true" style={{
            width: '1em',
            height: '1em',
            border: '2px solid currentColor',
            borderRightColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.6s linear infinite',
            display: 'inline-block'
          }} />
          <span>Loading...</span>
        </>
      ) : children}
    </>
  );

  const destination = to || href;
  if (destination) {
    return (
      <Link href={destination} className={classes} aria-disabled={disabled} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={classes}
      {...props}
    >
      {content}
    </button>
  );
}
