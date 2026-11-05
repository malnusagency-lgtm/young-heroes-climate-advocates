'use client';

import React, { useEffect, useState } from 'react';
import { useSubmissions } from '../../hooks/useSubmissions';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from '../ui/EmptyState';
import StatusBadge from '../ui/StatusBadge';
import SubmissionDetail from './SubmissionDetail';
import { Inbox, Search } from 'lucide-react';

export default function SubmissionsInbox() {
  const { fetchSubmissions, updateSubmissionStatus, loading } = useSubmissions();
  const [submissions, setSubmissions] = useState([]);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const loadSubmissions = () => {
    fetchSubmissions(typeFilter, statusFilter).then(setSubmissions);
  };

  useEffect(() => {
    loadSubmissions();
  }, [fetchSubmissions, typeFilter, statusFilter]);

  const handleStatusChange = async (type, id, newStatus) => {
    try {
      await updateSubmissionStatus(type, id, newStatus);
      loadSubmissions();
      setSelectedSubmission(null);
    } catch (err) {
      alert(`Status update failed: ${err.message}`);
    }
  };

  const filteredSubmissions = submissions.filter((s) => {
    const matchesSearch =
      s.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: '4px' }}>Submissions & Inquiries</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
            Review volunteer join applications and community messages.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            placeholder="Search by applicant name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: 'var(--space-2) var(--space-3) var(--space-2) 36px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              fontSize: 'var(--text-sm)',
            }}
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={{ padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', fontSize: 'var(--text-sm)' }}
        >
          <option value="all">Type: All</option>
          <option value="join">Volunteer Applications</option>
          <option value="contact">Contact Messages</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', fontSize: 'var(--text-sm)' }}
        >
          <option value="all">Status: All</option>
          <option value="new">New</option>
          <option value="in_review">In Review</option>
          <option value="completed">Completed</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {loading && submissions.length === 0 ? (
        <LoadingSpinner message="Retrieving submissions..." />
      ) : filteredSubmissions.length > 0 ? (
        <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 'var(--text-sm)' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-bg-alt)', borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ padding: 'var(--space-3) var(--space-4)' }}>Date</th>
                <th style={{ padding: 'var(--space-3) var(--space-4)' }}>Type</th>
                <th style={{ padding: 'var(--space-3) var(--space-4)' }}>Applicant / Contact</th>
                <th style={{ padding: 'var(--space-3) var(--space-4)' }}>Details</th>
                <th style={{ padding: 'var(--space-3) var(--space-4)' }}>Status</th>
                <th style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.map((s) => (
                <tr
                  key={s.id}
                  style={{ borderBottom: '1px solid var(--color-border-light)', cursor: 'pointer' }}
                  onClick={() => setSelectedSubmission(s)}
                >
                  <td style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)' }}>
                    {new Date(s.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: '600', color: s.submission_type === 'join' ? 'var(--color-primary-600)' : 'var(--color-accent-600)' }}>
                      {s.submission_type === 'join' ? 'Volunteer' : 'Contact'}
                    </span>
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                    <div style={{ fontWeight: '600', color: 'var(--color-text)' }}>{s.full_name}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{s.email}</div>
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', maxWidth: '240px' }}>
                    <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                      {s.subject || s.message || (s.interests ? s.interests.join(', ') : '—')}
                    </span>
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                    <StatusBadge status={s.status} />
                  </td>
                  <td style={{ padding: 'var(--space-3) var(--space-4)', textAlign: 'right' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSubmission(s);
                      }}
                      style={{ background: 'transparent', border: 'none', color: 'var(--color-primary-600)', cursor: 'pointer', fontSize: 'var(--text-xs)', fontWeight: '600' }}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon={Inbox}
          title="No Submissions Found"
          description="Inquiries and volunteer forms submitted through public pages will arrive here."
        />
      )}

      {selectedSubmission && (
        <SubmissionDetail
          submission={selectedSubmission}
          isOpen={Boolean(selectedSubmission)}
          onClose={() => setSelectedSubmission(null)}
          onUpdateStatus={handleStatusChange}
        />
      )}
    </div>
  );
}
