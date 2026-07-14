import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface SectionHeaderProps {
  overline?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  children?: ReactNode;
}

export default function SectionHeader({ overline, title, subtitle, align = 'center', dark = false, children }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {overline && (
        <span className={dark ? 'overline-light' : 'overline'}>{overline}</span>
      )}
      <h2 className={`mb-4 ${dark ? 'text-white' : ''}`}>{title}</h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${dark ? 'text-gray-400' : 'text-[var(--color-primary-steel)]'}`}>
          {subtitle}
        </p>
      )}
      {children}
    </motion.div>
  );
}
