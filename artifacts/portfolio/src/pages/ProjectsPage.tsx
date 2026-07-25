import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code2, ChevronDown, ChevronUp } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

type Category = 'All' | 'Physics' | 'Mathematics' | 'Computer Science' | 'Web';

interface Project {
  id: number;
  title: string;
  category: Category;
  tech: string[];
  desc: string;
  isInteractive?: boolean;
}

const PROJECTS: Project[] = [
  // PHYSICS
  {
    id: 1,
    title: "Physics Optics Lens Calculator",
    category: "Physics",
    tech: ["HTML", "CSS", "JavaScript", "React"],
    desc: "Real-time focal length calculator using the Lens Maker's equation (1/f = 1/v - 1/u). Input object and image distances to instantly compute focal length with edge case handling.",
    isInteractive: true
  },
  {
    id: 2,
    title: "Projectile Motion Simulator",
    category: "Physics",
    tech: ["JavaScript", "Math", "React"],
    desc: "Calculates the range, maximum height, and time of flight of a projectile. Input angle (degrees) and initial velocity.",
    isInteractive: true
  },
  {
    id: 3,
    title: "Ohm's Law Calculator",
    category: "Physics",
    tech: ["JavaScript", "React"],
    desc: "Multi-mode calculator for Ohm's Law. Solve for Voltage, Current, or Resistance given any two known values."
  },
  {
    id: 4,
    title: "Simple Pendulum Period Calculator",
    category: "Physics",
    tech: ["JavaScript", "Math"],
    desc: "Computes the time period of a simple pendulum using T = 2π√(L/g). Input pendulum length to find oscillation period."
  },
  {
    id: 5,
    title: "Gravitational Force Calculator",
    category: "Physics",
    tech: ["Python", "Math"],
    desc: "Calculates gravitational attraction between two masses using Newton's Universal Law of Gravitation: F = Gm₁m₂/r²."
  },
  {
    id: 6,
    title: "Wave Speed & Frequency Calculator",
    category: "Physics",
    tech: ["Python", "JavaScript"],
    desc: "Calculates wave speed, frequency, or wavelength using v = fλ. Supports sound and electromagnetic waves."
  },
  // MATHEMATICS
  {
    id: 7,
    title: "Quadratic Equation Solver",
    category: "Mathematics",
    tech: ["Python", "JavaScript"],
    desc: "Solves quadratic equations ax² + bx + c = 0 using the quadratic formula. Handles real and complex roots with discriminant analysis."
  },
  {
    id: 8,
    title: "Prime Number Generator",
    category: "Mathematics",
    tech: ["Python"],
    desc: "Implements the Sieve of Eratosthenes algorithm to efficiently generate all prime numbers up to a user-specified limit."
  },
  {
    id: 9,
    title: "Fibonacci Sequence Generator",
    category: "Mathematics",
    tech: ["Python"],
    desc: "Generates Fibonacci sequences using both iterative and recursive approaches, comparing time complexity between methods."
  },
  {
    id: 10,
    title: "Statistics Calculator",
    category: "Mathematics",
    tech: ["Python", "JavaScript"],
    desc: "Computes mean, median, mode, variance, and standard deviation for any dataset. Includes frequency distribution analysis."
  },
  {
    id: 11,
    title: "Matrix Operations Tool",
    category: "Mathematics",
    tech: ["Python"],
    desc: "Performs matrix addition, subtraction, multiplication, transpose, and determinant calculation for 2×2 and 3×3 matrices."
  },
  // COMPUTER SCIENCE
  {
    id: 12,
    title: "Python Algorithm Suite",
    category: "Computer Science",
    tech: ["Python"],
    desc: "Collection of classic algorithms: Binary Search (O log n), Bubble Sort, Selection Sort, and Linear Search — with annotated implementations."
  },
  {
    id: 13,
    title: "Number Guessing Game",
    category: "Computer Science",
    tech: ["Python"],
    desc: "Interactive CLI game where the computer generates a random number and the player guesses it. Includes difficulty modes and hint system."
  },
  {
    id: 14,
    title: "Caesar Cipher Encoder/Decoder",
    category: "Computer Science",
    tech: ["Python"],
    desc: "Implements the Caesar Cipher encryption algorithm. Encodes and decodes messages with any shift value — explores cryptography basics."
  },
  {
    id: 15,
    title: "Password Strength Generator",
    category: "Computer Science",
    tech: ["Python", "JavaScript"],
    desc: "Generates secure passwords with customizable length and character sets. Includes a strength analyzer with entropy calculation."
  },
  {
    id: 16,
    title: "BMI & Health Calculator",
    category: "Web",
    tech: ["HTML", "CSS", "JavaScript"],
    desc: "Calculates Body Mass Index with health category classification. Features a clean input form and color-coded result display."
  }
];

