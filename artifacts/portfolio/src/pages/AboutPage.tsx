import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, School, GraduationCap, Code2, Trophy, Target, Sparkles, Zap, Telescope } from 'lucide-react';
import profileImg from '@assets/profile_1784802713138.jpg';
import SectionHeader from '../components/SectionHeader';

export default function AboutPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.3 }}
      className="page-wrapper container mx-auto px-6"
    >
      <div className="py-12 md:py-20">
        <SectionHeader number="01" title="About Me" subtitle="The Story So Far" />
        
        {/* Section 1 - Personal Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col items-center text-center"
          >
            <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-[var(--border-accent)] mb-6 shadow-[0_0_30px_var(--cyan-dim)]">
              <img src={profileImg} alt="Yash Bhati" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-[var(--text)]">Yash Bhati</h3>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[var(--cyan-dim)] text-[var(--cyan)]">Student</span>
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[var(--purple-dim)] text-[var(--purple)]">Developer</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }} 
            viewport={{ once: true }}
            className="lg:col-span-8 text-[var(--text-2)] leading-relaxed text-lg space-y-6"
          >
            <p>
              I am <strong className="gradient-text font-bold">Yash Bhati</strong>, a passionate young developer from <strong className="text-[var(--text)]">Narnaul, Haryana</strong>, currently in <strong className="text-[var(--text)]">Class 10 at PM SHRI Kendriya Vidyalaya Phulera</strong>. From a young age, I was drawn to the way technology solves real-world problems — and that curiosity has driven me to teach myself programming, build projects across physics, mathematics, and computer science, and compete in national-level hackathons like the <strong className="gradient-text font-bold">IIT Delhi Vidya Setu Hackathon</strong>.
            </p>
            <p>
              I believe that age is no barrier to innovation. As a student developer, I've built over <strong className="gradient-text font-bold">16 projects</strong> spanning physics simulators, algorithm implementations, and web applications — all while maintaining academic excellence. My work is driven by one core belief: <strong className="text-[var(--text)] font-semibold">technology should be accessible, logical, and impactful</strong>.
            </p>
            <p>
              Beyond code, I'm deeply interested in the <strong className="text-[var(--text)] font-semibold">intersection of physics and computation</strong> — using programming to simulate and visualize real-world phenomena that textbooks can only describe. I'm also an active learner, constantly expanding my skills in new programming languages, tools, and frameworks.
            </p>
          </motion.div>
        </div>

        {/* Section 2 - Quick Facts */}
        <motion.div 
          variants={{ show: { transition: { staggerChildren: 0.1 } } }} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-24"
        >
          {[
            { icon: MapPin, label: "Location", value: "Narnaul, Haryana", color: "text-red-400" },
            { icon: School, label: "School", value: "PM SHRI KV Phulera", color: "text-blue-400" },
            { icon: GraduationCap, label: "Grade", value: "Class 10", color: "text-purple-400" },
            { icon: Code2, label: "Projects", value: "16+ Built", color: "text-green-400" },
            { icon: Trophy, label: "Achievement", value: "IIT Delhi Hackathon", color: "text-yellow-400" },
            { icon: Target, label: "Focus", value: "Physics + CS + Math", color: "text-cyan-400" },
            { icon: Sparkles, label: "Status", value: "Continuously Learning", color: "text-pink-400" },
            { icon: Zap, label: "Passion", value: "Building Tech Solutions", color: "text-orange-400" },
            { icon: Telescope, label: "Interest", value: "Physics & Computation", color: "text-indigo-400" },
          ].map((fact, i) => (
            <motion.div key={i} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="glass-card p-5 flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] ${fact.color}`}>
                <fact.icon size={20} />
              </div>
              <div>
                <div className="text-xs text-[var(--text-3)] font-semibold uppercase tracking-wider">{fact.label}</div>
                <div className="text-[var(--text)] font-medium">{fact.value}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Section 3 - My Journey */}
        <div className="mb-24">
          <SectionHeader number="02" title="Timeline" subtitle="My Journey" />
          <div className="max-w-3xl">
            {[
              { year: "2023", title: "Started Learning Python", desc: "Began my programming journey with Python, mastering fundamentals of logic and problem-solving" },
              { year: "2023", title: "First Project", desc: "Built my first Python utility scripts — number games, converters, and algorithm implementations" },
              { year: "2024", title: "Expanded to Web Dev", desc: "Learned HTML, CSS, and JavaScript — started building interactive web applications" },
              { year: "2024", title: "Physics + Code", desc: "Combined my passion for physics with programming — built optics calculators and physics simulators" },
              { year: "2025", title: "IIT Delhi Hackathon", desc: "Selected to participate in the prestigious Vidya Setu Hackathon at IIT Delhi — national-level recognition" },
              { year: "2025", title: "Android Development", desc: "Exploring Android Studio and mobile app development" },
              { year: "Present", title: "Looking Forward", desc: "Building more projects, learning C++, and preparing to take on larger challenges" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="timeline-item pb-10 last:pb-0"
              >
                <div className="timeline-dot shadow-[0_0_10px_var(--cyan-glow)]"></div>
                <div className="glass-card p-6 ml-6">
                  <div className="inline-block px-3 py-1 rounded text-xs font-bold text-white bg-[var(--gradient)] mb-3">
                    {item.year}
                  </div>
                  <h4 className="text-xl font-bold text-[var(--text)] mb-2">{item.title}</h4>
                  <p className="text-[var(--text-2)]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 4 - Terminal */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="bg-[#111116] rounded-xl overflow-hidden border border-[#2d2d3a] shadow-2xl font-mono text-sm max-w-4xl mx-auto">
            <div className="px-4 py-3 border-b border-[#2d2d3a] flex items-center gap-2 bg-[#0a0a0c]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <div className="ml-4 text-xs text-gray-500">yash@portfolio:~</div>
            </div>
            <div className="p-6 text-gray-300 space-y-4 leading-relaxed overflow-x-auto">
              <div>
                <span className="text-green-400 font-bold">{">"}</span> <span className="text-blue-400">whoami</span>
                <br />Yash Bhati — Student Developer
              </div>
              <div>
                <span className="text-green-400 font-bold">{">"}</span> <span className="text-blue-400">cat interests.txt</span>
                <br />Physics | Mathematics | Computer Science | Web Dev | Android Dev
              </div>
              <div>
                <span className="text-green-400 font-bold">{">"}</span> <span className="text-blue-400">cat goals.txt</span>
                <br />[ ] Learn C++ deeply
                <br />[ ] Build an Android app
                <br />[<span className="text-green-400">x</span>] Compete in national hackathon
                <br />[<span className="text-green-400">x</span>] Build 16+ projects
                <br />[ ] Contribute to open source
                <br />[ ] Pursue CS in higher education
              </div>
              <div>
                <span className="text-green-400 font-bold">{">"}</span> <span className="text-blue-400">echo "Ready to build the future"</span>
                <br />Ready to build the future ✓
                <span className="inline-block w-2 h-4 bg-gray-400 ml-1 animate-[cursor-blink_1s_step-end_infinite] align-middle"></span>
              </div>
            </div>
          </div>
        </motion.div>
        
      </div>
    </motion.div>
  );
}
