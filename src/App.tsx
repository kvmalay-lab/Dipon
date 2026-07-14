import React, { JSX } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Divisions from './pages/Divisions';
import DivisionDetail from './pages/DivisionDetail';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Leadership from './pages/Leadership';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Media from './pages/Media';
import NewsDetail from './pages/NewsDetail';
import HSE from './pages/HSE';
import CSR from './pages/CSR';
import AwardsCertifications from './pages/AwardsCertifications';
import Clients from './pages/Clients';
import Downloads from './pages/Downloads';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import NotFound from './pages/NotFound';
import ServerError from './pages/ServerError';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProjects from './pages/admin/Projects';
import AdminMedia from './pages/admin/MediaLibrary';
import { AdminNews, AdminCareers, AdminLeadership, AdminClients, AdminAwards, AdminOffices, AdminInquiries, AdminSEO, AdminHomepage, AdminSettings, AdminUsers } from './pages/admin/CRUDPages';
import AdminLogin from './pages/admin/Login';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route path="/admin" element={<RequireAuth><AdminLayout /></RequireAuth>}>
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="careers" element={<AdminCareers />} />
          <Route path="leadership" element={<AdminLeadership />} />
          <Route path="clients" element={<AdminClients />} />
          <Route path="awards" element={<AdminAwards />} />
          <Route path="offices" element={<AdminOffices />} />
          <Route path="inquiries" element={<AdminInquiries />} />
          <Route path="seo" element={<AdminSEO />} />
          <Route path="homepage" element={<AdminHomepage />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="*" element={<div className="p-10"><h2>Under Construction</h2></div>} />
        </Route>
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="divisions" element={<Divisions />} />
          <Route path="divisions/:slug" element={<DivisionDetail />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="leadership" element={<Leadership />} />
          <Route path="careers" element={<Careers />} />
          <Route path="contact" element={<Contact />} />
          <Route path="media" element={<Media />} />
          <Route path="media/:slug" element={<NewsDetail />} />
          <Route path="hse" element={<HSE />} />
          <Route path="csr" element={<CSR />} />
          <Route path="awards" element={<AwardsCertifications />} />
          <Route path="clients" element={<Clients />} />
          <Route path="downloads" element={<Downloads />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsConditions />} />
          <Route path="500" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}