'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { ADMIN_CREDENTIALS } from '../config/constants';

const AuthContext = createContext({
  user: null,
  session: null,
  isAdmin: false,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
});

const DESIGNATED_ADMIN_EMAIL = ADMIN_CREDENTIALS.primaryEmail.toLowerCase();
const DESIGNATED_ADMIN_PASS = 'YHCinfo@2026';
const LOCAL_SESSION_KEY = 'ycha_admin_session';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdminRole = async (userId, userEmail) => {
    // If user is the designated primary administrator, automatically authorize
    if (userEmail && userEmail.toLowerCase() === DESIGNATED_ADMIN_EMAIL) {
      setIsAdmin(true);
      return;
    }

    if (!isSupabaseConfigured || !userId) {
      setIsAdmin(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (error || !data) {
        setIsAdmin(false);
      } else {
        setIsAdmin(data.role === 'admin');
      }
    } catch {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    // 1. Check for stored local fallback admin session first
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem(LOCAL_SESSION_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.email?.toLowerCase() === DESIGNATED_ADMIN_EMAIL) {
            setUser(parsed);
            setSession({ user: parsed, access_token: 'local-admin-token' });
            setIsAdmin(true);
            setLoading(false);
            return;
          }
        }
      } catch {
        // ignore parse error
      }
    }

    // 2. Check Supabase session if configured
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id, session.user.email).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id, session.user.email);
      } else {
        // Check if local session is active before resetting
        const stored = typeof window !== 'undefined' ? sessionStorage.getItem(LOCAL_SESSION_KEY) : null;
        if (!stored) {
          setIsAdmin(false);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    // Check if credentials match the designated administrator
    const isDesignatedAdmin =
      cleanEmail === DESIGNATED_ADMIN_EMAIL &&
      password === DESIGNATED_ADMIN_PASS;

    // Try Supabase authentication first if configured
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        if (!error && data?.user) {
          setUser(data.user);
          setSession(data.session);
          await checkAdminRole(data.user.id, data.user.email);
          return data;
        }

        // If Supabase failed but credentials match designated admin, grant access
        if (isDesignatedAdmin) {
          const adminUser = {
            id: 'admin-elizabeth-ycha',
            email: DESIGNATED_ADMIN_EMAIL,
            role: 'admin',
            user_metadata: { name: 'Elizabeth Akinyi Ouma', role: 'admin' },
          };
          setUser(adminUser);
          setSession({ user: adminUser, access_token: 'admin-token' });
          setIsAdmin(true);
          if (typeof window !== 'undefined') {
            sessionStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(adminUser));
          }
          return { user: adminUser, session: { user: adminUser } };
        }

        throw error;
      } catch (err) {
        if (isDesignatedAdmin) {
          const adminUser = {
            id: 'admin-elizabeth-ycha',
            email: DESIGNATED_ADMIN_EMAIL,
            role: 'admin',
            user_metadata: { name: 'Elizabeth Akinyi Ouma', role: 'admin' },
          };
          setUser(adminUser);
          setSession({ user: adminUser, access_token: 'admin-token' });
          setIsAdmin(true);
          if (typeof window !== 'undefined') {
            sessionStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(adminUser));
          }
          return { user: adminUser, session: { user: adminUser } };
        }
        throw err;
      }
    } else {
      // Supabase not configured: allow designated administrator
      if (isDesignatedAdmin) {
        const adminUser = {
          id: 'admin-elizabeth-ycha',
          email: DESIGNATED_ADMIN_EMAIL,
          role: 'admin',
          user_metadata: { name: 'Elizabeth Akinyi Ouma', role: 'admin' },
        };
        setUser(adminUser);
        setSession({ user: adminUser, access_token: 'admin-token' });
        setIsAdmin(true);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(adminUser));
        }
        return { user: adminUser, session: { user: adminUser } };
      }
      throw new Error('Invalid administrative credentials.');
    }
  };

  const signOut = async () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(LOCAL_SESSION_KEY);
    }
    if (isSupabaseConfigured) {
      await supabase.auth.signOut().catch(() => {});
    }
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
