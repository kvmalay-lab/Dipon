import { ReactNode } from 'react';
import { motion } from 'motion/react';
import Breadcrumb from './Breadcrumb';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  showBreadcrumb?: boolean;
  children?: ReactNode;
  compact?: boolean;
}

export default function PageHero({ title, subtitle, backgroundImage, showBreadcrumb = true, children, compact = false }: PageHeroProps) {
  return (
    <section className={`relative ${compact ? 'pt-32 pb-16' : 'pt-36 pb-20'} bg-[var(--color-primary-navy)] overflow-hidden`}>
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover opacity-20"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary-navy)]/60 via-[var(--color-primary-navy)]/80 to-[var(--color-primary-navy)]" />
        </div>
      )}

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern z-0" />

      <div className="container-max relative z-10">
        {showBreadcrumb && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Breadcrumb dark />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="divider-accent mb-6" />
          <h1 className="text-white max-w-4xl mb-4">{title}</h1>
          {subtitle && (
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed">{subtitle}</p>
          )}
        </motion.div>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
