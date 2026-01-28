
import React from 'react';
import { STAFF, CHURCH_NAME } from '../constants';
import { Target, Eye, ShieldCheck } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-24 animate-in fade-in duration-700">
      {/* Header */}
      <div className="bg-slate-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Story</h1>
        <p className="text-slate-400 max-w-2xl mx-auto italic">Learn about our history, values, and the heart behind {CHURCH_NAME}.</p>
      </div>

      {/* History */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1548625361-195fe576b550?auto=format&fit=crop&q=80&w=1000" 
                alt="Church History" 
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 bg-indigo-600 p-8 rounded-3xl text-white shadow-xl hidden md:block">
                <div className="text-4xl font-bold">25+</div>
                <div className="text-sm opacity-80 uppercase tracking-widest">Years of Ministry</div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-4xl font-bold text-slate-900">Established in Faith</h2>
            <p className="text-slate-600 leading-relaxed">
              Founded in 1998, {CHURCH_NAME} began with just three families meeting in a small living room. Our founders shared a vision for a church that would be a beacon of hope and truth in our city.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Over the decades, we have seen God's faithfulness in every season. From building our first sanctuary to launching global missions, our core commitment remains the same: to make disciples of all nations and reflect the love of Christ in everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white p-10 rounded-3xl shadow-sm text-center">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Eye size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-slate-500">To see our community transformed by the renewing power of the Gospel.</p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-sm text-center">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Target size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-slate-500">Loving God, Loving People, and Reaching the World through faith and action.</p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-sm text-center">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Core Values</h3>
            <p className="text-slate-500">Biblical Truth, Community Integrity, Radical Generosity, and Authentic Worship.</p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Pastoral Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {STAFF.map((member, idx) => (
              <div key={idx} className="group text-center">
                <div className="relative mb-6 inline-block">
                  <div className="absolute inset-0 bg-indigo-600 rounded-full scale-105 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-48 h-48 rounded-full object-cover shadow-xl border-4 border-white mx-auto"
                  />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{member.name}</h3>
                <div className="text-indigo-600 font-semibold mb-4 uppercase tracking-widest text-sm">{member.role}</div>
                <p className="text-slate-500 max-w-sm mx-auto">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
