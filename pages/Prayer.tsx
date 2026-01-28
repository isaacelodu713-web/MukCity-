
import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, Phone, Lock } from 'lucide-react';

const Prayer: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-48 pb-24 text-center animate-in zoom-in duration-500">
        <div className="max-w-md mx-auto bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-50">
          <CheckCircle2 className="mx-auto text-green-500 mb-6" size={64} />
          <h2 className="text-3xl font-bold mb-4">Request Received</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">Thank you for sharing your heart. Our prayer team and pastors will be interceding for you this week. God bless you.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-indigo-600 font-bold hover:underline"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col lg:flex-row gap-20">
        <div className="lg:w-1/2">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8">How can we pray for you?</h1>
          <p className="text-slate-500 text-xl leading-relaxed mb-12">
            "For where two or three are gathered together in my name, there am I in the midst of them." — Matthew 18:20
            <br /><br />
            Our community believes in the power of prayer. Whether you are facing a trial, celebrating a victory, or simply need spiritual support, we are here to stand with you.
          </p>

          <div className="space-y-8">
            <div className="flex gap-6 items-center">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                <Lock />
              </div>
              <div>
                <h4 className="font-bold text-lg">Confidentiality Assured</h4>
                <p className="text-slate-500">Your requests are shared only with our leadership and prayer team.</p>
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                <MessageSquare />
              </div>
              <div>
                <h4 className="font-bold text-lg">Pastoral Counseling</h4>
                <p className="text-slate-500">Need to talk? Our pastors are available for scheduled counseling sessions.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">First Name</label>
                  <input type="text" className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Last Name</label>
                  <input type="text" className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                <input type="email" className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Prayer Type</label>
                <select className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-medium">
                  <option>Healing</option>
                  <option>Financial Breakthrough</option>
                  <option>Family & Marriage</option>
                  <option>Guidance/Wisdom</option>
                  <option>Salvation</option>
                  <option>Praise Report</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Your Request</label>
                <textarea rows={5} className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500" required placeholder="Tell us what's on your heart..."></textarea>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4" id="urgent" />
                <label htmlFor="urgent" className="text-sm text-slate-500">This is an urgent request requiring immediate pastoral call.</label>
              </div>
              <button className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                Submit Request <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prayer;
