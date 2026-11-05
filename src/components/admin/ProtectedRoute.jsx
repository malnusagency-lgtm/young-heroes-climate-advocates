'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { ROUTES } from '../../config/routes';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function ProtectedRoute({ children }) {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(ROUTES.ADMIN_LOGIN);
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner message="Verifying administrative credentials..." />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div style={{ maxWidth: '500px', margin: 'var(--space-16) auto', textAlign: 'center', padding: 'var(--space-8)' }}>
        <h2 style={{ color: 'var(--color-error)', marginBottom: 'var(--space-3)' }}>Access Denied</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
          Your authenticated account does not possess authorized administrator permissions for YCHA operations.
        </p>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
          Please contact the database administrator to review role provisioning in the <code>profiles</code> table.
        </p>
      </div>
    );
  }

  return children;
}
