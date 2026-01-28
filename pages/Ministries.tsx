
import React from 'react';
import { MINISTRIES } from '../constants';
import { ChevronRight } from 'lucide-react';

const Ministries: React.FC = () => {
  return (
    <div className="pt-24 animate-in fade-in duration-700">
      <div className="bg-indigo-600 text-white py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 relative z-10">Our Ministries</h1>
        <p className="text-indigo-100 max-w-2xl mx-auto text-xl font-light relative z-10">There is a place for you to belong, grow, and serve at Grace & Truth.</p>
      </div>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {MINISTRIES.map((m, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 flex flex-col md:flex-row gap-8 shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
              <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                {m.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{m.name}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {m.description} Join us as we explore what it means to live for Christ in our specific life stages. Our {m.name} is dedicated to building community and providing spiritual nourishment.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold text-slate-500">Weekly Meetings</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold text-slate-500">Events</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold text-slate-500">Mentorship</span>
                </div>
                <button className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  Join Ministry <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Outreaches */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16">Global Missions & Local Outreach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative rounded-3xl overflow-hidden h-80 group">
              <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent flex flex-col justify-end p-8 text-left">
                <h4 className="text-2xl font-bold text-white mb-2">City Hope Project</h4>
                <p className="text-slate-300">Providing meals and support to our local community every Saturday morning.</p>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden h-80 group">
              <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent flex flex-col justify-end p-8 text-left">
                <h4 className="text-2xl font-bold text-white mb-2">Global Impact Missions</h4>
                <p className="text-slate-300">Supporting missionaries across 15 countries and 3 continents.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ministries;
