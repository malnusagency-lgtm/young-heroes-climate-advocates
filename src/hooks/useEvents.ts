import { useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { EventItem } from '../types';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function nextOccurrence(month: string, day: number) {
  const monthIndex = MONTHS.indexOf(month);
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let year = today.getFullYear();
  let eventDate = new Date(year, monthIndex, day);

  if (eventDate < todayStart) {
    year += 1;
    eventDate = new Date(year, monthIndex, day);
  }

  return {
    date: String(day),
    month,
    year: String(eventDate.getFullYear()),
  };
}

function refreshDefaultEventDates(events: EventItem[]) {
  const defaultSchedule: Record<string, { oldMonth: string; oldDay: string; nextMonth: string; nextDay: number }> = {
    '1': { oldMonth: 'JAN', oldDay: '28', nextMonth: 'DEC', nextDay: 15 },
    '2': { oldMonth: 'FEB', oldDay: '12', nextMonth: 'JAN', nextDay: 12 },
    '3': { oldMonth: 'MAR', oldDay: '05', nextMonth: 'FEB', nextDay: 5 },
    '4': { oldMonth: 'MAR', oldDay: '20', nextMonth: 'MAR', nextDay: 20 },
  };
  const titles = [
    'Nairobi Reforestation Workshop',
    'Youth Policy Summit',
    'Eco-Literacy School Tour',
    'Coastal Resilience Workshop',
  ];

  return events.map((event) => {
    const schedule = defaultSchedule[String(event.id)];
    if (
      !schedule ||
      event.title !== titles[Number(event.id) - 1] ||
      event.month !== schedule.oldMonth ||
      event.date !== schedule.oldDay ||
      event.year !== '2026'
    ) {
      return event;
    }

    return { ...event, ...nextOccurrence(schedule.nextMonth, schedule.nextDay) };
  });
}

export function getEventDate(event: Pick<EventItem, 'date' | 'month' | 'year'>): Date | null {
  const monthIndex = MONTHS.indexOf(event.month.toUpperCase());
  const day = Number(event.date);
  const year = Number(event.year);
  if (monthIndex < 0 || !Number.isInteger(day) || !Number.isInteger(year)) return null;

  const parsed = new Date(year, monthIndex, day);
  if (parsed.getFullYear() !== year || parsed.getMonth() !== monthIndex || parsed.getDate() !== day) {
    return null;
  }
  return parsed;
}

export function isUpcomingEvent(event: EventItem, now = new Date()) {
  const date = getEventDate(event);
  if (!date) return false;
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return date >= today;
}

export function sortEventsByDate(events: EventItem[]) {
  return [...events].sort((a, b) => {
    const dateA = getEventDate(a)?.getTime() ?? Number.MAX_SAFE_INTEGER;
    const dateB = getEventDate(b)?.getTime() ?? Number.MAX_SAFE_INTEGER;
    return dateA - dateB;
  });
}

function getDefaultEvents(): EventItem[] {
  return [
    {
      id: 1,
      ...nextOccurrence('DEC', 15),
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
      ...nextOccurrence('JAN', 12),
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
      ...nextOccurrence('FEB', 5),
      title: 'Eco-Literacy School Tour',
      location: 'Mombasa County',
      time: '08:30 AM - 02:00 PM',
      type: 'Education',
      desc: 'Visiting regional schools to launch the Climate Champions program.',
      color: '#F4D35E',
      is_published: true,
    },
    {
      id: 4,
      ...nextOccurrence('MAR', 20),
      title: 'Coastal Resilience Workshop',
      location: 'Malindi Waterfront',
      time: '09:00 AM - 12:00 PM',
      type: 'Field Action',
      desc: 'Community seagrass monitoring and coastline protection training session.',
      color: '#0F4C3A',
      is_published: true,
    },
  ];
}

export const INITIAL_EVENTS: EventItem[] = getDefaultEvents();

const LOCAL_STORAGE_KEY = 'ycha_dynamic_events';

export const useEvents = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper to get local stored events
  const getStoredEvents = (): EventItem[] => {
    if (typeof window === 'undefined') return INITIAL_EVENTS;
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) return refreshDefaultEventDates(JSON.parse(stored) as EventItem[]);
    return INITIAL_EVENTS;
  };

  const setStoredEvents = (events: EventItem[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
    }
  };

  const fetchAllEvents = useCallback(async (): Promise<EventItem[]> => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured) {
      try {
        return getStoredEvents();
      } finally {
        setLoading(false);
      }
    }

    try {
      const { data, error: queryError } = await supabase
        .from('events')
        .select('*')
        .order('id', { ascending: true });

      if (queryError) throw queryError;
      return (data || []) as EventItem[];
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Could not load events.');
      throw fetchError;
    } finally {
      setLoading(false);
    }
  }, []);

  const createEvent = async (eventData: Omit<EventItem, 'id'>) => {
    setLoading(true);
    try {
      if (isSupabaseConfigured) {
        const { data, error: insertError } = await supabase
          .from('events')
          .insert([eventData])
          .select('*')
          .single();
        if (insertError) throw insertError;
        return data as EventItem;
      }

      const newEvent: EventItem = { ...eventData, id: Date.now() };
      setStoredEvents([...getStoredEvents(), newEvent]);
      return newEvent;
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (id: string | number, eventData: Partial<EventItem>) => {
    setLoading(true);
    setError(null);
    try {
      if (isSupabaseConfigured) {
        const { data, error: updateError } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', id)
          .select('*')
          .single();
        if (updateError) throw updateError;
        return data as EventItem;
      }

      const current = getStoredEvents();
      const updated = current.map((e) => (String(e.id) === String(id) ? { ...e, ...eventData } : e));
      if (!updated.some((event) => String(event.id) === String(id))) {
        throw new Error('Event was not found. Refresh the event list and try again.');
      }
      setStoredEvents(updated);
      return updated.find((e) => String(e.id) === String(id));
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Could not update event.');
      throw updateError;
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: string | number) => {
    setLoading(true);
    try {
      if (isSupabaseConfigured) {
        const { error: deleteError } = await supabase
          .from('events')
          .delete()
          .eq('id', id)
          .select('id')
          .single();
        if (deleteError) throw deleteError;
      } else {
        const current = getStoredEvents();
        const updated = current.filter((event) => String(event.id) !== String(id));
        if (updated.length === current.length) {
          throw new Error('Event was not found. Refresh the event list and try again.');
        }
        setStoredEvents(updated);
      }
      return true;
    } finally {
      setLoading(false);
    }
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
