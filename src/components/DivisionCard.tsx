import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface DivisionCardProps {
  key?: any;
  title: string;
  description: string;
  image: string;
  slug: string;
  index?: number;
}

export default function DivisionCard({ title, description, image, slug, index = 0 }: DivisionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        to={`/divisions/${slug}`}
        className="group block relative h-[440px] rounded-2xl overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 group-hover:from-black/90 transition-all duration-500" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-10">
          <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
            <div className="divider-accent mb-5 group-hover:w-24 transition-all duration-500" />
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-3 leading-tight">{title}</h3>
            <p className="text-gray-300 text-[15px] leading-relaxed mb-5 max-w-md opacity-80 group-hover:opacity-100 transition-opacity duration-500">
              {description}
            </p>
            <span className="inline-flex items-center gap-2 text-[var(--color-primary-electric-light)] font-semibold text-sm">
              Explore Division
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
