
import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="pt-24 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-5xl font-bold text-slate-900 mb-8">Get in Touch</h1>
            <p className="text-slate-500 text-xl leading-relaxed mb-12">
              Have questions about our services, ministries, or events? We'd love to hear from you. Our team is here to help and support you in any way we can.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="text-indigo-600"><MapPin /></div>
                  <div>
                    <h4 className="font-bold mb-1">Visit Us</h4>
                    <p className="text-slate-500 text-sm">123 Gospel Street, Divine Heights, TX 75001</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="text-indigo-600"><Phone /></div>
                  <div>
                    <h4 className="font-bold mb-1">Call Us</h4>
                    <p className="text-slate-500 text-sm">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="text-indigo-600"><Mail /></div>
                  <div>
                    <h4 className="font-bold mb-1">Email Us</h4>
                    <p className="text-slate-500 text-sm">hello@graceandtruth.org</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="text-indigo-600"><Clock /></div>
                  <div>
                    <h4 className="font-bold mb-1">Office Hours</h4>
                    <p className="text-slate-500 text-sm">Mon - Fri: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
                <div className="pt-4 flex gap-4">
                  <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-indigo-600 hover:text-white transition-all"><Facebook size={18} /></a>
                  <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-indigo-600 hover:text-white transition-all"><Instagram size={18} /></a>
                  <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-indigo-600 hover:text-white transition-all"><Youtube size={18} /></a>
                </div>
              </div>
            </div>

            {/* Mock Map */}
            <div className="rounded-[2rem] overflow-hidden h-80 bg-slate-200 relative group">
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center grayscale opacity-50 group-hover:grayscale-0 transition-all duration-700">
                <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl text-slate-900 flex flex-col items-center">
                  <MapPin className="text-indigo-600 mb-2" size={32} />
                  <span>Open in Google Maps</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 self-start">
            <h3 className="text-3xl font-bold mb-8">Send a Message</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Your Name</label>
                <input type="text" className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                <input type="email" className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Subject</label>
                <input type="text" className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Message</label>
                <textarea rows={6} className="w-full bg-slate-50 border-none p-4 rounded-2xl focus:ring-2 focus:ring-indigo-500"></textarea>
              </div>
              <button className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                Send Message <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
