import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit2, Trash2, X, Search, CheckCircle2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  overview: string;
  divisionId: string;
  status: string;
  featured: boolean;
  heroImage: string;
  thumbnail: string;
}

interface Division {
  id: string;
  title: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    slug: '',
    shortDescription: '',
    overview: '',
    divisionId: '',
    status: 'published',
    featured: false,
    heroImage: '',
    thumbnail: ''
  });

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/v1/projects');
      const json = await res.json();
      if (json.success) setProjects(json.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDivisions = async () => {
    try {
      const res = await fetch('/api/v1/divisions');
      const json = await res.json();
      if (json.success) setDivisions(json.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchDivisions();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = selectedId ? 'PUT' : 'POST';
      const url = selectedId ? `/api/v1/projects/${selectedId}` : '/api/v1/projects';
      
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        showNotification(selectedId ? 'Project updated successfully' : 'Project created successfully', 'success');
        setIsModalOpen(false);
        fetchProjects();
      } else {
        showNotification(data.error?.message || 'Error saving project', 'error');
      }
    } catch (err) {
      showNotification('Network error', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/projects/${selectedId}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Project deleted successfully', 'success');
        setIsConfirmDeleteOpen(false);
        fetchProjects();
      } else {
        showNotification(data.error?.message || 'Error deleting project', 'error');
      }
    } catch (err) {
      showNotification('Network error', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-10 relative">
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-lg font-medium flex items-center ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
          >
            {notification.type === 'success' && <CheckCircle2 className="w-5 h-5 mr-2" />}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Projects</h2>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button 
            onClick={() => { 
              setFormData({
                title: '',
                slug: '',
                shortDescription: '',
                overview: '',
                divisionId: divisions[0]?.id || '',
                status: 'published',
                featured: false,
                heroImage: '',
                thumbnail: ''
              }); 
              setSelectedId(null); 
              setIsModalOpen(true); 
            }} 
            className="btn-primary !py-2 !px-4 flex items-center whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Project
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 font-medium text-gray-600 text-sm">Project Title</th>
                <th className="px-6 py-4 font-medium text-gray-600 text-sm">Slug</th>
                <th className="px-6 py-4 font-medium text-gray-600 text-sm">Status</th>
                <th className="px-6 py-4 font-medium text-gray-600 text-sm">Featured</th>
                <th className="px-6 py-4 font-medium text-gray-600 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{project.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{project.slug}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${project.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{project.featured ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4 flex justify-end space-x-3">
                    <button 
                      onClick={() => {
                        setFormData(project);
                        setSelectedId(project.id);
                        setIsModalOpen(true);
                      }} 
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedId(project.id);
                        setIsConfirmDeleteOpen(true);
                      }} 
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-40" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[90vh]">
              <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
                <h3 className="text-xl font-bold text-gray-800">{selectedId ? 'Edit' : 'Create'} Project</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-6 overflow-y-auto">
                <form id="project-form" onSubmit={handleSave} className="space-y-4 font-sans">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Title *</label>
                      <input 
                        type="text" 
                        required 
                        className="input-field" 
                        value={formData.title || ''} 
                        onChange={e => setFormData({...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')})} 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                      <input 
                        type="text" 
                        required 
                        className="input-field" 
                        value={formData.slug || ''} 
                        onChange={e => setFormData({...formData, slug: e.target.value})} 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Business Division *</label>
                      <select 
                        required 
                        className="input-field" 
                        value={formData.divisionId || ''} 
                        onChange={e => setFormData({...formData, divisionId: e.target.value})}
                      >
                        <option value="">Select Division...</option>
                        {divisions.map(d => (
                          <option key={d.id} value={d.id}>{d.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select 
                        className="input-field" 
                        value={formData.status || 'published'} 
                        onChange={e => setFormData({...formData, status: e.target.value})}
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image URL</label>
                      <input 
                        type="text" 
                        className="input-field" 
                        value={formData.heroImage || ''} 
                        onChange={e => setFormData({...formData, heroImage: e.target.value})} 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                      <input 
                        type="text" 
                        className="input-field" 
                        value={formData.thumbnail || ''} 
                        onChange={e => setFormData({...formData, thumbnail: e.target.value})} 
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 py-2">
                    <input 
                      type="checkbox" 
                      id="featured" 
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                      checked={formData.featured || false} 
                      onChange={e => setFormData({...formData, featured: e.target.checked})} 
                    />
                    <label htmlFor="featured" className="text-sm font-medium text-gray-700">Feature this project on the homepage</label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                    <textarea 
                      className="input-field min-h-[80px]" 
                      value={formData.shortDescription || ''} 
                      onChange={e => setFormData({...formData, shortDescription: e.target.value})} 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Overview / Details</label>
                    <textarea 
                      className="input-field min-h-[140px]" 
                      value={formData.overview || ''} 
                      onChange={e => setFormData({...formData, overview: e.target.value})} 
                    />
                  </div>
                </form>
              </div>
              <div className="flex justify-end p-6 border-t border-gray-100 space-x-3 shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary !py-2 font-sans">Cancel</button>
                <button type="submit" form="project-form" disabled={loading} className="btn-primary !py-2 font-sans">{loading ? 'Saving...' : 'Save'}</button>
              </div>
            </motion.div>
          </>
        )}

        {isConfirmDeleteOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-40" onClick={() => setIsConfirmDeleteOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 font-sans">Delete Project?</h3>
                <p className="text-gray-500 mb-6 font-sans">Are you sure you want to delete this project? This action cannot be undone.</p>
                <div className="flex justify-end space-x-3">
                  <button onClick={() => setIsConfirmDeleteOpen(false)} className="btn-secondary !py-2 font-sans">Cancel</button>
                  <button onClick={handleDelete} disabled={loading} className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-full font-sans">{loading ? 'Deleting...' : 'Delete'}</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
