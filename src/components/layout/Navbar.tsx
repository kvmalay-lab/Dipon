import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const divisions = [
  { title: 'Engineering & Construction', slug: 'engineering', desc: 'Pipelines, power plants, and mega industrial works.' },
  { title: 'IT & ITES', slug: 'it', desc: 'Identity solutions, data centers, and digital infrastructure.' },
  { title: 'Shipping & Logistics', slug: 'shipping', desc: 'Marine logistics, fleet operations, and supply chain.' },
  { title: 'Investment & Development', slug: 'investment', desc: 'Infrastructure and strategic long-term investments.' },
];

const aboutLinks = [
  { label: 'Company Overview', href: '/about' },
  { label: 'Leadership', href: '/leadership' },
  { label: 'Awards & Certifications', href: '/awards' },
  { label: 'Clientele', href: '/clients' },
  { label: 'CSR', href: '/csr' },
];

const mediaLinks = [
  { label: 'News & Press', href: '/media' },
  { label: 'Downloads', href: '/downloads' },
  { label: 'HSE Policy', href: '/hse' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileExpanded(null);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleDropdownEnter = (name: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const navBg = isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]' : 'bg-transparent';
  const textColor = isScrolled ? 'text-[var(--color-primary-navy)]' : 'text-white';
  const hoverColor = isScrolled ? 'hover:text-[var(--color-primary-electric)]' : 'hover:text-white/80';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${navBg}`}>
        <div className="container-max flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className={`flex items-center gap-1.5 ${textColor} transition-colors duration-300`}>
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary-electric)] flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">D</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              DIPON<span className="font-normal opacity-70 ml-0.5">GROUP</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('about')}
              onMouseLeave={handleDropdownLeave}
            >
              <Link
                to="/about"
                className={`flex items-center gap-1 px-4 py-2 text-[13px] font-semibold uppercase tracking-wider ${textColor} ${hoverColor} transition-colors duration-200 ${isActive('/about') ? 'text-[var(--color-primary-electric)]' : ''}`}
              >
                About <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
              </Link>
              <AnimatePresence>
                {activeDropdown === 'about' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 pt-2"
                  >
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[220px]">
                      {aboutLinks.map((link) => (
                        <Link key={link.href} to={link.href} className="block px-5 py-2.5 text-sm text-gray-700 hover:text-[var(--color-primary-electric)] hover:bg-blue-50/50 transition-colors">
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divisions Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('divisions')}
              onMouseLeave={handleDropdownLeave}
            >
              <Link
                to="/divisions"
                className={`flex items-center gap-1 px-4 py-2 text-[13px] font-semibold uppercase tracking-wider ${textColor} ${hoverColor} transition-colors duration-200 ${isActive('/divisions') ? 'text-[var(--color-primary-electric)]' : ''}`}
              >
                Divisions <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'divisions' ? 'rotate-180' : ''}`} />
              </Link>
              <AnimatePresence>
                {activeDropdown === 'divisions' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                  >
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 grid grid-cols-2 gap-3" style={{ width: '520px' }}>
                      {divisions.map((div) => (
                        <Link
                          key={div.slug}
                          to={`/divisions/${div.slug}`}
                          className="group flex flex-col p-4 rounded-xl hover:bg-blue-50/60 transition-colors"
                        >
                          <span className="text-sm font-bold text-[var(--color-primary-navy)] group-hover:text-[var(--color-primary-electric)] transition-colors mb-1">
                            {div.title}
                          </span>
                          <span className="text-xs text-gray-500 leading-relaxed">{div.desc}</span>
                        </Link>
                      ))}
                      <div className="col-span-2 pt-3 mt-2 border-t border-gray-100">
                        <Link to="/divisions" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary-electric)] hover:gap-2.5 transition-all">
                          View All Divisions <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/projects" className={`px-4 py-2 text-[13px] font-semibold uppercase tracking-wider ${textColor} ${hoverColor} transition-colors duration-200 ${isActive('/projects') ? 'text-[var(--color-primary-electric)]' : ''}`}>
              Projects
            </Link>
            <Link to="/leadership" className={`px-4 py-2 text-[13px] font-semibold uppercase tracking-wider ${textColor} ${hoverColor} transition-colors duration-200 ${isActive('/leadership') ? 'text-[var(--color-primary-electric)]' : ''}`}>
              Leadership
            </Link>

            {/* Media Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('media')}
              onMouseLeave={handleDropdownLeave}
            >
              <Link
                to="/media"
                className={`flex items-center gap-1 px-4 py-2 text-[13px] font-semibold uppercase tracking-wider ${textColor} ${hoverColor} transition-colors duration-200 ${isActive('/media') ? 'text-[var(--color-primary-electric)]' : ''}`}
              >
                Media <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'media' ? 'rotate-180' : ''}`} />
              </Link>
              <AnimatePresence>
                {activeDropdown === 'media' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 pt-2"
                  >
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[200px]">
                      {mediaLinks.map((link) => (
                        <Link key={link.href} to={link.href} className="block px-5 py-2.5 text-sm text-gray-700 hover:text-[var(--color-primary-electric)] hover:bg-blue-50/50 transition-colors">
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/careers" className={`px-4 py-2 text-[13px] font-semibold uppercase tracking-wider ${textColor} ${hoverColor} transition-colors duration-200 ${isActive('/careers') ? 'text-[var(--color-primary-electric)]' : ''}`}>
              Careers
            </Link>

            <button className={`p-2 ml-1 rounded-lg ${textColor} hover:bg-white/10 transition-all duration-200`}>
              <Search className="w-[18px] h-[18px]" />
            </button>

            <Link to="/contact" className="btn-primary py-2.5 px-5 text-xs rounded-full ml-2">
              Start a Project
            </Link>
          </div>

          {/* Mobile Burger */}
          <button
            className={`lg:hidden p-2 rounded-lg ${textColor} transition-colors`}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[60] shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <Link to="/" className="flex items-center gap-1.5" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="w-7 h-7 rounded-lg bg-[var(--color-primary-electric)] flex items-center justify-center">
                    <span className="text-white font-display font-bold text-xs">D</span>
                  </div>
                  <span className="font-display font-bold text-lg text-[var(--color-primary-navy)]">DIPON</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto py-4">
                <Link to="/" className="block px-6 py-3.5 text-[15px] font-medium text-[var(--color-primary-navy)] hover:bg-gray-50">Home</Link>

                {/* About Expandable */}
                <div>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === 'about' ? null : 'about')}
                    className="flex items-center justify-between w-full px-6 py-3.5 text-[15px] font-medium text-[var(--color-primary-navy)] hover:bg-gray-50"
                  >
                    About <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'about' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === 'about' && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-gray-50/50">
                        {aboutLinks.map(link => (
                          <Link key={link.href} to={link.href} className="block px-10 py-2.5 text-sm text-gray-600 hover:text-[var(--color-primary-electric)]">{link.label}</Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Divisions Expandable */}
                <div>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === 'divisions' ? null : 'divisions')}
                    className="flex items-center justify-between w-full px-6 py-3.5 text-[15px] font-medium text-[var(--color-primary-navy)] hover:bg-gray-50"
                  >
                    Divisions <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'divisions' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === 'divisions' && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-gray-50/50">
                        {divisions.map(div => (
                          <Link key={div.slug} to={`/divisions/${div.slug}`} className="block px-10 py-2.5 text-sm text-gray-600 hover:text-[var(--color-primary-electric)]">{div.title}</Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link to="/projects" className="block px-6 py-3.5 text-[15px] font-medium text-[var(--color-primary-navy)] hover:bg-gray-50">Projects</Link>
                <Link to="/leadership" className="block px-6 py-3.5 text-[15px] font-medium text-[var(--color-primary-navy)] hover:bg-gray-50">Leadership</Link>
                <Link to="/media" className="block px-6 py-3.5 text-[15px] font-medium text-[var(--color-primary-navy)] hover:bg-gray-50">Media</Link>
                <Link to="/careers" className="block px-6 py-3.5 text-[15px] font-medium text-[var(--color-primary-navy)] hover:bg-gray-50">Careers</Link>
                <Link to="/contact" className="block px-6 py-3.5 text-[15px] font-medium text-[var(--color-primary-navy)] hover:bg-gray-50">Contact</Link>
              </div>

              {/* Bottom */}
              <div className="p-5 border-t border-gray-100 space-y-3">
                <Link to="/contact" className="btn-primary w-full justify-center text-sm">Start a Project</Link>
                <div className="flex items-center justify-center gap-5 pt-2">
                  <a href="https://www.facebook.com/DiponGroupBD/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-primary-electric)] transition-colors text-sm">Facebook</a>
                  <a href="https://www.linkedin.com/company/dipon-group/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-primary-electric)] transition-colors text-sm">LinkedIn</a>
                  <a href="https://www.youtube.com/channel/UCXPem38YMVxHYmFS5oTuxcA" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-primary-electric)] transition-colors text-sm">YouTube</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
