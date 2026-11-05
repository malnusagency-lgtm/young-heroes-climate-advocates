export default function manifest() {
  return {
    name: 'Young Heroes Climate Advocates',
    short_name: 'YCHA',
    description: 'Empowering young people to lead climate action in their communities across Africa.',
    start_url: '/',
    id: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0F4C3A',
    orientation: 'portrait-primary',
    scope: '/',
    icons: [
      {
        src: '/logo.jpeg',
        sizes: '192x192',
        type: 'image/jpeg',
        purpose: 'any',
      },
      {
        src: '/logo.jpeg',
        sizes: '512x512',
        type: 'image/jpeg',
        purpose: 'any maskable',
      },
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
    categories: ['education', 'environment', 'community'],
  };
}

