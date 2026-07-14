import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels: Record<string, string> = {
  about: 'About Us',
  divisions: 'Business Divisions',
  projects: 'Projects',
  leadership: 'Leadership',
  careers: 'Careers',
  contact: 'Contact Us',
  media: 'Media Centre',
  hse: 'HSE',
  csr: 'CSR',
  awards: 'Awards & Certifications',
  clients: 'Our Clients',
  downloads: 'Downloads',
  privacy: 'Privacy Policy',
  terms: 'Terms & Conditions',
};

interface BreadcrumbProps {
  dark?: boolean;
  customTrail?: { label: string; href?: string }[];
}

export default function Breadcrumb({ dark = false, customTrail }: BreadcrumbProps) {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  const trail = customTrail || segments.map((seg, i) => ({
    label: routeLabels[seg] || seg.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    href: i < segments.length - 1 ? '/' + segments.slice(0, i + 1).join('/') : undefined,
  }));

  const baseText = dark ? 'text-gray-400' : 'text-[var(--color-primary-steel)]';
  const activeText = dark ? 'text-white' : 'text-[var(--color-primary-navy)]';
  const iconColor = dark ? 'text-gray-600' : 'text-gray-300';

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
      <Link
        to="/"
        className={`flex items-center gap-1 ${baseText} hover:${dark ? 'text-white' : 'text-[var(--color-primary-electric)]'} transition-colors`}
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      {trail.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <ChevronRight className={`w-3.5 h-3.5 ${iconColor}`} />
          {item.href ? (
            <Link to={item.href} className={`${baseText} hover:${dark ? 'text-white' : 'text-[var(--color-primary-electric)]'} transition-colors`}>
              {item.label}
            </Link>
          ) : (
            <span className={`font-medium ${activeText}`}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
