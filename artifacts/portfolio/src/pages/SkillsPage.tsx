import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiPython, SiHtml5, SiCss, SiJavascript,
  SiCplusplus, SiTypescript, SiMysql,
  SiReact, SiTailwindcss, SiNodedotjs,
  SiGithub, SiVscodium, SiAndroidstudio, SiGit, SiFigma
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { BookOpen, Compass, Code, Terminal, Layers } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

const skillCategories = [
  {
    title: "Core Languages",
    skills: [
      { name: "Python", Icon: SiPython, color: "#3776AB", level: "Advanced" },
      { name: "HTML5", Icon: SiHtml5, color: "#E34F26", level: "Advanced" },
      { name: "CSS3", Icon: SiCss, color: "#1572B6", level: "Advanced" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E", level: "Advanced" }
    ]
  },
  {
    title: "Expanding",
    skills: [
      { name: "C++", Icon: SiCplusplus, color: "#00599C", level: "Intermediate" },
      { name: "Java", Icon: FaJava, color: "#ED8B00", level: "Learning" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6", level: "Learning" },
      { name: "SQL", Icon: SiMysql, color: "#4479A1", level: "Familiar" }
    ]
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "React", Icon: SiReact, color: "#61DAFB", level: "Intermediate" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8", level: "Intermediate" },
      { name: "Node.js", Icon: SiNodedotjs, color: "#339933", level: "Familiar" }
    ]
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "GitHub", Icon: SiGithub, color: "var(--text)", level: "Advanced" },
      { name: "VS Code", Icon: SiVscodium, color: "#007ACC", level: "Advanced" },
      { name: "Android Studio", Icon: SiAndroidstudio, color: "#3DDC84", level: "Learning" },
      { name: "Git", Icon: SiGit, color: "#F05032", level: "Intermediate" },
      { name: "Figma", Icon: SiFigma, color: "#F24E1E", level: "Familiar" }
    ]
  }
];

const continuousLearning = [
  { icon: Code, title: "C++ (Data Structures)", status: "In Progress", desc: "Mastering arrays, linked lists, trees and algorithmic thinking in C++", color: "text-blue-500" },
  { icon: Terminal, title: "Advanced JavaScript", status: "In Progress", desc: "Async/await, closures, promises, and modern ES6+ patterns", color: "text-yellow-500" },
  { icon: Layers, title: "React & State Management", status: "In Progress", desc: "Building dynamic UIs with React hooks and component architecture", color: "text-cyan-500" },
  { icon: BookOpen, title: "TypeScript", status: "In Progress", desc: "Adding type safety to JavaScript for more robust code", color: "text-blue-400" },
  { icon: Compass, title: "Computer Science Theory", status: "In Progress", desc: "Complexity analysis, recursion, graphs — the math behind code", color: "text-purple-500" },
  { icon: Code, title: "Android Development", status: "Exploring", desc: "Building mobile apps with Android Studio and Java/Kotlin", color: "text-green-500" },
  { icon: Layers, title: "Database & SQL", status: "Next Up", desc: "Learning relational databases and query optimization", color: "text-orange-500" },
  { icon: Terminal, title: "Competitive Programming", status: "Next Up", desc: "LeetCode-style problems to sharpen algorithmic skills", color: "text-red-500" },
  { icon: BookOpen, title: "Machine Learning Basics", status: "Exploring", desc: "Introduction to Python ML libraries — NumPy, Pandas", color: "text-indigo-500" },
  { icon: Compass, title: "Open Source Contribution", status: "Next Up", desc: "Planning to make first contributions to public repositories", color: "text-pink-500" }
];

export default function SkillsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.3 }}
      className="page-wrapper container mx-auto px-6"
    >
      <div className="py-12 md:py-20">
        <SectionHeader number="01" title="Skills" subtitle="Technical Arsenal" />
        
        {/* Languages & Tools Grid */}
        <div className="space-y-16 mb-24">
          {skillCategories.map((category, catIdx) => (
            <div key={category.title}>
              <h3 className="text-xl font-bold text-[var(--text)] border-b border-[var(--border)] pb-3 mb-8">
                {category.title}
              </h3>
              <motion.div 
                variants={{ show: { transition: { staggerChildren: 0.1 } } }} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
              >
                {category.skills.map((skill, i) => (
                  <motion.div 
                    key={skill.name}
                    variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                    whileHover={{ y: -5, borderColor: skill.color }}
                    className="glass-card p-6 flex flex-col items-center justify-center relative overflow-hidden group cursor-default"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundColor: skill.color }}></div>
                    <skill.Icon size={40} color={skill.color} className="mb-4 transition-transform duration-300 group-hover:scale-110 drop-shadow-md" />
                    <div className="text-[var(--text)] font-semibold mb-1 text-center">{skill.name}</div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--text-3)] font-bold">{skill.level}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Continuous Learning Section */}
        <SectionHeader number="02" title="Continuous Learning" subtitle="Always Growing" />
        <p className="text-[var(--text-2)] mb-10 max-w-3xl text-lg">
          I believe in lifelong learning. Technology evolves fast, and staying curious is the only way to keep up. Here's what I'm actively studying right now:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {continuousLearning.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 flex gap-5 items-start hover:border-[var(--border-accent)] transition-colors"
            >
              <div className={`p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] ${item.color}`}>
                <item.icon size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-[var(--text)] text-lg">{item.title}</h4>
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${
                    item.status === 'In Progress' ? 'bg-[rgba(0,242,254,0.1)] text-[var(--cyan)]' : 
                    item.status === 'Next Up' ? 'bg-[rgba(247,223,30,0.1)] text-[#F7DF1E]' : 
                    'bg-[rgba(168,85,247,0.1)] text-purple-400'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-[var(--text-2)] text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Projects Built", value: "16+" },
            { label: "Languages", value: "8+" },
            { label: "Months Coding", value: "24+" },
            { label: "Concepts Learned", value: "50+" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 glass-card border-[var(--border-accent)]"
            >
              <div className="text-3xl md:text-4xl font-[900] gradient-text mb-2">{stat.value}</div>
              <div className="text-[var(--text-2)] text-sm font-semibold uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}
