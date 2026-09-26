import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export function NeonPreloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1700);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="neon-preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Welcome"
          role="status"
        >
          <div className="preloader-mark" aria-hidden="true">
            <span className="preloader-initials">YB</span>
          </div>
          <span className="preloader-caption">YASH BHATI</span>
          <span className="preloader-status">INITIALIZING PORTFOLIO</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <motion.div
        className="scroll-progress-fill"
        animate={{ scaleX: progress }}
        transition={{ duration: 0.12, ease: 'easeOut' }}
      />
    </div>
  );
}

export function CursorGlow() {
  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;

    document.body.classList.add('custom-cursor');
    const move = (event: MouseEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => {
      document.body.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', move);
    };
  }, []);

  return <span className="cursor-glow" aria-hidden="true" />;
}
