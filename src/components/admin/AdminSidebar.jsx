'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Activity,
  Image,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { ADMIN_NAV, ROUTES } from '../../config/routes';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminSidebar({ isOpen, onClose }) {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
    router.push(ROUTES.ADMIN_LOGIN);
  };

  const iconMap = {
    LayoutDashboard: LayoutDashboard,
    Activity: Activity,
    Image: Image,
    Inbox: Inbox,
    Settings: Settings,
  };

  return (
    <>
      <aside
        style={{
          width: '260px',
          backgroundColor: 'var(--color-neutral-900)',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 150,
          transition: 'transform var(--transition-base)',
        }}
        className={`admin-sidebar ${isOpen ? 'open' : ''}`}
      >
        {/* Brand header */}
        <div style={{ padding: 'var(--space-6)', borderBottom: '1px solid var(--color-neutral-800)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <img
            src="/logo.jpeg"
            onError={(e) => {
              e.currentTarget.src = '/favicon.svg';
            }}
            alt="YCHA Logo"
            loading="lazy"
            decoding="async"
            width="36"
            height="36"
            style={{ borderRadius: 'var(--radius-full)', objectFit: 'cover' }}
          />
          <div>
            <span style={{ fontWeight: 'bold', fontSize: 'var(--text-sm)', display: 'block' }}>YCHA Admin</span>
            <span style={{ fontSize: '10px', color: 'var(--color-neutral-400)' }}>Control Centre</span>
          </div>
        </div>

        {/* User bar */}
        <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-neutral-800)', fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)' }}>
          <div>Signed in as:</div>
          <div style={{ color: '#fff', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user?.email || 'admin'}
          </div>
        </div>

        {/* Nav Items */}
        <nav style={{ padding: 'var(--space-4) var(--space-2)', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {ADMIN_NAV.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            const isActive =
              item.path === ROUTES.ADMIN_DASHBOARD
                ? pathname === ROUTES.ADMIN_DASHBOARD
                : pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  color: isActive ? '#ffffff' : 'var(--color-neutral-400)',
                  backgroundColor: isActive ? 'var(--color-primary-600)' : 'transparent',
                  textDecoration: 'none',
                  fontSize: 'var(--text-sm)',
                  fontWeight: isActive ? '600' : 'normal',
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--color-neutral-800)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <Link
            href={ROUTES.HOME}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-2) var(--space-3)',
              color: 'var(--color-neutral-400)',
              fontSize: 'var(--text-xs)',
              textDecoration: 'none',
            }}
          >
            <ExternalLink size={14} /> Open Public Site
          </Link>

          <button
            onClick={handleSignOut}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-2) var(--space-3)',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#e74c3c',
              cursor: 'pointer',
              fontSize: 'var(--text-sm)',
              borderRadius: 'var(--radius-md)',
              width: '100%',
              textAlign: 'left',
            }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      <style>{`
        @media (max-width: 900px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }
          .admin-sidebar.open {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
