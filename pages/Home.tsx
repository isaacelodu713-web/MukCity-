
import React from 'react';
import { Play, Calendar, Heart, MessageSquare, ChevronRight, Clock, MapPin, Book } from 'lucide-react';
import { Page, Sermon, Devotion } from '../types';
import { CHURCH_NAME, SLOGAN, MINISTRIES } from '../constants';

interface HomeProps {
  setPage: (page: Page) => void;
  sermons: Sermon[];
  devotions: Devotion[];
}

const Home: React.FC<HomeProps> = ({ setPage, sermons, devotions }) => {
  const latestSermon = sermons[0] || null;
  const latestDevotion = devotions[0] || null;

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=2000" 
            alt="Church Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-indigo-400 font-bold uppercase tracking-[0.3em] mb-4 animate-in slide-in-from-bottom-4">Welcome to</h2>
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 leading-tight">
            Grace & Truth
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 font-light max-w-2xl mx-auto italic">
            "{SLOGAN}"
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setPage('membership')}
              className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-indigo-700 transition-all shadow-xl hover:shadow-indigo-500/30 flex items-center justify-center gap-2"
            >
              Join Us This Sunday
              <ChevronRight size={20} />
            </button>
            <button 
              onClick={() => setPage('sermons')}
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              Watch Live
              <Play size={20} className="fill-current" />
            </button>
          </div>
        </div>

        {/* Floating Quick Stats */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-2xl text-center">
            <Clock className="mx-auto text-indigo-400 mb-2" size={24} />
            <div className="text-white font-bold">9:00 AM & 11:30 AM</div>
            <div className="text-slate-400 text-xs">Sunday Services</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-2xl text-center">
            <MapPin className="mx-auto text-indigo-400 mb-2" size={24} />
            <div className="text-white font-bold text-sm md:text-base">123 Gospel St.</div>
            <div className="text-slate-400 text-xs">Our Location</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-2xl text-center">
            <Heart className="mx-auto text-indigo-400 mb-2" size={24} />
            <div className="text-white font-bold">Community</div>
            <div className="text-slate-400 text-xs">Loving Others</div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-2xl text-center">
            <MessageSquare className="mx-auto text-indigo-400 mb-2" size={24} />
            <div className="text-white font-bold">Discipleship</div>
            <div className="text-slate-400 text-xs">Growing Together</div>
          </div>
        </div>
      </section>

      {/* Word for Today / Devotion Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
           <div className="lg:w-1/2">
              <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-4 block">Daily Refreshment</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">A Word for Today</h2>
              {latestDevotion && (
                <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 relative group">
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl transform rotate-12 group-hover:rotate-0 transition-transform">
                    <Book size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-indigo-600 mb-2">"{latestDevotion.title}"</h3>
                  <div className="text-slate-400 text-sm font-bold uppercase mb-6">{latestDevotion.scripture}</div>
                  <p className="text-slate-600 leading-relaxed text-lg italic mb-8 line-clamp-4">
                    {latestDevotion.content}
                  </p>
                  <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                    <div className="text-sm">
                      <div className="font-bold text-slate-900">{latestDevotion.author}</div>
                      <div className="text-slate-400">{latestDevotion.date}</div>
                    </div>
                    <button onClick={() => setPage('devotions')} className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                      Read Full Devotion <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              )}
           </div>
           <div className="lg:w-1/2 relative">
             <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl relative">
                <img src={latestDevotion?.image || "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=1000"} className="w-full h-full object-cover" alt="Devotion" />
                <div className="absolute inset-0 bg-indigo-900/20"></div>
             </div>
             {/* Decorative Elements */}
             <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/80 backdrop-blur-md rounded-[3rem] border border-white shadow-xl p-8 flex items-center justify-center text-center">
                <p className="text-slate-800 font-medium text-sm italic">"Thy word is a lamp unto my feet..."</p>
             </div>
           </div>
        </div>
      </section>

      {/* Featured Sermon Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h3 className="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-2">Message of the Week</h3>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Latest Sermon</h2>
            </div>
            <button 
              onClick={() => setPage('sermons')}
              className="text-indigo-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              Browse All Sermons <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {latestSermon && (
              <div className="lg:col-span-2 group cursor-pointer relative overflow-hidden rounded-3xl bg-slate-900 shadow-2xl min-h-[400px]">
                <img 
                  src={latestSermon.thumbnail} 
                  alt={latestSermon.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
                  <div className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">NEWEST</div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{latestSermon.title}</h3>
                  <p className="text-slate-300 mb-6 text-lg line-clamp-2">{latestSermon.notes}</p>
                  <div className="flex items-center gap-4">
                    <button className="bg-white text-slate-900 p-4 rounded-full hover:bg-indigo-400 hover:text-white transition-colors">
                      <Play fill="currentColor" size={24} />
                    </button>
                    <div className="text-white">
                      <div className="font-semibold">{latestSermon.preacher}</div>
                      <div className="text-sm opacity-60">{latestSermon.date}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-6">
              {sermons.slice(1, 4).map((sermon) => (
                <div key={sermon.id} className="flex gap-4 group cursor-pointer p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                  <div className="shrink-0 w-32 h-20 rounded-xl overflow-hidden shadow-lg">
                    <img src={sermon.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{sermon.title}</h4>
                    <p className="text-sm text-slate-500">{sermon.preacher}</p>
                    <p className="text-xs text-slate-400 mt-1">{sermon.date}</p>
                  </div>
                </div>
              ))}
              <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 mt-4">
                <h4 className="font-bold text-indigo-900 mb-2">Subscribe to Podcast</h4>
                <p className="text-sm text-indigo-700/70 mb-4">Never miss a message. Available on Apple Podcasts & Spotify.</p>
                <button className="text-indigo-600 text-sm font-bold flex items-center gap-1">Get Links <ChevronRight size={16}/></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h3 className="text-indigo-600 font-bold uppercase tracking-widest text-sm mb-2">Our Departments</h3>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Ministries for Everyone</h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto">Discover a place where you can grow, serve, and connect with others who share your passions and stage of life.</p>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MINISTRIES.map((m, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 border border-slate-100 group">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                {m.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{m.name}</h4>
              <p className="text-slate-500 leading-relaxed mb-6">{m.description}</p>
              <button 
                onClick={() => setPage('ministries')}
                className="text-indigo-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                Learn More <ChevronRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-indigo-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-700 rounded-full blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to take the next step?</h2>
          <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">Whether you're looking for a new church home, have a prayer request, or want to join a ministry, we're here for you.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => setPage('membership')}
              className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold shadow-xl hover:bg-slate-100 transition-all flex items-center gap-2"
            >
              Get Started <ChevronRight size={20} />
            </button>
            <button 
              onClick={() => setPage('contact')}
              className="px-8 py-4 border-2 border-white/40 text-white rounded-full font-bold hover:bg-white/10 transition-all"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
