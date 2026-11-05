'use client';

import React, { useEffect, useState } from 'react';
import { ORG, ADMIN_CREDENTIALS } from '../../config/constants';
import { CheckCircle2, Shield, User, Globe } from 'lucide-react';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import FormField from '../forms/FormField';
import Button from '../ui/Button';

export default function SettingsPanel() {
  const { settings, saveSettings, error, isSupabaseConfigured } = useSiteSettings();
  const [draftSettings, setDraftSettings] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    setDraftSettings(settings);
  }, [settings]);

  const handleSaveLinks = async (event) => {
    event.preventDefault();
    setSaveMessage('');

    const urls = [draftSettings.googleDriveArchiveUrl, draftSettings.googlePhotosAlbumUrl];
    const isGoogleUrl = (value) => {
      try {
        const url = new URL(value);
        return (
          url.protocol === 'https:' &&
          (url.hostname === 'google.com' ||
            url.hostname.endsWith('.google.com') ||
            url.hostname === 'photos.app.goo.gl')
        );
      } catch {
        return false;
      }
    };

    if (urls.some((url) => !isGoogleUrl(url))) {
      setSaveMessage('Enter valid HTTPS links for Google Drive and Google Photos.');
      return;
    }

    setSaving(true);
    try {
      await saveSettings(draftSettings);
      setSaveMessage(
        isSupabaseConfigured
          ? 'Google archive links updated on the website.'
          : 'Links saved in this browser only. Configure Supabase to publish them for all visitors.'
      );
    } catch (saveError) {
      setSaveMessage(`Could not save archive links: ${saveError.message}`);
    } finally {
      setSaving(false);
    }
  };

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
            <div><strong>Contact:</strong> <a href={`mailto:${ORG.email}`}>{ORG.email}</a></div>
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
          <form onSubmit={handleSaveLinks}>
            <FormField
              label="Public Google Drive Archive"
              name="googleDriveArchiveUrl"
              type="url"
              required
              value={draftSettings.googleDriveArchiveUrl}
              onChange={(event) =>
                setDraftSettings({ ...draftSettings, googleDriveArchiveUrl: event.target.value })
              }
              placeholder="https://drive.google.com/..."
            />
            <FormField
              label="Public Google Photos Album"
              name="googlePhotosAlbumUrl"
              type="url"
              required
              value={draftSettings.googlePhotosAlbumUrl}
              onChange={(event) =>
                setDraftSettings({ ...draftSettings, googlePhotosAlbumUrl: event.target.value })
              }
              placeholder="https://photos.app.goo.gl/..."
            />
            <Button type="submit" variant="primary" size="md" disabled={saving}>
              {saving ? 'Saving…' : 'Save Google Links'}
            </Button>
            {saveMessage && (
              <p role="status" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                {saveMessage}
              </p>
            )}
            {error && (
              <p role="alert" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-error)' }}>
                Could not load saved links: {error}
              </p>
            )}
            <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', margin: 0 }}>
              Google Drive and Photos links are displayed on the public Gallery page.
            </p>
          </form>
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
