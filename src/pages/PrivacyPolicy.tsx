import { motion } from 'motion/react';
import PageHero from '../components/PageHero';

export default function PrivacyPolicy() {
  return (
    <div>
      <PageHero
        title="Privacy Policy"
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
              <h2 className="text-2xl font-bold text-[var(--color-primary-navy)] mb-4">1. Introduction</h2>
              <p className="leading-relaxed">
                Dipon Group ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-[var(--color-primary-navy)] mb-4">2. Information We Collect</h2>
              <p className="leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.
              </p>
              <p className="leading-relaxed">
                The personal information we collect may include names, email addresses, phone numbers, job application details (including resumes), and any other information you choose to provide.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-[var(--color-primary-navy)] mb-4">3. How We Use Your Information</h2>
              <p className="leading-relaxed mb-4">
                We use personal information collected via our website for a variety of business purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-3 leading-relaxed">
                <li>To respond to user inquiries and offer support.</li>
                <li>To process job applications and career inquiries.</li>
                <li>To send administrative information, updates, and marketing communications.</li>
                <li>To improve our website, services, and user experience.</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="pt-6 border-t border-gray-100"
            >
              <h2 className="text-2xl font-bold text-[var(--color-primary-navy)] mb-4">4. Contact Us</h2>
              <p className="leading-relaxed mb-4">
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <p className="font-semibold text-[var(--color-primary-navy)] leading-relaxed">
                Dipon Group Headquarters<br />
                Rangs FC Enclave, Level 10 & 11<br />
                Plot #6/A, Road 32, Gulshan Avenue<br />
                Dhaka 1212, Bangladesh<br />
                Email: privacy@dipongroup.com
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}