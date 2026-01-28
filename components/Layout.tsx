
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Church, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Lock } from 'lucide-react';
import { Page } from '../types';
import { CHURCH_NAME } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setPage: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, setPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; value: Page }[] = [
    { label: 'Home', value: 'home' },
    { label: 'About', value: 'about' },
    { label: 'Devotions', value: 'devotions' },
    { label: 'Sermons', value: 'sermons' },
    { label: 'Events', value: 'events' },
    { label: 'Give', value: 'give' },
    { label: 'Prayer', value: 'prayer' },
  ];

  const handleNavClick = (page: Page) => {
    setPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button onClick={() => handleNavClick('home')} className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-lg group-hover:scale-110 transition-transform">
              <Church size={24} />
            </div>
            <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-slate-900 md:text-white md:mix-blend-difference'}`}>
              Grace & Truth
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`text-sm font-medium transition-colors hover:text-indigo-600 ${currentPage === item.value ? 'text-indigo-600' : isScrolled ? 'text-slate-600' : 'text-slate-600 md:text-white'}`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => handleNavClick('membership')}
              className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/20"
            >
              I'm New
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-900">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden pt-24 px-6 flex flex-col gap-6">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNavClick(item.value)}
              className="text-2xl font-bold text-slate-800 border-b border-slate-100 pb-4 text-left flex justify-between items-center"
            >
              {item.label}
              <ChevronRight size={20} className="text-slate-400" />
            </button>
          ))}
          <button 
            onClick={() => handleNavClick('membership')}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl text-lg font-bold shadow-xl"
          >
            I'm New Here
          </button>
        </div>
      )}

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Church className="text-indigo-400" size={32} />
                <span className="text-2xl font-bold text-white uppercase tracking-wider">{CHURCH_NAME}</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                Join us as we pursue a deeper walk with Christ and share His love with our community and the world.
              </p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-indigo-400 transition-colors"><Facebook /></a>
                <a href="#" className="hover:text-indigo-400 transition-colors"><Instagram /></a>
                <a href="#" className="hover:text-indigo-400 transition-colors"><Youtube /></a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-6">Service Times</h4>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span>Sunday Morning</span>
                  <span className="text-indigo-400">9:00 AM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday Worship</span>
                  <span className="text-indigo-400">11:30 AM</span>
                </li>
                <li className="flex justify-between">
                  <span>Mid-week Bible Study</span>
                  <span className="text-indigo-400">Wed 7:00 PM</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <MapPin className="text-indigo-400 shrink-0" />
                  <span>123 Gospel Street, Divine Heights, TX 75001</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="text-indigo-400 shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex gap-3">
                  <Mail className="text-indigo-400 shrink-0" />
                  <span>hello@graceandtruth.org</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setPage('give')} className="hover:text-white transition-colors">Give Online</button></li>
                <li><button onClick={() => setPage('prayer')} className="hover:text-white transition-colors">Request Prayer</button></li>
                <li><button onClick={() => setPage('sermons')} className="hover:text-white transition-colors">Watch Live</button></li>
                <li><button onClick={() => setPage('membership')} className="hover:text-white transition-colors">Become a Member</button></li>
                <li className="pt-4 mt-4 border-t border-slate-800">
                   <button 
                    onClick={() => handleNavClick('admin')} 
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-400 transition-colors"
                  >
                    <Lock size={12} /> Admin Portal
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Grace & Truth Community Church. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
