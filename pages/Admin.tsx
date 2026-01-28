
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar as CalendarIcon, 
  Users, 
  Plus, 
  Trash2, 
  MessageSquare,
  LogOut,
  X,
  Book,
  Check,
  Video,
  Music,
  FileText,
  ImageIcon,
  FileVideo,
  FileAudio,
  FileImage,
  Globe,
  Loader2,
  ExternalLink,
  ShieldCheck,
  CloudUpload,
  Link as LinkIcon
} from 'lucide-react';
import { Sermon, ChurchEvent, PrayerRequest, NewMember, Devotion, ChurchSettings } from '../types';

interface AdminProps {
  sermons: Sermon[];
  setSermons: React.Dispatch<React.SetStateAction<Sermon[]>>;
  events: ChurchEvent[];
  setEvents: React.Dispatch<React.SetStateAction<ChurchEvent[]>>;
  devotions: Devotion[];
  setDevotions: React.Dispatch<React.SetStateAction<Devotion[]>>;
  prayerRequests: PrayerRequest[];
  setPrayerRequests: React.Dispatch<React.SetStateAction<PrayerRequest[]>>;
  members: NewMember[];
  setMembers: React.Dispatch<React.SetStateAction<NewMember[]>>;
  settings: ChurchSettings;
  setSettings: React.Dispatch<React.SetStateAction<ChurchSettings>>;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
}

