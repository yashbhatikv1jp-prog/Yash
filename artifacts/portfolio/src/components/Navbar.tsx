import React, { useState, useEffect } from 'react';
import { Link, useRoute } from 'wouter';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Moon, Sun } from 'lucide-react';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/skills', label: 'Skills' },
  { path: '/projects', label: 'Projects' },
  { path: '/achievements', label: 'Achievements' },
  { path: '/contact', label: 'Contact' }
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[var(--bg-glass)] backdrop-blur-md border-b border-[var(--border)] py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-[900] tracking-tight gradient-text hover:scale-105 transition-transform">
          YB
        </Link>
        
        <div className="flex items-center gap-8">
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map(link => {
                const [isActive] = useRoute(link.path);
                return (
                  <li key={link.path}>
                    <Link 
                      href={link.path}
                      className={`relative text-[13px] uppercase tracking-wider font-medium transition-colors ${
                        isActive ? 'text-[var(--cyan)]' : 'text-[var(--text-2)] hover:text-[var(--text)]'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--cyan)] shadow-[0_0_8px_var(--cyan-glow)]"></span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          <button 
            onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full transition-colors flex items-center px-1 border border-[var(--border)] outline-none focus:outline-none"
            style={{ backgroundColor: theme === 'dark' ? '#1a1a2e' : '#e2e8f0' }}
            aria-label="Toggle theme"
          >
            <div 
              className="w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-300 ease-in-out shadow-sm"
              style={{
                transform: theme === 'dark' ? 'translateX(26px)' : 'translateX(0)',
                backgroundColor: theme === 'dark' ? '#2d3748' : '#ffffff'
              }}
            >
              {theme === 'dark' ? <Moon size={12} color="#00f2fe" /> : <Sun size={12} color="#f6ad55" />}
            </div>
          </button>

          <button 
            className="md:hidden text-[var(--text)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`fixed inset-0 top-[72px] bg-[var(--bg-elevated)] z-40 transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-[150%]'
        }`}
      >
        <nav className="p-8">
          <ul className="flex flex-col gap-6">
            {NAV_LINKS.map(link => {
              const [isActive] = useRoute(link.path);
              return (
                <li key={link.path}>
                  <Link 
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-2xl font-bold transition-colors ${
                      isActive ? 'gradient-text' : 'text-[var(--text)] hover:text-[var(--cyan)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
