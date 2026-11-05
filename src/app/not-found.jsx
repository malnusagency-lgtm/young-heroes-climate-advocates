import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '../config/routes';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <span style={{ fontSize: '5rem', fontWeight: 900, color: '#0F4C3A', lineHeight: 1 }}>404</span>
      <h1 style={{ fontSize: '2rem', marginTop: '1rem', marginBottom: '1rem', color: '#0F4C3A' }}>
        Page Not Found
      </h1>
      <p style={{ maxWidth: '450px', color: '#4F5D75', marginBottom: '2rem' }}>
        The page you are looking for does not exist or may have been moved. Return to the homepage to continue exploring our climate initiatives.
      </p>
      <Link
        href={ROUTES.HOME}
        className="btn btn-primary"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.8rem 2rem',
          backgroundColor: '#0F4C3A',
          color: 'white',
          borderRadius: '8px',
          fontWeight: 700,
          textDecoration: 'none',
        }}
      >
        <ArrowLeft size={18} /> Return Home
      </Link>
    </div>
  );
}