const categoryColors: Record<Category, string> = {
  'All': '',
  'Physics': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Mathematics': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Computer Science': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Web': 'bg-blue-500/20 text-blue-400 border-blue-500/30'
};

function LensWidget() {
  const [u, setU] = useState('');
  const [v, setV] = useState('');
  const [f, setF] = useState<string | null>(null);

  useEffect(() => {
    if (u === '' || v === '') { setF(null); return; }
    const uNum = parseFloat(u);
    const vNum = parseFloat(v);
    if (isNaN(uNum) || isNaN(vNum)) { setF(null); return; }
    if (uNum === 0 || vNum === 0) { setF('undefined'); return; }
    
    const invF = (1 / vNum) - (1 / uNum);
    if (Math.abs(invF) < 0.000001) setF('∞');
    else setF((1 / invF).toFixed(2));
  }, [u, v]);

  return (
    <div className="mt-6 p-5 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl">
      <h4 className="font-bold text-[var(--text)] mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[var(--cyan)]"></div> Live Calculator
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="float-label-wrapper">
          <input type="number" id="lens-u" placeholder=" " value={u} onChange={e => setU(e.target.value)} />
          <label htmlFor="lens-u">Object Distance (u) cm</label>
        </div>
        <div className="float-label-wrapper">
          <input type="number" id="lens-v" placeholder=" " value={v} onChange={e => setV(e.target.value)} />
          <label htmlFor="lens-v">Image Distance (v) cm</label>
        </div>
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-[var(--border)]">
        <span className="text-[var(--text-2)] font-medium">Focal Length (f) =</span>
        <span className="text-2xl font-bold font-mono gradient-text">{f === null ? '--' : `${f} cm`}</span>
      </div>
    </div>
  );
}

