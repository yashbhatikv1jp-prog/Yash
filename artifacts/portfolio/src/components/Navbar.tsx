import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
  { href: '/',             label: 'Home' },
  { href: '/about',        label: 'About' },
  { href: '/skills',       label: 'Skills' },
  { href: '/projects',     label: 'Projects' },
  { href: '/achievements', label: 'Achievements' },
  { href: '/contact',      label: 'Contact' },
];

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location]);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Desktop / Tablet Navbar ── */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          padding: scrolled ? '0' : '0',
          transition: 'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
           background: 'rgba(255,255,255,0.70)',
           backdropFilter: 'blur(14px) saturate(160%)',
          WebkitBackdropFilter: 'blur(24px) saturate(160%)',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid transparent',
           boxShadow: scrolled ? '0 4px 30px rgba(15,23,42,0.14)' : '0 2px 20px rgba(15,23,42,0.06)',
        }}
      >
        <div
          className="container-base"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 64,
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 36, height: 36,
                  borderRadius: 10,
                  background: 'var(--grad)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 16, color: '#fff',
                  letterSpacing: '-0.04em',
                  boxShadow: '0 0 16px var(--cyan-a20)',
                  flexShrink: 0,
                }}
              >
                YB
              </div>
              <span
                style={{
                  fontWeight: 700, fontSize: 16,
                  color: 'var(--text)',
                  letterSpacing: '-0.02em',
                  display: 'none',
                }}
                className="sm:block"
              >
                Yash Bhati
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav
            className="desktop-nav"
            style={{
              alignItems: 'center',
              gap: 2,
            }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    position: 'relative',
                    padding: '6px 14px',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--cyan)' : 'var(--text-2)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease, background 0.2s ease',
                    background: isActive ? 'var(--cyan-a10)' : 'transparent',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      style={{
                        position: 'absolute',
                        bottom: -1,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 16,
                        height: 2,
                        borderRadius: 2,
                        background: 'var(--grad)',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Theme + CTA + Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              data-testid="button-theme-toggle"
              style={{
                width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10,
                color: 'var(--text)', cursor: 'pointer',
              }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link
              href="/contact"
              className="desktop-cta text-[18px] font-bold justify-center items-center"
              style={{
                alignItems: 'center',
                gap: 6,
                padding: '8px 18px',
                borderRadius: 8,
                 background: 'var(--surface)',
                 border: '1px solid var(--border-hl)',
                 color: 'var(--cyan)',
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 0 16px var(--cyan-a20)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                whiteSpace: 'nowrap',
              }}
            >Get in Touch</Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen((open) => !open)}
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
              className={`mobile-menu-toggle ${mobileOpen ? 'is-open' : ''}`}
              style={{
                width: 40, height: 40,
                alignItems: 'center', justifyContent: 'center',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                color: 'var(--text)',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
            >
              <span className="hamburger-lines" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>
      {/* ── Full-Screen Mobile Menu Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-overlay fixed inset-0 z-50"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
             style={{ display: 'flex', flexDirection: 'column' }}
          >
            {/* Top bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 24px',
                height: 64,
                borderBottom: '1px solid var(--border)',
                flexShrink: 0,
              }}
            >
               <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'var(--grad)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: 16, color: '#fff',
                  }}
                >
                  YB
                </div>
                <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)' }}>
                  Yash Bhati
                </span>
              </div>
               <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation"
                data-testid="button-close-navigation"
                style={{
                  width: 40, height: 40,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  color: 'var(--text)',
                  cursor: 'pointer',
                }}
              >
                <X size={20} />
              </button>
               <button
                 onClick={toggleTheme}
                 aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                 data-testid="button-mobile-theme-toggle"
                 style={{
                   width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                   background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10,
                   color: 'var(--text)', cursor: 'pointer',
                 }}
               >
                 {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
               </button>
            </div>

            {/* Links */}
            <nav
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '0 32px',
                gap: 8,
              }}
            >
              {NAV_LINKS.map((link, i) => {
                const isActive = location === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  >
                    <Link
                      href={link.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 20px',
                        borderRadius: 14,
                        fontSize: 22,
                        fontWeight: 700,
                        color: isActive ? 'var(--cyan)' : 'var(--text)',
                        textDecoration: 'none',
                        background: isActive ? 'var(--cyan-a10)' : 'transparent',
                        border: `1px solid ${isActive ? 'var(--border-hl)' : 'transparent'}`,
                        letterSpacing: '-0.02em',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {link.label}
                      {isActive && (
                        <div
                          style={{
                            width: 8, height: 8,
                            borderRadius: '50%',
                            background: 'var(--cyan)',
                            boxShadow: '0 0 8px var(--cyan)',
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer area */}
            <div
              style={{
                padding: '24px 32px',
                borderTop: '1px solid var(--border)',
                flexShrink: 0,
              }}
            >
              <Link
                href="/contact"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '14px',
                  borderRadius: 12,
                  background: 'var(--grad)',
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 0 20px var(--cyan-a20)',
                }}
              >
                Get In Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
