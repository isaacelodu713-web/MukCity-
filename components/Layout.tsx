
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Church, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Lock, Shield } from 'lucide-react';
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
    { label: 'Prayer', value: 'prayer' },
  ];

  const handleNavClick = (page: Page) => {
    setPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const Logo = ({ light = false }: { light?: boolean }) => (
    <button onClick={() => handleNavClick('home')} className="flex items-center gap-3 group">
      <div className="relative">
        <div className={`bg-gradient-to-br from-indigo-600 to-indigo-800 p-2.5 rounded-xl text-white shadow-xl group-hover:scale-110 transition-all duration-500 flex items-center justify-center`}>
          <Shield size={24} className="relative z-10" />
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black tracking-tighter opacity-20">SVM</span>
        </div>
      </div>
      <div className="flex flex-col items-start leading-none">
        <span className={`text-lg font-black tracking-tighter uppercase ${light ? 'text-white' : isScrolled ? 'text-slate-900' : 'text-slate-900 md:text-white md:mix-blend-difference'}`}>
          Suubira Victory
        </span>
        <span className={`text-[10px] font-bold tracking-[0.3em] uppercase opacity-70 ${light ? 'text-indigo-200' : isScrolled ? 'text-indigo-600' : 'text-indigo-600 md:text-indigo-300 md:mix-blend-difference'}`}>
          Ministries
        </span>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`text-sm font-semibold transition-all hover:text-indigo-600 relative group ${currentPage === item.value ? 'text-indigo-600' : isScrolled ? 'text-slate-600' : 'text-slate-600 md:text-white'}`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full ${currentPage === item.value ? 'w-full' : ''}`}></span>
              </button>
            ))}
            <button 
              onClick={() => handleNavClick('membership')}
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-wider hover:bg-indigo-700 transition-all shadow-xl hover:shadow-indigo-500/40 active:scale-95"
            >
              I'm New
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`md:hidden p-2 transition-colors ${isScrolled ? 'text-slate-900' : 'text-slate-900 md:text-white'}`}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden pt-24 px-6 flex flex-col gap-6 animate-in fade-in slide-in-from-right duration-300">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNavClick(item.value)}
              className="text-2xl font-black text-slate-800 border-b border-slate-100 pb-4 text-left flex justify-between items-center group"
            >
              <span className="group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{item.label}</span>
              <ChevronRight size={24} className="text-slate-300 group-hover:text-indigo-600 transition-all group-hover:translate-x-1" />
            </button>
          ))}
          <button 
            onClick={() => handleNavClick('membership')}
            className="w-full bg-indigo-600 text-white py-5 rounded-2xl text-lg font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-transform"
          >
            I'm New Here
          </button>
        </div>
      )}

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <Logo light />
              <p className="text-slate-500 leading-relaxed text-sm">
                A Home for Faith, Hope, and Love. Join us as we pursue a deeper walk with Christ and share His love with our community and the world.
              </p>
              <div className="flex gap-4">
                {[Facebook, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 transition-all duration-300">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
                <span className="w-6 h-px bg-indigo-600"></span> Service Times
              </h4>
              <ul className="space-y-4 text-sm font-medium">
                <li className="flex justify-between items-center group">
                  <span className="text-slate-500 group-hover:text-slate-300 transition-colors">Sunday Morning</span>
                  <span className="text-white bg-white/5 px-2 py-1 rounded">9:00 AM</span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="text-slate-500 group-hover:text-slate-300 transition-colors">Sunday Worship</span>
                  <span className="text-white bg-white/5 px-2 py-1 rounded">11:30 AM</span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="text-slate-500 group-hover:text-slate-300 transition-colors">Mid-week Bible Study</span>
                  <span className="text-white bg-white/5 px-2 py-1 rounded">Wed 7:00 PM</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
                <span className="w-6 h-px bg-indigo-600"></span> Contact Us
              </h4>
              <ul className="space-y-6 text-sm">
                <li className="flex gap-4 group">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/10 flex items-center justify-center text-indigo-400 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <MapPin size={16} />
                  </div>
                  <span className="text-slate-500 leading-tight group-hover:text-slate-300 transition-colors">
                    Uganda, central, mukono, goma division, nantabulirwa ward in nantabulirwa, P.O BOX MUKONO 153665
                  </span>
                </li>
                <li className="flex gap-4 group items-center">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/10 flex items-center justify-center text-indigo-400 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Phone size={16} />
                  </div>
                  <span className="text-slate-500 group-hover:text-slate-300 transition-colors">+17745780064</span>
                </li>
                <li className="flex gap-4 group items-center">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/10 flex items-center justify-center text-indigo-400 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Mail size={16} />
                  </div>
                  <span className="text-slate-500 group-hover:text-slate-300 transition-colors text-xs truncate">info.suubiravictoryministries@gmail.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
                <span className="w-6 h-px bg-indigo-600"></span> Navigation
              </h4>
              <ul className="space-y-3 text-sm font-semibold">
                <li><button onClick={() => setPage('prayer')} className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="text-indigo-600 group-hover:translate-x-1 transition-transform" /> Request Prayer</button></li>
                <li><button onClick={() => setPage('sermons')} className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="text-indigo-600 group-hover:translate-x-1 transition-transform" /> Watch Live</button></li>
                <li><button onClick={() => setPage('membership')} className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="text-indigo-600 group-hover:translate-x-1 transition-transform" /> Join the Family</button></li>
                <li className="pt-6 mt-6 border-t border-white/5">
                   <button 
                    onClick={() => handleNavClick('admin')} 
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 hover:text-indigo-400 transition-colors"
                  >
                    <Lock size={12} /> Staff Portal
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-700">
              &copy; {new Date().getFullYear()} Suubira Victory Ministries. Built for Impact.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
