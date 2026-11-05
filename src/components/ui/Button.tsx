'use client';

import React, { ReactNode, MouseEventHandler } from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

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
  style,
  ...props
}: ButtonProps) {
  const baseClasses = 'btn';
  const variantClass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  const classes = [baseClasses, variantClass, sizeClass, className].filter(Boolean).join(' ');

  const content = (
    <>
      {loading ? (
        <>
          <span
            className="spinner-border"
            aria-hidden="true"
            style={{
              width: '1em',
              height: '1em',
              border: '2px solid currentColor',
              borderRightColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 0.6s linear infinite',
              display: 'inline-block',
            }}
          />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </>
  );

  const destination = to || href;
  if (destination) {
    return (
      <Link href={destination} className={classes} aria-disabled={disabled} style={style} {...props}>
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
      style={style}
      {...props}
    >
      {content}
    </button>
  );
}

