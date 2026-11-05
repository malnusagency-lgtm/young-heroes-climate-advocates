'use client';

import React, { useEffect, useState } from 'react';
import { useActivity } from '../../hooks/useActivity';
import { DATE_FILTERS } from '../../config/constants';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from '../ui/EmptyState';
import { Activity } from 'lucide-react';

export default function ActivityLog() {
  const { fetchActivityLog, loading } = useActivity();
  const [events, setEvents] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(DATE_FILTERS[1]); // 30 days
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchActivityLog(selectedFilter.days).then(setEvents);
  }, [fetchActivityLog, selectedFilter]);

  const filteredEvents = events.filter((e) => {
    if (categoryFilter === 'all') return true;
    return e.event_category === categoryFilter;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: '4px' }}>Activity & Audit Log</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
            Tamper-evident record of content modifications and system actions.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {DATE_FILTERS.map((filter) => (
            <button
              key={filter.label}
              onClick={() => setSelectedFilter(filter)}
              style={{
                padding: 'var(--space-1) var(--space-3)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid',
                borderColor: selectedFilter.label === filter.label ? 'var(--color-primary-500)' : 'var(--color-border)',
                backgroundColor: selectedFilter.label === filter.label ? 'var(--color-primary-500)' : 'var(--color-surface)',
                color: selectedFilter.label === filter.label ? '#fff' : 'var(--color-text-secondary)',
                fontSize: 'var(--text-xs)',
                cursor: 'pointer',
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category filters */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
        {['all', 'operational', 'admin', 'analytics'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            style={{
              padding: 'var(--space-1) var(--space-3)',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-border)',
              backgroundColor: categoryFilter === cat ? 'var(--color-neutral-800)' : 'var(--color-surface)',
              color: categoryFilter === cat ? '#ffffff' : 'var(--color-text-secondary)',
              fontSize: 'var(--text-xs)',
              textTransform: 'capitalize',
              cursor: 'pointer',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner message="Fetching activity logs..." />
      ) : filteredEvents.length > 0 ? (
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border)',
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 'var(--text-sm)' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-bg-alt)', borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: '600' }}>Timestamp (UTC)</th>
                <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: '600' }}>Event Type</th>
                <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: '600' }}>Category</th>
                <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: '600' }}>Route / Target</th>
                <th style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: '600' }}>Metadata</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((e) => (
                <tr key={e.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)' }}>
                    {new Date(e.created_at).toISOString().replace('T', ' ').substring(0, 19)}
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: '500' }}>
                    {e.event_type}
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '10px',
                        textTransform: 'uppercase',
                        fontWeight: '600',
                        backgroundColor:
                          e.event_category === 'admin'
                            ? '#fdf3e7'
                            : e.event_category === 'operational'
                            ? '#e8f5ec'
                            : '#e8f4fd',
                        color:
                          e.event_category === 'admin'
                            ? '#c17817'
                            : e.event_category === 'operational'
                            ? '#27ae60'
                            : '#2980b9',
                      }}
                    >
                      {e.event_category}
                    </span>
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--color-text-secondary)', fontSize: 'var(--text-xs)' }}>
                    {e.route || '—'}
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-text-muted)' }}>
                    {e.metadata ? JSON.stringify(e.metadata) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon={Activity}
          title="No Activity Events Recorded"
          description="Operational modifications and audit events will appear here once registered."
        />
      )}
    </div>
  );
}
