
import React from 'react';
import { Users, UserPlus, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';

const Membership: React.FC = () => {
  return (
    <div className="pt-24 animate-in fade-in duration-700">
      {/* Welcome Section */}
      <section className="bg-indigo-600 py-24 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Welcome Home</h1>
        <p className="text-indigo-100 text-xl max-w-2xl mx-auto font-light">Whether you're just visiting or looking for a place to grow, we're glad you're here.</p>
      </section>

      {/* Steps to Join */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">The Journey to Membership</h2>
            <p className="text-slate-500">Three simple steps to becoming a part of the Grace & Truth family.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: <UserPlus />, 
                title: "1. Attend a Service", 
                desc: "Join us on a Sunday morning and visit our Welcome Center after service to meet the team." 
              },
              { 
                icon: <BookOpen />, 
                title: "2. Foundations Class", 
                desc: "A 4-week class where we share our core beliefs, vision, and how you can get involved." 
              },
              { 
                icon: <GraduationCap />, 
                title: "3. Commit & Serve", 
                desc: "Officially join the family and find a place to use your gifts in one of our ministries." 
              }
            ].map((step, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold mb-2">Connect With Us</h3>
              <p className="text-slate-500">Fill out this form and a member of our welcome team will reach out.</p>
            </div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                  <input type="text" className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Phone Number</label>
                  <input type="tel" className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                <input type="email" className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Interest Areas</label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {['Worship Team', 'Children', 'Youth', 'Media', 'Welcoming', 'Outreach'].map(area => (
                    <label key={area} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded text-indigo-600" />
                      <span className="text-sm text-slate-600">{area}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                Send Information <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;
