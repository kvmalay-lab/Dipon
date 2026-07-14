import PageHero from '../components/PageHero';
import DivisionCard from '../components/DivisionCard';
import SectionHeader from '../components/SectionHeader';
import StatCounter from '../components/StatCounter';
import CTABanner from '../components/CTABanner';

const divisions = [
  {
    title: "Engineering & Construction",
    desc: "EPC pipelines, power plants, chemical plants, process plants, and mega industrial works.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=2835&auto=format&fit=crop",
    slug: "engineering"
  },
  {
    title: "IT & ITES",
    desc: "Identity solutions, national public key infrastructure, smart cards, and data centers.",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2834&auto=format&fit=crop",
    slug: "it"
  },
  {
    title: "Shipping & Logistics",
    desc: "Marine logistics, shipping of bulk construction materials, and salvage operations.",
    img: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2940&auto=format&fit=crop",
    slug: "shipping"
  },
  {
    title: "Investment & Development",
    desc: "Infrastructure project development, PPP models, and strategic long-term investments.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop",
    slug: "investment"
  }
];

export default function Divisions() {
  return (
    <div>
      <PageHero
        title="Our Business Divisions"
        subtitle="A diversified business conglomerate delivering integrated solutions across core sectors since 1970."
        backgroundImage="https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=2835&auto=format&fit=crop"
      />

      {/* Divisions Section */}
      <section className="py-24 bg-white">
        <div className="container-max">
          <SectionHeader
            overline="Core Capabilities"
            title="Diverse Sectors, Singular Standard"
            subtitle="We operate with international scale and technical precision across all of our four primary divisions."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
