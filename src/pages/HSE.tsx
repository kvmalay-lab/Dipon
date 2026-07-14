import { motion } from 'motion/react';
import { Shield, Heart, Award, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import CTABanner from '../components/CTABanner';

export default function HSE() {
  const policies = [
    "Zero Harm Policy: Our ultimate goal is zero accidents, zero injuries, and zero environmental damage.",
    "Continuous Training: Regular safety drills, hazard identification training, and safety audits at all sites.",
    "Strict Compliance: Adherence to international standards including ISO 45001 and ISO 14001.",
    "Environmental Stewardship: Minimizing waste, reducing carbon footprint, and protecting local ecosystems."
  ];

  return (
    <div>
      <PageHero
        title="Health, Safety & Environment (HSE)"
        subtitle="At Dipon Group, safety is not just a priority—it is a core value embedded in every project we execute."
        backgroundImage="https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=2940&auto=format&fit=crop"
      />

      <section className="py-24 bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card p-8 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-7 h-7 text-[var(--color-primary-electric)]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[var(--color-primary-navy)]">Occupational Health</h3>
              <p className="text-sm text-[var(--color-primary-steel)] leading-relaxed">Ensuring a safe, healthy, and ergonomic working environment for all employees and contractors.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card p-8 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-7 h-7 text-[var(--color-status-success)]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[var(--color-primary-navy)]">Safety First</h3>
              <p className="text-sm text-[var(--color-primary-steel)] leading-relaxed">Rigorous risk assessments, safety protocols, and protective equipment on every construction site.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card p-8 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-6">
                <Award className="w-7 h-7 text-[var(--color-accent-gold)]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[var(--color-primary-navy)]">Environmental Care</h3>
              <p className="text-sm text-[var(--color-primary-steel)] leading-relaxed">Implementing sustainable practices to minimize ecological impact and preserve natural resources.</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="overline">HSE Policy</span>
              <h2 className="mb-6">Our HSE Commitments</h2>
              <p className="text-base text-[var(--color-primary-steel)] leading-relaxed mb-8">
                We believe that every accident is preventable. Our leadership team is fully committed to maintaining the highest standards of safety across all global operations.
              </p>
              <div className="space-y-4">
                {policies.map((policy, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-status-success)] mt-1 flex-shrink-0" />
                    <span className="text-[var(--color-primary-charcoal)] font-semibold text-sm leading-relaxed">{policy}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative h-[420px] rounded-2xl overflow-hidden shadow-xl"
            >
              <img src="https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=1000&auto=format&fit=crop" alt="Safety on Site" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}