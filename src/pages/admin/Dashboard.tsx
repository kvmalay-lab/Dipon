import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, publishedNews: 0, openJobs: 0, unreadMessages: 0 });

  useEffect(() => {
    fetch('/api/v1/admin/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.data);
        }
      });
  }, []);

  return (
    <div className="p-10">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium mb-2 uppercase tracking-wider">Total Projects</h3>
          <p className="text-4xl font-bold text-[var(--color-primary-navy)] font-display">{stats.projects}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium mb-2 uppercase tracking-wider">Published News</h3>
          <p className="text-4xl font-bold text-[var(--color-primary-navy)] font-display">{stats.publishedNews}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium mb-2 uppercase tracking-wider">Open Jobs</h3>
          <p className="text-4xl font-bold text-[var(--color-primary-navy)] font-display">{stats.openJobs}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium mb-2 uppercase tracking-wider">Unread Messages</h3>
          <p className="text-4xl font-bold text-[var(--color-status-warning)] font-display">{stats.unreadMessages}</p>
        </motion.div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
         <h3 className="text-lg font-semibold text-gray-800 mb-6">Recent Activity</h3>
         <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-50">
               <div>
                  <p className="font-medium text-gray-800">New Contact Inquiry from "John Doe"</p>
                  <p className="text-sm text-gray-500">Business Development</p>
               </div>
               <span className="text-sm text-gray-400">10 mins ago</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-50">
               <div>
                  <p className="font-medium text-gray-800">Project "Bibiyana Gas Plant" updated</p>
                  <p className="text-sm text-gray-500">Admin User</p>
               </div>
               <span className="text-sm text-gray-400">2 hours ago</span>
            </div>
         </div>
      </div>
    </div>
  );
}
