import { useEffect, useState } from 'react';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import ProjectCard from '../components/ProjectCard';
import CTABanner from '../components/CTABanner';

const categories = ["All Projects", "Engineering & Construction", "Power", "IT & ITES", "Shipping & Logistics"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const [projRes, divRes] = await Promise.all([
          fetch('/api/v1/projects'),
          fetch('/api/v1/divisions')
        ]);
        const projJson = await projRes.json();
        const divJson = await divRes.json();

        if (projJson.success && projJson.data && projJson.data.length > 0) {
          const divisions = divJson.success ? divJson.data : [];
          
          const mapped = projJson.data.map((item: any) => {
            const matchedDiv = divisions.find((d: any) => d.id === item.divisionId);
            const categoryName = matchedDiv ? matchedDiv.title : 'Infrastructure';
            
            // Hardcode/Extract location metadata based on well-known projects
            let locationLabel = 'Bangladesh';
            if (item.slug === 'bibiyana-gas-plant') locationLabel = 'Chevron • Bibiyana, Hobigonj';
            else if (item.slug === 'maheshkhali-anwara-gas-transmission') locationLabel = 'GTCL • Maheshkhali';
            else if (item.slug === 'maitree-super-thermal-power-project') locationLabel = 'BIFPCL • Rampal';
            else if (item.slug === 'national-id-guinea') locationLabel = 'Govt of Guinea • Guinea';
            else if (item.slug === '100-mw-hfo-power-plant') locationLabel = 'Powerpac Mutiara • Jamalpur';
            else if (item.slug === 'e-passport-project') locationLabel = 'Govt of Bangladesh • Bangladesh';

            return {
              slug: item.slug,
              title: item.title,
              category: categoryName,
              location: locationLabel,
              image: item.thumbnail || item.heroImage || "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=800&auto=format&fit=crop"
            };
          });
          setProjects(mapped);
        } else {
          // Fallback static projects
          setProjects([
            { slug: "bibiyana-gas-plant", title: "Bibiyana Gas Processing Plant", category: "Engineering & Construction", location: "Chevron • Bibiyana, Hobigonj", image: "https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=800&auto=format&fit=crop" },
            { slug: "maheshkhali-anwara-gas-transmission", title: "Maheshkhali-Anwara Gas Transmission", category: "Engineering & Construction", location: "GTCL • Maheshkhali", image: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=800&auto=format&fit=crop" },
            { slug: "maitree-super-thermal-power-project", title: "Maitree Super Thermal Power Project", category: "Engineering & Construction", location: "BIFPCL • Rampal", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop" },
            { slug: "national-id-guinea", title: "National ID and Population Management", category: "IT & ITES", location: "Govt of Guinea • Republic of Guinea", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop" },
            { slug: "100-mw-hfo-power-plant", title: "100 MW HFO Power Plant", category: "Engineering & Construction", location: "Powerpac Mutiara • Jamalpur", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" },
            { slug: "e-passport-project", title: "E-Passport Project", category: "IT & ITES", location: "Govt of Bangladesh • Bangladesh", image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=800&auto=format&fit=crop" }
          ]);
        }
      } catch (err) {
        console.error('Failed to load projects dynamically:', err);
      }
    };

    loadProjects();
  }, []);

  const filteredProjects = activeCategory === "All Projects"
    ? projects
    : projects.filter(proj => proj.category.toLowerCase().includes(activeCategory.split(" ")[0].toLowerCase()));

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
