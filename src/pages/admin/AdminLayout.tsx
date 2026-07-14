import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Briefcase, FileText, Users, Mail, Settings, LogOut, Award, MapPin, Building, Server, Shield, Globe, HardDrive } from 'lucide-react';

export default function AdminLayout() {
  const { pathname } = useLocation();

  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: Briefcase },
    { name: 'News & Media', path: '/admin/news', icon: FileText },
    { name: 'Careers', path: '/admin/careers', icon: Users },
    { name: 'Leadership', path: '/admin/leadership', icon: Users },
    { name: 'Clients', path: '/admin/clients', icon: Building },
    { name: 'Awards', path: '/admin/awards', icon: Award },
    { name: 'Offices', path: '/admin/offices', icon: MapPin },
    { name: 'Inquiries', path: '/admin/inquiries', icon: Mail },
    { name: 'SEO', path: '/admin/seo', icon: Globe },
    { name: 'Homepage', path: '/admin/homepage', icon: LayoutDashboard },
    { name: 'Media Library', path: '/admin/media', icon: HardDrive },
    { name: 'Users & Roles', path: '/admin/users', icon: Shield },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col pt-10 pb-6 shadow-sm overflow-y-auto">
        <div className="px-8 mb-10 shrink-0">
          <h2 className="text-xl font-bold font-display text-[var(--color-primary-navy)]">Dipon CMS</h2>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map(item => (
            <Link key={item.path} to={item.path} className={`flex items-center px-4 py-2.5 rounded-lg font-medium transition-colors text-sm ${isActive(item.path) && (item.path !== '/admin' || pathname === '/admin') ? 'bg-blue-50 text-[var(--color-primary-electric)]' : 'text-gray-600 hover:bg-gray-50 hover:text-[var(--color-primary-navy)]'}`}>
              <item.icon className="w-4 h-4 mr-3" /> {item.name}
            </Link>
          ))}
        </nav>
        <div className="px-8 mt-6 shrink-0 border-t border-gray-100 pt-6">
          <Link to="/" className="flex items-center text-gray-500 hover:text-red-500 transition-colors font-medium text-sm">
            <LogOut className="w-4 h-4 mr-3" /> Exit to Site
          </Link>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto flex flex-col">
        <header className="bg-white border-b border-gray-100 py-4 px-10 flex justify-end items-center shadow-sm sticky top-0 z-10 shrink-0">
          <div className="flex items-center">
             <div className="w-8 h-8 bg-[var(--color-primary-navy)] text-white rounded-full flex items-center justify-center font-bold text-sm">A</div>
             <span className="ml-3 font-medium text-gray-700 text-sm">Admin User</span>
          </div>
        </header>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
