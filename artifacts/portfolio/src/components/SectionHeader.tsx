import { motion } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({ eyebrow, title, subtitle, centered }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ marginBottom: 72, textAlign: centered ? 'center' : undefined }}
    >
      <div className="section-eyebrow" style={{ justifyContent: centered ? 'center' : undefined }}>
        {!centered && <span />}
        {eyebrow}
      </div>
      <h2
        style={{
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          color: 'var(--text)',
          marginBottom: subtitle ? 14 : 0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: 17, color: 'var(--text-2)', maxWidth: centered ? 540 : undefined, margin: centered ? '0 auto' : undefined, lineHeight: 1.6 }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
