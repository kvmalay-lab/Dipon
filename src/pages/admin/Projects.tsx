import React from "react";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    category: 'Oil & Gas',
    status: 'published'
  });

  const fetchProjects = () => {
    fetch('/api/v1/projects')
      .then(res => res.json())
      .then(data => {
        if (data.success) setProjects(data.data);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/v1/projects', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        fetchProjects();
        setFormData({ title: '', slug: '', shortDescription: '', category: 'Oil & Gas', status: 'published' });
      } else {
        alert(data.error?.message || 'Error creating project');
      }
    } catch (err) {
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 relative">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Projects</h2>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary !py-2 !px-4 flex items-center">
          <Plus className="w-4 h-4 mr-2" /> New Project
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 font-medium text-gray-600 text-sm">Project Title</th>
              <th className="px-6 py-4 font-medium text-gray-600 text-sm">Status</th>
              <th className="px-6 py-4 font-medium text-gray-600 text-sm">Featured</th>
              <th className="px-6 py-4 font-medium text-gray-600 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project: any) => (
              <tr key={project.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-800">{project.title}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full uppercase tracking-wider">
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{project.featured ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 flex justify-end space-x-3">
                  <button className="text-gray-400 hover:text-[var(--color-primary-electric)] transition-colors"><Edit2 className="w-5 h-5" /></button>
                  <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  No projects found. Create your first project to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-40" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">Create New Project</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={handleCreate} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                  <input type="text" className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')})} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <input type="text" className="input-field bg-gray-50" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                  <textarea className="input-field min-h-[100px]" value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} />
                </div>
                <div className="flex justify-end pt-4 space-x-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary !py-2">Cancel</button>
                  <button type="submit" disabled={loading} className="btn-primary !py-2">{loading ? 'Saving...' : 'Save Project'}</button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
