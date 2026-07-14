import { motion } from 'motion/react';
import { User } from 'lucide-react';

interface LeaderCardProps {
  name: string;
  designation: string;
  bio?: string;
  photo?: string;
  index?: number;
}

export default function LeaderCard({ name, designation, bio, photo, index = 0 }: LeaderCardProps) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <div className="card p-0 h-full flex flex-col">
        {/* Portrait Area */}
        <div className="relative h-64 bg-gradient-to-br from-[var(--color-primary-navy)] to-[var(--color-primary-blue)] flex items-center justify-center overflow-hidden">
          {photo ? (
            <img src={photo} alt={name} className="w-full h-full object-cover object-top" loading="lazy" />
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-display font-bold text-white/80">{initials}</span>
              </div>
              <User className="w-5 h-5 text-white/30 mx-auto" />
            </div>
          )}
          {/* Gradient overlay at bottom for text readability */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Info */}
        <div className="p-6 flex-1 flex flex-col">
          <h4 className="text-lg font-bold text-[var(--color-primary-navy)] mb-1 leading-tight">{name}</h4>
          <p className="text-sm font-medium text-[var(--color-primary-electric)] mb-3">{designation}</p>
          {bio && (
            <p className="text-sm text-[var(--color-primary-steel)] leading-relaxed line-clamp-3 flex-1">{bio}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
