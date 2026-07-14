import { useState } from 'react';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import ProjectCard from '../components/ProjectCard';
import CTABanner from '../components/CTABanner';

const projectData = [
  { slug: "bibiyana-gas-plant", title: "Bibiyana Gas Processing Plant", client: "Chevron", location: "Bibiyana, Hobigonj", category: "Oil & Gas", image: "https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=800&auto=format&fit=crop" },
  { slug: "maheshkhali-anwara-gas-transmission", title: "Maheshkhali-Anwara Gas Transmission", client: "GTCL", location: "Maheshkhali", category: "Infrastructure", image: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=800&auto=format&fit=crop" },
  { slug: "maitree-super-thermal-power-project", title: "Maitree Super Thermal Power Project", client: "BIFPCL", location: "Rampal", category: "Power", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop" },
  { slug: "national-id-guinea", title: "National ID and Population Management", client: "Govt of Guinea", location: "Republic of Guinea", category: "IT & ITES", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop" },
  { slug: "100-mw-hfo-power-plant", title: "100 MW HFO Power Plant", client: "Powerpac Mutiara", location: "Jamalpur", category: "Power", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" },
  { slug: "e-passport-project", title: "E-Passport Project", client: "Govt of Bangladesh", location: "Bangladesh", category: "IT & ITES", image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=800&auto=format&fit=crop" }
];

const categories = ["All Projects", "Oil & Gas", "Power", "Infrastructure", "IT & ITES"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All Projects");

  const filteredProjects = activeCategory === "All Projects"
    ? projectData
    : projectData.filter(proj => proj.category.toLowerCase().includes(activeCategory.split(" ")[0].toLowerCase()));

  return (
    <div>
      <PageHero
        title="Project Portfolio"
        subtitle="Discover our track record of engineering excellence and complex infrastructure projects executed globally."
        backgroundImage="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2940&auto=format&fit=crop"
      />

      <section className="py-24 bg-white">
        <div className="container-max">
          {/* Categories Filter */}
          <div className="flex flex-wrap gap-3 mb-16 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[var(--color-primary-navy)] text-white shadow-md'
                    : 'bg-[var(--color-bg-muted)] text-[var(--color-primary-steel)] hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                category={project.category}
                location={`${project.client} • ${project.location}`}
                image={project.image}
                slug={project.slug}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
