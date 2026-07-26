import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Code2, Trophy, Cpu, BookOpen } from 'lucide-react';
import profileImg from '@assets/profile_1784802713138.jpg';
import SectionHeader from '../components/SectionHeader';

const FACTS = [
  { icon: MapPin,         label: 'Location',    value: 'Narnaul, Haryana' },
  { icon: GraduationCap, label: 'School',       value: 'PM SHRI KV Phulera' },
  { icon: Code2,          label: 'Grade',        value: 'Class 10' },
  { icon: Trophy,         label: 'Achievement',  value: 'IIT Delhi Hackathon' },
  { icon: Cpu,            label: 'Focus Areas',  value: 'Physics + CS + Math' },
  { icon: BookOpen,       label: 'Status',       value: 'Actively Learning' },
];

const TIMELINE = [
  {
    year: '2023',
    title: 'Started Learning Python',
    desc: 'Began my programming journey with Python — mastering fundamentals of logic, loops, and problem-solving through small daily projects.',
  },
  {
    year: '2023',
    title: 'Built First Real Project',
    desc: 'Created Python utility scripts: number games, converters, and algorithm implementations. Felt the magic of code coming alive.',
  },
  {
    year: '2024',
    title: 'Expanded to Web Development',
    desc: 'Learned HTML, CSS, and JavaScript. Built interactive web calculators fusing physics equations with real-time UI.',
  },
  {
    year: '2024',
    title: 'Learned React & Tailwind',
    desc: 'Dived into modern frontend — React components, state management, and Tailwind CSS. Built polished, responsive interfaces.',
  },
  {
    year: '2024',
    title: 'Explored Physics + CS Intersection',
    desc: 'Started building simulators for Projectile Motion, Pendulum Physics, and Optics — bridging textbook equations with interactive code.',
  },
  {
    year: '2025',
    title: 'IIT Delhi Vidya Setu Hackathon',
    desc: 'Participated in a national-level EdTech innovation challenge at IIT Delhi, competing against students from across India.',
  },
  {
    year: '2025',
    title: '24+ Projects Milestone',
    desc: 'Crossed 24 completed projects spanning AI, Physics, Math, Web Dev, and Core Algorithms. Continuing to build and learn every day.',
  },
];

