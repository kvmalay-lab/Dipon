import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X, CheckCircle2, Globe, Heart, Shield, Cpu } from 'lucide-react';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import CTABanner from '../components/CTABanner';

export default function Careers() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetch('/api/v1/careers')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          setJobs(data.data);
        } else {
          // Fallback static jobs if DB is empty
          setJobs([
            { id: "1", title: "Senior Project Engineer", department: "Engineering & Construction", location: "Dhaka, Bangladesh", employmentType: "Full-time" },
            { id: "2", title: "Systems Architect", department: "IT & ITES", location: "Kuala Lumpur, Malaysia", employmentType: "Full-time" },
            { id: "3", title: "Logistics Manager", department: "Shipping & Logistics", location: "Abu Dhabi, UAE", employmentType: "Full-time" },
            { id: "4", title: "HSE Officer", department: "Engineering & Construction", location: "Site Based", employmentType: "Contract" }
          ]);
        }
      })
      .catch(() => {
        setJobs([
          { id: "1", title: "Senior Project Engineer", department: "Engineering & Construction", location: "Dhaka, Bangladesh", employmentType: "Full-time" },
          { id: "2", title: "Systems Architect", department: "IT & ITES", location: "Kuala Lumpur, Malaysia", employmentType: "Full-time" },
          { id: "3", title: "Logistics Manager", department: "Shipping & Logistics", location: "Abu Dhabi, UAE", employmentType: "Full-time" },
          { id: "4", title: "HSE Officer", department: "Engineering & Construction", location: "Site Based", employmentType: "Contract" }
        ]);
      });
  }, []);

  const handleApply = (job: any) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    setStatus('idle');
    setFormData({ name: '', email: '', phone: '', resume: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/v1/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          careerId: selectedJob.id,
          ...formData
        })
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div>
      <PageHero
        title="Careers at Dipon Group"
        subtitle="Build your career with a multinational engineering conglomerate. We are always looking for passionate talent to join our global team."
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container-max">
          <SectionHeader
            overline="Why Dipon"
            title="Grow With Us"
            subtitle="We provide a dynamic, safe, and challenging workplace where you can deliver global impact."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Globe, title: "Global Projects", desc: "Work on cross-country pipelines and national infrastructure solutions." },
              { icon: Cpu, title: "Career Growth", desc: "Clear pathways for training, mentoring, and professional progression." },
              { icon: Shield, title: "Safety First", desc: "Strict ISO compliance to ensure a zero-harm environment for all." },
              { icon: Heart, title: "Innovation Culture", desc: "Collaborate using modern engineering techniques and technology." }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card p-8 group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary-electric)] transition-colors">
                  <benefit.icon className="w-6 h-6 text-[var(--color-primary-electric)] group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-lg font-bold mb-3">{benefit.title}</h4>
                <p className="text-sm text-[var(--color-primary-steel)] leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-24 bg-[var(--color-bg-muted)]">
        <div className="container-max">
          <SectionHeader
            overline="Opportunities"
            title="Open Positions"
            subtitle="Apply to join our divisions and project offices around the world."
          />
          <div className="space-y-6 max-w-4xl mx-auto">
            {jobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="glass-card-light p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div>
                  <span className="badge-primary mb-3">{job.department}</span>
                  <h3 className="text-xl font-bold text-[var(--color-primary-navy)] mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-[var(--color-primary-steel)] uppercase tracking-wider">
                    <span>{job.location}</span>
                    <span>&bull;</span>
                    <span>{job.employmentType}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button onClick={() => handleApply(job)} className="btn-primary py-2.5 px-6 text-sm">
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && selectedJob && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: '-40%', x: '-50%' }}
              animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
              exit={{ opacity: 0, scale: 0.95, y: '-40%', x: '-50%' }}
              transition={{ duration: 0.3 }}
              className="fixed top-1/2 left-1/2 w-[90%] max-w-lg bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-[var(--color-bg-muted)]">
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-primary-navy)]">Apply for Position</h3>
                  <p className="text-xs text-[var(--color-primary-steel)] font-semibold uppercase tracking-wider mt-1">{selectedJob.title} &bull; {selectedJob.department}</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg hover:bg-gray-200 transition-colors text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {status === 'success' ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-primary-navy)] mb-2">Application Submitted!</h3>
                  <p className="text-gray-500 mb-6 text-sm">Thank you for applying. Our HR team will review your application and get back to you shortly.</p>
                  <button onClick={() => setIsModalOpen(false)} className="btn-primary py-2.5 px-6">Close Window</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      className="input-field"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      className="input-field"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      className="input-field"
                      placeholder="+880 1700 000000"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Resume / CV Link *</label>
                    <input
                      type="url"
                      required
                      className="input-field"
                      placeholder="https://drive.google.com/file/d/... or LinkedIn Profile"
                      value={formData.resume}
                      onChange={e => setFormData({...formData, resume: e.target.value})}
                    />
                  </div>

                  {status === 'error' && (
                    <div className="text-red-500 text-xs font-semibold">Failed to submit application. Please try again.</div>
                  )}

                  <div className="flex justify-end pt-4 space-x-3 border-t border-gray-100">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary !py-2 !px-5 text-sm">Cancel</button>
                    <button type="submit" disabled={status === 'loading'} className="btn-primary !py-2 !px-5 text-sm">
                      {status === 'loading' ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CTABanner />
    </div>
  );
}