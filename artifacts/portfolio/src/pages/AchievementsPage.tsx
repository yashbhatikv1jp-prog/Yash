import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Code2, BookOpen } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

export default function AchievementsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.3 }}
      className="page-wrapper container mx-auto px-6"
    >
      <div className="py-12 md:py-20">
        <SectionHeader number="01" title="Achievements" subtitle="Recognition" />
        
        {/* Main Achievement Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6 }} 
          viewport={{ once: true }} 
          className="w-full relative p-[2px] rounded-3xl overflow-hidden group mb-12"
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--cyan),var(--purple),var(--cyan))] bg-[length:200%_auto] animate-[shimmer-border_3s_linear_infinite] opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative glass-card rounded-[22px] p-8 md:p-16 flex flex-col md:flex-row items-center gap-10 md:gap-16 h-full bg-[var(--bg-elevated)] border-none">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-[var(--bg)] flex items-center justify-center border-4 border-[#FFD700] shadow-[0_0_40px_rgba(255,215,0,0.3)] group-hover:shadow-[0_0_60px_rgba(255,215,0,0.5)] transition-shadow duration-500 animate-[trophy-float_4s_ease-in-out_infinite]">
                <Trophy size={80} className="text-[#FFD700]" strokeWidth={1.5} />
              </div>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h3 className="text-3xl md:text-5xl font-[900] text-transparent bg-clip-text mb-4" style={{ backgroundImage: 'var(--gradient-r)' }}>
                IIT Delhi — Vidya Setu Hackathon
              </h3>
              <div className="inline-block px-5 py-2 rounded-full bg-[var(--purple-dim)] text-[var(--purple)] text-sm font-bold mb-6 border border-[var(--purple-glow)] uppercase tracking-wider">
                National Level EdTech Innovation Challenge
              </div>
              <p className="text-lg md:text-xl text-[var(--text-2)] leading-relaxed mb-8">
                Competed in the prestigious Vidya Setu Hackathon organized by IIT Delhi — one of India's premier technology institutions. This national-level challenge brought together student developers to build technology-driven solutions for bridging educational gaps. Selected as a participant, demonstrating exceptional problem-solving and technical aptitude on a national stage.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="px-5 py-2.5 rounded-xl bg-[var(--bg-glass)] border border-[var(--border)] text-[var(--text)] text-sm font-semibold flex items-center gap-2">
                  <span className="text-[var(--cyan)]">🏛</span> IIT Delhi
                </span>
                <span className="px-5 py-2.5 rounded-xl bg-[var(--bg-glass)] border border-[var(--border)] text-[var(--text)] text-sm font-semibold flex items-center gap-2">
                  <span className="text-[var(--purple)]">🇮🇳</span> National Stage
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Secondary Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }} 
            viewport={{ once: true }} 
            className="glass-card p-8 group hover:border-[var(--cyan)] transition-colors relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Code2 size={120} />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[var(--cyan-dim)] text-[var(--cyan)] flex items-center justify-center mb-6 border border-[var(--cyan-glow)]">
              <Code2 size={28} />
            </div>
            <h3 className="text-2xl font-bold text-[var(--text)] mb-4">16+ Projects Built</h3>
            <p className="text-[var(--text-2)] leading-relaxed relative z-10">
              Independently built and documented over 16 fully functional projects across Physics, Mathematics, and Computer Science as a Class 10 student. Showcasing a strong grasp of applied logic and real-world problem solving.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.4 }} 
            viewport={{ once: true }} 
            className="glass-card p-8 group hover:border-[var(--purple)] transition-colors relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <BookOpen size={120} />
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[var(--purple-dim)] text-[var(--purple)] flex items-center justify-center mb-6 border border-[var(--purple-glow)]">
              <BookOpen size={28} />
            </div>
            <h3 className="text-2xl font-bold text-[var(--text)] mb-4">Self-Taught Developer</h3>
            <p className="text-[var(--text-2)] leading-relaxed relative z-10">
              Learned Python, HTML, CSS, JavaScript, and C++ entirely through self-directed study and practical application — without formal computer science courses. Driven by pure curiosity and a passion for technology.
            </p>
          </motion.div>
        </div>
        
      </div>
    </motion.div>
  );
}
