import { motion } from 'motion/react';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import StatCounter from '../components/StatCounter';
import CTABanner from '../components/CTABanner';
import { Eye, Target, Award, Shield, Users, Heart } from 'lucide-react';

export default function About() {
  return (
    <div>
      <PageHero
        title="About Dipon Group"
        subtitle="Known for its Commitment, Quality and Safety since 1970."
        backgroundImage="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Overview Section */}
      <section className="py-24 bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="overline">Our History</span>
              <h2 className="mb-6">Decades of Engineering Excellence</h2>
              <p className="text-base leading-relaxed mb-6">
                A leading and prestigious business house that came into existence in 1970 with the formation of Dipon Gas Company Ltd with the specific objective of providing end-to-end solutions in oil and gas pipeline construction works. Over last 55 years, DIPON Group is known for complying with its commitments. It has completed projects for varied clients within time and budget following internationally accepted quality standards and safety practices.
              </p>
              <p className="text-base leading-relaxed">
                We, at DIPON Group, care for our commitment to our client, vendor, employees, their families and society. Today, we are a diversified conglomerate leading projects on regional and global scales.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=1000&auto=format&fit=crop"
                alt="Construction pipeline"
                className="w-full h-[400px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-24 bg-[var(--color-bg-muted)]">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card-light p-8 md:p-10 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-[var(--color-primary-electric)]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--color-primary-navy)]">Our Vision</h3>
              <p className="text-base leading-relaxed text-[var(--color-primary-steel)]">
                To be the Market Leader in Value Based Integrated Solutions by maintaining high quality, safety practices and using state-of-the-art technologies.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card-light p-8 md:p-10 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-[var(--color-primary-electric)]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[var(--color-primary-navy)]">Our Mission</h3>
              <p className="text-base leading-relaxed text-[var(--color-primary-steel)]">
                To make a difference in our delivery through Excellent Performance, safety standards and strong commitments to our stakeholders.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-white">
        <div className="container-max">
          <SectionHeader
            overline="Core Pillars"
            title="Our Shared Values"
            subtitle="The core principles that guide our everyday decisions and long-term milestones."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Commitment", desc: "Complying with commitments to clients, partners, employees, and society." },
              { icon: Award, title: "Quality", desc: "Upholding high-precision international standards across all divisions." },
              { icon: Heart, title: "Safety", desc: "A strict commitment to Health, Safety, and Environment for zero harm." },
              { icon: Users, title: "Innovation", desc: "Leading with state-of-the-art engineering and digital identity systems." }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card p-8 group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary-electric)] transition-colors">
                  <value.icon className="w-6 h-6 text-[var(--color-primary-electric)] group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-lg font-bold mb-3">{value.title}</h4>
                <p className="text-sm text-[var(--color-primary-steel)] leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-[var(--color-primary-navy)] text-white relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="container-max relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <StatCounter value="55+" label="Years of Experience" dark delay={0} />
            <StatCounter value="260+" label="Completed Projects" dark delay={1} />
            <StatCounter value="5+" label="Countries Operating" dark delay={2} />
            <StatCounter value="550+" label="Heavy Equipment" dark delay={3} />
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
