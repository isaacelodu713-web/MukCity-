
import React, { useState } from 'react';
import { Sermon } from '../types';
import { Search, Play, Download, BookOpen, Video, Music, FileText, X, Maximize2, Volume2, Share2 } from 'lucide-react';

interface SermonsProps {
  sermons: Sermon[];
}

const Sermons: React.FC<SermonsProps> = ({ sermons }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);

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

  const handlePlaySermon = (sermon: Sermon) => {
    setSelectedSermon(sermon);
  };

  const renderPlayer = () => {
    if (!selectedSermon) return null;

    const isYoutube = selectedSermon.videoUrl?.includes('youtube.com') || selectedSermon.videoUrl?.includes('youtu.be');
    
    let videoEmbedUrl = '';
    if (isYoutube && selectedSermon.videoUrl) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = selectedSermon.videoUrl.match(regExp);
      if (match && match[2].length === 11) {
        videoEmbedUrl = `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
      }
    }

    return (
      <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
        <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col relative">
          <button 
            onClick={() => setSelectedSermon(null)}
            className="absolute top-6 right-6 z-20 bg-slate-900/10 hover:bg-slate-900/20 p-2 rounded-full transition-colors text-slate-900"
          >
            <X size={24} />
          </button>

          <div className="flex-grow overflow-y-auto">
            {selectedSermon.type === 'video' && (
              <div className="aspect-video bg-black w-full relative">
                {isYoutube ? (
                  <iframe 
                    src={videoEmbedUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video 
                    controls 
                    autoPlay 
                    className="w-full h-full"
                    src={selectedSermon.videoUrl}
                  ></video>
                )}
              </div>
            )}

            {selectedSermon.type === 'audio' && (
              <div className="p-12 bg-indigo-600 text-white flex flex-col items-center justify-center text-center">
                <div className="w-32 h-32 bg-white/20 rounded-[2.5rem] flex items-center justify-center mb-8 animate-pulse">
                  <Music size={64} />
                </div>
                <h2 className="text-3xl font-bold mb-2 font-serif">{selectedSermon.title}</h2>
                <p className="text-indigo-100 mb-8">by {selectedSermon.preacher}</p>
                <div className="w-full max-w-md bg-white/10 p-6 rounded-3xl backdrop-blur-md border border-white/20">
                  <audio 
                    controls 
                    autoPlay 
                    className="w-full accent-indigo-500"
                    src={selectedSermon.audioUrl}
                  ></audio>
                </div>
              </div>
            )}

            <div className="p-8 md:p-12">
              {selectedSermon.type === 'text' && (
                <div className="mb-10">
                  <h2 className="text-4xl font-bold text-slate-900 mb-4 font-serif">{selectedSermon.title}</h2>
                  <div className="flex items-center gap-4 text-slate-400 font-bold text-xs uppercase tracking-widest mb-8">
                    <span>{selectedSermon.date}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span>{selectedSermon.preacher}</span>
                  </div>
                </div>
              )}
              
              <div className="prose prose-slate max-w-none">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <BookOpen size={20} className="text-indigo-600" /> Message Notes
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
                  {selectedSermon.notes || "No additional notes provided for this message."}
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-600 rounded-2xl font-bold hover:bg-indigo-100 transition-colors">
                  <Download size={18} /> Download Resource
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-colors">
                  <Share2 size={18} /> Share Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-24 animate-in fade-in duration-700">
      {renderPlayer()}
      
      {/* Featured Header */}
      <section className="bg-slate-900 py-24 px-4 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-indigo-400 font-bold uppercase tracking-widest text-sm">Now Playing</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight">Watch our Sunday Worship Experience</h1>
            <p className="text-slate-400 text-lg mb-8">Join us live every Sunday at 9:00 AM & 11:30 AM CST. Can't make it? Explore our full archive of messages below.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => sermons[0] && handlePlaySermon(sermons[0])}
                className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20"
              >
                <Play size={20} fill="currentColor" /> Watch Latest
              </button>
              <button 
                onClick={() => sermons[0] && handlePlaySermon(sermons[0])}
                className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all"
              >
                Sermon Notes
              </button>
            </div>
          </div>
          <div 
            onClick={() => sermons[0] && handlePlaySermon(sermons[0])}
            className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white/5 aspect-video cursor-pointer group"
          >
            <img src={sermons[0]?.thumbnail || 'https://picsum.photos/800/450'} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl shadow-indigo-600/50">
                <Play size={32} className="text-white ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <h4 className="text-white font-bold text-xl drop-shadow-md">{sermons[0]?.title}</h4>
              <p className="text-white/70 text-sm">{sermons[0]?.preacher}</p>
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
                className="bg-slate-100 py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-600"
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
                <div 
                  className="relative h-48 overflow-hidden cursor-pointer"
                  onClick={() => handlePlaySermon(sermon)}
                >
                  <img src={sermon.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                    {getSermonIcon(sermon.type)}
                    {sermon.category}
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600">
                      <Play size={24} fill="currentColor" />
                    </div>
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
                      <button onClick={() => handlePlaySermon(sermon)} className="text-slate-400 hover:text-indigo-600 transition-colors" title="Read Notes">
                        <BookOpen size={20} />
                      </button>
                    </div>
                    <button 
                      onClick={() => handlePlaySermon(sermon)}
                      className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-indigo-600 hover:text-white transition-all capitalize"
                    >
                      {sermon.type === 'video' ? <><Play size={14} fill="currentColor" /> Watch</> : 
                       sermon.type === 'audio' ? <><Music size={14} /> Listen</> : 
                       <><BookOpen size={14} /> Read</>}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredSermons.length === 0 && (
            <div className="text-center py-24 text-slate-500 italic">
              No sermons found matching your criteria.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Sermons;
