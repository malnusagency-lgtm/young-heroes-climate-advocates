'use client';

import React, { useEffect, useState } from 'react';
import { useEvents } from '../../hooks/useEvents';
import { EventItem } from '../../types';
import LoadingSpinner from '../ui/LoadingSpinner';
import Button from '../ui/Button';
import FormField from '../forms/FormField';
import { Calendar, Plus, Edit2, Trash2, MapPin, Clock, X, Check } from 'lucide-react';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function toDateInputValue(event: EventItem) {
  const month = MONTHS.indexOf(event.month.toUpperCase()) + 1;
  if (!month) return '';

  const value = `${event.year}-${String(month).padStart(2, '0')}-${String(event.date).padStart(2, '0')}`;
  const parsed = new Date(`${value}T00:00:00`);
  return !Number.isNaN(parsed.getTime()) &&
    parsed.getFullYear() === Number(event.year) &&
    parsed.getMonth() === month - 1 &&
    parsed.getDate() === Number(event.date)
    ? value
    : '';
}

export default function EventsManager() {
  const { fetchAllEvents, createEvent, updateEvent, deleteEvent, loading } = useEvents();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventDate, setEventDate] = useState('2026-04-15');
  const [formData, setFormData] = useState<Omit<EventItem, 'id'>>({
    date: '15',
    month: 'APR',
    year: '2026',
    title: '',
    location: '',
    time: '09:00 AM - 01:00 PM',
    type: 'Field Action',
    desc: '',
    color: '#0F4C3A',
    is_published: true,
  });

  const loadEvents = () => {
    fetchAllEvents().then(setEvents);
  };

  useEffect(() => {
    loadEvents();
  }, [fetchAllEvents]);

  const handleOpenAdd = () => {
    setEditingEvent(null);
    setEventDate('2026-04-15');
    setFormData({
      date: '15',
      month: 'APR',
      year: '2026',
      title: '',
      location: '',
      time: '09:00 AM - 01:00 PM',
      type: 'Field Action',
      desc: '',
      color: '#0F4C3A',
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ev: EventItem) => {
    setEditingEvent(ev);
    setEventDate(toDateInputValue(ev));
    setFormData({
      date: ev.date,
      month: ev.month,
      year: ev.year,
      title: ev.title,
      location: ev.location,
      time: ev.time,
      type: ev.type,
      desc: ev.desc,
      color: ev.color || '#0F4C3A',
      is_published: ev.is_published ?? true,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.location || !eventDate) {
      alert('Please provide an event title, location, and date.');
      return;
    }

    const [year, month, day] = eventDate.split('-');
    const eventData = {
      ...formData,
      date: String(Number(day)),
      month: MONTHS[Number(month) - 1],
      year,
    };

    try {
      if (editingEvent) {
        await updateEvent(editingEvent.id, eventData);
      } else {
        await createEvent(eventData);
      }
      setIsModalOpen(false);
      loadEvents();
    } catch (err: any) {
      alert(`Operation failed: ${err.message}`);
    }
  };

  const handleDelete = async (id: string | number, title: string) => {
    if (!window.confirm(`Permanently remove event "${title}"?`)) return;
    try {
      await deleteEvent(id);
      loadEvents();
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  return (
    <div>
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-6)',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
        }}
      >
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: '4px' }}>Events &amp; Actions Calendar</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
            Schedule and edit community restoration workshops and advocacy summits.
          </p>
        </div>
        <Button variant="primary" size="md" onClick={handleOpenAdd}>
          <Plus size={16} /> Add New Event
        </Button>
      </div>

      {loading && events.length === 0 ? (
        <LoadingSpinner message="Loading events calendar..." />
      ) : (
        <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
          {events.map((ev) => (
            <div
              key={ev.id}
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                borderLeft: `6px solid ${ev.color || '#0F4C3A'}`,
                padding: 'clamp(1rem, 3vw, 1.5rem)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              {/* Left Date + Info */}
              <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', minWidth: '240px', flex: 1 }}>
                <div
                  style={{
                    textAlign: 'center',
                    backgroundColor: 'var(--color-bg-alt)',
                    padding: '0.6rem 1rem',
                    borderRadius: '8px',
                    minWidth: '70px',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: ev.color, display: 'block' }}>
                    {ev.month}
                  </span>
                  <span style={{ fontSize: '1.6rem', fontWeight: 900, lineHeight: 1, color: '#1e293b' }}>
                    {ev.date}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>{ev.year}</span>
                </div>

                <div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '4px' }}>
                    <span
                      style={{
                        backgroundColor: `${ev.color || '#0F4C3A'}15`,
                        color: ev.color || '#0F4C3A',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                      }}
                    >
                      {ev.type}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 4px', color: 'var(--color-text)' }}>
                    {ev.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '0.8rem', color: '#64748b' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={13} /> {ev.location}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} /> {ev.time}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleOpenEdit(ev)}
                  style={{
                    padding: '0.45rem 0.8rem',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-surface)',
                    color: 'var(--color-text)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Edit2 size={14} /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(ev.id, ev.title)}
                  style={{
                    padding: '0.45rem 0.8rem',
                    borderRadius: '6px',
                    border: '1px solid #fecaca',
                    background: '#fef2f2',
                    color: '#dc2626',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Add / Edit */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(1.5rem, 4vw, 2rem)',
              maxWidth: '560px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                {editingEvent ? 'Edit Event' : 'Create New Event'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <FormField
                label="Event Title"
                name="title"
                required
                value={formData.title}
                onChange={(e: any) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Coastal Mangrove Restoration Drive"
              />

              <FormField
                label="Event Date"
                name="eventDate"
                type="date"
                required
                value={eventDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEventDate(e.target.value)}
              />

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                <FormField
                  label="Location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={(e: any) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Karura Forest, Nairobi"
                />
                <FormField
                  label="Time Range"
                  name="time"
                  required
                  value={formData.time}
                  onChange={(e: any) => setFormData({ ...formData, time: e.target.value })}
                  placeholder="09:00 AM - 01:00 PM"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <FormField
                  label="Action Category"
                  name="type"
                  type="select"
                  value={formData.type}
                  onChange={(e: any) => setFormData({ ...formData, type: e.target.value })}
                  options={['Field Action', 'Advocacy', 'Education', 'Policy']}
                />

                <FormField
                  label="Accent Color"
                  name="color"
                  type="select"
                  value={formData.color}
                  onChange={(e: any) => setFormData({ ...formData, color: e.target.value })}
                  options={[
                    { value: '#0F4C3A', label: 'Forest Green' },
                    { value: '#2E86AB', label: 'Ocean Blue' },
                    { value: '#F4D35E', label: 'Sunlight Yellow' },
                  ]}
                />
              </div>

              <FormField
                label="Short Description"
                name="desc"
                type="textarea"
                rows={3}
                required
                value={formData.desc}
                onChange={(e: any) => setFormData({ ...formData, desc: e.target.value })}
                placeholder="Key goals, participant instructions, and activities."
              />

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <Button variant="outline" size="md" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md">
                  <Check size={16} /> Save Event
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
