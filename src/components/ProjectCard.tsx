import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  key?: any;
  title: string;
  category: string;
  location?: string;
  image: string;
  slug?: string;
  index?: number;
}

export default function ProjectCard({ title, category, location, image, slug, index = 0 }: ProjectCardProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.4 } }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative h-[380px] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between p-7">
        <div>
          <span className="badge-dark text-[10px]">{category}</span>
        </div>
        <div>
          {location && (
            <p className="text-gray-400 text-sm mb-1.5">{location}</p>
          )}
          <h4 className="text-white text-xl font-bold mb-3 leading-tight group-hover:text-[var(--color-primary-electric-light)] transition-colors duration-300">
            {title}
          </h4>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary-electric-light)] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            View Project <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </motion.div>
  );

  if (slug) {
    return <Link to={`/projects/${slug}`} className="block">{content}</Link>;
  }

  return content;
}
