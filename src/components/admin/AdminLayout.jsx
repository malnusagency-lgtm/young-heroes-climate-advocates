'use client';

import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Menu, X } from 'lucide-react';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 140,
          }}
        />
      )}

      {/* Main Content Area */}
      <div className="admin-main-content" style={{ marginLeft: '260px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Mobile top bar */}
        <header
          className="admin-mobile-header"
          style={{
            display: 'none',
            padding: 'var(--space-3) var(--space-4)',
            backgroundColor: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontWeight: 'bold', fontSize: 'var(--text-sm)' }}>YCHA Admin Dashboard</span>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
            aria-label="Toggle navigation menu"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </header>

        <main style={{ padding: 'var(--space-8)', flex: 1 }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-main-content {
            margin-left: 0 !important;
          }
          .admin-mobile-header {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
