import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Download } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import CTABanner from '../components/CTABanner';

export default function Downloads() {
  const [downloads, setDownloads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/downloads')
      .then(res => res.json())
      .then(data => {
        if (data.success) setDownloads(data.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHero
        title="Downloads & Resources"
        subtitle="Access our corporate brochures, financial reports, certifications, and technical documents."
        backgroundImage="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2940&auto=format&fit=crop"
      />

      <section className="py-24 bg-white">
        <div className="container-max">
          <SectionHeader
            overline="Resources"
            title="Corporate Documents"
            subtitle="Download technical profile sheets, policies, and division capability statements."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {downloads.length > 0 ? (
              downloads.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="card p-8 flex flex-col justify-between hover:border-[var(--color-primary-electric)]/30 hover:shadow-lg transition-all duration-300"
                >
                  <div>
                    <div className="w-12 h-12 bg-blue-50/50 rounded-xl flex items-center justify-center mb-6 border border-gray-100">
                      <FileText className="w-6 h-6 text-[var(--color-primary-electric)]" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[var(--color-primary-navy)]">{item.title}</h3>
                    <p className="text-sm text-[var(--color-primary-steel)] leading-relaxed mb-6">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                      {item.fileType || 'PDF'} &bull; {item.fileSize || '2.4 MB'}
                    </span>
                    <a
                      href={item.fileUrl}
                      download
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-primary-electric)] hover:text-blue-700 transition-colors"
                    >
                      Download <Download className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))
            ) : (
              // Fallback static downloads if DB is empty
              [
                { title: "Corporate Brochure 2024", desc: "A comprehensive overview of Dipon Group's history, business divisions, and global capabilities.", type: "PDF", size: "4.8 MB" },
                { title: "Engineering Division Profile", desc: "Detailed technical capabilities, equipment fleet list, and completed project case studies.", type: "PDF", size: "3.2 MB" },
                { title: "IT & ITES Solutions Brochure", desc: "Overview of our digital identity, smart card, and secure trust services.", type: "PDF", size: "2.1 MB" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="card p-8 flex flex-col justify-between hover:border-[var(--color-primary-electric)]/30 hover:shadow-lg transition-all duration-300"
                >
                  <div>
                    <div className="w-12 h-12 bg-blue-50/50 rounded-xl flex items-center justify-center mb-6 border border-gray-100">
                      <FileText className="w-6 h-6 text-[var(--color-primary-electric)]" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[var(--color-primary-navy)]">{item.title}</h3>
                    <p className="text-sm text-[var(--color-primary-steel)] leading-relaxed mb-6">{item.desc}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                      {item.type} &bull; {item.size}
                    </span>
                    <button
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-primary-electric)] hover:text-blue-700 transition-colors"
                    >
                      Download <Download className="w-4 h-4" />
                    </button>
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