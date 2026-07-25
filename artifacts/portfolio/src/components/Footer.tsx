import { Link } from 'wouter';
import { Mail } from 'lucide-react';
import { SiGithub, SiInstagram } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-elevated)] py-12 relative z-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="text-2xl font-[900] tracking-tight mb-4 gradient-text">YB</div>
          <p className="text-[var(--text-2)]">Building tomorrow's tech today.</p>
        </div>
        
        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-[var(--text)] mb-2">Quick Links</h4>
          <Link href="/" className="text-[var(--text-2)] hover:text-[var(--cyan)] transition-colors">Home</Link>
          <Link href="/about" className="text-[var(--text-2)] hover:text-[var(--cyan)] transition-colors">About</Link>
          <Link href="/skills" className="text-[var(--text-2)] hover:text-[var(--cyan)] transition-colors">Skills</Link>
          <Link href="/projects" className="text-[var(--text-2)] hover:text-[var(--cyan)] transition-colors">Projects</Link>
          <Link href="/contact" className="text-[var(--text-2)] hover:text-[var(--cyan)] transition-colors">Contact</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-bold text-[var(--text)] mb-2">Connect</h4>
          <div className="flex gap-4">
            <a href="https://github.com/Yashbhati2011" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-2)] hover:text-[var(--cyan)] hover:border-[var(--cyan)] transition-all">
              <SiGithub size={18} />
            </a>
            <a href="https://instagram.com/Yash.bhati.2011" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-2)] hover:text-[#E1306C] hover:border-[#E1306C] transition-all">
              <SiInstagram size={18} />
            </a>
            <a href="mailto:yashbhatikv1jp@gmail.com" className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-2)] hover:text-[#EA4335] hover:border-[#EA4335] transition-all">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 pt-8 border-t border-[var(--border)] text-center text-[var(--text-3)] text-sm">
        © 2025 Yash Bhati · All rights reserved · Built with React & passion
      </div>
    </footer>
  );
}
