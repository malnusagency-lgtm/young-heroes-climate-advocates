export interface GalleryItem {
  id: string | number;
  title: string;
  category: string;
  caption?: string;
  description?: string;
  image_url: string;
  src?: string;
  image_path?: string;
  event_association?: string;
  is_featured?: boolean;
  is_published?: boolean;
  created_at?: string;
}

export interface EventItem {
  id: string | number;
  date: string;
  month: string;
  year: string;
  title: string;
  location: string;
  time: string;
  type: string;
  desc: string;
  color: string;
  is_published?: boolean;
  created_at?: string;
}

export interface BlogPost {
  id?: string | number;
  image: string;
  category: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  readTime: string;
  date: string;
  is_published?: boolean;
  created_at?: string;
}

export interface Submission {
  id: string | number;
  full_name: string;
  email: string;
  phone?: string;
  age_group?: string;
  interests?: string[];
  subject?: string;
  message?: string;
  status?: 'new' | 'in_review' | 'completed' | 'archived';
  submission_type?: 'join' | 'contact';
  created_at?: string;
}

export interface SiteActivityEvent {
  id: string | number;
  event_type: string;
  event_category: string;
  metadata?: Record<string, any>;
  route?: string;
  created_at: string;
}

export interface OverviewStats {
  configured: boolean;
  galleryTotal: number;
  galleryPublished: number;
  galleryDraft: number;
  newSubmissions: number;
  recentEventsCount: number;
}

