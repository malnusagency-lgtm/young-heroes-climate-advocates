import { useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { UPLOAD_CONFIG } from '../config/constants';

export const INITIAL_FALLBACK_ITEMS = [
  {
    id: 'ycha-photo-1',
    image_url: '/gallery/WhatsApp Image 2026-01-13 at 8.13.24 PM.jpeg',
    image_path: 'WhatsApp Image 2026-01-13 at 8.13.24 PM.jpeg',
    title: 'Youth Environmental Champions',
    caption: 'Young volunteers in safety vests assembled for a community cleanup and tree planting initiative.',
    alt_text: 'Youth volunteers in safety gear assembled for an environmental drive',
    category: 'Community',
    event_association: 'Community Clean-up & Reforestation',
    is_published: true,
    is_featured: true,
    sort_order: 1,
    created_at: '2026-01-13T20:13:24Z',
  },
  {
    id: 'ycha-photo-2',
    image_url: '/gallery/WhatsApp Image 2026-01-13 at 8.22.35 PM.jpeg',
    image_path: 'WhatsApp Image 2026-01-13 at 8.22.35 PM.jpeg',
    title: 'Student Climate Literacy Workshop',
    caption: 'Students actively participating in an outdoor environmental education and eco-literacy registration session.',
    alt_text: 'Students taking part in an interactive climate education workshop',
    category: 'Training',
    event_association: 'Eco-Literacy Outreach',
    is_published: true,
    is_featured: true,
    sort_order: 2,
    created_at: '2026-01-13T20:22:35Z',
  },
  {
    id: 'ycha-photo-3',
    image_url: '/gallery/WhatsApp Image 2026-01-13 at 8.54.24 PM.jpeg',
    image_path: 'WhatsApp Image 2026-01-13 at 8.54.24 PM.jpeg',
    title: 'Indigenous Tree Planting Initiative',
    caption: 'Students and youth volunteers planting indigenous tree seedlings in prepared ground plots to restore natural canopy.',
    alt_text: 'Youth planting native tree seedlings into fertile soil',
    category: 'Environment',
    event_association: 'National Tree Growing Campaign',
    is_published: true,
    is_featured: true,
    sort_order: 3,
    created_at: '2026-01-13T20:54:24Z',
  },
  {
    id: 'ycha-photo-4',
    image_url: '/gallery/WhatsApp Image 2026-01-13 at 8.54.25 PM.jpeg',
    image_path: 'WhatsApp Image 2026-01-13 at 8.54.25 PM.jpeg',
    title: 'Community Seedling Care & Watering',
    caption: 'Youth volunteers planting and carefully watering newly planted saplings to maximize survival rate.',
    alt_text: 'Volunteers tending and watering fresh tree saplings',
    category: 'Environment',
    event_association: 'Urban Forest Stewardship',
    is_published: true,
    is_featured: false,
    sort_order: 4,
    created_at: '2026-01-13T20:54:25Z',
  },
  {
    id: 'ycha-photo-5',
    image_url: '/gallery/WhatsApp Image 2026-01-13 at 8.54.27 PM.jpeg',
    image_path: 'WhatsApp Image 2026-01-13 at 8.54.27 PM.jpeg',
    title: 'School Tree Care Stewardship',
    caption: 'Students watering and nurturing a young tree with watering cans as part of our school eco-clubs.',
    alt_text: 'Student caring for a newly planted tree on school grounds',
    category: 'Environment',
    event_association: 'Green Schools Project',
    is_published: true,
    is_featured: false,
    sort_order: 5,
    created_at: '2026-01-13T20:54:27Z',
  },
  {
    id: 'ycha-photo-6',
    image_url: '/gallery/WhatsApp Image 2026-01-14 at 1.02.45 AM (1).jpeg',
    image_path: 'WhatsApp Image 2026-01-14 at 1.02.45 AM (1).jpeg',
    title: 'UN Environment Assembly Youth Delegation',
    caption: 'YHCA youth delegates representing grassroots African voices at the United Nations Environment Assembly in Nairobi.',
    alt_text: 'Youth delegates in formal attire at the UN Environment Assembly',
    category: 'Advocacy',
    event_association: 'UNEA Youth Constituency',
    is_published: true,
    is_featured: true,
    sort_order: 6,
    created_at: '2026-01-14T01:02:45Z',
  },
  {
    id: 'ycha-photo-7',
    image_url: '/gallery/WhatsApp Image 2026-01-14 at 1.02.45 AM.jpeg',
    image_path: 'WhatsApp Image 2026-01-14 at 1.02.45 AM.jpeg',
    title: 'International Youth Climate Advocates',
    caption: 'Young climate advocates from diverse grassroots backgrounds collaborating at a global environmental conference.',
    alt_text: 'International youth delegates engaged in climate dialogue',
    category: 'Advocacy',
    event_association: 'Global South Youth Forum',
    is_published: true,
    is_featured: false,
    sort_order: 7,
    created_at: '2026-01-14T01:02:45Z',
  },
  {
    id: 'ycha-photo-8',
    image_url: '/gallery/WhatsApp Image 2026-01-14 at 1.02.46 AM (1).jpeg',
    image_path: 'WhatsApp Image 2026-01-14 at 1.02.46 AM (1).jpeg',
    title: 'Community Tree Planting Ceremony',
    caption: 'Community elders, school pupils, and youth coming together for a collective reforestation and planting ceremony.',
    alt_text: 'Community members gathered around planting seedlings',
    category: 'Environment',
    event_association: 'Intergenerational Reforestation Drive',
    is_published: true,
    is_featured: false,
    sort_order: 8,
    created_at: '2026-01-14T01:02:46Z',
  },
  {
    id: 'ycha-photo-9',
    image_url: '/gallery/WhatsApp Image 2026-01-14 at 1.02.46 AM.jpeg',
    image_path: 'WhatsApp Image 2026-01-14 at 1.02.46 AM.jpeg',
    title: 'UN Youth Climate Networking',
    caption: 'YHCA representatives connecting with multilateral partners and diplomats at the UN Environment complex.',
    alt_text: 'Youth leaders greeting international partners at the UNEA',
    category: 'Advocacy',
    event_association: 'Multilateral Climate Partnerships',
    is_published: true,
    is_featured: false,
    sort_order: 9,
    created_at: '2026-01-14T01:02:46Z',
  },
  {
    id: 'ycha-photo-10',
    image_url: '/gallery/WhatsApp Image 2026-01-14 at 1.05.56 AM.jpeg',
    image_path: 'WhatsApp Image 2026-01-14 at 1.05.56 AM.jpeg',
    title: 'Reforestation Field Team',
    caption: 'Team of youth environmental advocates posing with freshly planted tree seedlings at a regional conservation site.',
    alt_text: 'Dedicated youth conservation team in the field with planted saplings',
    category: 'Environment',
    event_association: 'Riparian Buffer Restoration',
    is_published: true,
    is_featured: true,
    sort_order: 10,
    created_at: '2026-01-14T01:05:56Z',
  },
  {
    id: 'ycha-photo-11',
    image_url: '/gallery/WhatsApp Image 2026-01-14 at 1.07.18 AM.jpeg',
    image_path: 'WhatsApp Image 2026-01-14 at 1.07.18 AM.jpeg',
    title: 'Youth Climate Strategy Workshop',
    caption: 'Young leaders engaged in collaborative strategic planning, project design, and climate policy formulation.',
    alt_text: 'Group of young leaders working around a table with workshop notes',
    category: 'Training',
    event_association: 'Youth Leadership Academy',
    is_published: true,
    is_featured: false,
    sort_order: 11,
    created_at: '2026-01-14T01:07:18Z',
  },
  {
    id: 'ycha-photo-12',
    image_url: '/gallery/WhatsApp Image 2026-01-14 at 1.08.15 AM.jpeg',
    image_path: 'WhatsApp Image 2026-01-14 at 1.08.15 AM.jpeg',
    title: 'Regional Climate Summit Assembly',
    caption: 'Large gathering of environmental stakeholders, school representatives, and youth leaders at an outdoor climate summit.',
    alt_text: 'Gathering of delegates and community leaders at outdoor summit',
    category: 'Events',
    event_association: 'Regional Youth Climate Summit',
    is_published: true,
    is_featured: false,
    sort_order: 12,
    created_at: '2026-01-14T01:08:15Z',
  },
  {
    id: 'ycha-photo-13',
    image_url: '/gallery/WhatsApp Image 2026-01-14 at 1.15.01 AM (1).jpeg',
    image_path: 'WhatsApp Image 2026-01-14 at 1.15.01 AM (1).jpeg',
    title: 'NTV Kenya Media Interview on Climate Action',
    caption: 'YHCA youth advocates participating in a live broadcast interview with NTV Kenya on youth-led ecological stewardship.',
    alt_text: 'Youth advocate speaking into microphone during television interview',
    category: 'Advocacy',
    event_association: 'National Media Awareness Campaign',
    is_published: true,
    is_featured: true,
    sort_order: 13,
    created_at: '2026-01-14T01:15:01Z',
  },
  {
    id: 'ycha-photo-14',
    image_url: '/gallery/WhatsApp Image 2026-01-14 at 1.15.01 AM.jpeg',
    image_path: 'WhatsApp Image 2026-01-14 at 1.15.01 AM.jpeg',
    title: 'Media Partnership for Environmental Awareness',
    caption: 'Youth climate leaders collaborating with broadcast media partners at NTV studios to amplify environmental literacy.',
    alt_text: 'YCHA advocates posing with journalists and media hosts',
    category: 'Advocacy',
    event_association: 'Press & Media Engagement',
    is_published: true,
    is_featured: false,
    sort_order: 14,
    created_at: '2026-01-14T01:15:01Z',
  },
  {
    id: 'ycha-photo-15',
    image_url: '/gallery/WhatsApp Image 2026-01-14 at 1.15.02 AM (1).jpeg',
    image_path: 'WhatsApp Image 2026-01-14 at 1.15.02 AM (1).jpeg',
    title: 'Youth Voices in National Media',
    caption: 'Three YHCA representatives in the television studio advocating for youth inclusion in environmental policy.',
    alt_text: 'Young advocates in studio before live broadcast',
    category: 'Advocacy',
    event_association: 'Youth in Public Policy',
    is_published: true,
    is_featured: false,
    sort_order: 15,
    created_at: '2026-01-14T01:15:02Z',
  },
  {
    id: 'ycha-photo-16',
    image_url: '/gallery/WhatsApp Image 2026-01-14 at 1.15.02 AM.jpeg',
    image_path: 'WhatsApp Image 2026-01-14 at 1.15.02 AM.jpeg',
    title: 'Broadcast Advocacy Panel',
    caption: 'Advocates discussing practical local solutions to air quality and deforestation challenges during national broadcast.',
    alt_text: 'Studio discussion on climate action with youth panel',
    category: 'Advocacy',
    event_association: 'Climate Policy Broadcasts',
    is_published: true,
    is_featured: false,
    sort_order: 16,
    created_at: '2026-01-14T01:15:02Z',
  },
  {
    id: 'ycha-photo-17',
    image_url: '/gallery/WhatsApp Image 2026-01-14 at 12.31.17 AM (1).jpeg',
    image_path: 'WhatsApp Image 2026-01-14 at 12.31.17 AM (1).jpeg',
    title: 'Clean Air Nairobi Brass March',
    caption: 'Community brass band leading the Clean Air Nairobi youth march to raise awareness about urban air pollution.',
    alt_text: 'Brass band performing in uniform during clean air street demonstration',
    category: 'Events',
    event_association: 'Clean Air Nairobi Campaign',
    is_published: true,
    is_featured: true,
    sort_order: 17,
    created_at: '2026-01-14T00:31:17Z',
  },
  {
    id: 'ycha-photo-18',
    image_url: '/gallery/WhatsApp Image 2026-01-14 at 12.31.17 AM.jpeg',
    image_path: 'WhatsApp Image 2026-01-14 at 12.31.17 AM.jpeg',
    title: 'Clean Air Nairobi Youth Procession',
    caption: 'Youth advocates marching through Nairobi with banners demanding cleaner air, health equity, and sustainable transit.',
    alt_text: 'Crowd of youth marching with Clean Air Nairobi banners',
    category: 'Events',
    event_association: 'UrbanBetter Clean Air March',
    is_published: true,
    is_featured: false,
    sort_order: 18,
    created_at: '2026-01-14T00:31:17Z',
  },
  {
    id: 'ycha-photo-19',
    image_url: '/gallery/WhatsApp Image 2026-01-14 at 12.31.38 AM.jpeg',
    image_path: 'WhatsApp Image 2026-01-14 at 12.31.38 AM.jpeg',
    title: 'Clean Air Awareness Celebration',
    caption: 'High-energy community mobilization uniting youth and local residents around clean air advocacy and public health.',
    alt_text: 'Young marchers cheering and holding placards in city street',
    category: 'Community',
    event_association: 'Clean Air Citizen Action',
    is_published: true,
    is_featured: false,
    sort_order: 19,
    created_at: '2026-01-14T00:31:38Z',
  },
  {
    id: 'ycha-photo-20',
    image_url: '/gallery/WhatsApp Image 2026-01-14 at 12.35.48 AM (1).jpeg',
    image_path: 'WhatsApp Image 2026-01-14 at 12.35.48 AM (1).jpeg',
    title: 'Citizens Rally for Environmental Action',
    caption: 'Hundreds of community members and student advocates gathered for the UrbanBetter clean air and climate campaign.',
    alt_text: 'Mass crowd gathered at public outdoor rally',
    category: 'Community',
    event_association: 'City-Wide Environmental Assembly',
    is_published: true,
    is_featured: false,
    sort_order: 20,
    created_at: '2026-01-14T00:35:48Z',
  },
  {
    id: 'ycha-photo-21',
    image_url: '/gallery/WhatsApp Image 2026-01-14 at 12.35.48 AM.jpeg',
    image_path: 'WhatsApp Image 2026-01-14 at 12.35.48 AM.jpeg',
    title: 'Step by Step, Breath by Breath Campaign',
    caption: 'Campaign banner at the Clean Air rally emphasizing collective steps toward breathable cities across East Africa.',
    alt_text: 'Close-up of campaign banner reading Clean Air Nairobi',
    category: 'Advocacy',
    event_association: 'Clean Air Nairobi Citizens',
    is_published: true,
    is_featured: false,
    sort_order: 21,
    created_at: '2026-01-14T00:35:48Z',
  },
  {
    id: 'ycha-photo-22',
    image_url: '/gallery/WhatsApp Image 2026-01-14 at 12.52.12 AM.jpeg',
    image_path: 'WhatsApp Image 2026-01-14 at 12.52.12 AM.jpeg',
    title: 'Youth Climate Leadership Graduation',
    caption: 'Graduating cohort of youth climate fellows celebrating completion of their ecological leadership training.',
    alt_text: 'Enthusiastic group of young trainees smiling and celebrating',
    category: 'Training',
    event_association: 'Advocacy Fellows Cohort',
    is_published: true,
    is_featured: true,
    sort_order: 22,
    created_at: '2026-01-14T00:52:12Z',
  },
  {
    id: 'ycha-photo-23',
    image_url: '/gallery/WhatsApp Image 2026-01-14 at 12.52.50 AM (1).jpeg',
    image_path: 'WhatsApp Image 2026-01-14 at 12.52.50 AM (1).jpeg',
    title: 'Policy and Governance Training Session',
    caption: 'Advocates receiving in-depth training on environmental legislation, climate treaties, and local government engagement.',
    alt_text: 'Attendees seated in conference hall listening to workshop facilitators',
    category: 'Training',
    event_association: 'Environmental Law & Policy Workshop',
    is_published: true,
    is_featured: false,
    sort_order: 23,
    created_at: '2026-01-14T00:52:50Z',
  },
  {
    id: 'ycha-photo-24',
    image_url: '/gallery/WhatsApp Image 2026-01-14 at 12.52.50 AM (2).jpeg',
    image_path: 'WhatsApp Image 2026-01-14 at 12.52.50 AM (2).jpeg',
    title: 'Youth Speaker Keynote Presentation',
    caption: 'Young YHCA advocate delivering a keynote presentation on grassroots conservation and student-led activism.',
    alt_text: 'Young female speaker presenting slides at climate conference',
    category: 'Training',
    event_association: 'Youth Keynote Series',
    is_published: true,
    is_featured: false,
    sort_order: 24,
    created_at: '2026-01-14T00:52:50Z',
  },
];

export const sanitizeItem = (item) => {
  if (!item) return item;
  const rawUrl = item.image_url || item.src;
  let safeUrl = rawUrl;
  if (rawUrl) {
    try {
      safeUrl = encodeURI(decodeURI(rawUrl));
    } catch {
      safeUrl = encodeURI(rawUrl);
    }
  }
  return {
    ...item,
    image_url: safeUrl || '/hero-bg.jpg',
    src: safeUrl || '/hero-bg.jpg',
  };
};

const withTimeout = (promise, ms = 3000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Gallery fetch timeout')), ms)),
  ]);
};

