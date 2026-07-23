import { useEffect, useState, useRef } from 'react';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Mail, Moon, Sun, Trophy, ArrowRight, Code } from 'lucide-react';
import { 
  SiPython, SiHtml5, SiCss, SiJavascript, 
  SiGithub, SiVscodium, SiAndroidstudio, SiInstagram 
} from 'react-icons/si';

import { useScrollReveal, useActiveSection, useScrollDirection } from '@/hooks/use-scroll';
import profileImg from '@assets/profile_1784802713138.jpg';
import NotFound from '@/pages/not-found';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

// Theme Toggle Component
function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Check system preference or saved preference
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div 
      className="fixed top-6 right-6 z-50 flex items-center justify-center"
      data-testid="button-theme-toggle"
    >
      <button 
        onClick={toggleTheme}
        className="theme-toggle shadow-lg"
        aria-label="Toggle theme"
      >
        <div className="theme-toggle-thumb">
          {theme === 'dark' ? (
            <Moon size={14} className="text-[#1a1a24]" />
          ) : (
            <Sun size={14} className="text-white" />
          )}
        </div>
      </button>
    </div>
  );
}

// Navigation Component
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'py-4' : 'py-6'
      } ${
        scrollDirection === 'down' && isScrolled ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <nav className={`mx-auto max-w-max rounded-full transition-all duration-300 ${
          isScrolled ? 'bg-[var(--bg-card)]/80 backdrop-blur-md border border-[var(--border)] shadow-lg px-6 py-3' : 'bg-transparent'
        }`}>
          <ul className="flex items-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar">
            {sections.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  onClick={(e) => handleNavClick(e, section)}
                  className={`text-sm font-medium capitalize tracking-wide transition-colors whitespace-nowrap ${
                    activeSection === section 
                      ? 'text-[var(--accent)]' 
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {section}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

// Hero Section
function HeroSection() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const phrase = "Hi, I am Yash.";
  
  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 150;
    const pauseBeforeDelete = 2000;
    const pauseBeforeType = 500;

    const timer = setTimeout(() => {
      if (!isDeleting && text.length === phrase.length) {
        setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
      } else if (isDeleting && text.length === 0) {
        setTimeout(() => setIsDeleting(false), pauseBeforeType);
      } else {
        const nextText = isDeleting 
          ? phrase.substring(0, text.length - 1)
          : phrase.substring(0, text.length + 1);
        setText(nextText);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, phrase]);

  return (
    <section id="home" className="min-h-[100dvh] flex flex-col items-center justify-center relative pt-20">
      <div className="animate-fade-in-up flex flex-col items-center text-center z-10 px-4">
        <div className="relative mb-8 group animate-float">
          <div className="absolute inset-0 rounded-full animate-breathe bg-[var(--accent)] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-[var(--accent)] shadow-[0_0_30px_rgba(108,99,255,0.4)] group-hover:shadow-[0_0_50px_rgba(108,99,255,0.8)] transition-all duration-500 group-hover:-translate-y-2">
            <img 
              src={profileImg} 
              alt="Yash Bhati" 
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
        
        <div className="h-16 flex items-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[var(--text)]">
            {text}
            <span className="inline-block w-1 h-10 sm:h-14 ml-1 bg-[var(--accent)] animate-typing-cursor align-middle"></span>
          </h1>
        </div>
        
        <p className="mt-6 text-lg sm:text-xl text-[var(--text-muted)] max-w-xl">
          Next-Gen Developer. Logic Builder. Technology Explorer.
        </p>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  const { ref, revealed } = useScrollReveal();

  return (
    <section id="about" className="py-24 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div 
          ref={ref as React.RefObject<HTMLDivElement>} 
          className={`reveal-left ${revealed ? 'revealed' : ''} grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center`}
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-[var(--text)] flex items-center gap-4">
              <span className="w-12 h-1 bg-[var(--accent)] rounded-full"></span>
              About Me
            </h2>
            <p className="text-lg leading-relaxed text-[var(--text-muted)]">
              I am originally from Narnaul, Haryana, and currently studying in Class 10 at PM SHRI Kendriya Vidyalaya Phulera. I have a strong passion for coding, building logic, and exploring the world of technology.
            </p>
          </div>
          
          <div className="glass-card rounded-2xl p-6 sm:p-8 font-mono text-sm sm:text-base relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]"></div>
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-[var(--text-muted)]">
              <p><span className="text-[#c678dd]">const</span> <span className="text-[#61afef]">developer</span> <span className="text-[#56b6c2]">=</span> {'{'}</p>
              <p className="ml-4">name: <span className="text-[#98c379]">'Yash Bhati'</span>,</p>
              <p className="ml-4">role: <span className="text-[#98c379]">'Student & Coder'</span>,</p>
              <p className="ml-4">location: <span className="text-[#98c379]">'Narnaul, Haryana'</span>,</p>
              <p className="ml-4">passion: [<span className="text-[#98c379]">'Coding'</span>, <span className="text-[#98c379]">'Logic'</span>, <span className="text-[#98c379]">'Tech'</span>]</p>
              <p>{'};'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Skills Section
function SkillsSection() {
  const { ref, revealed } = useScrollReveal();
  
  const skills = [
    { name: 'Python', icon: SiPython, color: '#3776AB' },
    { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
    { name: 'CSS3', icon: SiCss, color: '#1572B6' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'GitHub', icon: SiGithub, color: '#fff' }, // Adjusted via CSS for light mode
    { name: 'VS Code', icon: SiVscodium, color: '#007ACC' },
    { name: 'Android Studio', icon: SiAndroidstudio, color: '#3DDC84' },
  ];

  return (
    <section id="skills" className="py-24 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`reveal-section ${revealed ? 'revealed' : ''}`}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16 text-center text-[var(--text)]">
            Skills & Tools
          </h2>
          
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {skills.map((skill, index) => (
              <div 
                key={skill.name}
                className="glass-card rounded-2xl p-6 w-32 sm:w-40 flex flex-col items-center justify-center gap-4 group"
                style={{ 
                  transitionDelay: `${index * 50}ms`,
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <skill.icon 
                  size={48} 
                  className="transition-transform duration-300 group-hover:scale-110" 
                  style={{ color: skill.color === '#fff' ? 'var(--text)' : skill.color }} 
                />
                <span className="font-medium text-sm sm:text-base text-center text-[var(--text)]">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Lens Calculator Project Component
function LensCalculator() {
  const [u, setU] = useState<string>('');
  const [v, setV] = useState<string>('');
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

    // 1/f = 1/v - 1/u
    const invF = (1 / vNum) - (1 / uNum);
    
    if (Math.abs(invF) < 0.000001) {
      setF('∞');
    } else {
      const focalLength = 1 / invF;
      setF(focalLength.toFixed(2));
    }
  }, [u, v]);

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 h-full flex flex-col relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)] opacity-10 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-125"></div>
      
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-[var(--text)] mb-2">Physics Optics</h3>
          <p className="text-[var(--accent-secondary)] font-mono text-sm mb-4">Lens Calculator</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-[var(--bg)] flex items-center justify-center border border-[var(--border)]">
          <Code className="text-[var(--accent)]" size={24} />
        </div>
      </div>

      <div className="space-y-4 flex-grow">
        <div>
          <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">
            Object Distance (u) in cm
          </label>
          <input 
            type="number" 
            value={u} 
            onChange={(e) => setU(e.target.value)}
            className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            placeholder="-30"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-muted)] mb-1">
            Image Distance (v) in cm
          </label>
          <input 
            type="number" 
            value={v} 
            onChange={(e) => setV(e.target.value)}
            className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            placeholder="15"
          />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[var(--border)]">
        <div className="flex items-center justify-between">
          <span className="text-[var(--text-muted)]">Focal Length (f):</span>
          <span className="text-2xl font-bold text-[var(--accent)] font-mono">
            {f === null ? '--' : `${f} cm`}
          </span>
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-2 opacity-50 font-mono">
          Formula: 1/f = 1/v - 1/u
        </p>
      </div>
    </div>
  );
}

// Python Project Component
function PythonProject() {
  const codeSnippet = `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1

# Time Complexity: O(log n)`;

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 h-full flex flex-col">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-[var(--text)] mb-2">Python Utils</h3>
          <p className="text-[var(--accent-secondary)] font-mono text-sm mb-4">Algorithm Implementations</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-[var(--bg)] flex items-center justify-center border border-[var(--border)]">
          <SiPython className="text-[var(--accent)]" size={24} />
        </div>
      </div>

      <div className="flex-grow flex flex-col justify-center">
        <p className="text-[var(--text-muted)] mb-6 text-sm">
          A collection of optimized algorithms and utility scripts written in Python to solve complex computational problems efficiently.
        </p>
        
        <div className="rounded-xl overflow-hidden border border-[var(--border)] shadow-inner">
          <div className="bg-[#1a1a24] px-4 py-2 border-b border-[#2a2a35] flex gap-2 items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 opacity-50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 opacity-50"></div>
            <span className="ml-2 text-xs text-[#8888aa] font-mono">search.py</span>
          </div>
          <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed bg-[#1e1e24] text-[#c5c8c6]">
            <code>
              <span className="text-[#c678dd]">def</span> <span className="text-[#61afef]">binary_search</span>(arr, target):{'\n'}
              {'    '}left, right <span className="text-[#56b6c2]">=</span> <span className="text-[#d19a66]">0</span>, <span className="text-[#56b6c2]">len</span>(arr) - <span className="text-[#d19a66]">1</span>{'\n\n'}
              {'    '}<span className="text-[#c678dd]">while</span> left <span className="text-[#56b6c2]">&lt;=</span> right:{'\n'}
              {'        '}mid <span className="text-[#56b6c2]">=</span> (left + right) <span className="text-[#56b6c2]">//</span> <span className="text-[#d19a66]">2</span>{'\n'}
              {'        '}<span className="text-[#c678dd]">if</span> arr[mid] <span className="text-[#56b6c2]">==</span> target:{'\n'}
              {'            '}<span className="text-[#c678dd]">return</span> mid{'\n'}
              {'        '}<span className="text-[#c678dd]">elif</span> arr[mid] <span className="text-[#56b6c2]">&lt;</span> target:{'\n'}
              {'            '}left <span className="text-[#56b6c2]">=</span> mid + <span className="text-[#d19a66]">1</span>{'\n'}
              {'        '}<span className="text-[#c678dd]">else</span>:{'\n'}
              {'            '}right <span className="text-[#56b6c2]">=</span> mid - <span className="text-[#d19a66]">1</span>{'\n\n'}
              {'    '}<span className="text-[#c678dd]">return</span> <span className="text-[#d19a66]">-1</span>{'\n\n'}
              <span className="text-[#5c6370] italic"># Time Complexity: O(log n)</span>
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

// Projects Section
function ProjectsSection() {
  const { ref, revealed } = useScrollReveal();

  return (
    <section id="projects" className="py-24 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`reveal-section ${revealed ? 'revealed' : ''}`}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16 text-[var(--text)] flex items-center gap-4">
            <span className="w-12 h-1 bg-[var(--accent)] rounded-full"></span>
            Featured Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <LensCalculator />
            <PythonProject />
          </div>
        </div>
      </div>
    </section>
  );
}

// Achievements Section
function AchievementsSection() {
  const { ref, revealed } = useScrollReveal();

  return (
    <section id="achievements" className="py-24 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div 
          ref={ref as React.RefObject<HTMLDivElement>} 
          className={`reveal-scale ${revealed ? 'revealed' : ''} relative p-1 rounded-3xl overflow-hidden group`}
        >
          {/* Animated gradient border wrapper */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] via-[var(--accent-secondary)] to-[var(--accent)] shimmer-bg rounded-3xl z-0 opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 bg-[var(--bg-card)] rounded-[22px] p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 h-full">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-[var(--bg)] flex items-center justify-center border-4 border-[var(--accent)] shadow-[0_0_30px_rgba(108,99,255,0.3)] animate-trophy">
                <Trophy size={64} className="text-[#FFD700]" />
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-4">
                IIT Delhi — Vidya Setu Hackathon
              </h3>
              <div className="w-16 h-1 bg-[var(--accent)] rounded-full mb-6 mx-auto md:mx-0"></div>
              <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                Competed in the prestigious Vidya Setu Hackathon organized by IIT Delhi — one of India's premier technology institutions. This national-level EdTech innovation challenge brought together student developers to build technology-driven solutions for bridging educational gaps. Selected as a participant, demonstrating exceptional problem-solving and technical aptitude on a national stage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const { ref, revealed } = useScrollReveal();
  
  const links = [
    { 
      name: 'Email', 
      value: 'yashbhatikv1jp@gmail.com', 
      icon: Mail, 
      href: 'mailto:yashbhatikv1jp@gmail.com',
      color: '#EA4335'
    },
    { 
      name: 'GitHub', 
      value: 'Yashbhati2011', 
      icon: SiGithub, 
      href: 'https://github.com/Yashbhati2011',
      color: '#ffffff' // Light mode adapts via CSS if needed, but keeping original brand colors
    },
    { 
      name: 'Instagram', 
      value: 'Yash.bhati.2011', 
      icon: SiInstagram, 
      href: 'https://instagram.com/Yash.bhati.2011',
      color: '#E1306C'
    }
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 relative mb-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`reveal-section ${revealed ? 'revealed' : ''}`}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16 text-center text-[var(--text)]">
            Let's Connect
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {links.map((link, index) => (
              <a 
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-2xl p-6 flex flex-col items-center text-center group"
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <div 
                  className="w-16 h-16 rounded-full mb-6 flex items-center justify-center bg-[var(--bg)] border border-[var(--border)] transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2"
                  style={{ boxShadow: `0 0 20px ${link.color}20` }}
                >
                  <link.icon 
                    size={32} 
                    style={{ color: link.name === 'GitHub' ? 'var(--text)' : link.color }} 
                    className="transition-colors duration-300"
                  />
                </div>
                <h3 className="font-bold text-lg text-[var(--text)] mb-2">{link.name}</h3>
                <p className="text-sm text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors break-all">
                  {link.value}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-8 border-t border-[var(--border)] text-center text-[var(--text-muted)] text-sm">
      <p>Built with ❤️ by Yash Bhati. Class 10.</p>
    </footer>
  );
}

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="bg-mesh"></div>
      <ThemeToggle />
      <NavBar />
      <main>
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
