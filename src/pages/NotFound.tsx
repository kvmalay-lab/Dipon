import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-bg-default)] px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern-light opacity-60" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md relative z-10"
      >
        <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-8 border border-amber-100">
          <AlertCircle className="w-8 h-8 text-[var(--color-status-warning)]" />
        </div>
        <h1 className="text-8xl font-display font-black text-gradient mb-4">404</h1>
        <h2 className="text-2xl font-bold text-[var(--color-primary-navy)] mb-4">Page Not Found</h2>
        <p className="text-[var(--color-primary-steel)] text-base leading-relaxed mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary py-2.5 px-6">
            <ArrowLeft className="w-4 h-4" /> Back to Homepage
          </Link>
        </div>
      </motion.div>
    </div>
  );
}