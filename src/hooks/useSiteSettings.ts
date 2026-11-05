import { useCallback, useEffect, useState } from 'react';
import { ORG } from '../config/constants';
import { isSupabaseConfigured, supabase } from '../config/supabase';

export interface SiteSettings {
  googleDriveArchiveUrl: string;
  googlePhotosAlbumUrl: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  googleDriveArchiveUrl: ORG.googleDriveArchiveUrl,
  googlePhotosAlbumUrl: ORG.googlePhotosAlbumUrl,
};

const LOCAL_STORAGE_KEY = 'ycha_site_settings';

function readLocalSettings(): SiteSettings {
  const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) return DEFAULT_SITE_SETTINGS;

  let parsed: Record<string, unknown>;
  try {
    const value: unknown = JSON.parse(stored);
    if (!value || typeof value !== 'object') throw new Error('Invalid settings data');
    parsed = value as Record<string, unknown>;
  } catch {
    throw new Error('Saved archive links are invalid. Clear the site settings in this browser and try again.');
  }

  return {
    googleDriveArchiveUrl:
      typeof parsed.googleDriveArchiveUrl === 'string'
        ? parsed.googleDriveArchiveUrl
        : DEFAULT_SITE_SETTINGS.googleDriveArchiveUrl,
    googlePhotosAlbumUrl:
      typeof parsed.googlePhotosAlbumUrl === 'string'
        ? parsed.googlePhotosAlbumUrl
        : DEFAULT_SITE_SETTINGS.googlePhotosAlbumUrl,
  };
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [error, setError] = useState<string | null>(null);

  const loadSettings = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setSettings(readLocalSettings());
      return;
    }

    const { data, error: queryError } = await supabase
      .from('site_settings')
      .select('key, value')
      .in('key', ['google_drive_archive_url', 'google_photos_album_url']);

    if (queryError) throw queryError;

    const values = new Map((data || []).map((entry) => [entry.key, entry.value]));
    setSettings({
      googleDriveArchiveUrl: values.get('google_drive_archive_url') || DEFAULT_SITE_SETTINGS.googleDriveArchiveUrl,
      googlePhotosAlbumUrl: values.get('google_photos_album_url') || DEFAULT_SITE_SETTINGS.googlePhotosAlbumUrl,
    });
  }, []);

  useEffect(() => {
    loadSettings().catch((loadError: Error) => setError(loadError.message));
  }, [loadSettings]);

  const saveSettings = useCallback(async (nextSettings: SiteSettings) => {
    setError(null);

    if (isSupabaseConfigured) {
      const { error: saveError } = await supabase.from('site_settings').upsert(
        [
          {
            key: 'google_drive_archive_url',
            value: nextSettings.googleDriveArchiveUrl,
            updated_at: new Date().toISOString(),
          },
          {
            key: 'google_photos_album_url',
            value: nextSettings.googlePhotosAlbumUrl,
            updated_at: new Date().toISOString(),
          },
        ],
        { onConflict: 'key' }
      );

      if (saveError) throw saveError;
    } else {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextSettings));
    }

    setSettings(nextSettings);
  }, []);

  return { settings, saveSettings, error, isSupabaseConfigured };
}
