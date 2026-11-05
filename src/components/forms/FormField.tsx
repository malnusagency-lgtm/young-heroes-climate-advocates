import React, { ReactNode } from 'react';

interface FormFieldProps {
  label?: string;
  name: string;
  type?: string;
  value?: any;
  onChange?: (e: any) => void;
  error?: string | null;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  options?: Array<string | { value: string | number; label: string }>;
  children?: ReactNode;
  helpText?: string;
}

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  rows = 4,
  options = [],
  children,
  helpText,
}: FormFieldProps) {
  const inputStyles: React.CSSProperties = {
    width: '100%',
    padding: 'var(--space-3) var(--space-4)',
    borderRadius: 'var(--radius-md)',
    border: `1px solid ${error ? 'var(--color-error)' : 'var(--color-border)'}`,
    backgroundColor: 'var(--color-surface)',
    fontSize: 'var(--text-base)',
    color: 'var(--color-text)',
    outline: 'none',
    transition: 'border-color var(--transition-fast)',
    minHeight: '44px',
    boxSizing: 'border-box',
  };

  return (
    <div style={{ marginBottom: 'var(--space-4)' }}>
      {label && (
        <label
          htmlFor={name}
          style={{
            display: 'block',
            fontWeight: 'var(--font-weight-medium)',
            fontSize: 'var(--text-sm)',
            marginBottom: 'var(--space-2)',
            color: 'var(--color-text)',
          }}
        >
          {label}
          {required && <span style={{ color: 'var(--color-error)', marginLeft: '4px' }}>*</span>}
        </label>
      )}

      {children ? (
        children
      ) : type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          style={{ ...inputStyles, resize: 'vertical' }}
        />
      ) : type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          style={inputStyles}
        >
          {options.map((opt: any) => (
            <option key={opt.value ?? opt} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          style={inputStyles}
        />
      )}

      {helpText && !error && (
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: '4px' }}>
          {helpText}
        </p>
      )}

      {error && (
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-error)', marginTop: '4px' }}>
          {error}
        </p>
      )}
    </div>
  );
}

