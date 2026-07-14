import { motion } from 'motion/react';
import PageHero from '../components/PageHero';

export default function TermsConditions() {
  return (
    <div>
      <PageHero
        title="Terms & Conditions"
        subtitle="Last updated: October 2023"
        compact
      />

      <section className="py-24 bg-white">
        <div className="container-max max-w-4xl">
          <div className="prose max-w-none text-[var(--color-primary-steel)] space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-[var(--color-primary-navy)] mb-4">1. Agreement to Terms</h2>
              <p className="leading-relaxed">
                By accessing or using the Dipon Group website, you agree to be bound by these Terms & Conditions. If you do not agree with all of these terms, you are prohibited from using the site and must discontinue use immediately.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-[var(--color-primary-navy)] mb-4">2. Intellectual Property Rights</h2>
              <p className="leading-relaxed">
                Unless otherwise indicated, the website and all content, including source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the site are owned or controlled by us and are protected by copyright and trademark laws.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-[var(--color-primary-navy)] mb-4">3. User Representations</h2>
              <p className="leading-relaxed mb-4">
                By using the site, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-3 leading-relaxed">
                <li>All registration and contact information you submit will be true, accurate, current, and complete.</li>
                <li>You will maintain the accuracy of such information and promptly update it as necessary.</li>
                <li>You will not use the site for any illegal or unauthorized purpose.</li>
                <li>Your use of the site will not violate any applicable law or regulation.</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-[var(--color-primary-navy)] mb-4">4. Limitation of Liability</h2>
              <p className="leading-relaxed">
                In no event will Dipon Group, our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}