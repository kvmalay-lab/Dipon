import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit2, Trash2, X, Search, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'image' | 'select' | 'textarea';
  options?: { value: string; label: string }[];
  required?: boolean;
}

interface GenericCRUDProps {
  title: string;
  endpoint: string;
  columns: Column[];
  entityName: string;
}

export default function GenericCRUD({ title, endpoint, columns, entityName }: GenericCRUDProps) {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch(`${endpoint}?page=${page}&limit=10&search=${search}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search, endpoint]);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = selectedId ? 'PUT' : 'POST';
      const url = selectedId ? `${endpoint}/${selectedId}` : endpoint;
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      const json = await res.json();
      if (json.success) {
        showNotification(`${entityName} saved successfully!`, 'success');
        setIsModalOpen(false);
        fetchData();
      } else {
        showNotification(json.error?.message || 'Error saving data', 'error');
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
      const res = await fetch(`${endpoint}/${selectedId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const json = await res.json();
      if (json.success) {
        showNotification(`${entityName} deleted successfully!`, 'success');
        setIsConfirmDeleteOpen(false);
        fetchData();
      } else {
        showNotification(json.error?.message || 'Error deleting data', 'error');
      }
    } catch (err) {
      showNotification('Network error', 'error');
    } finally {
      setLoading(false);
    }
  };

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
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <button 
            onClick={() => { setFormData({}); setSelectedId(null); setIsModalOpen(true); }} 
            className="btn-primary !py-2 !px-4 flex items-center whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-2" /> Add New
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {columns.filter(c => c.type !== 'textarea').map(col => (
                  <th key={col.key} className="px-6 py-4 font-medium text-gray-600 text-sm">{col.label}</th>
                ))}
                <th className="px-6 py-4 font-medium text-gray-600 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  {columns.filter(c => c.type !== 'textarea').map(col => (
                    <td key={col.key} className="px-6 py-4 text-gray-800 text-sm">
                      {col.type === 'boolean' ? (row[col.key] ? 'Yes' : 'No') : 
                       col.type === 'image' && row[col.key] ? <img src={row[col.key]} className="h-10 w-10 object-cover rounded" alt="" /> :
                       String(row[col.key] || '')}
                    </td>
                  ))}
                  <td className="px-6 py-4 flex justify-end space-x-3">
                    <button onClick={() => { setFormData(row); setSelectedId(row.id); setIsModalOpen(true); }} className="text-gray-400 hover:text-blue-600 transition-colors"><Edit2 className="w-5 h-5" /></button>
                    <button onClick={() => { setSelectedId(row.id); setIsConfirmDeleteOpen(true); }} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-gray-500">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {data.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">Page {page}</span>
            <div className="flex space-x-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-2 border border-gray-200 rounded text-gray-600 disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={() => setPage(p => p + 1)} className="p-2 border border-gray-200 rounded text-gray-600"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-40" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[90vh]">
              <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
                <h3 className="text-xl font-bold text-gray-800">{selectedId ? 'Edit' : 'Create'} {entityName}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-6 overflow-y-auto">
                <form id="crud-form" onSubmit={handleSave} className="space-y-4">
                  {columns.map(col => (
                    <div key={col.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{col.label} {col.required && '*'}</label>
                      {col.type === 'textarea' ? (
                        <textarea required={col.required} className="input-field min-h-[100px]" value={formData[col.key] || ''} onChange={e => setFormData({...formData, [col.key]: e.target.value})} />
                      ) : col.type === 'boolean' ? (
                        <select className="input-field" value={formData[col.key] ? 'true' : 'false'} onChange={e => setFormData({...formData, [col.key]: e.target.value === 'true'})}>
                          <option value="false">No</option>
                          <option value="true">Yes</option>
                        </select>
                      ) : col.type === 'select' ? (
                        <select required={col.required} className="input-field" value={formData[col.key] || ''} onChange={e => setFormData({...formData, [col.key]: e.target.value})}>
                          <option value="">Select...</option>
                          {col.options?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                      ) : (
                        <input required={col.required} type={col.type || 'text'} className="input-field" value={formData[col.key] || ''} onChange={e => setFormData({...formData, [col.key]: e.target.type === 'number' ? Number(e.target.value) : e.target.value})} />
                      )}
                    </div>
                  ))}
                </form>
              </div>
              <div className="flex justify-end p-6 border-t border-gray-100 space-x-3 shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary !py-2">Cancel</button>
                <button type="submit" form="crud-form" disabled={loading} className="btn-primary !py-2">{loading ? 'Saving...' : 'Save'}</button>
              </div>
            </motion.div>
          </>
        )}

        {isConfirmDeleteOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-40" onClick={() => setIsConfirmDeleteOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Delete {entityName}?</h3>
                <p className="text-gray-500 mb-6">Are you sure you want to delete this {entityName.toLowerCase()}? This action cannot be undone.</p>
                <div className="flex justify-end space-x-3">
                  <button onClick={() => setIsConfirmDeleteOpen(false)} className="btn-secondary !py-2">Cancel</button>
                  <button onClick={handleDelete} disabled={loading} className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-full">{loading ? 'Deleting...' : 'Delete'}</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
