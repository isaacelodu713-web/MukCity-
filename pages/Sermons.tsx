
import React, { useState } from 'react';
import { Sermon } from '../types';
import { Search, Play, Download, BookOpen, Video, Music, FileText } from 'lucide-react';

interface SermonsProps {
  sermons: Sermon[];
}

const Sermons: React.FC<SermonsProps> = ({ sermons }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Spiritual Growth', 'Faith', 'Theology', 'Family'];
  
  const filteredSermons = sermons.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.preacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getSermonIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video size={16} />;
      case 'audio': return <Music size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const getActionButton = (sermon: Sermon) => {
    switch (sermon.type) {
      case 'video':
        return (
          <button className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-indigo-600 hover:text-white transition-all">
            <Play size={14} fill="currentColor" /> Watch
          </button>
        );
      case 'audio':
        return (
          <button className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-indigo-600 hover:text-white transition-all">
            <Music size={14} /> Listen
          </button>
        );
      default:
        return (
          <button className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-indigo-600 hover:text-white transition-all">
            <BookOpen size={14} /> Read
          </button>
        );
    }
  };

  return (
    <div className="pt-24 animate-in fade-in duration-700">
      {/* Featured Header */}
      <section className="bg-slate-900 py-24 px-4 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-indigo-400 font-bold uppercase tracking-widest text-sm">Now Playing</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight">Watch our Sunday Worship Experience</h1>
            <p className="text-slate-400 text-lg mb-8">Join us live every Sunday at 9:00 AM & 11:30 AM CST. Can't make it? Explore our full archive of messages below.</p>
            <div className="flex gap-4">
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20">
                <Play size={20} fill="currentColor" /> Watch Latest
              </button>
              <button className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all">
                Sermon Notes
              </button>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white/5 aspect-video">
            <img src={sermons[0]?.thumbnail || 'https://picsum.photos/800/450'} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <Play size={32} className="text-white ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Library Archive */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <h2 className="text-3xl font-bold text-slate-900">Sermon Archive</h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search messages..." 
                  className="pl-12 pr-6 py-3 bg-slate-100 rounded-full w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                className="bg-slate-100 py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSermons.map((sermon) => (
              <div key={sermon.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="relative h-48 overflow-hidden">
                  <img src={sermon.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                    {getSermonIcon(sermon.type)}
                    {sermon.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-slate-400 font-medium mb-2 uppercase tracking-widest">{sermon.date}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">{sermon.title}</h3>
                  <p className="text-sm text-slate-500 mb-6 font-medium italic">by {sermon.preacher}</p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                    <div className="flex gap-4">
                      <button className="text-slate-400 hover:text-indigo-600 transition-colors" title="Download Resource">
                        <Download size={20} />
                      </button>
                      <button className="text-slate-400 hover:text-indigo-600 transition-colors" title="Read Notes">
                        <BookOpen size={20} />
                      </button>
                    </div>
                    {getActionButton(sermon)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredSermons.length === 0 && (
            <div className="text-center py-24 text-slate-500">
              No sermons found matching your criteria.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Sermons;
