import { useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { BlogPost } from '../types';

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 1,
    image: '/hero-bg.jpg',
    category: 'Conservation',
    title: 'The Silent Growth: 10,000 Trees in Kilifi',
    excerpt: 'How a community-led youth nursery transformed a degraded coastline into a thriving indigenous forest ecosystem.',
    content: 'Over the past six months, YCHA grassroots chapters in coastal Kilifi spearheaded an ambitious indigenous mangrove and agroforestry drive. Working directly with local schools and village elders, our youth volunteers established three decentralized seed nurseries, propagating over 10,000 native saplings. Systematic soil moisture tracking and weekly watering rotations led to an unprecedented 89% survival rate across restored parcels.',
    author: 'Field Conservation Team',
    readTime: '5 min read',
    date: 'Jan 2026',
    is_published: true,
  },
  {
    id: 2,
    image: '/gallery/WhatsApp%20Image%202026-01-14%20at%201.02.46%20AM.jpeg',
    category: 'Policy',
    title: 'Youth Voices at the Regional Climate Assembly',
    excerpt: 'Our youth delegates presented an actionable roadmap for youth eco-literacy and decentralized tree nursery support.',
    content: 'At the recent regional climate consultative summit, five YCHA delegates delivered frontline field data demonstrating that grassroots youth programs deliver measurable ecological outcomes at a fraction of bureaucratic overhead. The resolution calling for dedicated civic tree-nursery allotments was successfully adopted into the summit outcome document.',
    author: 'Policy Advocacy Lab',
    readTime: '8 min read',
    date: 'Dec 2025',
    is_published: true,
  },
  {
    id: 3,
    image: '/gallery/WhatsApp%20Image%202026-01-14%20at%2012.31.38%20AM.jpeg',
    category: 'Education',
    title: 'Clean Air Nairobi: Stepping Up for Urban Health',
    excerpt: 'Over 500 students and youth allies joined hands in Nairobi to advocate for breathable air and street canopy expansion.',
    content: 'Air quality sensors deployed across primary school zones revealed PM2.5 levels spiking during peak commuter hours. In response, student ambassadors organized the Clean Air March, presenting municipal authorities with a comprehensive petition for buffer tree belts and low-emission school transit zones.',
    author: 'Youth Mobilization Hub',
    readTime: '4 min read',
    date: 'Nov 2025',
    is_published: true,
  },
];

const LOCAL_STORAGE_KEY = 'ycha_dynamic_blogs';

export const useBlogs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStoredBlogs = (): BlogPost[] => {
    if (typeof window === 'undefined') return INITIAL_BLOGS;
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_BLOGS;
  };

  const setStoredBlogs = (blogs: BlogPost[]) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(blogs));
      } catch {
        // ignore
      }
    }
  };

  const fetchAllBlogs = useCallback(async (): Promise<BlogPost[]> => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured) {
      setLoading(false);
      return getStoredBlogs();
    }

    try {
      const queryPromise = supabase
        .from('blog_posts')
        .select('*')
        .order('id', { ascending: true });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Blog query timed out')), 4000)
      );

      const { data, error: err } = (await Promise.race([queryPromise, timeoutPromise])) as any;

      if (err || !data || data.length === 0) {
        return getStoredBlogs();
      }

      return data as BlogPost[];
    } catch {
      return getStoredBlogs();
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPublishedBlogs = useCallback(async (): Promise<BlogPost[]> => {
    const all = await fetchAllBlogs();
    return all.filter((b) => b.is_published !== false);
  }, [fetchAllBlogs]);

  const createBlog = async (blogData: Omit<BlogPost, 'id'>) => {
    setLoading(true);
    const newId = Date.now();
    const newBlog: BlogPost = { ...blogData, id: newId, is_published: blogData.is_published ?? true };

    const current = getStoredBlogs();
    const updated = [newBlog, ...current];
    setStoredBlogs(updated);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('blog_posts').insert([newBlog]);
      } catch {
        // Saved locally
      }
    }

    setLoading(false);
    return newBlog;
  };

  const updateBlog = async (id: string | number, blogData: Partial<BlogPost>) => {
    setLoading(true);
    const current = getStoredBlogs();
    const updated = current.map((b) => (String(b.id) === String(id) ? { ...b, ...blogData } : b));
    setStoredBlogs(updated);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('blog_posts').update(blogData).eq('id', id);
      } catch {
        // Saved locally
      }
    }

    setLoading(false);
    return updated.find((b) => String(b.id) === String(id));
  };

  const deleteBlog = async (id: string | number) => {
    setLoading(true);
    const current = getStoredBlogs();
    const updated = current.filter((b) => String(b.id) !== String(id));
    setStoredBlogs(updated);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('blog_posts').delete().eq('id', id);
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
    fetchAllBlogs,
    fetchPublishedBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
  };
};

