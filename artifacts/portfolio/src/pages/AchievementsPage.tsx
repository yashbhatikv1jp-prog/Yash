import { motion } from 'framer-motion';
import { Trophy, Star, Award, Zap, ExternalLink } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

const ACHIEVEMENTS = [
  {
    id: 1,
    isPrimary: true,
    icon: '01',
    badge: 'National Level',
    title: 'IIT Delhi Vidya Setu Hackathon',
    subtitle: 'EdTech Innovation Challenge — IIT Delhi Campus',
    year: '2025',
    desc: 'Selected to participate in a prestigious national-level EdTech innovation hackathon hosted at IIT Delhi. Competed against student teams from across India, proposing a technology-driven solution to bridge educational gaps in rural communities. The Vidya Setu (Bridge of Knowledge) initiative focuses on leveraging emerging tech to democratize quality education.',
    tags: ['Hackathon', 'EdTech', 'IIT Delhi', 'National Level', 'Innovation'],
    stats: [
      { label: 'Level',    value: 'National' },
      { label: 'Host',     value: 'IIT Delhi' },
      { label: 'Domain',   value: 'EdTech' },
      { label: 'Year',     value: '2025' },
    ],
  },
  {
    id: 2,
    isPrimary: false,
    icon: '02',
    badge: 'Personal Milestone',
    title: '24+ Projects Built',
    subtitle: 'Self-Taught Developer — Built from Scratch',
    year: '2023–2025',
    desc: 'Independently built and shipped over 24 projects spanning Python AI, Physics simulators, Mathematics tools, Web applications, and Core Algorithms — entirely through self-directed learning. Each project represents a real solution, not a tutorial copy.',
    tags: ['Python', 'React', 'Physics', 'Algorithms', 'Self-Taught'],
    stats: [
      { label: 'Projects',    value: '24+' },
      { label: 'Languages',   value: '5+' },
      { label: 'Categories',  value: '4' },
      { label: 'Duration',    value: '2 yrs' },
    ],
  },
  {
    id: 3,
    isPrimary: false,
    icon: '03',
    badge: 'Academic',
    title: 'Self-Directed STEM Excellence',
    subtitle: 'PM SHRI Kendriya Vidyalaya Phulera — Class 10',
    year: '2024–2025',
    desc: 'Achieved top performance in Science and Mathematics while simultaneously pursuing advanced programming projects outside the curriculum. Demonstrated that academic rigor and passion-driven coding can coexist and reinforce each other.',
    tags: ['Science', 'Mathematics', 'KV Phulera', 'Academic Excellence'],
    stats: [
      { label: 'Subject',  value: 'Science' },
      { label: 'Grade',    value: 'Class 10' },
      { label: 'School',   value: 'KV Phulera' },
      { label: 'Focus',    value: 'STEM' },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function AchievementsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <section className="page-section">
        <div className="container-base">
          <SectionHeader
            eyebrow="Recognition"
            title="Achievements"
            subtitle="Milestones reached through relentless curiosity and self-directed learning."
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {ACHIEVEMENTS.map((ach, i) => (
              <motion.div
                key={ach.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <div
                  className="glass-card"
                  style={{
                    padding: 0,
                    overflow: 'hidden',
                    border: ach.isPrimary
                      ? '1px solid rgba(0,229,255,0.3)'
                      : '1px solid var(--border)',
                    position: 'relative',
                  }}
                >
                  {/* Shimmer stripe for primary */}
                  {ach.isPrimary && (
                    <div
                      aria-hidden
                      style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0,
                        height: 3,
                        background: 'linear-gradient(90deg, #00e5ff, #8b5cf6, #ec4899, #00e5ff)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 3s linear infinite',
                      }}
                    />
                  )}

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                      gap: 0,
                    }}
                  >
                    {/* Left: Main info */}
                    <div style={{ padding: '28px 32px', paddingTop: ach.isPrimary ? 36 : 28 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
                        <div
                          style={{
                            width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                            background: ach.isPrimary ? 'var(--cyan-a10)' : 'var(--violet-a10)',
                            border: `1px solid ${ach.isPrimary ? 'rgba(0,229,255,0.2)' : 'rgba(139,92,246,0.2)'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 26,
                          }}
                        >
                          {ach.icon}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                            <span
                              style={{
                                fontSize: 10, fontWeight: 800, letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: ach.isPrimary ? 'var(--cyan)' : '#a78bfa',
                                background: ach.isPrimary ? 'var(--cyan-a10)' : 'var(--violet-a10)',
                                padding: '2px 8px', borderRadius: 4,
                              }}
                            >
                              {ach.badge}
                            </span>
                            <span style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600 }}>{ach.year}</span>
                          </div>
                          <h2 style={{ fontSize: 'clamp(17px, 2.5vw, 22px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                            {ach.title}
                          </h2>
                          <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>{ach.subtitle}</p>
                        </div>
                      </div>

                      <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 20 }}>
                        {ach.desc}
                      </p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {ach.tags.map((tag) => (
                          <span key={tag} className="tech-badge badge-default">{tag}</span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Stats */}
                    <div
                      style={{
                        borderLeft: '1px solid var(--border)',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        padding: '28px 24px',
                        gap: 0,
                        alignContent: 'start',
                      }}
                    >
                      {ach.stats.map((stat, si) => (
                        <div
                          key={stat.label}
                          style={{
                            padding: '16px',
                            borderBottom: si < 2 ? '1px solid var(--border)' : 'none',
                            borderRight: si % 2 === 0 ? '1px solid var(--border)' : 'none',
                            textAlign: 'center',
                          }}
                        >
                          <div className="gradient-text" style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.03em' }}>
                            {stat.value}
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Motivational quote */}
          <motion.div
            className="glass-card"
            style={{ marginTop: 40, padding: 36, textAlign: 'center' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
             <div style={{ fontFamily: 'Lora, serif', fontSize: 12, color: 'var(--cyan)', letterSpacing: '.12em', marginBottom: 14 }}>FIELD NOTE / 01</div>
            <blockquote
              style={{
                fontSize: 'clamp(16px, 2.5vw, 20px)',
                fontWeight: 700,
                color: 'var(--text)',
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                maxWidth: 600,
                margin: '0 auto',
                fontStyle: 'italic',
              }}
            >
              "The best time to build was yesterday. The second best time is now."
            </blockquote>
            <p style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 12 }}>
              — The philosophy behind every project I build
            </p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
