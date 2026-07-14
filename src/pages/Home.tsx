import { motion } from 'motion/react';
import { ArrowRight, ChevronDown, CheckCircle2, Shield, Award, Globe, Briefcase, Cpu, Wrench, Search, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import StatCounter from '../components/StatCounter';
import DivisionCard from '../components/DivisionCard';
import LeaderCard from '../components/LeaderCard';
import CTABanner from '../components/CTABanner';

const divisions = [
  { title: "Engineering & Construction", desc: "Pipelines, power plants, and mega industrial works.", img: "https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=2835&auto=format&fit=crop", slug: "engineering" },
  { title: "IT & ITES", desc: "Identity solutions, data centers, and digital infrastructure.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2834&auto=format&fit=crop", slug: "it" },
  { title: "Shipping & Logistics", desc: "Marine logistics, fleet operations, and supply chain.", img: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2940&auto=format&fit=crop", slug: "shipping" },
  { title: "Investment & Development", desc: "Infrastructure and strategic long-term investments.", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop", slug: "investment" },
];

const industries = [
  { title: "Oil & Gas", desc: "EPC pipeline construction, processing plants, and terminals.", icon: Wrench },
  { title: "Power & Energy", desc: "Thermal power plants, substations, and transmission lines.", icon: Cpu },
  { title: "Digital Identity", desc: "National PKI, e-passports, and secure smart cards.", icon: Shield },
  { title: "Marine Logistics", desc: "Salvage operations, vessel leasing, and coastal shipping.", icon: Globe },
];

const leaders = [
  { name: "Mahmud Hasan", designation: "Founder & Chairman", bio: "Founder of Dipon Gas who transformed the pipeline construction business into a multi-sector group of high repute under his leadership." },
  { name: "Rashed Mahmud", designation: "Managing Director & CEO", bio: "Successfully spearheaded and managed to expand the business arena of Dipon Group into a multi-dimensional and multi-faceted business organization." },
  { name: "Yaseer Mahmud", designation: "Director", bio: "Led new initiatives of Dipon Group like real estate development and established it as a reliable, trustworthy and committed company." },
  { name: "Aarouni Verma", designation: "Governing Body", bio: "Graduate from MNIT Jaipur with PG in International Trade and garnered experience with conglomerates like TATA and Reliance." },
  { name: "Uttam Singh", designation: "Governing Body", bio: "Graduate from MNIT Jaipur with PG in Adv Construction Management, former SVP of Wilbur Smith Associates." },
];

export default function Home() {
  return (
    <div>
      {/* ── 01 Cinematic Hero ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[var(--color-bg-dark)]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2940&auto=format&fit=crop"
            alt="Infrastructure"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-dark)]/70 via-transparent to-[var(--color-bg-dark)]" />
        </div>
        <div className="absolute inset-0 bg-grid-pattern z-[1]" />

        <div className="relative z-10 container-max text-center text-white mt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="overline-light">Since 1970</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="max-w-5xl mx-auto mb-6 text-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Engineering Tomorrow's Infrastructure
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Delivering complex engineering, pipeline construction, and IT solutions with international scale and technical precision.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/divisions" className="btn-primary">
              Explore Our Capabilities <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/projects" className="btn-ghost">
              View Our Projects
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <ChevronDown className="w-6 h-6 text-white/40 animate-scroll-indicator" />
        </motion.div>
      </section>

      {/* ── 02 Trust Statistics ── */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-grid-pattern-light" />
        <div className="container-max relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
            <StatCounter value="55+" label="Years of Experience" delay={0} />
            <StatCounter value="260+" label="Completed Projects" delay={1} />
            <StatCounter value="5+" label="Countries Operating" delay={2} />
            <StatCounter value="550+" label="Heavy Equipment" delay={3} />
          </div>
        </div>
      </section>

      {/* ── 03 Company Overview ── */}
      <section className="py-28 bg-[var(--color-bg-muted)]">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="overline">About Dipon Group</span>
              <h2 className="mb-6">Our Promise Is Our Commitment</h2>
              <p className="text-base leading-relaxed mb-6">
                DIPON Group, a leading and prestigious business house came into existence in 1970 with the formation of Dipon Gas Company Ltd with the specific objective of providing end-to-end solutions in oil and gas pipeline construction works. Since then, DIPON has grown manifolds, and diversified in varied fields like Engineering & Construction, Project Investment & Development, Shipping & Logistics and IT & ITES.
              </p>
              <p className="text-base leading-relaxed mb-8">
                DIPON has also ventured into the global arena and established its presence in Bangladesh, India, Malaysia, UAE, Saudi Arabia and African Countries by opening regional or project offices.
              </p>
              <Link to="/about" className="btn-secondary">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/10">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=1000&auto=format&fit=crop"
                  alt="Engineering Project"
                  className="w-full h-[420px] object-cover"
                />
              </div>
              {/* Floating stats card */}
              <div className="absolute -bottom-6 -left-6 glass-card-light p-5 shadow-xl">
                <div className="text-3xl font-display font-bold text-[var(--color-primary-navy)]">55+</div>
                <div className="text-sm text-[var(--color-primary-steel)] font-medium">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 04 Business Divisions ── */}
      <section className="py-28 bg-white">
        <div className="container-max">
          <SectionHeader
            overline="What We Do"
            title="Our Business Divisions"
            subtitle="Integrated solutions across multiple sectors, driving innovation and building sustainable infrastructure."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {divisions.map((div, i) => (
              <DivisionCard
                key={div.slug}
                title={div.title}
                description={div.desc}
                image={div.img}
                slug={div.slug}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 Industries Served ── */}
      <section className="py-28 bg-[var(--color-bg-muted)]">
        <div className="container-max">
          <SectionHeader
            overline="Sectors"
            title="Industries We Serve"
            subtitle="Delivering specialized engineering and technology solutions across critical sectors."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card p-7 group hover:-translate-y-1 transition-all duration-400"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-[var(--color-primary-electric)] transition-colors duration-400">
                  <ind.icon className="w-6 h-6 text-[var(--color-primary-electric)] group-hover:text-white transition-colors duration-400" />
                </div>
                <h4 className="text-lg font-bold mb-2">{ind.title}</h4>
                <p className="text-sm text-[var(--color-primary-steel)] leading-relaxed">{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 Global Presence ── */}
      <section className="py-28 bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="overline">Global Reach</span>
              <h2 className="mb-6">Global Footprint & Operations</h2>
              <p className="text-base leading-relaxed mb-8">
                With fully staffed regional offices and active project sites across South Asia, Southeast Asia, the Middle East, and Africa, Dipon Group delivers complex engineering solutions on a global scale.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card-light p-5">
                  <Globe className="w-8 h-8 text-[var(--color-primary-electric)] mb-3" />
                  <div className="text-xl font-display font-bold text-[var(--color-primary-navy)] mb-1">5+ Countries</div>
                  <p className="text-xs text-[var(--color-primary-steel)]">Active regional offices and operations.</p>
                </div>
                <div className="glass-card-light p-5">
                  <Briefcase className="w-8 h-8 text-[var(--color-primary-electric)] mb-3" />
                  <div className="text-xl font-display font-bold text-[var(--color-primary-navy)] mb-1">260+ Projects</div>
                  <p className="text-xs text-[var(--color-primary-steel)]">Successfully delivered globally.</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-[var(--color-primary-navy)] to-[var(--color-primary-blue)] rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[400px] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-dot-pattern" />
              <div className="relative z-10">
                <Globe className="w-20 h-20 text-[var(--color-primary-electric)] mb-6 mx-auto animate-float" />
                <h3 className="text-2xl font-bold text-white mb-4">Multinational Scale</h3>
                <p className="text-gray-300 max-w-md text-sm leading-relaxed">
                  Our global presence allows us to mobilize resources rapidly and execute projects in challenging environments.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {['Bangladesh', 'India', 'Malaysia', 'Singapore', 'UAE', 'Saudi Arabia', 'Africa'].map(country => (
                    <span key={country} className="badge-dark text-[10px]">{country}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 07 Equipment & Capabilities ── */}
      <section className="py-28 bg-[var(--color-bg-muted)]">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl shadow-black/10"
            >
              <img src="https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=1000&auto=format&fit=crop" alt="Heavy Equipment" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="overline">Resources</span>
              <h2 className="mb-6">Heavy Equipment & In-House Fleet</h2>
              <p className="text-base leading-relaxed mb-8">
                We own and operate a robust fleet of over 550 heavy construction equipment, marine vessels, and specialized pipeline machinery, ensuring self-reliance and timely project execution.
              </p>
              <div className="space-y-4">
                {[
                  "Specialized pipeline laying equipment",
                  "Heavy earthmoving and excavation machinery",
                  "Marine logistics and coastal transport vessels",
                  "In-house maintenance and fabrication yards"
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-status-success)] mt-0.5 flex-shrink-0" />
                    <span className="text-[var(--color-primary-charcoal)] font-medium text-[15px]">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 08 Leadership Preview ── */}
      <section className="py-28 bg-white">
        <div className="container-max">
          <SectionHeader
            overline="Our Team"
            title="Know Our Leaders"
            subtitle="The visionaries and experts driving Dipon Group's growth across industries and continents."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {leaders.map((leader, i) => (
              <LeaderCard key={i} {...leader} index={i} />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link to="/leadership" className="btn-secondary">
              View Full Team <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 09 HSE & Sustainability ── */}
      <section className="py-28 bg-[var(--color-primary-navy)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern" />
        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="overline-light">Safety & Environment</span>
              <h2 className="text-white mb-6">Commitment to HSE & Sustainability</h2>
              <p className="text-gray-300 text-base leading-relaxed mb-8">
                At Dipon Group, safety and environmental stewardship are core values. We adhere to strict international standards to ensure zero harm to our people and the environment.
              </p>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-[var(--color-primary-electric-light)]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white mb-1 text-base">ISO 45001:2018 Certified</h5>
                    <p className="text-gray-400 text-sm">World-class occupational health and safety management systems.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-[var(--color-accent-gold)]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white mb-1 text-base">ISO 14001:2015 Certified</h5>
                    <p className="text-gray-400 text-sm">Rigorous environmental management and sustainability practices.</p>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <Link to="/hse" className="btn-ghost">Read Our HSE Policy</Link>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] rounded-2xl overflow-hidden"
            >
              <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop" alt="Sustainability" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-navy)] to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 10 How Can We Help? ── */}
      <section className="py-20 bg-white">
        <div className="container-max">
          <SectionHeader
            overline="Get Started"
            title="How Can We Help?"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Job Search", desc: "Explore career opportunities across our global operations.", icon: Search, link: "/careers" },
              { title: "Equipment Leasing", desc: "Access our fleet of 550+ heavy construction equipment.", icon: Wrench, link: "/contact" },
              { title: "Contact Us", desc: "Reach our business development team for project inquiries.", icon: Headphones, link: "/contact" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link to={item.link} className="group card p-8 h-full flex flex-col items-center text-center hover:-translate-y-1 transition-all duration-400">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-[var(--color-primary-electric)] transition-colors duration-400">
                    <item.icon className="w-7 h-7 text-[var(--color-primary-electric)] group-hover:text-white transition-colors duration-400" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-[var(--color-primary-steel)]">{item.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11 Contact CTA ── */}
      <CTABanner dark />
    </div>
  );
}