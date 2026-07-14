import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, MapPin, User, Tag, Info } from 'lucide-react';
import PageHero from '../components/PageHero';
import CTABanner from '../components/CTABanner';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/v1/projects/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProject(data.data);
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

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--color-bg-default)]">
        <h2 className="text-2xl font-bold mb-4 text-[var(--color-primary-navy)]">Project Not Found</h2>
        <Link to="/projects" className="btn-primary">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        title={project.title}
        subtitle={project.shortDescription}
        backgroundImage={project.heroImage || "https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=2940&auto=format&fit=crop"}
      />

      {/* Project Details Section */}
      <section className="py-24 bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            {/* Overview */}
            <div className="lg:col-span-2">
              <span className="overline">Project Details</span>
              <h2 className="mb-6">Project Overview</h2>
              <div className="text-gray-600 text-lg leading-relaxed space-y-6">
                <p>{project.overview || "This project represents Dipon Group's commitment to engineering excellence, safety, and sustainable infrastructure development. Executed with state-of-the-art technology and strict adherence to international standards."}</p>
              </div>
            </div>

            {/* Spec Box */}
            <div className="glass-card-light p-8 md:p-10 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold mb-6 text-[var(--color-primary-navy)]">Specifications</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-[var(--color-primary-electric)]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Client</h4>
                    <p className="text-gray-800 font-semibold">{project.client || "Chevron / Government Partner"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[var(--color-primary-electric)]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Location</h4>
                    <p className="text-gray-800 font-semibold">{project.location || "Dhaka, Bangladesh"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Tag className="w-5 h-5 text-[var(--color-primary-electric)]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Category</h4>
                    <p className="text-gray-800 font-semibold">{project.category || "Infrastructure"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-[var(--color-primary-electric)]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Status</h4>
                    <p className="text-gray-800 font-semibold capitalize">{project.status}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}