function ProjectileWidget() {
  const [angle, setAngle] = useState('');
  const [velocity, setVelocity] = useState('');
  const [res, setRes] = useState<{r:string, h:string, t:string} | null>(null);

  useEffect(() => {
    if (angle === '' || velocity === '') { setRes(null); return; }
    const a = parseFloat(angle);
    const v = parseFloat(velocity);
    if (isNaN(a) || isNaN(v)) { setRes(null); return; }
    
    const g = 9.8;
    const rad = a * (Math.PI / 180);
    const r = ((v * v) * Math.sin(2 * rad)) / g;
    const h = ((v * Math.sin(rad)) ** 2) / (2 * g);
    const t = (2 * v * Math.sin(rad)) / g;
    
    setRes({
      r: r.toFixed(2),
      h: h.toFixed(2),
      t: t.toFixed(2)
    });
  }, [angle, velocity]);

  return (
    <div className="mt-6 p-5 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl">
      <h4 className="font-bold text-[var(--text)] mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[var(--purple)]"></div> Live Simulator
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="float-label-wrapper">
          <input type="number" id="proj-a" placeholder=" " value={angle} onChange={e => setAngle(e.target.value)} />
          <label htmlFor="proj-a">Angle (θ) degrees</label>
        </div>
        <div className="float-label-wrapper">
          <input type="number" id="proj-v" placeholder=" " value={velocity} onChange={e => setVelocity(e.target.value)} />
          <label htmlFor="proj-v">Initial Velocity (v) m/s</label>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[var(--border)] text-center">
        <div>
          <div className="text-[10px] text-[var(--text-3)] uppercase font-bold">Range</div>
          <div className="font-mono font-bold text-[var(--text)]">{res ? res.r : '--'}</div>
        </div>
        <div className="border-x border-[var(--border)]">
          <div className="text-[10px] text-[var(--text-3)] uppercase font-bold">Max Height</div>
          <div className="font-mono font-bold text-[var(--text)]">{res ? res.h : '--'}</div>
        </div>
        <div>
          <div className="text-[10px] text-[var(--text-3)] uppercase font-bold">Time</div>
          <div className="font-mono font-bold text-[var(--text)]">{res ? `${res.t}s` : '--'}</div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`glass-card p-6 flex flex-col hover:-translate-y-1 transition-transform group cursor-pointer ${expanded ? 'col-span-1 md:col-span-2 lg:col-span-3' : ''}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${categoryColors[project.category]}`}>
          {project.category}
        </span>
        {project.isInteractive && (
          <span className="flex items-center gap-1 text-[10px] font-bold text-[var(--cyan)] bg-[var(--cyan-dim)] px-2 py-1 rounded-full animate-pulse">
            <SparklesIcon size={12} /> INTERACTIVE
          </span>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-[var(--text)] mb-3 group-hover:text-[var(--cyan)] transition-colors">{project.title}</h3>
      <p className={`text-[var(--text-2)] text-sm mb-6 ${expanded ? '' : 'line-clamp-2'}`}>
        {project.desc}
      </p>
      
      <div className="mt-auto">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map(t => (
            <span key={t} className="text-xs px-2 py-1 rounded bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-3)]">
              {t}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between border-t border-[var(--border)] pt-4 mt-4">
          <span className="text-xs font-semibold text-[var(--text-2)] flex items-center gap-1">
            <Code2 size={14} /> Personal Project
          </span>
          <span className="text-xs font-bold text-[var(--cyan)] flex items-center gap-1">
            {expanded ? <><ChevronUp size={14} /> Close Details</> : <><ChevronDown size={14} /> View Details</>}
          </span>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {project.id === 1 && <LensWidget />}
            {project.id === 2 && <ProjectileWidget />}
            {project.id === 12 && (
               <div className="mt-6 p-5 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl font-mono text-sm overflow-x-auto text-[#c5c8c6] bg-[#0a0a0c]">
                 <pre><code><span className="text-[#c678dd]">def</span> <span className="text-[#61afef]">binary_search</span>(arr, target):
    left, right = <span className="text-[#d19a66]">0</span>, <span className="text-[#56b6c2]">len</span>(arr) - <span className="text-[#d19a66]">1</span>
    
    <span className="text-[#c678dd]">while</span> left &lt;= right:
        mid = (left + right) // <span className="text-[#d19a66]">2</span>
        <span className="text-[#c678dd]">if</span> arr[mid] == target:
            <span className="text-[#c678dd]">return</span> mid
        <span className="text-[#c678dd]">elif</span> arr[mid] &lt; target:
            left = mid + <span className="text-[#d19a66]">1</span>
        <span className="text-[#c678dd]">else</span>:
            right = mid - <span className="text-[#d19a66]">1</span>
            
    <span className="text-[#c678dd]">return</span> -<span className="text-[#d19a66]">1</span></code></pre>
               </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  );
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState<Category>('All');
  
  const categories: Category[] = ['All', 'Physics', 'Mathematics', 'Computer Science', 'Web'];
  
  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter || (filter === 'Web' && p.category === 'Web'));

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.3 }}
      className="page-wrapper container mx-auto px-6"
    >
      <div className="py-12 md:py-20">
        <SectionHeader number="01" title="Projects" subtitle="Featured Work" />
        
        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                filter === cat 
                  ? 'bg-[var(--gradient)] text-white shadow-[0_0_15px_var(--cyan-glow)] border-transparent' 
                  : 'bg-[var(--bg-glass)] border border-[var(--border)] text-[var(--text-2)] hover:border-[var(--cyan)] hover:text-[var(--text)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
        
      </div>
    </motion.div>
  );
}
