'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { ROUTES } from '../../config/routes';
import { ADMIN_CREDENTIALS } from '../../config/constants';
import FormField from '../../components/forms/FormField';
import Button from '../../components/ui/Button';
import { Lock, AlertCircle, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const { user, isAdmin, signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState(ADMIN_CREDENTIALS.primaryEmail);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && isAdmin) {
      router.push(ROUTES.ADMIN_DASHBOARD);
    }
  }, [user, isAdmin, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please input your registered administrative email and password.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await signIn(email, password);
      router.push(ROUTES.ADMIN_DASHBOARD);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDesignatedAdmin = () => {
    setEmail('elizabethakinyiouma46@gmail.com');
    setPassword('YHCinfo@2026');
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-6)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: 'var(--color-surface)',
          padding: 'var(--space-8)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <img
            src="/logo.jpeg"
            onError={(e) => {
              e.currentTarget.src = '/favicon.svg';
            }}
            alt="YCHA Logo"
            loading="eager"
            decoding="async"
            width="64"
            height="64"
            style={{
              marginInline: 'auto',
              borderRadius: 'var(--radius-full)',
              marginBottom: 'var(--space-3)',
              objectFit: 'cover',
              border: '2px solid var(--color-primary-500)',
              boxShadow: 'var(--shadow-sm)',
            }}
          />
          <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-1)' }}>YCHA Admin Portal</h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
            Restricted operations management area
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: 'var(--space-3)',
              backgroundColor: '#fdf2f2',
              border: '1px solid #f5c6cb',
              borderRadius: 'var(--radius-md)',
              color: '#721c24',
              fontSize: 'var(--text-sm)',
              marginBottom: 'var(--space-4)',
              display: 'flex',
              gap: 'var(--space-2)',
              alignItems: 'center',
            }}
          >
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <FormField
            label="Administrative Email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="elizabethakinyiouma46@gmail.com"
          />

          <FormField
            label="Password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            style={{ width: '100%', marginTop: 'var(--space-4)' }}
          >
            <Lock size={16} /> Sign In to Dashboard
          </Button>

          <button
            type="button"
            onClick={fillDesignatedAdmin}
            style={{
              marginTop: 'var(--space-4)',
              width: '100%',
              background: 'transparent',
              border: '1px dashed var(--color-border)',
              padding: 'var(--space-2)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <ShieldCheck size={14} color="var(--color-primary-500)" />
            Fill Admin Credentials (Elizabeth Akinyi Ouma)
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 'var(--space-6)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
          Authorized staff only.
        </p>
      </div>
    </div>
  );
}
