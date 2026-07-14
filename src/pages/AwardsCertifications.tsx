import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, Calendar, Landmark } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import CTABanner from '../components/CTABanner';

export default function AwardsCertifications() {
  const [awards, setAwards] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/v1/awards').then(res => res.json()),
      fetch('/api/v1/certifications').then(res => res.json())
    ])
      .then(([awardsData, certsData]) => {
        if (awardsData.success) setAwards(awardsData.data);
        if (certsData.success) setCertifications(certsData.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHero
        title="Awards & Certifications"
        subtitle="Recognized globally for engineering excellence, safety standards, and operational quality."
        backgroundImage="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Certifications Section */}
      <section className="py-24 bg-white">
        <div className="container-max">
          <SectionHeader
            overline="Compliance"
            title="International Certifications"
            subtitle="Adhering to world-class standards for quality management, safety protocols, and ecological balance."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.length > 0 ? (
              certifications.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="card p-8 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
                      <ShieldCheck className="w-5 h-5 text-[var(--color-primary-electric)]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-[var(--color-primary-navy)]">{cert.title}</h3>
                    <p className="text-xs font-semibold text-[var(--color-primary-steel)] uppercase tracking-wider mb-4 flex items-center">
                      <Landmark className="w-3.5 h-3.5 mr-2 text-[var(--color-primary-electric)]" /> {cert.issuer}
                    </p>
                    <p className="text-sm text-[var(--color-primary-steel)] leading-relaxed">{cert.description}</p>
                  </div>
                  {cert.issueDate && (
                    <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" /> Issued: {new Date(cert.issueDate).toLocaleDateString()}
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              // Fallback static certifications if DB is empty
              [
                { title: "ISO 9001:2015", issuer: "Quality Management System", desc: "Certified for international standards in quality management, operational efficiency, and continuous improvement." },
                { title: "ISO 14001:2015", issuer: "Environmental Management System", desc: "Certified for our commitment to minimizing environmental impact and promoting sustainable practices." },
                { title: "ISO 45001:2018", issuer: "Occupational Health & Safety", desc: "Certified for maintaining world-class safety standards and protecting our global workforce." }
              ].map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="card p-8 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
                      <ShieldCheck className="w-5 h-5 text-[var(--color-primary-electric)]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-[var(--color-primary-navy)]">{cert.title}</h3>
                    <p className="text-xs font-semibold text-[var(--color-primary-steel)] uppercase tracking-wider mb-4 flex items-center">
                      <Landmark className="w-3.5 h-3.5 mr-2 text-[var(--color-primary-electric)]" /> {cert.issuer}
                    </p>
                    <p className="text-sm text-[var(--color-primary-steel)] leading-relaxed">{cert.desc}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-24 bg-[var(--color-bg-muted)]">
        <div className="container-max">
          <SectionHeader
            overline="Recognition"
            title="Corporate Awards"
            subtitle="Honoring our commitment to delivery milestones, technology disruption, and project safety."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {awards.length > 0 ? (
              awards.map((award, i) => (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="card p-8 flex flex-col justify-between"
                >
                  <div>
                    <span className="badge-primary mb-4">
                      Year {award.year}
                    </span>
                    <h3 className="text-xl font-bold mb-2 text-[var(--color-primary-navy)]">{award.title}</h3>
                    <p className="text-xs font-semibold text-[var(--color-primary-steel)] uppercase tracking-wider mb-4">{award.organization}</p>
                    <p className="text-sm text-[var(--color-primary-steel)] leading-relaxed">{award.description}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              // Fallback static awards if DB is empty
              [
                { title: "Best Infrastructure Partner", org: "Ministry of Power & Energy", year: 2022, desc: "Awarded for outstanding contribution to national pipeline and energy infrastructure development." },
                { title: "HSE Excellence Award", org: "Chevron Bangladesh", year: 2021, desc: "Recognized for achieving 5 million safe man-hours without any lost-time incidents." },
                { title: "Digital Transformation Leader", org: "ICT Division, Bangladesh", year: 2023, desc: "Awarded for pioneering secure national identity and e-passport solutions." }
              ].map((award, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="card p-8 flex flex-col justify-between"
                >
                  <div>
                    <span className="badge-primary mb-4">
                      Year {award.year}
                    </span>
                    <h3 className="text-xl font-bold mb-2 text-[var(--color-primary-navy)]">{award.title}</h3>
                    <p className="text-xs font-semibold text-[var(--color-primary-steel)] uppercase tracking-wider mb-4">{award.org}</p>
                    <p className="text-sm text-[var(--color-primary-steel)] leading-relaxed">{award.desc}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}