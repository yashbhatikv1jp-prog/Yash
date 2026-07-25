import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { SiGithub, SiInstagram } from 'react-icons/si';
import SectionHeader from '../components/SectionHeader';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      setStatus('error');
      setErrorMsg('Please fill all required fields.');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    
    // Simulate slight delay before opening mailto for UX
    setTimeout(() => {
      const sub = encodeURIComponent(`Portfolio Contact: ${subject || 'Hello'}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.open(`mailto:yashbhatikv1jp@gmail.com?subject=${sub}&body=${body}`);
      
      setStatus('success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      
      setTimeout(() => setStatus('idle'), 4000);
    }, 800);
  };

  const links = [
    { name: 'Email', value: 'yashbhatikv1jp@gmail.com', Icon: Mail, href: 'mailto:yashbhatikv1jp@gmail.com', color: '#EA4335' },
    { name: 'GitHub', value: 'github.com/Yashbhati2011', Icon: SiGithub, href: 'https://github.com/Yashbhati2011', color: 'var(--text)' },
    { name: 'Instagram', value: '@Yash.bhati.2011', Icon: SiInstagram, href: 'https://instagram.com/Yash.bhati.2011', color: '#E1306C' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.3 }}
      className="page-wrapper container mx-auto px-6"
    >
      <div className="py-12 md:py-20">
        <SectionHeader number="01" title="Contact" subtitle="Let's Build Something Together" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }} 
            viewport={{ once: true }}
          >
            <p className="text-lg text-[var(--text-2)] mb-10 leading-relaxed">
              I'm always open to discussing new projects, collaborations, or just talking about technology and physics. Reach out through any of the channels below and I'll get back to you as soon as possible.
            </p>
            
            <div className="flex flex-col gap-5 mb-10">
              {links.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="glass-card p-5 rounded-2xl flex items-center gap-5 group hover:-translate-y-1 transition-all hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]"
                >
                  <div className="w-14 h-14 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center border border-[var(--border)] group-hover:border-[var(--border-accent)] transition-colors">
                    <link.Icon size={24} color={link.color} className="group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[var(--text)] uppercase tracking-wider mb-1">{link.name}</div>
                    <div className="text-[var(--text-2)] font-medium group-hover:text-[var(--cyan)] transition-colors">{link.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--cyan-dim)] text-[var(--cyan)] text-sm font-semibold border border-[var(--cyan-glow)]">
              <span>⚡</span> Usually responds within 24 hours
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }} 
            viewport={{ once: true }}
          >
            <div className="glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--cyan-glow)] blur-[100px] rounded-full pointer-events-none"></div>
              
              <h3 className="text-2xl font-bold text-[var(--text)] mb-8 relative z-10">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="float-label-wrapper">
                    <input 
                      type="text" 
                      id="name" 
                      placeholder=" " 
                      value={name} 
                      onChange={e => { setName(e.target.value); setStatus('idle'); }} 
                      className={status === 'error' && !name ? 'border-red-500' : ''}
                    />
                    <label htmlFor="name">Your Name *</label>
                  </div>
                  <div className="float-label-wrapper">
                    <input 
                      type="email" 
                      id="email" 
                      placeholder=" " 
                      value={email} 
                      onChange={e => { setEmail(e.target.value); setStatus('idle'); }}
                      className={status === 'error' && !email ? 'border-red-500' : ''}
                    />
                    <label htmlFor="email">Email Address *</label>
                  </div>
                </div>

                <div className="float-label-wrapper">
                  <input 
                    type="text" 
                    id="subject" 
                    placeholder=" " 
                    value={subject} 
                    onChange={e => setSubject(e.target.value)} 
                  />
                  <label htmlFor="subject">Subject</label>
                </div>

                <div className="float-label-wrapper">
                  <textarea 
                    id="message" 
                    placeholder=" " 
                    rows={5} 
                    value={message} 
                    onChange={e => { setMessage(e.target.value); setStatus('idle'); }}
                    className={status === 'error' && !message ? 'border-red-500' : ''}
                  />
                  <label htmlFor="message">Your Message *</label>
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 text-sm font-medium">
                    <AlertCircle size={16} /> {errorMsg}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2 ${
                    status === 'success' 
                      ? 'bg-[var(--success)] shadow-[0_0_20px_rgba(0,208,132,0.3)]' 
                      : 'bg-[var(--gradient)] hover:shadow-[0_0_25px_var(--cyan-glow)] hover:scale-[1.02]'
                  }`}
                >
                  {status === 'loading' && <Loader2 size={20} className="animate-spin" />}
                  {status === 'success' && <CheckCircle size={20} />}
                  
                  {status === 'idle' && 'Send Message'}
                  {status === 'loading' && 'Preparing...'}
                  {status === 'success' && 'Message Ready! Opening client...'}
                  {status === 'error' && 'Try Again'}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-[var(--border)] text-center text-[var(--text-3)] text-sm">
                Or email directly at <a href="mailto:yashbhatikv1jp@gmail.com" className="text-[var(--cyan)] hover:underline">yashbhatikv1jp@gmail.com</a>
              </div>
            </div>
          </motion.div>
        </div>
        
      </div>
    </motion.div>
  );
}
