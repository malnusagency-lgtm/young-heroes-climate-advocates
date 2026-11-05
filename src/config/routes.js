/**
 * Centralized route definitions.
 * Every navbar, footer, and programmatic navigation should reference
 * these constants instead of hardcoding path strings.
 */

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  MISSION: '/mission',
  PROGRAMS: '/programs',
  EVENTS: '/events',
  BLOG: '/blog',
  GALLERY: '/gallery',
  JOIN: '/join',
  DONATE: '/donate',
  CONTACT: '/contact',

  /* Admin */
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_ACTIVITY: '/admin/activity',
  ADMIN_GALLERY: '/admin/gallery',
  ADMIN_SUBMISSIONS: '/admin/submissions',
  ADMIN_SETTINGS: '/admin/settings',
};

/**
 * Main navigation items shown in the Navbar.
 */
export const NAV_ITEMS = [
  { label: 'Home', path: ROUTES.HOME },
  { label: 'About', path: ROUTES.ABOUT },
  { label: 'Programs', path: ROUTES.PROGRAMS },
  { label: 'Events', path: ROUTES.EVENTS },
  { label: 'Gallery', path: ROUTES.GALLERY },
  { label: 'Blog', path: ROUTES.BLOG },
  { label: 'Join Us', path: ROUTES.JOIN },
  { label: 'Contact', path: ROUTES.CONTACT },
];

/**
 * Footer navigation groups.
 */
export const FOOTER_NAV = {
  organization: [
    { label: 'About YCHA', path: ROUTES.ABOUT },
    { label: 'Our Mission', path: ROUTES.MISSION },
    { label: 'Programs', path: ROUTES.PROGRAMS },
  ],
  getInvolved: [
    { label: 'Join Us', path: ROUTES.JOIN },
    { label: 'Events', path: ROUTES.EVENTS },
    { label: 'Donate', path: ROUTES.DONATE },
  ],
  resources: [
    { label: 'Gallery', path: ROUTES.GALLERY },
    { label: 'Blog', path: ROUTES.BLOG },
    { label: 'Contact', path: ROUTES.CONTACT },
  ],
};

/**
 * Admin sidebar navigation items.
 */
export const ADMIN_NAV = [
  { label: 'Overview', path: ROUTES.ADMIN_DASHBOARD, icon: 'LayoutDashboard' },
  { label: 'Activity', path: ROUTES.ADMIN_ACTIVITY, icon: 'Activity' },
  { label: 'Gallery', path: ROUTES.ADMIN_GALLERY, icon: 'Image' },
  { label: 'Submissions', path: ROUTES.ADMIN_SUBMISSIONS, icon: 'Inbox' },
  { label: 'Settings', path: ROUTES.ADMIN_SETTINGS, icon: 'Settings' },
];