export const useGallery = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPublishedGallery = useCallback(async (category = 'All') => {
    if (!isSupabaseConfigured) {
      if (category && category !== 'All') {
        return INITIAL_FALLBACK_ITEMS.filter((i) => i.category === category).map(sanitizeItem);
      }
      return INITIAL_FALLBACK_ITEMS.map(sanitizeItem);
    }

    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('gallery_items')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (category && category !== 'All') {
        query = query.eq('category', category);
      }

      const { data, error: err } = await withTimeout(query, 3000);
      if (err) throw err;
      if (!data || data.length === 0) {
        if (category && category !== 'All') {
          return INITIAL_FALLBACK_ITEMS.filter((i) => i.category === category).map(sanitizeItem);
        }
        return INITIAL_FALLBACK_ITEMS.map(sanitizeItem);
      }
      return data.map(sanitizeItem);
    } catch (e) {
      console.warn('[Gallery] Fetch failed or timed out, using local verified records:', e.message);
      if (category && category !== 'All') {
        return INITIAL_FALLBACK_ITEMS.filter((i) => i.category === category).map(sanitizeItem);
      }
      return INITIAL_FALLBACK_ITEMS.map(sanitizeItem);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFeaturedGallery = useCallback(async () => {
    if (!isSupabaseConfigured) {
      return INITIAL_FALLBACK_ITEMS.filter((i) => i.is_featured).map(sanitizeItem);
    }

    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await withTimeout(
        supabase
          .from('gallery_items')
          .select('*')
          .eq('is_published', true)
          .eq('is_featured', true)
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false }),
        3000
      );

      if (err) throw err;
      if (!data || data.length === 0) {
        const { data: fallbackPublished } = await withTimeout(
          supabase
            .from('gallery_items')
            .select('*')
            .eq('is_published', true)
            .limit(6),
          2000
        );
        return (fallbackPublished && fallbackPublished.length > 0
          ? fallbackPublished
          : INITIAL_FALLBACK_ITEMS.filter((i) => i.is_featured)).map(sanitizeItem);
      }
      return data.map(sanitizeItem);
    } catch (e) {
      console.warn('[Featured Gallery] Using verified local records:', e.message);
      return INITIAL_FALLBACK_ITEMS.filter((i) => i.is_featured).map(sanitizeItem);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllGallery = useCallback(async () => {
    if (!isSupabaseConfigured) return INITIAL_FALLBACK_ITEMS.map(sanitizeItem);
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('gallery_items')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (err) throw err;
      if (!data || data.length === 0) return INITIAL_FALLBACK_ITEMS.map(sanitizeItem);
      return data.map(sanitizeItem);
    } catch {
      return INITIAL_FALLBACK_ITEMS.map(sanitizeItem);
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadGalleryImage = async (file) => {
    if (!isSupabaseConfigured) {
      return {
        filePath: `local/${file.name}`,
        publicUrl: URL.createObjectURL(file),
      };
    }

    if (!UPLOAD_CONFIG.allowedTypes.includes(file.type)) {
      throw new Error(`Invalid file type. Allowed formats: ${UPLOAD_CONFIG.allowedTypes.join(', ')}`);
    }
    if (file.size > UPLOAD_CONFIG.maxSizeBytes) {
      throw new Error('File exceeds maximum size of 5MB.');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `items/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(filePath, file, { cacheControl: '3600', upsert: false });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('gallery')
      .getPublicUrl(filePath);

    return { filePath, publicUrl };
  };

  const createGalleryItem = async (itemData) => {
    if (!isSupabaseConfigured) {
      const newItem = {
        id: `local-${Date.now()}`,
        created_at: new Date().toISOString(),
        ...itemData,
      };
      INITIAL_FALLBACK_ITEMS.unshift(newItem);
      return newItem;
    }

    const { data, error: err } = await supabase
      .from('gallery_items')
      .insert([itemData])
      .select()
      .single();

    if (err) throw err;
    return data;
  };

  const updateGalleryItem = async (id, updates) => {
    if (!isSupabaseConfigured) {
      const idx = INITIAL_FALLBACK_ITEMS.findIndex((i) => i.id === id);
      if (idx !== -1) {
        INITIAL_FALLBACK_ITEMS[idx] = { ...INITIAL_FALLBACK_ITEMS[idx], ...updates };
        return INITIAL_FALLBACK_ITEMS[idx];
      }
      return updates;
    }

    const { data, error: err } = await supabase
      .from('gallery_items')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (err) throw err;
    return data;
  };

  const toggleFeatured = async (id, currentStatus) => {
    return updateGalleryItem(id, { is_featured: !currentStatus });
  };

  const deleteGalleryItem = async (id, imagePath) => {
    if (!isSupabaseConfigured) {
      const idx = INITIAL_FALLBACK_ITEMS.findIndex((i) => i.id === id);
      if (idx !== -1) INITIAL_FALLBACK_ITEMS.splice(idx, 1);
      return;
    }

    const { error: err } = await supabase
      .from('gallery_items')
      .delete()
      .eq('id', id);

    if (err) throw err;

    if (imagePath && !imagePath.startsWith('local/')) {
      try {
        await supabase.storage.from('gallery').remove([imagePath]);
      } catch (storageErr) {
        console.warn('Storage cleanup failed:', storageErr);
      }
    }
  };

  return {
    loading,
    error,
    fetchPublishedGallery,
    fetchFeaturedGallery,
    fetchAllGallery,
    uploadGalleryImage,
    createGalleryItem,
    updateGalleryItem,
    toggleFeatured,
    deleteGalleryItem,
  };
};
