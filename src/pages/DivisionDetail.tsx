import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Briefcase, Shield, Cpu } from 'lucide-react';
import PageHero from '../components/PageHero';
import ProjectCard from '../components/ProjectCard';
import SectionHeader from '../components/SectionHeader';
import CTABanner from '../components/CTABanner';

export default function DivisionDetail() {
  const { slug } = useParams();
  const [division, setDivision] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fetch division details
    fetch(`/api/v1/divisions?search=${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          const div = data.data.find((d: any) => d.slug === slug) || data.data[0];
          setDivision(div);
          
          // Fetch projects for this division
          fetch(`/api/v1/projects`)
            .then(res => res.json())
            .then(projData => {
              if (projData.success) {
                const filtered = projData.data.filter((p: any) => p.divisionId === div.id);
                setProjects(filtered);
              }
            });
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-default)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary-electric)]"></div>
      </div>
    );
  }

  if (!division) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--color-bg-default)]">
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-primary-navy)]">Division Not Found</h2>
        <Link to="/divisions" className="btn-primary">
          <ArrowLeft className="w-4 h-4" /> Back to Divisions
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        title={division.title}
        subtitle={division.description}
        backgroundImage={division.heroImage || "https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=2940&auto=format&fit=crop"}
      />

      {/* Overview & Capabilities Section */}
      <section className="py-24 bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            <div className="lg:col-span-2">
              <span className="overline">Division Overview</span>
              <h2 className="mb-6">Delivering Complex Solutions</h2>
              <div className="text-gray-600 text-lg leading-relaxed space-y-6">
                <p>{division.overview || "Dipon Group delivers complex engineering and infrastructure projects with reliability, technical excellence, and long-term commitment across multiple industries and international markets."}</p>
              </div>
            </div>
            
            <div className="glass-card-light p-8 md:p-10 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold mb-6 text-[var(--color-primary-navy)]">Key Capabilities</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-[var(--color-primary-electric)]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-primary-navy)] mb-1">Strict HSE Compliance</h4>
                    <p className="text-xs text-[var(--color-primary-steel)] leading-relaxed">Adhering to world-class safety standards.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-5 h-5 text-[var(--color-primary-electric)]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-primary-navy)] mb-1">Technology Integration</h4>
                    <p className="text-xs text-[var(--color-primary-steel)] leading-relaxed">Using advanced engineering software and systems.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-[var(--color-primary-electric)]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-primary-navy)] mb-1">Project Management</h4>
                    <p className="text-xs text-[var(--color-primary-steel)] leading-relaxed">Complete lifecycle execution on time and budget.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="py-24 bg-[var(--color-bg-muted)]">
          <div className="container-max">
            <SectionHeader
              overline="Portfolio"
              title="Featured Projects"
              subtitle="Explore some of our major works executed by this business division."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  category={project.shortDescription || "Infrastructure"}
                  image={project.thumbnail || "https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=800&auto=format&fit=crop"}
                  slug={project.slug}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </div>
  );
}