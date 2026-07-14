import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { RefreshCw, ShieldAlert } from 'lucide-react';

export default function ServerError() {
  const handleReload = () => window.location.reload();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-bg-default)] px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern-light opacity-60" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md relative z-10"
      >
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-8 border border-red-100">
          <ShieldAlert className="w-8 h-8 text-[var(--color-status-danger)]" />
        </div>
        <h1 className="text-8xl font-display font-black text-gradient mb-4">500</h1>
        <h2 className="text-2xl font-bold text-[var(--color-primary-navy)] mb-4">Internal Server Error</h2>
        <p className="text-[var(--color-primary-steel)] text-base leading-relaxed mb-8">
          Something went wrong on our servers. Please try again later or contact support if the problem persists.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={handleReload} className="btn-primary py-2.5 px-6">
            <RefreshCw className="w-4 h-4" /> Reload Page
          </button>
          <Link to="/contact" className="btn-secondary py-2.5 px-6 text-sm">
            Contact Support
          </Link>
        </div>
      </motion.div>
    </div>
  );
}