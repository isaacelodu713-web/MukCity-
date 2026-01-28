
import React, { useState } from 'react';
import { Devotion } from '../types';
import { Search, Calendar, User, Quote } from 'lucide-react';

interface DevotionsProps {
  devotions: Devotion[];
}

const Devotions: React.FC<DevotionsProps> = ({ devotions }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDevotions = devotions.filter(d => 
    d.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.scripture.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-24 animate-in fade-in duration-700">
      <section className="bg-indigo-600 py-24 px-4 text-white text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">Daily Devotions</h1>
        <p className="text-indigo-100 max-w-2xl mx-auto text-xl font-light">
          Nourishing your spirit with God's word, one day at a time.
        </p>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-16">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search devotions..." 
                className="w-full pl-12 pr-6 py-4 bg-white rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 border-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-16">
            {filteredDevotions.map((devotion) => (
              <div key={devotion.id} className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col md:flex-row group hover:shadow-2xl transition-all duration-500">
                <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                  <img src={devotion.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={devotion.title} />
                  <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="md:w-3/5 p-10 md:p-16 flex flex-col justify-center">
                  <div className="flex items-center gap-6 text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
                    <span className="flex items-center gap-2"><Calendar size={14} /> {devotion.date}</span>
                    <span className="flex items-center gap-2"><User size={14} /> {devotion.author}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{devotion.title}</h2>
                  <div className="flex items-start gap-3 mb-8">
                    <Quote className="text-indigo-600 shrink-0" size={24} />
                    <span className="text-indigo-600 font-bold italic text-lg">{devotion.scripture}</span>
                  </div>
                  <div className="text-slate-600 leading-relaxed text-lg mb-8 whitespace-pre-wrap">
                    {devotion.content}
                  </div>
                  <div className="pt-8 border-t border-slate-50 flex gap-4">
                    <button className="text-indigo-600 font-bold hover:underline">Share this word</button>
                    <button className="text-indigo-600 font-bold hover:underline">Add to favorites</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDevotions.length === 0 && (
            <div className="text-center py-24">
              <p className="text-slate-500 text-xl">No devotions found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Devotions;
