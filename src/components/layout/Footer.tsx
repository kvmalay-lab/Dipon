import { Link } from 'react-router-dom';
import { ArrowUp, Facebook, Linkedin, Youtube, Twitter, Download } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[var(--color-bg-dark)] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      <div className="container-max relative z-10">
        {/* Main Footer Content */}
        <div className="pt-20 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-lg bg-[var(--color-primary-electric)] flex items-center justify-center">
                <span className="text-white font-display font-bold text-base">D</span>
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                DIPON<span className="font-normal text-white/50 ml-0.5">GROUP</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-8">
              Delivering complex engineering and infrastructure projects with reliability, technical excellence, and long-term commitment since 1970.
            </p>

            {/* Newsletter */}
            <div className="max-w-sm">
              <h5 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Newsletter</h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input-field-dark flex-1 py-2.5 text-sm"
                />
                <button className="btn-primary py-2.5 px-4 text-xs rounded-xl">Subscribe</button>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Facebook, href: 'https://www.facebook.com/DiponGroupBD/', label: 'Facebook' },
                { icon: Twitter, href: 'https://twitter.com/dipongroup', label: 'Twitter' },
                { icon: Youtube, href: 'https://www.youtube.com/channel/UCXPem38YMVxHYmFS5oTuxcA', label: 'YouTube' },
                { icon: Linkedin, href: 'https://www.linkedin.com/company/dipon-group/', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h5 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Company</h5>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Leadership', href: '/leadership' },
                { label: 'Awards', href: '/awards' },
                { label: 'Clientele', href: '/clients' },
                { label: 'Careers', href: '/careers' },
                { label: 'Contact', href: '/contact' },
              ].map(link => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Divisions */}
          <div>
            <h5 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Divisions</h5>
            <ul className="space-y-3">
              {[
                { label: 'Engineering & Construction', href: '/divisions/engineering' },
                { label: 'IT & ITES', href: '/divisions/it' },
                { label: 'Shipping & Logistics', href: '/divisions/shipping' },
                { label: 'Investment & Development', href: '/divisions/investment' },
              ].map(link => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h5 className="text-sm font-semibold text-white uppercase tracking-wider mb-5 mt-8">Resources</h5>
            <ul className="space-y-3">
              {[
                { label: 'HSE Policy', href: '/hse' },
                { label: 'CSR Initiatives', href: '/csr' },
                { label: 'Media Centre', href: '/media' },
                { label: 'Downloads', href: '/downloads' },
              ].map(link => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Global Offices */}
          <div>
            <h5 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Global Offices</h5>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-electric)]" />
                Bangladesh (HQ)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                India
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                Malaysia
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                Singapore
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                UAE
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                Saudi Arabia
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                Africa
              </li>
            </ul>

            <div className="mt-8">
              <Link to="/downloads" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent-gold)] hover:text-[var(--color-accent-gold-light)] transition-colors">
                <Download className="w-4 h-4" />
                Company Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Dipon Group. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</Link>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}