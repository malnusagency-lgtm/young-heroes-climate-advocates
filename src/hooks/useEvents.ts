import { useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { EventItem } from '../types';

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 1,
    date: '28',
    month: 'JAN',
    year: '2026',
    title: 'Nairobi Reforestation Workshop',
    location: 'Karura Forest, Nairobi',
    time: '09:00 AM - 01:00 PM',
    type: 'Field Action',
    desc: 'Join us for a hands-on workshop on indigenous tree planting and nursery management.',
    color: '#0F4C3A',
    is_published: true,
  },
  {
    id: 2,
    date: '12',
    month: 'FEB',
    year: '2026',
    title: 'Youth Policy Summit',
    location: 'Kenyatta ICC',
    time: '10:00 AM - 04:00 PM',
    type: 'Advocacy',
    desc: 'A strategic gathering to discuss the Youth Climate Bill before the regional assembly.',
    color: '#2E86AB',
    is_published: true,
  },
  {
    id: 3,
    date: '05',
    month: 'MAR',
    year: '2026',
    title: 'Eco-Literacy School Tour',
    location: 'Mombasa County',
    time: '08:30 AM - 02:00 PM',
    type: 'Education',
    desc: 'Visiting regional schools to launch the 2026 Climate Champions program.',
    color: '#F4D35E',
    is_published: true,
  },
  {
    id: 4,
    date: '20',
    month: 'MAR',
    year: '2026',
    title: 'Coastal Resilience Workshop',
    location: 'Malindi Waterfront',
    time: '09:00 AM - 12:00 PM',
    type: 'Field Action',
    desc: 'Community seagrass monitoring and coastline protection training session.',
    color: '#0F4C3A',
    is_published: true,
  },
];

const LOCAL_STORAGE_KEY = 'ycha_dynamic_events';

export const useEvents = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper to get local stored events
  const getStoredEvents = (): EventItem[] => {
    if (typeof window === 'undefined') return INITIAL_EVENTS;
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_EVENTS;
  };

  const setStoredEvents = (events: EventItem[]) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
      } catch {
        // ignore
      }
    }
  };

  const fetchAllEvents = useCallback(async (): Promise<EventItem[]> => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured) {
      setLoading(false);
      return getStoredEvents();
    }

    try {
      const queryPromise = supabase
        .from('events')
        .select('*')
        .order('id', { ascending: true });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Events request timed out')), 4000)
      );

      const { data, error: err } = (await Promise.race([queryPromise, timeoutPromise])) as any;

      if (err || !data || data.length === 0) {
        return getStoredEvents();
      }

      return data as EventItem[];
    } catch {
      return getStoredEvents();
    } finally {
      setLoading(false);
    }
  }, []);

  const createEvent = async (eventData: Omit<EventItem, 'id'>) => {
    setLoading(true);
    const newId = Date.now();
    const newEvent: EventItem = { ...eventData, id: newId };

    // Update local storage
    const current = getStoredEvents();
    const updated = [...current, newEvent];
    setStoredEvents(updated);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('events').insert([newEvent]);
      } catch {
        // Saved locally
      }
    }

    setLoading(false);
    return newEvent;
  };

  const updateEvent = async (id: string | number, eventData: Partial<EventItem>) => {
    setLoading(true);
    const current = getStoredEvents();
    const updated = current.map((e) => (String(e.id) === String(id) ? { ...e, ...eventData } : e));
    setStoredEvents(updated);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('events').update(eventData).eq('id', id);
      } catch {
        // Saved locally
      }
    }

    setLoading(false);
    return updated.find((e) => String(e.id) === String(id));
  };

  const deleteEvent = async (id: string | number) => {
    setLoading(true);
    const current = getStoredEvents();
    const updated = current.filter((e) => String(e.id) !== String(id));
    setStoredEvents(updated);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('events').delete().eq('id', id);
      } catch {
        // Deleted locally
      }
    }

    setLoading(false);
    return true;
  };

  return {
    loading,
    error,
    fetchAllEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};

