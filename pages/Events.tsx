
import React from 'react';
import { ChurchEvent } from '../types';
import { Calendar, MapPin, Clock, ChevronRight } from 'lucide-react';

interface EventsProps {
  events: ChurchEvent[];
}

const Events: React.FC<EventsProps> = ({ events }) => {
  return (
    <div className="pt-24 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">Upcoming Events</h1>
            <p className="text-slate-500 max-w-xl">Stay connected with everything happening at Grace & Truth. From weekly gatherings to annual conferences.</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-full font-bold">List View</button>
            <button className="bg-slate-100 text-slate-600 px-6 py-3 rounded-full font-bold hover:bg-slate-200 transition-all">Calendar</button>
          </div>
        </div>

        <div className="space-y-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 flex flex-col lg:flex-row group">
              <div className="lg:w-1/3 relative overflow-hidden h-64 lg:h-auto">
                <img src={event.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-6 left-6 bg-white px-4 py-2 rounded-2xl shadow-lg text-center">
                  <div className="text-indigo-600 font-bold text-xl leading-none">
                    {event.date.split(' ').length > 1 ? event.date.split(' ')[1].replace(',', '') : '15'}
                  </div>
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                    {event.date.split(' ')[0]}
                  </div>
                </div>
              </div>
              <div className="lg:w-2/3 p-10 flex flex-col justify-center">
                <div className="text-indigo-600 font-bold text-sm uppercase tracking-widest mb-4">
                  {event.category}
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">{event.title}</h3>
                <p className="text-slate-500 text-lg mb-8 leading-relaxed">{event.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-slate-600">
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-indigo-600" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={20} className="text-indigo-600" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-700 transition-all flex items-center gap-2">
                    Register Now <ChevronRight size={20} />
                  </button>
                  <button className="bg-slate-50 text-slate-900 border border-slate-200 px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-all">
                    Add to Calendar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community Section */}
        <section className="mt-24 bg-slate-900 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600/20 blur-[100px]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Host Your Event</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-12 text-lg">Our fellowship hall and sanctuary are available for weddings, ceremonies, and community meetings. Contact our facilities team to learn more.</p>
            <button className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold hover:bg-indigo-400 hover:text-white transition-all">
              Facility Rental Info
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Events;
