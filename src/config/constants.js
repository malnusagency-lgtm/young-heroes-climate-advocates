/**
 * Application-wide constants.
 * Verified values should include a source and date.
 * Unverified values are clearly marked.
 */

export const ORG = {
  name: 'Young Heroes Climate Advocates',
  shortName: 'YCHA',
  tagline: 'Empowering young people to lead climate action in their communities.',
  founder: 'Elizabeth Akinyi Ouma',
  email: null,
  phone: null,
  address: 'Kitengela, Kajiado County, Kenya',
  googleDriveArchiveUrl: 'https://drive.google.com/drive/folders/1mMI2p1uUds9mVDhOWG8ptW2g4HHDHnAn?usp=sharing',
  googlePhotosAlbumUrl: 'https://photos.app.goo.gl/ycha-field-archive',
};

/**
 * Designated administrative accounts (for admin portal access only).
 */
export const ADMIN_CREDENTIALS = {
  primaryEmail: 'elizabethakinyiouma46@gmail.com',
};

/**
 * Impact metrics — single source of truth.
 */
export const IMPACT_METRICS = [
  {
    id: 'youth-trained',
    label: 'Youth Trained',
    value: null,
    verified: false,
    source: 'Pending organization records',
    period: null,
    note: 'Awaiting verified count from YCHA leadership.',
  },
  {
    id: 'communities-reached',
    label: 'Communities Reached',
    value: null,
    verified: false,
    source: 'Pending organization records',
    period: null,
    note: 'Awaiting verified count from YCHA leadership.',
  },
  {
    id: 'trees-planted',
    label: 'Trees Planted',
    value: null,
    verified: false,
    source: 'Pending organization records',
    period: null,
    note: 'Awaiting verified count from YCHA leadership.',
  },
  {
    id: 'projects-completed',
    label: 'Projects Completed',
    value: null,
    verified: false,
    source: 'Pending organization records',
    period: null,
    note: 'Awaiting verified count from YCHA leadership.',
  },
];

/**
 * Gallery categories.
 */
export const GALLERY_CATEGORIES = [
  'All',
  'Environment',
  'Community',
  'Training',
  'Events',
  'Advocacy',
];

/**
 * Submission statuses.
 */
export const SUBMISSION_STATUS = {
  NEW: 'new',
  IN_REVIEW: 'in_review',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
};

/**
 * Allowed image upload types and size limits.
 */
export const UPLOAD_CONFIG = {
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  maxSizeBytes: 5 * 1024 * 1024, // 5 MB
  maxDimension: 4096,
};

/**
 * Date filter options for the admin dashboard.
 */
export const DATE_FILTERS = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 90 days', days: 90 },
  { label: 'All time', days: null },
];
