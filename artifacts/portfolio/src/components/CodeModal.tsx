import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code2, Copy } from 'lucide-react';
import { useState } from 'react';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  code: string;
}

export default function CodeModal({ isOpen, onClose, title, code }: CodeModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-box"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <div
                  style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: 'var(--cyan-a10)',
                    border: '1px solid var(--border-hl)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Code2 size={16} color="var(--cyan)" />
                </div>
                <div style={{ minWidth: 0 }}>
                   <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>
                     Source / Python
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {title}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                 <button aria-label="Copy source code" data-testid="button-copy-code"
                  onClick={handleCopy}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 12px',
                    borderRadius: 8, background: 'var(--cyan-a10)',
                    border: '1px solid var(--border-hl)', color: 'var(--cyan)',
                    fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <Copy size={12} />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                 <button className="modal-close-btn" onClick={onClose} aria-label="Close source code" data-testid="button-close-code">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="modal-body">
              {/* Terminal dots */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                {['#ff5f57','#ffbd2e','#28ca41'].map((c, i) => (
                  <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c, opacity: 0.8 }} />
                ))}
              </div>
            <div className="code-block">
                 <pre style={{ whiteSpace: 'pre', wordBreak: 'normal', margin: 0 }}>
                  <code dangerouslySetInnerHTML={{ __html: code }} />
                </pre>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
