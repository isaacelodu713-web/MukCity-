
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar as CalendarIcon, 
  Users, 
  HeartHandshake, 
  Plus, 
  MoreVertical, 
  DollarSign,
  MessageSquare,
  LogOut,
  X,
  Book,
  Settings as SettingsIcon,
  Save,
  Landmark,
  Smartphone,
  Coins,
  Check
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
  prayerRequests, setPrayerRequests,
  members, setMembers,
  settings, setSettings,
  isLoggedIn, setIsLoggedIn
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'sermons' | 'events' | 'devotions' | 'settings'>('dashboard');
  const [password, setPassword] = useState('');
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Local state for settings form to handle changes before saving
  const [tempSettings, setTempSettings] = useState<ChurchSettings>(settings);
  const [presetAmountsInput, setPresetAmountsInput] = useState(settings.presetAmounts.join(', '));

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'church123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid Password. Hint: church123');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const presetsArray = presetAmountsInput.split(',').map(s => s.trim()).filter(s => s !== '');
    const updatedSettings = { ...tempSettings, presetAmounts: presetsArray };
    setSettings(updatedSettings);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

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
        <SidebarItem id="settings" label="Portal Settings" icon={SettingsIcon} />
      </aside>

      <main className="flex-grow p-4 md:p-10 lg:p-12">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 capitalize font-serif">{activeTab}</h2>
            <p className="text-slate-500">Manage church operations and platform content.</p>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Prayer Requests', value: '12 New', icon: MessageSquare, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Event Registrations', value: '45', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'Active Sermons', value: sermons.length.toString(), icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Giving Goal', value: '82%', icon: DollarSign, color: 'text-rose-600', bg: 'bg-rose-50' },
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
        )}

        {activeTab === 'settings' && (
          <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-2 font-serif">
                <SettingsIcon className="text-indigo-600" /> Platform Financial Configuration
              </h3>
              
              <form onSubmit={handleSaveSettings} className="space-y-10">
                {/* Mobile Money Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <Smartphone size={18} className="text-amber-500" />
                    <h4 className="font-bold text-slate-800 uppercase tracking-widest text-xs">Mobile Money Receiving Account</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">MM Account Number</label>
                      <input 
                        type="text" 
                        className="w-full bg-slate-50 p-4 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 font-mono text-lg" 
                        value={tempSettings.accountNumber} 
                        onChange={e => setTempSettings({...tempSettings, accountNumber: e.target.value})} 
                        placeholder="e.g. 0772000000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Currency Symbol</label>
                      <input 
                        type="text" 
                        className="w-full bg-slate-50 p-4 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 font-bold" 
                        value={tempSettings.currency} 
                        onChange={e => setTempSettings({...tempSettings, currency: e.target.value})} 
                        placeholder="e.g. UGX or $"
                      />
                    </div>
                  </div>
                </div>

                {/* Bank Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <Landmark size={18} className="text-indigo-600" />
                    <h4 className="font-bold text-slate-800 uppercase tracking-widest text-xs">Bank Settlement Details</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Settlement Bank Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-slate-50 p-4 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 font-bold" 
                        value={tempSettings.bankName} 
                        onChange={e => setTempSettings({...tempSettings, bankName: e.target.value})} 
                        placeholder="e.g. Stanbic Bank"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Bank Account Number</label>
                      <input 
                        type="text" 
                        className="w-full bg-slate-50 p-4 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 font-mono text-lg" 
                        value={tempSettings.bankAccountNumber} 
                        onChange={e => setTempSettings({...tempSettings, bankAccountNumber: e.target.value})} 
                        placeholder="e.g. 903000..."
                      />
                    </div>
                  </div>
                </div>

                {/* Giving Experience Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <Coins size={18} className="text-rose-500" />
                    <h4 className="font-bold text-slate-800 uppercase tracking-widest text-xs">Donation Presets</h4>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Preset Amounts (Comma separated)</label>
                    <textarea 
                      className="w-full bg-slate-50 p-4 rounded-2xl border-none focus:ring-2 focus:ring-indigo-600 font-bold h-24" 
                      value={presetAmountsInput} 
                      onChange={e => setPresetAmountsInput(e.target.value)} 
                      placeholder="5000, 10000, 20000, 50000"
                    />
                    <p className="text-[10px] text-slate-400 px-2 italic">These values appear as shortcut buttons on the giving page.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-6">
                  <button 
                    type="submit" 
                    className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-2 active:scale-95"
                  >
                    <Save size={20} /> Save Configuration
                  </button>
                  {showSaveSuccess && (
                    <div className="flex items-center gap-2 text-emerald-600 font-bold animate-in fade-in slide-in-from-left-2">
                      <Check size={20} /> 
                      <span>Accounts updated!</span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {(activeTab === 'sermons' || activeTab === 'events' || activeTab === 'devotions') && (
          <div className="bg-white rounded-[2.5rem] p-12 text-center border border-slate-100 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Content Management Coming Soon</h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-8">This section will allow you to add and edit {activeTab} directly on the website.</p>
            <button className="bg-slate-100 text-slate-400 px-8 py-3 rounded-xl font-bold cursor-not-allowed">
              Add New {activeTab.slice(0, -1)}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
