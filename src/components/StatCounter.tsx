import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

interface StatCounterProps {
  value: string;
  label: string;
  suffix?: string;
  dark?: boolean;
  delay?: number;
}

export default function StatCounter({ value, label, suffix = '', dark = false, delay = 0 }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    const numericPart = value.replace(/[^0-9.]/g, '');
    const prefix = value.replace(/[0-9.,+]+/g, '').trim();
    const target = parseFloat(numericPart);

    if (isNaN(target)) {
      setDisplayValue(value);
      return;
    }

    const duration = 2000;
    const startTime = performance.now();
    const delayMs = delay * 150;

    const timer = setTimeout(() => {
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime - delayMs;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);

        if (target >= 1000) {
          setDisplayValue(prefix + current.toLocaleString());
        } else {
          setDisplayValue(prefix + current.toString());
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };
      requestAnimationFrame(animate);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="text-center"
    >
      <div className={`font-display font-bold leading-none mb-2 ${dark ? 'text-white' : 'text-[var(--color-primary-navy)]'}`}
        style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
      >
        {displayValue}
        {suffix && <span className="text-[var(--color-primary-electric)]">{suffix}</span>}
      </div>
      <p className={`text-sm font-medium uppercase tracking-wider ${dark ? 'text-gray-400' : 'text-[var(--color-primary-steel)]'}`}>
        {label}
      </p>
    </motion.div>
  );
}
