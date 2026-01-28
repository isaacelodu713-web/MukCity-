
import React, { useState } from 'react';
import { Send, MessageCircle, X, Loader2 } from 'lucide-react';
import { getSpiritualEncouragement } from '../services/geminiService';

const SpiritualGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    const result = await getSpiritualEncouragement(input);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-80 md:w-96 flex flex-col border border-slate-100 overflow-hidden transform animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} />
              <span className="font-semibold">Spiritual Encouragement</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-indigo-500 rounded p-1">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4 h-64 overflow-y-auto bg-slate-50 flex flex-col gap-4">
            {!response && !loading && (
              <p className="text-slate-500 text-sm italic text-center mt-4">
                "Cast all your anxiety on him because he cares for you." - 1 Peter 5:7
                <br /><br />
                How can we encourage you today?
              </p>
            )}
            
            {loading && (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="animate-spin text-indigo-600" size={32} />
              </div>
            )}

            {response && !loading && (
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                {response}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-slate-100 bg-white">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="How are you feeling?"
                className="w-full pl-4 pr-12 py-3 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="absolute right-2 top-1.5 p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-full disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
            {response && (
              <button 
                type="button" 
                onClick={() => { setResponse(null); setInput(''); }}
                className="mt-2 text-xs text-indigo-600 font-medium hover:underline"
              >
                Start new conversation
              </button>
            )}
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:bg-indigo-700 hover:scale-110 transition-all group relative"
        >
          <MessageCircle size={28} />
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs py-1.5 px-3 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Need Encouragement?
          </span>
        </button>
      )}
    </div>
  );
};

export default SpiritualGuide;
