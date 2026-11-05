import { useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../config/supabase';

export const useActivity = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const logEvent = async (eventType, eventCategory = 'operational', metadata = {}, route = '') => {
    if (!isSupabaseConfigured) return;
    try {
      await supabase.from('site_events').insert([
        {
          event_type: eventType,
          event_category: eventCategory,
          metadata,
          route,
        },
      ]);
    } catch (err) {
      // Background logging should not break user interactions
      console.warn('Logging skipped:', err.message);
    }
  };

  const fetchActivityLog = useCallback(async (days = null) => {
    if (!isSupabaseConfigured) return [];
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('site_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (days) {
        const sinceDate = new Date();
        sinceDate.setDate(sinceDate.getDate() - days);
        query = query.gte('created_at', sinceDate.toISOString());
      }

      const { data, error: err } = await query;
      if (err) throw err;
      return data || [];
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOverviewStats = useCallback(async (days = 30) => {
    if (!isSupabaseConfigured) {
      return {
        configured: false,
        galleryTotal: 0,
        galleryPublished: 0,
        galleryDraft: 0,
        newSubmissions: 0,
        recentEventsCount: 0,
      };
    }

    setLoading(true);
    try {
      const [galleryRes, joinRes, contactRes, eventsRes] = await Promise.all([
        supabase.from('gallery_items').select('is_published'),
        supabase.from('join_submissions').select('status', { count: 'exact' }).eq('status', 'new'),
        supabase.from('contact_submissions').select('status', { count: 'exact' }).eq('status', 'new'),
        supabase.from('site_events').select('id', { count: 'exact' }),
      ]);

      const items = galleryRes.data || [];
      const published = items.filter(i => i.is_published).length;
      const draft = items.length - published;
      const newSubs = (joinRes.count || 0) + (contactRes.count || 0);

      return {
        configured: true,
        galleryTotal: items.length,
        galleryPublished: published,
        galleryDraft: draft,
        newSubmissions: newSubs,
        recentEventsCount: eventsRes.count || 0,
      };
    } catch (err) {
      setError(err.message);
      return {
        configured: true,
        galleryTotal: 0,
        galleryPublished: 0,
        galleryDraft: 0,
        newSubmissions: 0,
        recentEventsCount: 0,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    logEvent,
    fetchActivityLog,
    fetchOverviewStats,
  };
};

