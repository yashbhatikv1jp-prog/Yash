import { motion } from 'framer-motion';
import {
  SiPython, SiHtml5, SiCss, SiJavascript, SiReact,
  SiTailwindcss, SiGit, SiGithub, SiVscodium, SiFigma,
  SiNodedotjs, SiTypescript,
} from 'react-icons/si';
import { Code2, Layers, Wrench, BookOpen, TrendingUp } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

interface Skill { name: string; icon: React.ReactNode; level: 'Expert' | 'Advanced' | 'Intermediate' | 'Learning'; color: string; }

const LANGUAGES: Skill[] = [
  { name: 'Python',     icon: <SiPython />,     level: 'Expert',       color: '#3b82f6' },
  { name: 'JavaScript', icon: <SiJavascript />, level: 'Advanced',     color: '#facc15' },
  { name: 'HTML5',      icon: <SiHtml5 />,      level: 'Advanced',     color: '#f97316' },
  { name: 'CSS3',       icon: <SiCss />,        level: 'Advanced',     color: '#8b5cf6' },
  { name: 'TypeScript', icon: <SiTypescript />, level: 'Intermediate', color: '#60a5fa' },
  { name: 'C++',        icon: <Code2 size={22} />, level: 'Intermediate', color: '#2dd4bf' },
  { name: 'Java',       icon: <Code2 size={22} />, level: 'Learning',     color: '#f43f5e' },
  { name: 'SQL',        icon: <Code2 size={22} />, level: 'Learning',     color: '#a78bfa' },
];

const FRAMEWORKS: Skill[] = [
  { name: 'React',      icon: <SiReact />,        level: 'Advanced',     color: '#22d3ee' },
  { name: 'Tailwind',   icon: <SiTailwindcss />,  level: 'Advanced',     color: '#38bdf8' },
  { name: 'Node.js',    icon: <SiNodedotjs />,    level: 'Intermediate', color: '#4ade80' },
];

const TOOLS: Skill[] = [
  { name: 'Git',            icon: <SiGit />,      level: 'Advanced',     color: '#f97316' },
  { name: 'GitHub',         icon: <SiGithub />,   level: 'Advanced',     color: '#a1a1aa' },
  { name: 'VS Code',        icon: <SiVscodium />, level: 'Expert',       color: '#60a5fa' },
  { name: 'Figma',          icon: <SiFigma />,    level: 'Intermediate', color: '#f472b6' },
];

const LEARNING = [
  { topic: 'React Native',       icon: 'RN', status: 'In Progress' },
  { topic: 'Machine Learning',   icon: 'ML', status: 'In Progress' },
  { topic: 'Data Structures',    icon: 'DS', status: 'Active' },
  { topic: 'Algorithms & DSA',   icon: 'AL', status: 'Active' },
  { topic: 'OpenCV (Python)',    icon: 'CV', status: 'Exploring' },
  { topic: 'FastAPI',            icon: 'FA', status: 'Exploring' },
  { topic: 'Three.js / WebGL',   icon: '3D', status: 'Exploring' },
  { topic: 'Docker & DevOps',    icon: 'DO', status: 'On Deck' },
  { topic: 'PostgreSQL',         icon: 'PG', status: 'On Deck' },
  { topic: 'System Design',      icon: 'SD', status: 'On Deck' },
];

const LEVEL_COLORS: Record<string, string> = {
  Expert:       'rgba(0, 229, 255, 0.15)',
  Advanced:     'rgba(139, 92, 246, 0.15)',
  Intermediate: 'rgba(250, 204, 21, 0.12)',
  Learning:     'rgba(148, 163, 184, 0.10)',
};
const LEVEL_TEXT: Record<string, string> = {
  Expert:       'var(--cyan)',
  Advanced:     '#a78bfa',
  Intermediate: '#facc15',
  Learning:     'var(--text-3)',
};

function SkillGroup({ title, icon, skills }: { title: string; icon: React.ReactNode; skills: Skill[] }) {
  return (
    <div>
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
          fontSize: 13, fontWeight: 700, color: 'var(--text-2)',
          textTransform: 'uppercase', letterSpacing: '0.1em',
        }}
      >
        <span style={{ color: 'var(--cyan)' }}>{icon}</span>
        {title}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            className="skill-tag"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            whileHover={{ y: -4, scale: 1.04 }}
          >
            <span style={{ fontSize: 20, color: skill.color, lineHeight: 1 }}>{skill.icon}</span>
            <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{skill.name}</span>
            <span
              style={{
                fontSize: 9, fontWeight: 800, letterSpacing: '0.08em',
                padding: '2px 7px', borderRadius: 4,
                background: LEVEL_COLORS[skill.level],
                color: LEVEL_TEXT[skill.level],
                textTransform: 'uppercase',
              }}
            >
              {skill.level}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function SkillsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <section className="page-section">
        <div className="container-base">
          <SectionHeader
            eyebrow="Technical Skills"
            title="My Tech Stack"
            subtitle="Languages, frameworks, and tools I use to bring ideas to life."
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>
            <SkillGroup title="Languages" icon={<Code2 size={16} />} skills={LANGUAGES} />
            <SkillGroup title="Frameworks & Libraries" icon={<Layers size={16} />} skills={FRAMEWORKS} />
            <SkillGroup title="Tools & Platforms" icon={<Wrench size={16} />} skills={TOOLS} />
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '40px 0' }}>
        <div className="container-base">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 0 }}>
            {[
              { value: '8+', label: 'Languages Known' },
              { value: '3+', label: 'Frameworks' },
              { value: '4+', label: 'Dev Tools' },
              { value: '2yr', label: 'Coding Experience' },
            ].map((s, i, arr) => (
              <div
                key={s.label}
                style={{
                  textAlign: 'center', padding: '16px 12px',
                  borderRight: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div className="gradient-text" style={{ fontSize: 30, fontWeight: 900, letterSpacing: '-0.04em' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Continuous Learning */}
      <section style={{ padding: '80px 0' }}>
        <div className="container-base">
          <SectionHeader
            eyebrow="Always Growing"
            title="Continuous Learning"
            subtitle="Topics I'm actively exploring to stay ahead of the curve."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {LEARNING.map((item, i) => (
              <motion.div
                key={item.topic}
                className="glass-card"
                style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12 }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ y: -3 }}
              >
                <span style={{ width: 34, height: 34, display: 'grid', placeItems: 'center', flexShrink: 0, borderRadius: 10, background: 'var(--cyan-a10)', border: '1px solid var(--border)', color: 'var(--cyan)', fontSize: 11, fontFamily: 'DM Mono, monospace', fontWeight: 700 }}>{item.icon}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.topic}
                  </div>
                  <div
                    style={{
                      fontSize: 10, fontWeight: 700, color: item.status === 'In Progress' ? 'var(--cyan)' : item.status === 'Active' ? '#a78bfa' : 'var(--text-3)',
                      letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 2,
                    }}
                  >
                    {item.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
