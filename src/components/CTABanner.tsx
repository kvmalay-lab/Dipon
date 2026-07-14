import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  dark?: boolean;
}

export default function CTABanner({
  title = "Ready to Discuss Your Next Project?",
  subtitle = "Connect with our engineering experts and business development team to explore how Dipon Group can deliver your infrastructure needs.",
  buttonText = "Contact Our Team",
  buttonLink = "/contact",
  dark = false,
}: CTABannerProps) {
  return (
    <section className={`py-28 relative overflow-hidden ${dark ? 'bg-[var(--color-primary-navy)]' : 'bg-white'}`}>
      {dark && <div className="absolute inset-0 bg-grid-pattern" />}
      {!dark && <div className="absolute inset-0 bg-grid-pattern-light" />}

      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className={`${dark ? 'divider-gold' : 'divider-accent'} mx-auto mb-6`} />
          <h2 className={`mb-5 ${dark ? 'text-white' : ''}`}>{title}</h2>
          <p className={`text-lg mb-10 ${dark ? 'text-gray-400' : 'text-[var(--color-primary-steel)]'}`}>
            {subtitle}
          </p>
          <Link to={buttonLink} className="btn-primary">
            {buttonText}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