const Admin: React.FC<AdminProps> = ({ 
  sermons, setSermons, 
  events, setEvents, 
  devotions, setDevotions,
  isLoggedIn, setIsLoggedIn
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'sermons' | 'events' | 'devotions'>('dashboard');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [publishProgress, setPublishProgress] = useState(0);

  // --- FORM STATES ---
  const [newSermon, setNewSermon] = useState<Partial<Sermon>>({ type: 'video', category: 'Faith' });
  const [newEvent, setNewEvent] = useState<Partial<ChurchEvent>>({ category: 'Service' });
  const [newDevotion, setNewDevotion] = useState<Partial<Devotion>>({});

  // Helper to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: string, stateSetter: any, currentState: any) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        stateSetter({ ...currentState, [field]: base64 });
      } catch (err) {
        console.error("File upload failed", err);
      }
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'church123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid Password. Hint: church123');
    }
  };

  const handleGlobalPublish = () => {
    setIsPublishing(true);
    setPublishProgress(0);
    
    // Simulate multi-step publishing process
    const interval = setInterval(() => {
      setPublishProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPublishing(false);
          setPublishSuccess(true);
          setTimeout(() => setPublishSuccess(false), 5000);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  // --- CRUD HELPERS ---
  const addSermon = (e: React.FormEvent) => {
    e.preventDefault();
    const sermon: Sermon = {
      id: Date.now().toString(),
      title: newSermon.title || 'Untitled Sermon',
      preacher: newSermon.preacher || 'Guest Preacher',
      date: newSermon.date || new Date().toISOString().split('T')[0],
      thumbnail: newSermon.thumbnail || 'https://picsum.photos/seed/sermon/800/450',
      category: newSermon.category || 'General',
      type: (newSermon.type as 'video' | 'audio' | 'text') || 'video',
      videoUrl: newSermon.videoUrl,
      audioUrl: newSermon.audioUrl,
      notes: newSermon.notes || '',
    };
    setSermons([sermon, ...sermons]);
    setIsModalOpen(false);
    setNewSermon({ type: 'video', category: 'Faith' });
  };

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const event: ChurchEvent = {
      id: Date.now().toString(),
      title: newEvent.title || 'Untitled Event',
      date: newEvent.date || 'To be announced',
      time: newEvent.time || '10:00 AM',
      location: newEvent.location || 'Church Main Hall',
      description: newEvent.description || '',
      image: newEvent.image || 'https://picsum.photos/seed/event/800/450',
      category: (newEvent.category as any) || 'Service',
    };
    setEvents([event, ...events]);
    setIsModalOpen(false);
    setNewEvent({ category: 'Service' });
  };

  const addDevotion = (e: React.FormEvent) => {
    e.preventDefault();
    const devotion: Devotion = {
      id: Date.now().toString(),
      title: newDevotion.title || 'Untitled Devotion',
      scripture: newDevotion.scripture || 'Genesis 1:1',
      content: newDevotion.content || '',
      author: newDevotion.author || 'Pastor',
      date: newDevotion.date || new Date().toLocaleDateString(),
      image: newDevotion.image || 'https://picsum.photos/seed/devotion/800/450',
    };
    setDevotions([devotion, ...devotions]);
    setIsModalOpen(false);
    setNewDevotion({});
  };

  const deleteItem = (type: 'sermon' | 'event' | 'devotion', id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    if (type === 'sermon') setSermons(sermons.filter(s => s.id !== id));
    if (type === 'event') setEvents(events.filter(e => e.id !== id));
    if (type === 'devotion') setDevotions(devotions.filter(d => d.id !== id));
  };

  const SidebarItem = ({ id, label, icon: Icon }: any) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
        activeTab === id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100'
      }`}
    >
      <Icon size={20} />
      <span className="font-semibold">{label}</span>
    </button>
  );

  const FileUploadField = ({ label, accept, onFileSelect, preview, icon: Icon, description }: any) => (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">{label}</label>
      <div className="relative group">
        <input 
          type="file" 
          accept={accept} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={onFileSelect}
        />
        <div className={`w-full ${preview ? 'h-40' : 'h-28'} bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 group-hover:border-indigo-400 transition-colors overflow-hidden relative`}>
          {preview ? (
            <div className="w-full h-full relative">
              {preview.startsWith('data:image') || preview.startsWith('http') ? (
                <img src={preview} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-indigo-50 text-indigo-600 font-bold p-4">
                  <Icon size={32} className="mb-2" />
                  <span className="text-xs">File Attached</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity">
                Change File
              </div>
            </div>
          ) : (
            <>
              <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                <Icon size={24} className="text-indigo-600" />
              </div>
              <div className="text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Click to upload {label.toLowerCase()}</span>
                {description && <p className="text-[9px] text-slate-300 mt-1">{description}</p>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 text-center animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl">
             <LayoutDashboard size={40} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 font-serif">Staff Access</h1>
          <p className="text-slate-500 mb-8">Please authenticate to manage the portal.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Admin Password" 
              className="w-full bg-slate-100 border-none p-4 rounded-2xl focus:ring-2 focus:ring-indigo-600 text-center font-mono tracking-widest"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Hint: church123</p>
            <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row pt-24 lg:pt-0">
      <aside className="w-full lg:w-72 bg-white border-r border-slate-200 p-6 flex flex-col gap-2 z-10">
        <div className="mb-10 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <LayoutDashboard size={18} />
            </div>
            <span className="font-bold text-slate-800">Admin Portal</span>
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="text-slate-400 hover:text-rose-500 transition-colors" title="Logout">
            <LogOut size={18} />
          </button>
        </div>
        
        <SidebarItem id="dashboard" label="Dashboard" icon={LayoutDashboard} />
        <SidebarItem id="sermons" label="Sermons" icon={BookOpen} />
        <SidebarItem id="events" label="Events" icon={CalendarIcon} />
        <SidebarItem id="devotions" label="Devotions" icon={Book} />
        
        <div className="mt-auto p-4 bg-indigo-50 rounded-2xl">
          <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-1">
            <ShieldCheck size={12} /> System Status
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">Local Cache</span>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full">ACTIVE</span>
          </div>
        </div>
      </aside>

      <main className="flex-grow p-4 md:p-10 lg:p-12 pb-24 overflow-y-auto">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 capitalize font-serif">{activeTab}</h2>
            <p className="text-slate-500">Coordinate and publish content for the church family.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={handleGlobalPublish}
              disabled={isPublishing}
              className={`px-6 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 transition-all shadow-xl active:scale-95 ${
                publishSuccess 
                  ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                  : 'bg-slate-900 text-white shadow-slate-900/20 hover:bg-indigo-600'
              }`}
            >
              {isPublishing ? (
                <Loader2 className="animate-spin" size={18} />
              ) : publishSuccess ? (
                <Check size={18} />
              ) : (
                <Globe size={18} />
              )}
              {isPublishing ? 'Pushing Updates...' : publishSuccess ? 'Changes Published!' : 'Publish to Live Site'}
            </button>

            {activeTab !== 'dashboard' && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 text-white px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
              >
                <Plus size={18} /> New {activeTab.slice(0, -1)}
              </button>
            )}
          </div>
        </header>

        {/* --- DASHBOARD VIEW --- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Prayer Requests', value: '12', icon: MessageSquare, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { label: 'Upcoming Events', value: events.length.toString(), icon: CalendarIcon, color: 'text-amber-600', bg: 'bg-amber-50' },
                { label: 'Sermon Archive', value: sermons.length.toString(), icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                  <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} w-fit mb-4`}>
                    <stat.icon size={24} />
                  </div>
                  <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-400 font-bold uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold font-serif flex items-center gap-2">
                  <CloudUpload className="text-indigo-600" /> Recent Activity Log
                </h3>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Real-time Sync</span>
              </div>
              <div className="space-y-6">
                {[
                  { text: 'Sermon "Walking in Purpose" was updated', time: '2 mins ago', icon: BookOpen },
                  { text: 'New Event "Youth Night" created by Admin', time: '1 hour ago', icon: CalendarIcon },
                  { text: 'Daily Devotion published for June 12th', time: '4 hours ago', icon: Book },
                ].map((log, i) => (
                  <div key={i} className="flex items-center gap-4 py-2 border-b border-slate-50 last:border-0">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                      <log.icon size={18} />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-semibold text-slate-700">{log.text}</p>
                      <p className="text-[10px] text-slate-400">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- LIST VIEWS --- */}
        {(activeTab === 'sermons' || activeTab === 'events' || activeTab === 'devotions') && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {(activeTab === 'sermons' ? sermons : activeTab === 'events' ? events : devotions).map((item: any) => (
              <div key={item.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex gap-4 group hover:border-indigo-200 transition-colors">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                  <img src={item.thumbnail || item.image} className="w-full h-full object-cover" alt={item.title} />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-slate-900 truncate pr-2">{item.title}</h4>
                    <span className="text-[8px] font-black bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded uppercase shrink-0">Live</span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{item.date || item.author}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-[8px] font-black text-slate-500 uppercase">{item.type || item.category || 'General'}</span>
                  </div>
                </div>
                <button 
                  onClick={() => deleteItem(activeTab.slice(0, -1) as any, item.id)}
                  className="text-slate-300 hover:text-rose-500 p-2 self-start transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            {(activeTab === 'sermons' ? sermons : activeTab === 'events' ? events : devotions).length === 0 && (
              <div className="col-span-full py-24 text-center text-slate-400 font-medium italic">
                <div className="mb-4 flex justify-center"><CloudUpload size={48} className="text-slate-200" /></div>
                No records found. Click "New {activeTab.slice(0, -1)}" to populate the archive.
              </div>
            )}
          </div>
        )}
      </main>

      {/* --- PUBLISHING OVERLAY --- */}
      {isPublishing && (
        <div className="fixed inset-0 z-[200] bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center text-white">
          <div className="relative mb-8">
            <div className="w-32 h-32 border-4 border-white/10 rounded-full"></div>
            <div 
              className="absolute inset-0 border-4 border-indigo-500 rounded-full transition-all duration-300"
              style={{ clipPath: `inset(${100 - publishProgress}% 0 0 0)` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <CloudUpload size={40} className="text-indigo-400 animate-bounce" />
            </div>
          </div>
          <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter">Publishing to Live Site</h2>
          <p className="text-slate-400 max-w-sm mb-8">Syncing media assets, database records, and ecclesiastical content to Grace & Truth public portal...</p>
          <div className="w-full max-w-md bg-white/10 h-2 rounded-full overflow-hidden mb-2">
             <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${publishProgress}%` }}></div>
          </div>
          <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">{publishProgress}% SYNCED</div>
        </div>
      )}

      {/* --- SUCCESS TOAST --- */}
      {publishSuccess && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[150] bg-emerald-600 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-10">
           <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"><Check size={20} /></div>
           <span className="font-bold">Updates are now live!</span>
           <button onClick={() => window.open('/', '_blank')} className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full text-xs font-black uppercase flex items-center gap-2">
             View Site <ExternalLink size={12} />
           </button>
        </div>
      )}

      {/* --- MODAL FOR CONTENT CREATION --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 md:p-12 animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
              <h3 className="text-2xl font-bold font-serif flex items-center gap-3">
                <Plus className="text-indigo-600" /> New {activeTab.slice(0, -1)}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-rose-500 transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* --- SERMON FORM --- */}
            {activeTab === 'sermons' && (
              <form onSubmit={addSermon} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Title</label>
                    <input required type="text" className="w-full bg-slate-50 p-4 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 font-bold" value={newSermon.title || ''} onChange={e => setNewSermon({...newSermon, title: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Preacher</label>
                    <input required type="text" className="w-full bg-slate-50 p-4 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 font-bold" value={newSermon.preacher || ''} onChange={e => setNewSermon({...newSermon, preacher: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Message Format</label>
                    <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                      {(['video', 'audio', 'text'] as const).map(t => (
                        <button key={t} type="button" onClick={() => setNewSermon({...newSermon, type: t})} className={`flex-grow py-2.5 rounded-xl text-[10px] font-black transition-all flex items-center justify-center gap-1.5 uppercase ${newSermon.type === t ? 'bg-white shadow-md text-indigo-600' : 'text-slate-400'}`}>
                          {t === 'video' ? <Video size={14} /> : t === 'audio' ? <Music size={14} /> : <FileText size={14} />} {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Category</label>
                    <select className="w-full bg-slate-50 p-4 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 font-bold" value={newSermon.category} onChange={e => setNewSermon({...newSermon, category: e.target.value})}>
                      <option>Faith</option>
                      <option>Spiritual Growth</option>
                      <option>Theology</option>
                      <option>Family</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FileUploadField 
                    label="Cover Image" 
                    accept="image/*" 
                    icon={FileImage}
                    preview={newSermon.thumbnail}
                    onFileSelect={(e: any) => handleFileChange(e, 'thumbnail', setNewSermon, newSermon)}
                  />
                  
                  {newSermon.type === 'video' ? (
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Video URL</label>
                      <div className="relative">
                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="url" 
                          placeholder="YouTube, Facebook, TikTok, or Instagram link" 
                          className="w-full bg-slate-50 pl-12 pr-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 font-medium text-sm"
                          value={newSermon.videoUrl || ''} 
                          onChange={e => setNewSermon({...newSermon, videoUrl: e.target.value})} 
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 px-2 italic">Supports direct links to social video platforms.</p>
                    </div>
                  ) : newSermon.type === 'audio' ? (
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Audio URL</label>
                      <div className="relative">
                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="url" 
                          placeholder="SoundCloud, Spotify, or direct MP3 link" 
                          className="w-full bg-slate-50 pl-12 pr-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 font-medium text-sm"
                          value={newSermon.audioUrl || ''} 
                          onChange={e => setNewSermon({...newSermon, audioUrl: e.target.value})} 
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 px-2 italic">Paste the link to your audio host.</p>
                    </div>
                  ) : (
                    <div className="p-8 border-2 border-dashed border-slate-100 rounded-3xl flex items-center justify-center text-slate-300 font-bold text-xs uppercase text-center leading-relaxed">
                      Text mode selected.<br/>Add the transcript below.
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Sermon Notes / Transcript</label>
                  <textarea rows={5} className="w-full bg-slate-50 p-6 rounded-3xl border-none focus:ring-2 focus:ring-indigo-600 leading-relaxed" placeholder="Type or paste the message details here..." value={newSermon.notes || ''} onChange={e => setNewSermon({...newSermon, notes: e.target.value})} />
                </div>

                <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-3xl font-black text-lg shadow-xl hover:bg-indigo-700 transition-all active:scale-95">
                  Save to Local Cache
                </button>
              </form>
            )}

            {/* --- EVENT FORM --- */}
            {activeTab === 'events' && (
              <form onSubmit={addEvent} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Event Title</label>
                  <input required type="text" className="w-full bg-slate-50 p-4 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 font-bold text-xl" value={newEvent.title || ''} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FileUploadField 
                    label="Event Banner" 
                    accept="image/*" 
                    icon={ImageIcon}
                    preview={newEvent.image}
                    onFileSelect={(e: any) => handleFileChange(e, 'image', setNewEvent, newEvent)}
                  />
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Location</label>
                      <input type="text" className="w-full bg-slate-50 p-4 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600" placeholder="e.g. Fellowship Hall" value={newEvent.location || ''} onChange={e => setNewEvent({...newEvent, location: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Date</label>
                        <input type="text" className="w-full bg-slate-50 p-4 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500" placeholder="June 12" value={newEvent.date || ''} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Time</label>
                        <input type="text" className="w-full bg-slate-50 p-4 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600" placeholder="6:00 PM" value={newEvent.time || ''} onChange={e => setNewEvent({...newEvent, time: e.target.value})} />
                      </div>
                    </div>
                  </div>
                </div>
                <textarea rows={4} className="w-full bg-slate-50 p-4 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600" placeholder="Event Description..." value={newEvent.description || ''} onChange={e => setNewEvent({...newEvent, description: e.target.value})} />
                <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-3xl font-black text-lg shadow-xl active:scale-95">Add to Calendar</button>
              </form>
            )}

            {/* --- DEVOTION FORM --- */}
            {activeTab === 'devotions' && (
              <form onSubmit={addDevotion} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Devotion Title</label>
                      <input required type="text" className="w-full bg-slate-50 p-4 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 font-bold" value={newDevotion.title || ''} onChange={e => setNewDevotion({...newDevotion, title: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Scripture Reference</label>
                      <input required type="text" className="w-full bg-slate-50 p-4 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 italic" placeholder="Genesis 1:1" value={newDevotion.scripture || ''} onChange={e => setNewDevotion({...newDevotion, scripture: e.target.value})} />
                    </div>
                  </div>
                  <FileUploadField 
                    label="Cover Image" 
                    accept="image/*" 
                    icon={FileImage}
                    preview={newDevotion.image}
                    onFileSelect={(e: any) => handleFileChange(e, 'image', setNewDevotion, newDevotion)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Daily Message Content</label>
                  <textarea rows={10} className="w-full bg-slate-50 p-6 rounded-3xl border-none focus:ring-2 focus:ring-indigo-600 leading-relaxed" placeholder="Share God's word..." value={newDevotion.content || ''} onChange={e => setNewDevotion({...newDevotion, content: e.target.value})} />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-3xl font-black text-lg shadow-xl active:scale-95">Save Draft</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
