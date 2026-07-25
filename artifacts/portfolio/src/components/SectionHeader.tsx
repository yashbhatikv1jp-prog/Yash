import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ number, title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -40 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      transition={{ duration: 0.6 }} 
      viewport={{ once: true }}
      className="mb-12"
    >
      <div className="text-[var(--cyan)] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
        {number} / {title}
      </div>
      <h2 className="text-4xl md:text-[42px] font-bold mb-4 text-[var(--text)]">
        {subtitle || title}
      </h2>
    </motion.div>
  );
}
