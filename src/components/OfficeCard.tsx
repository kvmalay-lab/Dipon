import { motion } from 'motion/react';
import { MapPin, Phone, Mail } from 'lucide-react';

interface OfficeCardProps {
  key?: any;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  isHQ?: boolean;
  index?: number;
}

export default function OfficeCard({ name, address, phone, email, isHQ = false, index = 0 }: OfficeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass-card-light p-6 h-full hover:shadow-lg hover:border-[var(--color-primary-electric)]/20 transition-all duration-400"
    >
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isHQ ? 'bg-[var(--color-primary-electric)] text-white' : 'bg-blue-50 text-[var(--color-primary-electric)]'}`}>
          <MapPin className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-base font-bold text-[var(--color-primary-navy)]">{name}</h4>
            {isHQ && <span className="badge-primary text-[9px]">HQ</span>}
          </div>
          <p className="text-sm text-[var(--color-primary-steel)] leading-relaxed mb-3">{address}</p>
          {phone && (
            <a href={`tel:${phone}`} className="flex items-center gap-2 text-sm text-[var(--color-primary-steel)] hover:text-[var(--color-primary-electric)] transition-colors mb-1.5">
              <Phone className="w-3.5 h-3.5" />
              {phone}
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="flex items-center gap-2 text-sm text-[var(--color-primary-steel)] hover:text-[var(--color-primary-electric)] transition-colors">
              <Mail className="w-3.5 h-3.5" />
              {email}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
