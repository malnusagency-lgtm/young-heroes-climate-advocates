'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS, ROUTES } from '../../config/routes';
import { ORG } from '../../config/constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-close menu whenever route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (href) => {
    setIsOpen(false);
    if (href) {
      router.push(href);
    }
  };

  return (
    <>
      <nav
        style={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 1)',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
          boxShadow: scrolled ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
          position: 'fixed',
          width: '100%',
          top: 0,
          zIndex: 1000,
          padding: scrolled ? '0.5rem 0' : '1rem 0',
          transition: 'all 0.3s ease',
        }}
        aria-label="Main Navigation"
      >
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Logo */}
          <Link
            href={ROUTES.HOME}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(ROUTES.HOME);
            }}
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.4rem, 2vw, 0.8rem)',
            }}
            aria-label={`${ORG.name} Home`}
          >
            <img
              src="/logo.jpeg"
              onError={(e) => {
                e.currentTarget.src = '/favicon.svg';
              }}
              alt="Young Heroes Logo"
              loading="eager"
              decoding="async"
              style={{
                height: scrolled ? '40px' : 'clamp(45px, 12vw, 60px)',
                width: 'auto',
                borderRadius: '4px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', whiteSpace: 'nowrap' }}>
              <span style={{
                fontSize: scrolled ? '1rem' : 'clamp(1.1rem, 4vw, 1.35rem)',
                fontWeight: 800,
                color: '#0F4C3A',
                lineHeight: 1.1,
                transition: 'font-size 0.3s ease',
              }}>
                Young Heroes
              </span>
              <span style={{
                fontSize: scrolled ? '0.65rem' : 'clamp(0.7rem, 2.5vw, 0.8rem)',
                fontWeight: 700,
                color: '#0F4C3A',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                opacity: 0.8,
                transition: 'font-size 0.3s ease',
              }}>
                Climate Advocates
              </span>
            </div>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="mobile-toggle"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            style={{
              cursor: 'pointer',
              color: '#0F4C3A',
              display: 'none',
              background: 'none',
              border: 'none',
              padding: '8px',
              minWidth: '44px',
              minHeight: '44px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Nav Links */}
          <div className={`nav-links ${isOpen ? 'active' : ''}`} style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
          }}>
            {(NAV_ITEMS || [
              { label: 'Home', path: '/' },
              { label: 'About', path: '/about' },
              { label: 'Programs', path: '/programs' },
              { label: 'Events', path: '/events' },
              { label: 'Gallery', path: '/gallery' },
              { label: 'Mission', path: '/mission' },
              { label: 'Donate', path: '/donate' },
            ]).map((item) => {
              const href = item.path || item.href;
              const isActive = pathname === href;
              return (
                <Link
                  key={item.label}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(href);
                  }}
                  style={{
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: isActive ? '#F4D35E' : '#0F4C3A',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href={ROUTES.JOIN}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(ROUTES.JOIN);
              }}
              className="btn btn-primary"
              style={{
                padding: '0.65rem 1.5rem',
                fontWeight: 800,
                backgroundColor: '#0F4C3A',
                color: 'white',
                borderRadius: '8px',
                display: 'inline-block',
                cursor: 'pointer',
              }}
            >
              Join Now
            </Link>
          </div>
        </div>

        <style>{`
          @media (max-width: 992px) {
            .nav-links {
              display: none !important;
              flex-direction: column;
              position: fixed;
              top: 0;
              right: 0;
              width: 100%;
              height: 100vh;
              background: white;
              padding: 5.5rem 1.5rem 3rem;
              z-index: 2000;
              text-align: center;
              overflow-y: auto;
              overflow-x: hidden;
            }
            .nav-links.active {
              display: flex !important;
              gap: 0.8rem;
              animation: slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            }
            @keyframes slideIn {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
            .mobile-toggle {
              display: inline-flex !important;
              z-index: 2001;
            }
            .nav-links a {
              font-size: clamp(1.15rem, 3.5vw, 1.45rem) !important;
              width: 100%;
              padding: 0.75rem 0;
              border-bottom: 1px solid #f1f5f9;
              touch-action: manipulation;
              -webkit-tap-highlight-color: transparent;
            }
            .nav-links .btn {
              font-size: 1.15rem !important;
              margin-top: 1rem;
              width: 100%;
              max-width: 280px;
              padding: 0.85rem 1.5rem !important;
              touch-action: manipulation;
              -webkit-tap-highlight-color: transparent;
            }
            .nav-links a:active, .nav-links .btn:active {
              transform: scale(0.97);
            }
          }
        `}</style>
      </nav>
      {/* Spacer so content isn't hidden behind fixed nav */}
      <div style={{ height: 'clamp(70px, 12vw, 100px)' }} />
    </>
  );
}
