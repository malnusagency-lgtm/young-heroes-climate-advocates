'use client';

import React from 'react';
import { ORG, ADMIN_CREDENTIALS } from '../../config/constants';
import { CheckCircle2, Shield, User, Globe, Mail } from 'lucide-react';

export default function SettingsPanel() {
  return (
    <div>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: '4px' }}>System Overview & Administration</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          Operating status, administrative contacts, and organization defaults.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        {/* Organization Information Card */}
        <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
            <Globe size={22} color="var(--color-primary-600)" />
            <h2 style={{ fontSize: 'var(--text-base)' }}>Organization Identity</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
            <div><strong>Organization:</strong> {ORG.name} ({ORG.shortName})</div>
            <div><strong>Executive Lead:</strong> {ORG.founder}</div>
            <div><strong>Contact:</strong> {ORG.email}</div>
            <div><strong>Regional Office:</strong> {ORG.address}</div>
          </div>
        </div>

        {/* Administrator Profile Card */}
        <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
            <User size={22} color="var(--color-secondary-600)" />
            <h2 style={{ fontSize: 'var(--text-base)' }}>Primary Administrator</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
            <div><strong>Designated Admin:</strong> Elizabeth Akinyi Ouma</div>
            <div><strong>Email:</strong> {ADMIN_CREDENTIALS.primaryEmail}</div>
            <div style={{ marginTop: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-success)', fontSize: 'var(--text-xs)', fontWeight: '600' }}>
              <CheckCircle2 size={16} /> Authorized Administrator Access
            </div>
          </div>
        </div>

        {/* Cloud Media & Archive Integration */}
        <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
            <Globe size={22} color="var(--color-primary-600)" />
            <h2 style={{ fontSize: 'var(--text-base)' }}>Cloud Photo & Press Archive</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
            <div>
              <span style={{ fontWeight: '600', display: 'block', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: '2px' }}>
                Public Google Drive Archive:
              </span>
              <a
                href={ORG.googleDriveArchiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-primary-600)', wordBreak: 'break-all', fontSize: 'var(--text-xs)' }}
              >
                {ORG.googleDriveArchiveUrl}
              </a>
            </div>
            <div>
              <span style={{ fontWeight: '600', display: 'block', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: '2px' }}>
                Public Google Photos Album:
              </span>
              <a
                href={ORG.googlePhotosAlbumUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-primary-600)', wordBreak: 'break-all', fontSize: 'var(--text-xs)' }}
              >
                {ORG.googlePhotosAlbumUrl}
              </a>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: 0 }}>
              Links are shown on the public Gallery page and Home page showcase. Configure in <code>src/config/constants.js</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Operational Modules Card */}
      <section style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
        <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Shield size={18} color="var(--color-primary-600)" /> Platform Services Status
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: '600', fontSize: 'var(--text-sm)', marginBottom: '4px' }}>Public Website</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={14} /> Active & Running
            </div>
          </div>
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: '600', fontSize: 'var(--text-sm)', marginBottom: '4px' }}>Field Gallery Showcase</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={14} /> Curation Enabled
            </div>
          </div>
          <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: '600', fontSize: 'var(--text-sm)', marginBottom: '4px' }}>Volunteer & Inquiries Inbox</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={14} /> Ready for Submissions
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
