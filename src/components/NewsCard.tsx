import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

interface NewsCardProps {
  title: string;
  summary?: string;
  category?: string;
  date?: string;
  image?: string;
  slug?: string;
  index?: number;
}

export default function NewsCard({ title, summary, category, date, image, slug, index = 0 }: NewsCardProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group card h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary-navy)] to-[var(--color-primary-blue)] flex items-center justify-center">
            <span className="text-4xl font-display font-bold text-white/20">DG</span>
          </div>
        )}
        {category && (
          <div className="absolute top-4 left-4">
            <span className="badge-primary">{category}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {date && (
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
            <Calendar className="w-3.5 h-3.5" />
            {date}
          </div>
        )}
        <h4 className="text-lg font-bold text-[var(--color-primary-navy)] mb-2 leading-snug group-hover:text-[var(--color-primary-electric)] transition-colors duration-300 line-clamp-2">
          {title}
        </h4>
        {summary && (
          <p className="text-sm text-[var(--color-primary-steel)] leading-relaxed line-clamp-2 mb-4 flex-1">{summary}</p>
        )}
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary-electric)] mt-auto">
          Read More <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </motion.div>
  );

  if (slug) {
    return <Link to={`/media/${slug}`} className="block h-full">{content}</Link>;
  }

  return content;
}