const PASSIONS = [
  { mark: '01', title: 'Physics + Code',      desc: 'Using programming to simulate and visualize phenomena that textbooks can only describe.' },
  { mark: '02', title: 'AI & Logic',           desc: 'Building rule-based intelligent systems, exploring how machines reason and respond.' },
  { mark: '03', title: 'Mathematical Thinking', desc: 'Translating complex equations into clean, understandable code solutions.' },
  { mark: '04', title: 'Web Interfaces',        desc: 'Crafting beautiful, responsive UIs that make information accessible to everyone.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }),
};

export default function AboutPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      {/* ── Bio Section ── */}
      <section className="page-section">
        <div className="container-base">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '48px 64px',
              alignItems: 'start',
            }}
          >
            {/* Left: Photo + facts */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {/* Profile card */}
              <motion.div
                variants={fadeUp}
                custom={0}
                className="glass-card"
                style={{ padding: 28, marginBottom: 20, textAlign: 'center' }}
              >
                <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto 16px' }}>
                  <div
                    style={{
                      position: 'absolute', inset: -3, borderRadius: '50%', overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute', inset: '-60%',
                        background: 'conic-gradient(from 0deg, transparent 0deg, #00e5ff 90deg, #8b5cf6 200deg, transparent 240deg)',
                        animation: 'spin-ring 4s linear infinite',
                      }}
                    />
                  </div>
                  <div style={{ position: 'absolute', inset: 2, borderRadius: '50%', background: 'var(--bg)' }} />
                  <img
                    src={profileImg}
                    alt="Yash Bhati"
                    style={{
                      position: 'absolute', inset: 4,
                      width: 'calc(100% - 8px)', height: 'calc(100% - 8px)',
                      borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top',
                    }}
                  />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 20, color: 'var(--text)', marginBottom: 4 }}>Yash Bhati</h3>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {['Student', 'Developer'].map((t) => (
                    <span key={t} className="tech-badge badge-default">{t}</span>
                  ))}
                </div>
              </motion.div>

              {/* Quick facts grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {FACTS.map(({ icon: Icon, label, value }, i) => (
                  <motion.div
                    key={label}
                    variants={fadeUp}
                    custom={i + 1}
                    className="glass-card"
                    style={{ padding: '14px 16px' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
                      <Icon size={13} color="var(--cyan)" />
                      <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        {label}
                      </span>
                    </div>
                    <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', lineHeight: 1.3 }}>{value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Bio text */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <SectionHeader eyebrow="About Me" title="The Story So Far" />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18, color: 'var(--text-2)', fontSize: 15, lineHeight: 1.8 }}>
                <motion.p variants={fadeUp} custom={0}>
                  I am{' '}
                  <strong style={{ color: 'var(--text)', fontWeight: 700 }}>Yash Bhati</strong>, a passionate young developer from{' '}
                  <strong style={{ color: 'var(--text)', fontWeight: 700 }}>Narnaul, Haryana</strong>, currently in{' '}
                  <strong style={{ color: 'var(--text)', fontWeight: 700 }}>Class 10 at PM SHRI Kendriya Vidyalaya Phulera</strong>.
                  From a young age, I was drawn to the way technology solves real-world problems.
                </motion.p>
                <motion.p variants={fadeUp} custom={1}>
                  That curiosity has driven me to teach myself programming, build projects across{' '}
                  <a
                    href="https://github.com/Yashbhati2011"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gradient-text"
                    style={{ fontWeight: 700, textDecoration: 'none' }}
                  >
                    physics, mathematics, and computer science
                  </a>
                  , and compete in national-level hackathons like the{' '}
                  <strong style={{ color: 'var(--cyan)', fontWeight: 700 }}>IIT Delhi Vidya Setu Hackathon</strong>.
                </motion.p>
                <motion.p variants={fadeUp} custom={2}>
                  I believe that <strong style={{ color: 'var(--text)' }}>age is no barrier to innovation</strong>. As a student developer,
                  I've built over{' '}
                  <strong style={{ color: 'var(--cyan)' }}>24 projects</strong> spanning physics simulators, algorithm implementations,
                  AI logic systems, and web applications — all while maintaining academic excellence.
                </motion.p>
                <motion.p variants={fadeUp} custom={3}>
                  My work is driven by one core belief:{' '}
                  <strong style={{ color: 'var(--text)' }}>technology should be accessible, logical, and impactful</strong>.
                </motion.p>

                {/* Terminal block */}
                <motion.div
                  variants={fadeUp}
                  custom={4}
                  className="code-block"
                  style={{ marginTop: 8 }}
                >
                  <span className="cm">{'# Yash Bhati — Developer Profile'}</span>{'\n'}
                  <span className="kw">profile</span> = {'{'}{'\n'}
                  {'  '}<span className="str">"name"</span>: <span className="str">"Yash Bhati"</span>,{'\n'}
                  {'  '}<span className="str">"grade"</span>: <span className="str">"Class 10"</span>,{'\n'}
                  {'  '}<span className="str">"projects"</span>: <span className="num">24</span>,{'\n'}
                  {'  '}<span className="str">"skills"</span>: [<span className="str">"Python"</span>, <span className="str">"React"</span>, <span className="str">"C++"</span>],{'\n'}
                  {'  '}<span className="str">"mindset"</span>: <span className="str">"Never stop building"</span>{'\n'}
                  {'}'}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--border)' }}>
        <div className="container-base">
          <SectionHeader eyebrow="Timeline" title="My Journey" />
          <div className="timeline-track" style={{ maxWidth: 680 }}>
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                className="timeline-node"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="timeline-dot" />
                <div className="glass-card" style={{ padding: '18px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span
                      className="gradient-text"
                      style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em' }}
                    >
                      {item.year}
                    </span>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{item.title}</h3>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Passions ── */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--border)' }}>
        <div className="container-base">
          <SectionHeader eyebrow="Passions" title="What Drives Me" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
            }}
          >
            {PASSIONS.map((p, i) => (
              <motion.div
                key={p.title}
                className="glass-card"
                style={{ padding: 24 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div style={{ fontFamily: 'var(--font-mono, "DM Mono")', color: 'var(--cyan)', fontSize: 13, fontWeight: 700, marginBottom: 18 }}>{p.mark} / BUILD</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
