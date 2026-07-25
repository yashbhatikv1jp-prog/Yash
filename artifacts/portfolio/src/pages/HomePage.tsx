import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import profileImg from '@assets/profile_1784802713138.jpg';
import ParticleCanvas from '../components/ParticleCanvas';

function TypingAnimation() {
  const strings = ["Python Developer", "Web Developer", "Logic Builder", "Problem Solver", "Physics Enthusiast", "Tech Explorer"];
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
    <div className="text-2xl md:text-3xl font-semibold mb-6 flex items-center justify-center">
      <span className="text-[var(--text)]">I'm a&nbsp;</span>
      <span className="text-[var(--cyan)]">{text}</span>
      <span className="ml-1 w-[2px] h-[30px] bg-[var(--cyan)] animate-[cursor-blink_1s_step-end_infinite]"></span>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <ParticleCanvas />
      
      <section className="min-h-screen flex flex-col items-center justify-center relative z-10 pt-20 px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,var(--cyan-dim)_0%,transparent_70%)] pointer-events-none rounded-full blur-3xl"></div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="relative w-[200px] h-[200px] rounded-full group mb-8">
            <div className="absolute inset-[-4px] rounded-full overflow-hidden">
               <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,var(--cyan)_360deg)] animate-[spin-ring_3s_linear_infinite]"></div>
            </div>
            <div className="absolute inset-[2px] bg-[var(--bg)] rounded-full z-0"></div>
            <img 
              src={profileImg} 
              alt="Yash Bhati" 
              className="absolute inset-[4px] w-[192px] h-[192px] rounded-full object-cover group-hover:scale-[1.03] group-hover:brightness-110 transition-all duration-500 z-10" 
            />
          </motion.div>
          
          <motion.h1 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            className="text-5xl md:text-[80px] font-[900] tracking-tight leading-tight mb-4"
          >
            <span 
              className="gradient-text" 
              style={{ filter: 'drop-shadow(0 0 20px var(--cyan-glow)) drop-shadow(0 0 40px rgba(0,242,254,0.15))' }}
            >
              Yash Bhati
            </span>
          </motion.h1>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
            <TypingAnimation />
          </motion.div>
          
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            className="text-[var(--text-2)] text-sm md:text-base font-medium tracking-wide mb-10"
          >
            Class 10 · PM SHRI KV Phulera · Narnaul, Haryana
          </motion.p>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="px-5 py-2.5 rounded-full glass-card text-sm font-semibold flex items-center gap-2">
              <span>⚡</span> 16 Projects Built
            </div>
            <div className="px-5 py-2.5 rounded-full glass-card text-sm font-semibold flex items-center gap-2">
              <span>🎯</span> IIT Delhi Hackathon Participant
            </div>
          </motion.div>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="flex flex-wrap justify-center gap-6">
            <Link 
              href="/projects" 
              className="px-8 py-3.5 rounded-lg text-white font-semibold hover:scale-105 transition-all shadow-[0_0_20px_var(--cyan-glow)] bg-[var(--gradient)] border-none hover:shadow-[0_0_30px_var(--cyan-glow)]"
            >
              Explore Projects
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-3.5 rounded-lg border border-[var(--cyan)] text-[var(--cyan)] font-semibold hover:scale-105 transition-all hover:bg-[var(--cyan-dim)]"
            >
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--text-3)] animate-bounce"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>
    </div>
  );
}
