import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Building2, ExternalLink } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import CTABanner from '../components/CTABanner';

export default function Clients() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/clients')
      .then(res => res.json())
      .then(data => {
        if (data.success) setClients(data.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHero
        title="Our Clients & Partners"
        subtitle="Trusted by governments, multinational corporations, and global energy leaders to deliver critical infrastructure."
        backgroundImage="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2940&auto=format&fit=crop"
      />

      <section className="py-24 bg-white">
        <div className="container-max">
          <SectionHeader
            overline="Partnerships"
            title="Trusted Worldwide"
            subtitle="Explore some of the primary organizations we have worked alongside to develop cross-country infrastructure."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.length > 0 ? (
              clients.map((client, i) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="card p-8 flex flex-col justify-between hover:border-[var(--color-primary-electric)]/30 hover:shadow-lg transition-all duration-300"
                >
                  <div>
                    <div className="w-16 h-16 bg-blue-50/50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100">
                      {client.logo ? (
                        <img src={client.logo} alt={client.name} className="max-w-[70%] max-h-[70%] object-contain" />
                      ) : (
                        <Building2 className="w-7 h-7 text-[var(--color-primary-electric)]" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[var(--color-primary-navy)]">{client.name}</h3>
                    {client.industry && (
                      <span className="badge-primary">
                        {client.industry}
                      </span>
                    )}
                  </div>
                  {client.website && (
                    <a
                      href={client.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center text-sm font-semibold text-[var(--color-primary-electric)] hover:text-blue-700 transition-colors"
                    >
                      Visit Website <ExternalLink className="w-4 h-4 ml-1.5" />
                    </a>
                  )}
                </motion.div>
              ))
            ) : (
              // Fallback static clients if DB is empty
              [
                { name: "Chevron Bangladesh", industry: "Oil & Gas", website: "https://bangladesh.chevron.com" },
                { name: "Gas Transmission Company Limited (GTCL)", industry: "Infrastructure", website: "https://gtcl.org.bd" },
                { name: "Government of Guinea", industry: "IT & ITES", website: "#" },
                { name: "Government of Bangladesh", industry: "IT & ITES", website: "https://bangladesh.gov.bd" },
                { name: "Powerpac Mutiara", industry: "Power", website: "#" },
                { name: "Petrobangla", industry: "Oil & Gas", website: "https://petrobangla.org.bd" }
              ].map((client, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="card p-8 flex flex-col justify-between hover:border-[var(--color-primary-electric)]/30 hover:shadow-lg transition-all duration-300"
                >
                  <div>
                    <div className="w-16 h-16 bg-blue-50/50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100">
                      <Building2 className="w-7 h-7 text-[var(--color-primary-electric)]" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[var(--color-primary-navy)]">{client.name}</h3>
                    <span className="badge-primary">
                      {client.industry}
                    </span>
                  </div>
                  {client.website !== "#" && (
                    <a
                      href={client.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center text-sm font-semibold text-[var(--color-primary-electric)] hover:text-blue-700 transition-colors"
                    >
                      Visit Website <ExternalLink className="w-4 h-4 ml-1.5" />
                    </a>
                  )}
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