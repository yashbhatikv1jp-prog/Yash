import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Trophy } from 'lucide-react';
import profileImg from '@assets/profile_1784802713138.jpg';

const TITLES = [
  'Python Developer',
  'Problem Solver',
  'Physics Enthusiast',
  'Web Developer',
  'Logic Builder',
  'Tech Explorer',
];

function TypingText() {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TITLES[index];
    const speed = deleting ? 38 : 75;

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), 2200);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % TITLES.length);
      return;
    }

    const t = setTimeout(() => {
      setText(current.substring(0, text.length + (deleting ? -1 : 1)));
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, index]);

  return (
    <span style={{ color: 'var(--cyan)' }}>
      {text}
      <span
        style={{
          display: 'inline-block',
          width: 3,
          height: '0.85em',
          background: 'var(--cyan)',
          marginLeft: 2,
          verticalAlign: 'middle',
          borderRadius: 2,
          animation: 'cursor-blink 1s step-end infinite',
        }}
      />
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, x: -28, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: { delay: i * 0.14, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero */}
      <section
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px 60px',
          textAlign: 'center',
          minHeight: 'calc(100vh - 64px)',
          position: 'relative',
        }}
      >
        {/* Radial glow behind content */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            height: 700,
            background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.07) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        <motion.div
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 760, position: 'relative' }}
        >
          {/* Profile image with spinning gradient ring */}
          <motion.div variants={fadeUp} custom={0} style={{ position: 'relative', width: 180, height: 180, marginBottom: 36 }}>
            {/* Rotating gradient ring */}
            <div
              style={{
               position: 'absolute', inset: -2, borderRadius: '50%', overflow: 'hidden',
              }}
            >
              <div
                style={{
                   position: 'absolute', inset: '-60%',
                   background: 'conic-gradient(from 0deg, transparent 0deg, #22d3ee 55deg, #a855f7 180deg, transparent 225deg)',
                   animation: 'spin-ring 3s linear infinite',
                   filter: 'drop-shadow(0 0 7px rgba(34,211,238,.8)) drop-shadow(0 0 10px rgba(168,85,247,.45))',
                }}
              />
            </div>
            {/* White separator ring */}
             <div style={{ position: 'absolute', inset: 1, borderRadius: '50%', background: 'var(--bg)' }} />
            {/* Photo */}
            <img
              src={profileImg}
              alt="Yash Bhati"
              style={{
                 position: 'absolute', inset: 4,
                 width: 'calc(100% - 8px)', height: 'calc(100% - 8px)',
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
            />
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            style={{
              fontSize: 'clamp(48px, 9vw, 88px)',
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: '-0.04em',
              marginBottom: 20,
            }}
          >
            <span className="gradient-text">Yash Bhati</span>
          </motion.h1>

          {/* Typing line */}
          <motion.p
            variants={fadeUp}
            custom={2}
            style={{
              fontSize: 'clamp(18px, 3vw, 26px)',
              fontWeight: 500,
              color: 'var(--text-2)',
              marginBottom: 10,
              minHeight: '1.5em',
            }}
          >
            I'm a&nbsp;<TypingText />
          </motion.p>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            custom={3}
            style={{ fontSize: 14, color: 'var(--text-3)', fontWeight: 500, letterSpacing: '0.04em', marginBottom: 36 }}
          >
            Class 10 · PM SHRI KV Phulera · Narnaul, Haryana
          </motion.p>

          {/* Stat pills */}
          <motion.div
            variants={fadeUp}
            custom={4}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 40 }}
          >
            {[
              { icon: <Zap size={14} />, text: '24 Projects Built' },
              { icon: <Trophy size={14} />, text: 'IIT Delhi Hackathon Participant' },
            ].map((item) => (
              <div
                key={item.text}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  fontSize: 13, fontWeight: 600,
                  color: 'var(--text-2)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <span style={{ color: 'var(--cyan)' }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            custom={5}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}
          >
            <Link href="/projects" className="btn-glow" style={{ textDecoration: 'none' }}>
              Explore Projects
              <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn-outline" style={{ textDecoration: 'none' }}>
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>

      </section>
      {/* Quick stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
         style={{
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
           background: 'linear-gradient(110deg, rgba(0,127,174,.12), rgba(110,85,200,.14), rgba(211,75,136,.10))',
          backdropFilter: 'blur(20px)',
        }}
         className="home-stats-strip text-[19px] font-medium text-[#53e0d4]">
        <div className="container-base">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 0,
              padding: '24px 0',
            }}
          >
            {[
              { value: '24+', label: 'Projects Built' },
              { value: '5+', label: 'Languages' },
              { value: '2+', label: 'Years Coding' },
              { value: '1', label: 'National Hackathon' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  textAlign: 'center',
                  padding: '12px 16px',
                  borderRight: i < 3 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div
                  className="gradient-text text-[color:var(--text)]"
                  style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4, fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
