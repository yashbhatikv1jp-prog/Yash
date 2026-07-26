import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Instagram, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

const CONTACT_LINKS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'yashbhatikv1jp@gmail.com',
    href: 'mailto:yashbhatikv1jp@gmail.com',
    color: '#00e5ff',
    desc: 'Best for project inquiries',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/Yashbhati2011',
    href: 'https://github.com/Yashbhati2011',
    color: '#a1a1aa',
    desc: 'See my code & projects',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@Yash.bhati.2011',
    href: 'https://instagram.com/Yash.bhati.2011',
    color: '#ec4899',
    desc: 'Follow my journey',
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error');
      return;
    }
    const subject = encodeURIComponent(form.subject || `Message from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:yashbhatikv1jp@gmail.com?subject=${subject}&body=${body}`;
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <section className="page-section">
        <div className="container-base">
          <SectionHeader
            eyebrow="Contact"
            title="Get In Touch"
            subtitle="Have a project idea, collaboration proposal, or just want to say hi? I'm all ears."
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px 48px',
              alignItems: 'start',
            }}
          >
            {/* Left: Contact links */}
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
                Direct Links
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
                {CONTACT_LINKS.map(({ icon: Icon, label, value, href, color, desc }) => (
                  <motion.a
                    key={href}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="glass-card"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: '18px 20px', textDecoration: 'none',
                    }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      style={{
                        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                        background: `${color}15`,
                        border: `1px solid ${color}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color,
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>
                        {label}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {value}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 1 }}>{desc}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Availability badge */}
              <div
                className="glass-card"
                style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}
              >
                <div
                  style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: '#22c55e',
                    boxShadow: '0 0 8px #22c55e, 0 0 16px rgba(34,197,94,0.3)',
                    flexShrink: 0,
                    animation: 'float-up-down 2s ease-in-out infinite',
                  }}
                />
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>
                    Open to Opportunities
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--text-3)' }}>
                    Collaborations, internships, and exciting projects. Typical response within 24hrs.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Contact form */}
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
                Send a Message
              </p>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card"
                  style={{
                    padding: '16px 20px',
                    marginBottom: 20,
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}
                >
                  <CheckCircle2 size={18} color="#22c55e" />
                  <p style={{ fontSize: 13, color: '#4ade80', fontWeight: 600 }}>
                    Email client opened! Message is ready to send.
                  </p>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card"
                  style={{
                    padding: '16px 20px',
                    marginBottom: 20,
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}
                >
                  <AlertCircle size={18} color="#f87171" />
                  <p style={{ fontSize: 13, color: '#f87171', fontWeight: 600 }}>
                    Please fill in your name, email, and message.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div className="field-wrap">
                    <input
                      type="text" name="name" placeholder=" "
                      value={form.name} onChange={handleChange}
                      id="c-name" required
                    />
                    <label htmlFor="c-name">Your Name *</label>
                  </div>
                  <div className="field-wrap">
                    <input
                      type="email" name="email" placeholder=" "
                      value={form.email} onChange={handleChange}
                      id="c-email" required
                    />
                    <label htmlFor="c-email">Email Address *</label>
                  </div>
                </div>

                <div className="field-wrap">
                  <input
                    type="text" name="subject" placeholder=" "
                    value={form.subject} onChange={handleChange}
                    id="c-subject"
                  />
                  <label htmlFor="c-subject">Subject</label>
                </div>

                <div className="field-wrap">
                  <textarea
                    name="message" placeholder=" " rows={6}
                    value={form.message} onChange={handleChange}
                    id="c-message" required
                    style={{ paddingTop: 28, paddingBottom: 12 }}
                  />
                  <label htmlFor="c-message">Message *</label>
                </div>

                <button
                  type="submit"
                  className="btn-glow"
                  style={{ justifyContent: 'center', width: '100%', padding: '14px 28px' }}
                >
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
