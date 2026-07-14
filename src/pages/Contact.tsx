import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Globe } from 'lucide-react';
import PageHero from '../components/PageHero';
import OfficeCard from '../components/OfficeCard';
import SectionHeader from '../components/SectionHeader';
import CTABanner from '../components/CTABanner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'general',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const offices = [
    { country: "Bangladesh", city: "Dhaka (HQ)", address: "Rangs FC Enclave, Level 3, 4, 10 & 11, Plot #6/A, Road 32, Gulshan, Dhaka 1212", phone: "+880-2-9606501115", email: "info@dipongroup.com", isHQ: true },
    { country: "India", city: "New Delhi", address: "42, Community Centre, Saket, New Delhi 110017", phone: "+91-11-2696-7777", email: "india@dipongroup.com" },
    { country: "Malaysia", city: "Kuala Lumpur", address: "Level 15, Menara Binjai, No. 2 Jalan Binjai, 50450 KL", phone: "+60 3 2181 1234", email: "malaysia@dipongroup.com" },
    { country: "Singapore", city: "Singapore", address: "10 Anson Road, #26-04 International Plaza, Singapore 079903", phone: "+65 6220 1234", email: "singapore@dipongroup.com" },
    { country: "UAE", city: "Dubai", address: "Office 702, Onyx Tower 1, The Greens, Dubai", phone: "+971 4 399 1234", email: "uae@dipongroup.com" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', department: 'general', subject: '', message: '' });
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
        title="Contact Our Team"
        subtitle="Get in touch with our global offices. We're here to answer your questions and explore collaboration opportunities."
        backgroundImage="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2940&auto=format&fit=crop"
      />

      <section className="py-24 bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Form */}
            <div>
              <span className="overline">Inquiries</span>
              <h2 className="mb-6">Send Us a Message</h2>
              
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">Thank you for reaching out. Our team will get back to you shortly.</p>
                  <button onClick={() => setStatus('idle')} className="btn-secondary py-2.5 px-6">Send another message</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Your Name *</label>
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
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Department *</label>
                    <select
                      className="input-field"
                      value={formData.department}
                      onChange={e => setFormData({...formData, department: e.target.value})}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="business">Business Development</option>
                      <option value="careers">Careers & HR</option>
                      <option value="media">Media & Press</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Subject *</label>
                    <input
                      type="text"
                      required
                      className="input-field"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={e => setFormData({...formData, subject: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Message *</label>
                    <textarea
                      required
                      rows={5}
                      className="input-field resize-none"
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <div className="text-red-500 text-xs font-semibold">Failed to send message. Please try again.</div>
                  )}

                  <button type="submit" disabled={status === 'loading'} className="btn-primary w-full">
                    {status === 'loading' ? 'Sending...' : <><Send className="w-4 h-4" /> Send Message</>}
                  </button>
                </form>
              )}
            </div>

            {/* Headquarters details */}
            <div>
              <span className="overline">Headquarters</span>
              <h2 className="mb-6">Global Headquarters</h2>
              <div className="glass-card-light p-8 md:p-10 border border-gray-100 shadow-sm mb-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[var(--color-primary-electric)]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Address</h4>
                    <p className="text-gray-800 font-semibold leading-relaxed">
                      Rangs FC Enclave, Level 10 & 11<br/>
                      Plot #6/A, Road 32, Gulshan Avenue<br/>
                      Dhaka 1212, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[var(--color-primary-electric)]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone</h4>
                    <p className="text-gray-800 font-semibold">+880-2-9606501115</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[var(--color-primary-electric)]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email</h4>
                    <p className="text-gray-800 font-semibold">info@dipongroup.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[var(--color-primary-electric)]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Business Hours</h4>
                    <p className="text-gray-800 font-semibold leading-relaxed">
                      Sunday - Thursday<br/>
                      9:00 AM - 6:00 PM (BST)
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-[var(--color-primary-navy)] to-[var(--color-primary-blue)] rounded-2xl p-8 relative overflow-hidden text-center min-h-[200px] flex flex-col justify-center items-center">
                <div className="absolute inset-0 bg-dot-pattern" />
                <div className="relative z-10">
                  <Globe className="w-12 h-12 text-[var(--color-primary-electric)] mb-3 mx-auto animate-float" />
                  <h3 className="text-lg font-bold text-white mb-2">Multinational Presence</h3>
                  <p className="text-gray-300 text-sm max-w-sm">
                    Leveraging regional offices and local infrastructure across South Asia, Southeast Asia, and the Middle East.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="py-24 bg-[var(--color-bg-muted)]">
        <div className="container-max">
          <SectionHeader
            overline="Network"
            title="Global Offices"
            subtitle="Connect directly with our regional and subsidiary hubs."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offices.map((office, i) => (
              <OfficeCard
                key={i}
                name={`${office.city} Office`}
                address={office.address}
                phone={office.phone}
                email={office.email}
                isHQ={office.isHQ}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}