import { Link } from 'wouter';
import { Github, Mail, Instagram } from 'lucide-react';

const SOCIALS = [
  { icon: Github,    href: 'https://github.com/Yashbhati2011',           label: 'GitHub' },
  { icon: Mail,      href: 'mailto:yashbhatikv1jp@gmail.com',             label: 'Email' },
  { icon: Instagram, href: 'https://instagram.com/Yash.bhati.2011',       label: 'Instagram' },
];

const LINKS = [
  { href: '/',             label: 'Home' },
  { href: '/about',        label: 'About' },
  { href: '/skills',       label: 'Skills' },
  { href: '/projects',     label: 'Projects' },
  { href: '/achievements', label: 'Achievements' },
  { href: '/contact',      label: 'Contact' },
];

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid var(--border)',
        background: 'rgba(6, 6, 15, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '48px 0 32px',
        marginTop: 'auto',
      }}
      className="bg-[#000000f2]">
      <div className="container-base">
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px 48px',
            marginBottom: 40,
          }}
        >
          {/* Brand */}
          <div className="border-t-[0px] border-r-[0px] border-b-[0px] border-l-[0px]">
            <div
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}
              className="font-semibold text-[#388cc7] bg-[#91373700]">
              <div
                style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'var(--grad)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 15, color: '#fff',
                }}
              >
                YB
              </div>
              <span
                style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)' }}
                className="text-[24px] text-gray-100">Yash Bhati</span>
            </div>
            <p
              style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.7, maxWidth: 220 }}
              className="text-[#039eff]">
              Class 10 student & passionate developer from Narnaul, Haryana.
            </p>
          </div>

          {/* Navigation */}
          <div className="text-[20px] font-semibold text-left">
            <p className="text-[#00eeff]" style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
              Navigation
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                    className="footer-nav-link text-gray-100"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="text-[20px] font-semibold text-left">
            <p className="text-[#00eeff]" style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
              Connect
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link text-gray-100"
                >
                  <span className="footer-social-icon"><Icon size={18} /></span>
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ fontSize: 12, color: 'var(--text-3)' }}>
            © {new Date().getFullYear()} Yash Bhati. Designed & Built from scratch.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
            <span style={{ fontSize: 12, color: 'var(--text-3)' }}>Open to opportunities</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
