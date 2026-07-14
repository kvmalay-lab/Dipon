import { motion } from 'motion/react';
import { Heart, BookOpen, Globe, Users } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import CTABanner from '../components/CTABanner';

export default function CSR() {
  const initiatives = [
    {
      title: "Education & Literacy",
      desc: "Supporting local schools, providing scholarships, and funding digital literacy programs in underserved communities.",
      icon: BookOpen,
      bg: "bg-blue-50",
      color: "text-blue-600"
    },
    {
      title: "Healthcare Support",
      desc: "Organizing free medical camps, supporting local clinics, and funding healthcare initiatives for site workers and their families.",
      icon: Heart,
      bg: "bg-red-50",
      color: "text-red-500"
    },
    {
      title: "Environmental Conservation",
      desc: "Tree plantation drives, waste management awareness, and promoting clean energy solutions in our project areas.",
      icon: Globe,
      bg: "bg-green-50",
      color: "text-green-600"
    },
    {
      title: "Community Development",
      desc: "Building clean water infrastructure, supporting local businesses, and providing vocational training for youth.",
      icon: Users,
      bg: "bg-amber-50",
      color: "text-amber-500"
    }
  ];

  return (
    <div>
      <PageHero
        title="Corporate Social Responsibility"
        subtitle="Empowering communities, fostering sustainable development, and creating lasting positive impact where we operate."
        backgroundImage="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Philosophy Section */}
      <section className="py-24 bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="overline">Our Philosophy</span>
              <h2 className="mb-6">Empowering Communities Globally</h2>
              <p className="text-base text-[var(--color-primary-steel)] leading-relaxed mb-6">
                At Dipon Group, we believe that corporate success and social responsibility go hand in hand. Our commitment to society extends beyond our business operations to actively improving the quality of life in the communities we serve.
              </p>
              <p className="text-base text-[var(--color-primary-steel)] leading-relaxed">
                Through strategic partnerships, employee volunteerism, and targeted community development programs, we strive to address critical social, educational, and environmental challenges.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
            >
              <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop" alt="Community Support" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-24 bg-[var(--color-bg-muted)]">
        <div className="container-max">
          <SectionHeader
            overline="Focus Areas"
            title="Our Key Focus Areas"
            subtitle="Fostering long-term growth and sustainable improvements in local environments."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {initiatives.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card p-8 group hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[var(--color-primary-navy)]">{item.title}</h3>
                <p className="text-sm text-[var(--color-primary-steel)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}