import { useEffect, useState, useRef } from 'react';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Mail, Trophy } from 'lucide-react';
import { 
  SiPython, SiHtml5, SiCss, SiJavascript, 
  SiGithub, SiVscodium, SiAndroidstudio, SiInstagram 
} from 'react-icons/si';
import { motion } from 'framer-motion';

import { useActiveSection, useScrollDirection } from '@/hooks/use-scroll';
import profileImg from '@assets/profile_1784802713138.jpg';
import NotFound from '@/pages/not-found';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

// ==========================================
// 1. Particle Canvas Background
// ==========================================
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<any[]>([]);
  const requestRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const initParticles = () => {
      const count = window.innerWidth < 768 ? 40 : 80;
      particlesRef.current = Array.from({ length: count }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      }));
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if(e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    handleResize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const { x: mx, y: my } = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx += (dx / dist) * force * 0.2;
          p.vy += (dy / dist) * force * 0.2;
          
          const speed = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
          if (speed > 2.5) {
            p.vx = (p.vx / speed) * 2.5;
            p.vy = (p.vy / speed) * 2.5;
          }
        } else {
          const speed = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
          if (speed > 0.5) {
            p.vx *= 0.98;
            p.vy *= 0.98;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 242, 254, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2*dx2 + dy2*dy2);
          
          if (dist2 < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(79, 172, 254, ${0.15 * (1 - dist2 / 140)})`;
            ctx.stroke();
          }
        }
      }

      requestRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

// ==========================================
// 2. Navigation
// ==========================================
function NavBar() {
  const sections = ['home', 'about', 'skills', 'projects', 'achievements', 'contact'];
  const activeSection = useActiveSection(sections);
  const { scrollDirection, isScrolled } = useScrollDirection();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-transform duration-300 ${
        scrollDirection === 'down' && isScrolled ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="w-full bg-[rgba(10,10,12,0.7)] backdrop-blur-[20px] border-b border-[var(--border-glass)] py-4">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <div className="text-2xl font-[900] tracking-tight text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-accent)' }}>
            YB
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {sections.map((section) => (
                <li key={section}>
                  <a
                    href={`#${section}`}
                    onClick={(e) => handleNavClick(e, section)}
                    className={`relative text-[13px] uppercase tracking-wider font-medium transition-colors ${
                      activeSection === section 
                        ? 'text-[var(--cyan)]' 
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {section}
                    {activeSection === section && (
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--cyan)] shadow-[0_0_8px_var(--cyan-glow)]"></span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

// ==========================================
// 3. Hero Section
// ==========================================
function TypingAnimation() {
  const strings = ["Python Developer", "Logic Builder", "Problem Solver", "Tech Explorer"];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentString = strings[index];
    const typingSpeed = isDeleting ? 40 : 80;
    const pauseDelay = isDeleting ? 500 : 2000;

    if (!isDeleting && text === currentString) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseDelay);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setIndex((index + 1) % strings.length);
      return;
    }

    const timeout = setTimeout(() => {
      setText(currentString.substring(0, text.length + (isDeleting ? -1 : 1)));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index]);

  return (
    <div className="text-2xl md:text-3xl font-semibold mb-6 flex items-center">
      <span className="text-[var(--text-primary)]">I'm a&nbsp;</span>
      <span className="text-[var(--cyan)]">{text}</span>
      <span className="ml-1 w-[2px] h-[30px] bg-[var(--cyan)] animate-[cursor-blink_1s_step-end_infinite]"></span>
    </div>
  );
}

function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative z-10 pt-20 px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,242,254,0.08)_0%,transparent_70%)] pointer-events-none rounded-full blur-3xl"></div>
      
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex flex-col items-center text-center">
        <div className="relative w-[200px] h-[200px] rounded-full group mb-8">
          <div className="absolute inset-[-4px] rounded-full overflow-hidden">
             <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,var(--cyan)_360deg)] animate-[spin-ring_3s_linear_infinite]"></div>
          </div>
          <div className="absolute inset-[2px] bg-[var(--bg-base)] rounded-full z-0"></div>
          <img src={profileImg} alt="Yash Bhati" className="absolute inset-[4px] w-[192px] h-[192px] rounded-full object-cover group-hover:scale-[1.03] transition-transform duration-500 z-10" />
        </div>
        
        <h1 className="text-5xl md:text-[72px] font-[800] tracking-tight leading-tight mb-4 text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-accent)', textShadow: '0 0 20px var(--cyan-glow), 0 0 60px rgba(0,242,254,0.15)' }}>
          Yash Bhati
        </h1>
        
        <TypingAnimation />
        
        <p className="text-[var(--text-secondary)] text-sm md:text-base font-medium tracking-wide">
          Class 10 · PM SHRI KV Phulera · Narnaul, Haryana
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          <a href="#projects" className="px-8 py-3.5 rounded-lg text-black font-semibold hover:scale-105 transition-all shadow-[0_0_20px_var(--cyan-glow)]" style={{ background: 'var(--gradient-accent)' }}>
            View Projects
          </a>
          <a href="#contact" className="px-8 py-3.5 rounded-lg border border-[var(--cyan)] text-[var(--cyan)] font-semibold hover:scale-105 transition-all hover:bg-[var(--cyan-glow)]">
            Contact Me
          </a>
        </div>
      </motion.div>
    </section>
  );
}

// ==========================================
// 4. About Section
// ==========================================
function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 max-w-[1200px] mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <div className="text-[var(--cyan)] text-sm font-semibold tracking-[0.2em] uppercase mb-4">01 / About</div>
          <h2 className="text-4xl md:text-[42px] font-bold mb-6 text-[var(--text-primary)]">About Me</h2>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)] mb-8">
            I am originally from Narnaul, Haryana, and currently studying in Class 10 at PM SHRI Kendriya Vidyalaya Phulera. I have a strong passion for coding, building logic, and exploring the world of technology.
          </p>
          <div className="flex flex-wrap gap-4">
            {['Class 10 Student', 'Coder since 2023', 'Problem Solver'].map(stat => (
              <div key={stat} className="px-4 py-2 rounded-full glass-card text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: 'var(--gradient-accent)' }}></div>
                {stat}
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="glass-card overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--border-glass)] flex items-center gap-2 bg-[rgba(0,0,0,0.2)]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <div className="ml-4 text-xs font-mono text-[var(--text-muted)]">developer.json</div>
          </div>
          <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
            <span className="text-[var(--text-secondary)]">{"{"}</span><br/>
            &nbsp;&nbsp;<span className="text-[var(--purple)]">"name"</span>: <span className="text-[#a8ff78]">"Yash Bhati"</span>,<br/>
            &nbsp;&nbsp;<span className="text-[var(--purple)]">"class"</span>: <span className="text-[#a8ff78]">"10th Grade"</span>,<br/>
            &nbsp;&nbsp;<span className="text-[var(--purple)]">"location"</span>: <span className="text-[#a8ff78]">"Narnaul, Haryana"</span>,<br/>
            &nbsp;&nbsp;<span className="text-[var(--purple)]">"school"</span>: <span className="text-[#a8ff78]">"PM SHRI KV Phulera"</span>,<br/>
            &nbsp;&nbsp;<span className="text-[var(--purple)]">"passion"</span>: <span className="text-[var(--text-secondary)]">[</span><span className="text-[#a8ff78]">"Coding"</span>, <span className="text-[#a8ff78]">"Logic"</span>, <span className="text-[#a8ff78]">"Tech"</span><span className="text-[var(--text-secondary)]">]</span>,<br/>
            &nbsp;&nbsp;<span className="text-[var(--purple)]">"status"</span>: <span className="text-[#a8ff78]">"Building the Future 🚀"</span><br/>
            <span className="text-[var(--text-secondary)]">{"}"}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// 5. Skills Section
// ==========================================
function SkillCard({ skill, index }: { skill: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, boxShadow: `0 0 25px ${skill.glow}`, borderColor: skill.color }}
      className="glass-card w-[130px] flex flex-col items-center justify-center p-6 relative overflow-hidden group cursor-default"
    >
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'var(--gradient-accent)' }}></div>
      <skill.Icon size={44} color={skill.color} className="mb-4 drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
      <div className="text-sm font-medium text-[var(--text-primary)] text-center">{skill.name}</div>
    </motion.div>
  );
}

function SkillsSection() {
  const topRow = [
    { name: 'Python', Icon: SiPython, color: '#3776AB', glow: 'rgba(55,118,171,0.5)' },
    { name: 'HTML5', Icon: SiHtml5, color: '#E34F26', glow: 'rgba(227,79,38,0.5)' },
    { name: 'CSS3', Icon: SiCss, color: '#1572B6', glow: 'rgba(21,114,182,0.5)' },
    { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E', glow: 'rgba(247,223,30,0.5)' },
  ];
  
  const bottomRow = [
    { name: 'GitHub', Icon: SiGithub, color: '#ffffff', glow: 'rgba(255,255,255,0.5)' },
    { name: 'VS Code', Icon: SiVscodium, color: '#007ACC', glow: 'rgba(0,122,204,0.5)' },
    { name: 'Android Studio', Icon: SiAndroidstudio, color: '#3DDC84', glow: 'rgba(61,220,132,0.5)' },
  ];

  return (
    <section id="skills" className="py-16 md:py-24 max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col items-center">
      <div className="text-[var(--cyan)] text-sm font-semibold tracking-[0.2em] uppercase mb-4 self-start md:self-center">02 / Skills</div>
      <h2 className="text-4xl md:text-[42px] font-bold mb-16 text-[var(--text-primary)] self-start md:self-center">Technical Arsenal</h2>
      
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        {topRow.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} />
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {bottomRow.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index + 4} />
        ))}
      </div>
    </section>
  );
}

// ==========================================
// 6. Projects Section
// ==========================================
function ProjectLens() {
  const [u, setU] = useState('');
  const [v, setV] = useState('');
  const [f, setF] = useState<string | null>(null);

  useEffect(() => {
    if (u === '' || v === '') {
      setF(null);
      return;
    }
    const uNum = parseFloat(u);
    const vNum = parseFloat(v);
    if (isNaN(uNum) || isNaN(vNum)) {
      setF(null);
      return;
    }
    if (uNum === 0 || vNum === 0) {
      setF('undefined');
      return;
    }
    const invF = (1 / vNum) - (1 / uNum);
    if (Math.abs(invF) < 0.000001) setF('∞');
    else setF((1 / invF).toFixed(2));
  }, [u, v]);

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="glass-card p-8 flex flex-col lg:flex-row gap-8 items-center hover:border-[var(--border-accent)] hover:shadow-[0_0_30px_rgba(0,242,254,0.1)] transition-all">
      <div className="flex-1 w-full">
        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Physics Optics Lens Calculator</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {['Physics', 'JavaScript', 'React'].map(badge => (
            <span key={badge} className="text-xs px-3 py-1 rounded-full text-black font-bold" style={{ background: 'var(--gradient-accent)' }}>{badge}</span>
          ))}
        </div>
        <p className="text-[var(--text-secondary)] mb-6">Interactive calculator for computing the focal length of a lens using the thin lens equation: <code className="font-mono text-[var(--cyan)] bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded">1/f = 1/v - 1/u</code>.</p>
      </div>
      <div className="w-full lg:w-[400px] shrink-0 bg-[var(--bg-elevated)] p-6 rounded-xl border border-[var(--border-glass)] relative group">
         <div className="space-y-6">
           <div className="relative mt-2">
             <input type="number" id="u-input" value={u} onChange={e => setU(e.target.value)} placeholder=" " className="floating-input w-full bg-[var(--bg-elevated)] border border-[var(--border-glass)] rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--cyan)] focus:shadow-[0_0_15px_var(--cyan-glow)] transition-all font-mono" />
             <label htmlFor="u-input" className="floating-label absolute left-3 top-3 text-[var(--text-secondary)] text-sm transition-all pointer-events-none rounded">Object Distance (u) cm</label>
           </div>
           <div className="relative mt-2">
             <input type="number" id="v-input" value={v} onChange={e => setV(e.target.value)} placeholder=" " className="floating-input w-full bg-[var(--bg-elevated)] border border-[var(--border-glass)] rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--cyan)] focus:shadow-[0_0_15px_var(--cyan-glow)] transition-all font-mono" />
             <label htmlFor="v-input" className="floating-label absolute left-3 top-3 text-[var(--text-secondary)] text-sm transition-all pointer-events-none rounded">Image Distance (v) cm</label>
           </div>
           <div className="mt-6 pt-6 border-t border-[var(--border-glass)] flex justify-between items-center">
             <span className="text-[var(--text-secondary)] font-medium">Focal Length (f)</span>
             <span className="text-3xl font-bold text-transparent bg-clip-text font-mono" style={{ backgroundImage: 'var(--gradient-accent)' }}>{f === null ? '--' : `${f} cm`}</span>
           </div>
         </div>
      </div>
    </motion.div>
  );
}

function ProjectPython() {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="glass-card p-8 flex flex-col lg:flex-row-reverse gap-8 items-center hover:border-[var(--border-accent)] hover:shadow-[0_0_30px_rgba(0,242,254,0.1)] transition-all">
      <div className="flex-1 w-full">
        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Python Utility Scripts</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {['Python', 'Algorithms', 'DSA'].map(badge => (
             <span key={badge} className="text-xs px-3 py-1 rounded-full text-black font-bold" style={{ background: 'var(--gradient-accent)' }}>{badge}</span>
          ))}
        </div>
        <p className="text-[var(--text-secondary)] mb-6">A collection of optimized algorithms and utility scripts written in Python to solve complex computational problems efficiently, including search algorithms and data structures.</p>
      </div>
      <div className="w-full lg:w-[500px] shrink-0 bg-[var(--bg-elevated)] border border-[var(--border-glass)] rounded-xl overflow-hidden shadow-2xl relative group">
         <div className="px-4 py-3 border-b border-[var(--border-glass)] flex items-center gap-2 bg-[rgba(0,0,0,0.3)]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <div className="ml-4 text-xs font-mono text-[var(--text-muted)]">binary_search.py</div>
         </div>
         <div className="p-5 font-mono text-sm overflow-x-auto text-[#c5c8c6] bg-[var(--bg-base)]">
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
            
    <span className="text-[#c678dd]">return</span> -<span className="text-[#d19a66]">1</span>

<span className="text-[#5c6370] italic"># Time Complexity: O(log n)</span></code></pre>
         </div>
      </div>
    </motion.div>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24 max-w-[1200px] mx-auto px-6 relative z-10">
      <div className="text-[var(--cyan)] text-sm font-semibold tracking-[0.2em] uppercase mb-4">03 / Projects</div>
      <h2 className="text-4xl md:text-[42px] font-bold mb-12 text-[var(--text-primary)]">Featured Work</h2>
      
      <div className="flex flex-col gap-8">
        <ProjectLens />
        <ProjectPython />
      </div>
    </section>
  );
}

// ==========================================
// 7. Achievements Section
// ==========================================
function AchievementsSection() {
  return (
    <section id="achievements" className="py-16 md:py-24 max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col items-center">
      <div className="text-[var(--cyan)] text-sm font-semibold tracking-[0.2em] uppercase mb-4 self-start md:self-center">04 / Achievements</div>
      <h2 className="text-4xl md:text-[42px] font-bold mb-12 text-[var(--text-primary)] self-start md:self-center">Recognition</h2>
      
      <motion.div initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="w-full relative p-[2px] rounded-3xl overflow-hidden group">
         <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--cyan),var(--purple),var(--cyan))] bg-[length:200%_auto] animate-[shimmer-border_3s_linear_infinite] opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
         
         <div className="relative glass-card rounded-[22px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 md:gap-16 h-full bg-[var(--bg-elevated)] border-none">
            <div className="flex-shrink-0">
               <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[var(--bg-base)] flex items-center justify-center border-4 border-[#FFD700] shadow-[0_0_40px_rgba(255,215,0,0.3)] group-hover:shadow-[0_0_60px_rgba(255,215,0,0.5)] transition-shadow duration-500 animate-[trophy-float_4s_ease-in-out_infinite]">
                  <Trophy size={64} className="text-[#FFD700] md:w-20 md:h-20" strokeWidth={1.5} />
               </div>
            </div>
            
            <div className="text-center md:text-left">
               <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text mb-4" style={{ backgroundImage: 'var(--gradient-accent-alt)' }}>
                 IIT Delhi — Vidya Setu Hackathon
               </h3>
               <div className="inline-block px-4 py-1.5 rounded-full bg-[rgba(79,172,254,0.15)] text-[var(--purple)] text-sm font-semibold mb-6 border border-[rgba(79,172,254,0.3)]">
                 National Level EdTech Innovation Challenge
               </div>
               <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-3xl mx-auto md:mx-0">
                 Competed in the prestigious Vidya Setu Hackathon organized by IIT Delhi — one of India's premier technology institutions. This national-level EdTech innovation challenge brought together student developers to build technology-driven solutions for bridging educational gaps. Selected as a participant, demonstrating exceptional problem-solving and technical aptitude on a national stage.
               </p>
               <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <span className="px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[var(--border-glass)] text-[var(--text-primary)] text-sm flex items-center gap-2">
                     <span className="text-[var(--cyan)]">🏛</span> IIT Delhi
                  </span>
                  <span className="px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[var(--border-glass)] text-[var(--text-primary)] text-sm flex items-center gap-2">
                     <span className="text-[var(--cyan)]">🇮🇳</span> National Stage
                  </span>
               </div>
            </div>
         </div>
      </motion.div>
    </section>
  );
}

// ==========================================
// 8. Contact Section
// ==========================================
function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle'|'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setStatus('sent');
    setTimeout(() => {
      setStatus('idle');
      setName('');
      setEmail('');
      setMessage('');
    }, 3000);
  };

  const links = [
    { name: 'Email', value: 'yashbhatikv1jp@gmail.com', Icon: Mail, href: 'mailto:yashbhatikv1jp@gmail.com', color: '#EA4335' },
    { name: 'GitHub', value: 'Yashbhati2011', Icon: SiGithub, href: 'https://github.com/Yashbhati2011', color: '#ffffff' },
    { name: 'Instagram', value: 'Yash.bhati.2011', Icon: SiInstagram, href: 'https://instagram.com/Yash.bhati.2011', color: '#E1306C' }
  ];

  return (
    <section id="contact" className="py-16 md:py-24 max-w-[1200px] mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
         <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="text-[var(--cyan)] text-sm font-semibold tracking-[0.2em] uppercase mb-4">05 / Contact</div>
            <h2 className="text-4xl md:text-[42px] font-bold mb-6 text-[var(--text-primary)]">Let's Connect</h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10">I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.</p>
            
            <div className="flex flex-col gap-4">
              {links.map(link => (
                 <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="glass-card p-4 rounded-xl flex items-center gap-4 group hover:scale-[1.02] transition-transform duration-300">
                    <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center border border-[var(--border-glass)] group-hover:border-[var(--border-accent)] transition-colors">
                       <link.Icon size={20} color={link.color} />
                    </div>
                    <div>
                       <div className="text-sm font-bold text-[var(--text-primary)]">{link.name}</div>
                       <div className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--cyan)] transition-colors">{link.value}</div>
                    </div>
                 </a>
              ))}
            </div>
         </motion.div>
         
         <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="glass-card p-8 rounded-2xl flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
               <div className="relative mt-2">
                 <input type="text" id="name" value={name} onChange={e=>setName(e.target.value)} required placeholder=" " className="floating-input w-full bg-[var(--bg-elevated)] border border-[var(--border-glass)] rounded-xl px-5 py-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--cyan)] focus:shadow-[0_0_15px_var(--cyan-glow)] transition-all" />
                 <label htmlFor="name" className="floating-label absolute left-4 top-4 text-[var(--text-secondary)] text-sm transition-all pointer-events-none rounded">Your Name</label>
               </div>
               <div className="relative mt-2">
                 <input type="email" id="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder=" " className="floating-input w-full bg-[var(--bg-elevated)] border border-[var(--border-glass)] rounded-xl px-5 py-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--cyan)] focus:shadow-[0_0_15px_var(--cyan-glow)] transition-all" />
                 <label htmlFor="email" className="floating-label absolute left-4 top-4 text-[var(--text-secondary)] text-sm transition-all pointer-events-none rounded">Email Address</label>
               </div>
               <div className="relative mt-2">
                 <textarea id="message" value={message} onChange={e=>setMessage(e.target.value)} required rows={4} placeholder=" " className="floating-input w-full bg-[var(--bg-elevated)] border border-[var(--border-glass)] rounded-xl px-5 py-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--cyan)] focus:shadow-[0_0_15px_var(--cyan-glow)] transition-all resize-none"></textarea>
                 <label htmlFor="message" className="floating-label absolute left-4 top-4 text-[var(--text-secondary)] text-sm transition-all pointer-events-none rounded">Message</label>
               </div>
               <button type="submit" className="w-full py-4 rounded-xl text-black font-semibold tracking-wide flex items-center justify-center transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_var(--cyan-glow)]" style={{ background: 'var(--gradient-accent)' }}>
                 {status === 'sent' ? 'Message Sent! ✓' : 'Send Message'}
               </button>
            </form>
         </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// 9. Footer
// ==========================================
function Footer() {
  return (
    <footer className="py-8 border-t border-[var(--border-glass)] text-center text-[var(--text-muted)] text-sm relative z-10">
      <p>Crafted with passion by Yash Bhati — Class 10 · 2025</p>
    </footer>
  );
}

// ==========================================
// App Shell
// ==========================================
const queryClient = new QueryClient();

function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] selection:bg-[var(--cyan)] selection:text-black">
      <ParticleCanvas />
      <NavBar />
      <main className="relative z-10 pb-20">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;