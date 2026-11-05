'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useActivity } from '../../hooks/useActivity';
import { DATE_FILTERS } from '../../config/constants';
import { ROUTES } from '../../config/routes';
import LoadingSpinner from '../ui/LoadingSpinner';
import {
  Image,
  Inbox,
  Activity,
  ArrowRight,
} from 'lucide-react';

export default function Overview() {
  const { fetchOverviewStats, fetchActivityLog, loading } = useActivity();
  const [stats, setStats] = useState(null);
  const [recentEvents, setRecentEvents] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(DATE_FILTERS[1]); // 30 days

  useEffect(() => {
    fetchOverviewStats(selectedFilter.days).then(setStats);
    fetchActivityLog(selectedFilter.days).then((evts) => setRecentEvents(evts.slice(0, 8)));
  }, [fetchOverviewStats, fetchActivityLog, selectedFilter]);

  if (loading && !stats) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  return (
    <div>
      {/* Top Bar with Date Filter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: '4px' }}>Executive Dashboard</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
            Overview of field gallery content, volunteer applications, and activity.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {DATE_FILTERS.map((filter) => {
            const isSelected = selectedFilter.label === filter.label;
            return (
              <button
                key={filter.label}
                onClick={() => setSelectedFilter(filter)}
                style={{
                  padding: 'var(--space-1) var(--space-3)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--color-primary-500)' : 'var(--color-border)',
                  backgroundColor: isSelected ? 'var(--color-primary-500)' : 'var(--color-surface)',
                  color: isSelected ? '#fff' : 'var(--color-text-secondary)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-10)' }}>
        {/* Gallery Items */}
        <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: '600', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              Gallery Media
            </span>
            <Image size={20} color="var(--color-primary-600)" />
          </div>
          <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'bold', color: 'var(--color-text)', marginBottom: 'var(--space-2)' }}>
            {stats?.galleryTotal ?? 0}
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
            <span><strong>{stats?.galleryPublished ?? 0}</strong> Published</span>
            <span>•</span>
            <span><strong>{stats?.galleryDraft ?? 0}</strong> Drafts</span>
          </div>
          <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--color-neutral-100)' }}>
            <Link href={ROUTES.ADMIN_GALLERY} style={{ fontSize: 'var(--text-xs)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Manage Photos & Featured Showcase <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* New Submissions */}
        <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: '600', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              Pending Inquiries
            </span>
            <Inbox size={20} color="var(--color-secondary-600)" />
          </div>
          <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'bold', color: 'var(--color-text)', marginBottom: 'var(--space-2)' }}>
            {stats?.newSubmissions ?? 0}
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
            Volunteer applications & messages awaiting review
          </div>
          <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--color-neutral-100)' }}>
            <Link href={ROUTES.ADMIN_SUBMISSIONS} style={{ fontSize: 'var(--text-xs)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Open Inbox <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Audit Events */}
        <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: '600', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              Operational Activity
            </span>
            <Activity size={20} color="var(--color-accent-600)" />
          </div>
          <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'bold', color: 'var(--color-text)', marginBottom: 'var(--space-2)' }}>
            {stats?.recentEventsCount ?? 0}
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
            Actions recorded during {selectedFilter.label.toLowerCase()}
          </div>
          <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--color-neutral-100)' }}>
            <Link href={ROUTES.ADMIN_ACTIVITY} style={{ fontSize: 'var(--text-xs)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View Activity Log <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Operational Log Preview */}
      <section style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <h2 style={{ fontSize: 'var(--text-lg)' }}>Recent Activity</h2>
          <Link href={ROUTES.ADMIN_ACTIVITY} style={{ fontSize: 'var(--text-xs)', fontWeight: '500' }}>
            View Full Log
          </Link>
        </div>

        {recentEvents.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {recentEvents.map((evt) => (
              <div
                key={evt.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 'var(--space-3)',
                  backgroundColor: 'var(--color-bg-alt)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-xs)',
                }}
              >
                <div>
                  <span style={{ fontWeight: '600', color: 'var(--color-text)', marginRight: 'var(--space-2)' }}>
                    {evt.event_type}
                  </span>
                  <span style={{ color: 'var(--color-text-muted)' }}>
                    {evt.route || 'admin action'}
                  </span>
                </div>
                <span style={{ color: 'var(--color-text-muted)' }}>
                  {new Date(evt.created_at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)', textAlign: 'center', padding: 'var(--space-6)' }}>
            No recent activity recorded in this timeframe.
          </p>
        )}
      </section>
    </div>
  );
}
