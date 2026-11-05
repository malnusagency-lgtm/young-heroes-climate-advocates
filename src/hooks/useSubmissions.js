import { useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../config/supabase';

export const useSubmissions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSubmissions = useCallback(async (type = 'all', status = 'all') => {
    if (!isSupabaseConfigured) return [];
    setLoading(true);
    setError(null);
    try {
      const results = [];

      if (type === 'all' || type === 'join') {
        let joinQuery = supabase.from('join_submissions').select('*');
        if (status !== 'all') joinQuery = joinQuery.eq('status', status);
        const { data: joinData, error: joinErr } = await joinQuery.order('created_at', { ascending: false });
        if (joinErr) throw joinErr;
        (joinData || []).forEach(item => results.push({ ...item, submission_type: 'join' }));
      }

      if (type === 'all' || type === 'contact') {
        let contactQuery = supabase.from('contact_submissions').select('*');
        if (status !== 'all') contactQuery = contactQuery.eq('status', status);
        const { data: contactData, error: contactErr } = await contactQuery.order('created_at', { ascending: false });
        if (contactErr) throw contactErr;
        (contactData || []).forEach(item => results.push({ ...item, submission_type: 'contact' }));
      }

      results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      return results;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSubmissionStatus = async (type, id, status) => {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured.');
    const table = type === 'join' ? 'join_submissions' : 'contact_submissions';
    const { data, error: err } = await supabase
      .from(table)
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (err) throw err;
    return data;
  };

  const submitJoinForm = async (formData) => {
    if (!isSupabaseConfigured) throw new Error('Service is not currently configured for online submissions.');
    const { data, error: err } = await supabase
      .from('join_submissions')
      .insert([formData])
      .select()
      .single();

    if (err) throw err;
    return data;
  };

  const submitContactForm = async (formData) => {
    if (!isSupabaseConfigured) throw new Error('Service is not currently configured for online submissions.');
    const { data, error: err } = await supabase
      .from('contact_submissions')
      .insert([formData])
      .select()
      .single();

    if (err) throw err;
    return data;
  };

  return {
    loading,
    error,
    fetchSubmissions,
    updateSubmissionStatus,
    submitJoinForm,
    submitContactForm,
  };
};

