import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Trash2, Search, CheckCircle2, Image as ImageIcon, FileText } from 'lucide-react';

export default function AdminMedia() {
  const [media, setMedia] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/v1/media', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
      const json = await res.json();
      if (json.success) setMedia(json.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchMedia(); }, []);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', '/uploads');

    setUploading(true);
    try {
      const res = await fetch('/api/v1/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formData
      });
      const json = await res.json();
      if (json.success) {
        showNotification('File uploaded successfully', 'success');
        fetchMedia();
      } else {
        showNotification(json.error?.message || 'Upload failed', 'error');
      }
    } catch (err) {
      showNotification('Upload network error', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media?')) return;
    try {
      const res = await fetch(`/api/v1/media/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) {
        showNotification('Deleted successfully', 'success');
        fetchMedia();
      }
    } catch (err) {
      showNotification('Delete failed', 'error');
    }
  };

  return (
    <div className="p-10 relative">
      <AnimatePresence>
        {notification && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-lg font-medium flex items-center ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {notification.type === 'success' && <CheckCircle2 className="w-5 h-5 mr-2" />}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Media Library</h2>
        <div className="relative overflow-hidden inline-block">
          <button className="btn-primary !py-2 !px-4 flex items-center whitespace-nowrap">
            <Upload className="w-4 h-4 mr-2" /> {uploading ? 'Uploading...' : 'Upload File'}
          </button>
          <input type="file" className="absolute left-0 top-0 opacity-0 cursor-pointer w-full h-full" onChange={handleUpload} disabled={uploading} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {media.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow transition-shadow group relative">
            <div className="aspect-square bg-gray-100 flex items-center justify-center p-4">
              {item.mimeType?.startsWith('image/') ? (
                <img src={item.fileUrl} alt={item.altText || item.fileName} className="object-cover w-full h-full rounded" />
              ) : (
                <FileText className="w-12 h-12 text-gray-400" />
              )}
            </div>
            <div className="p-3">
              <p className="text-xs font-medium text-gray-800 truncate" title={item.fileName}>{item.fileName}</p>
              <p className="text-[10px] text-gray-500 mt-1">{(item.size / 1024).toFixed(1)} KB</p>
            </div>
            <button onClick={() => handleDelete(item.id)} className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-md text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {media.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-2xl border border-dashed border-gray-300">
            No media files found. Upload a file to get started.
          </div>
        )}
      </div>
    </div>
  );
}
