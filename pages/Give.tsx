
import React, { useState } from 'react';
import { Heart, CreditCard, Landmark, Smartphone, ShieldCheck, ArrowRight, Copy, Check, Loader2, Calendar as CalIcon, Lock, User, Wallet, FileText } from 'lucide-react';
import { ChurchSettings } from '../types';

interface GiveProps {
  settings: ChurchSettings;
}

const Give: React.FC<GiveProps> = ({ settings }) => {
  const [paymentMethod, setPaymentMethod] = useState<'mm' | 'card' | 'bank'>('mm');
  const [provider, setProvider] = useState<'mtn' | 'airtel'>('mtn');
  const [amount, setAmount] = useState(settings.presetAmounts[0] || '50000');
  const [customAmount, setCustomAmount] = useState('');
  const [purpose, setPurpose] = useState('General Tithe');
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [processingStep, setProcessingStep] = useState('');

  // Form states
  const [mobileNumber, setMobileNumber] = useState('');
  const [senderName, setSenderName] = useState('');
  const [bankRef, setBankRef] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    name: '',
    cvv: ''
  });

  const handleCopyTarget = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount || amount;
    if (!finalAmount || Number(finalAmount) <= 0) {
      alert("Please enter a valid amount to give.");
      return;
    }

    setIsProcessing(true);
    
    if (paymentMethod === 'mm') {
      setProcessingStep(`Initiating ${provider.toUpperCase()} Mobile Money...`);
      setTimeout(() => {
        setProcessingStep(`Sending PIN prompt to ${mobileNumber}...`);
        setTimeout(() => {
          setProcessingStep('Waiting for user PIN confirmation...');
          setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            setProcessingStep('');
          }, 3000);
        }, 1500);
      }, 1500);
    } else if (paymentMethod === 'card') {
      setProcessingStep('Connecting to bank secure gateway...');
      setTimeout(() => {
        setProcessingStep('Authorizing card limits...');
        setTimeout(() => {
          setProcessingStep(`Processing deduction of ${settings.currency} ${Number(finalAmount).toLocaleString()}...`);
          setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            setProcessingStep('');
          }, 1500);
        }, 1500);
      }, 1500);
    } else {
      setProcessingStep('Recording your transfer notification...');
      setTimeout(() => {
        setProcessingStep('Validating reference format...');
        setTimeout(() => {
          setIsProcessing(false);
          setIsSuccess(true);
          setProcessingStep('');
        }, 2000);
      }, 1500);
    }
  };

  if (isSuccess) {
    return (
      <div className="pt-48 pb-24 text-center animate-in zoom-in duration-500 px-4">
        <div className="max-w-md mx-auto bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-50">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Check size={48} strokeWidth={3} />
          </div>
          <h2 className="text-3xl font-bold mb-4 font-serif text-slate-900">Seed Sown Successfully</h2>
          <div className="bg-slate-50 p-6 rounded-3xl mb-8 border border-slate-100">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Amount Given</div>
            <div className="text-3xl font-black text-indigo-600">
              {settings.currency} {Number(customAmount || amount).toLocaleString()}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 text-sm text-slate-500">
              {paymentMethod === 'mm' 
                ? <>Deducted from <b>{mobileNumber}</b></>
                : paymentMethod === 'card'
                ? <>Deducted from card ending in <b>{cardDetails.number.slice(-4)}</b></>
                : <>Transfer notification for <b>{senderName}</b> received</>
              }
              <br/>
              To Church Account: <b>{paymentMethod === 'bank' ? settings.bankAccountNumber : settings.accountNumber}</b>
            </div>
          </div>
          <p className="text-slate-500 mb-8 italic">
            "God loves a cheerful giver." — 2 Corinthians 9:7
          </p>
          <button 
            onClick={() => {
              setIsSuccess(false);
              setCustomAmount('');
              setMobileNumber('');
              setSenderName('');
              setBankRef('');
            }}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-lg"
          >
            Finish & Return
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 animate-in fade-in duration-700">
      <div className="bg-slate-50 py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 font-serif">Faithful Giving</h1>
            <p className="text-slate-600 text-xl leading-relaxed mb-10 italic">
              Support the ministry and the vision of Grace & Truth through our secure digital giving platform.
            </p>
            
            <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white mb-10 shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                    <Landmark size={28} />
                  </div>
                  <h4 className="font-bold text-xl uppercase tracking-wider">Church Accounts</h4>
                </div>
                <div className="space-y-6">
                  <div className="bg-white/10 border border-white/20 p-5 rounded-[1.5rem] flex items-center justify-between group">
                    <div>
                      <div className="text-[10px] uppercase font-bold opacity-60 mb-1">Mobile Money (Target)</div>
                      <div className="font-mono text-xl tracking-wider">{settings.accountNumber}</div>
                    </div>
                    <button 
                      onClick={() => handleCopyTarget(settings.accountNumber)} 
                      className="bg-white text-indigo-600 p-3 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg"
                    >
                      {copied ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                  </div>
                  <div className="bg-white/10 border border-white/20 p-5 rounded-[1.5rem] flex items-center justify-between group">
                    <div>
                      <div className="text-[10px] uppercase font-bold opacity-60 mb-1">Bank Settlement (Target)</div>
                      <div className="font-bold text-lg">{settings.bankName}</div>
                      <div className="font-mono text-sm opacity-80 tracking-widest">A/C: {settings.bankAccountNumber}</div>
                    </div>
                    <button 
                      onClick={() => handleCopyTarget(settings.bankAccountNumber)} 
                      className="bg-white text-indigo-600 p-3 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg"
                    >
                      {copied ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/5 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <Smartphone className="text-indigo-600 mb-4" size={32} />
                <h4 className="font-bold text-lg mb-2">Instant MM Prompt</h4>
                <p className="text-slate-500 text-sm">Automated triggers sent directly to your phone for secure authorization.</p>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <ShieldCheck className="text-indigo-600 mb-4" size={32} />
                <h4 className="font-bold text-lg mb-2">Secure Gateway</h4>
                <p className="text-slate-500 text-sm">Protected by 256-bit SSL encryption and international banking standards.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] p-8 md:p-12 border border-slate-100 sticky top-32">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
              <h3 className="text-2xl font-bold flex items-center gap-2 font-serif">
                <Heart className="text-rose-500 fill-rose-500" size={24} /> Sow a Seed
              </h3>
              <div className="flex bg-slate-100 p-1.5 rounded-2xl overflow-x-auto">
                <button 
                  onClick={() => setPaymentMethod('mm')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${paymentMethod === 'mm' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Smartphone size={14} /> MM
                </button>
                <button 
                  onClick={() => setPaymentMethod('card')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${paymentMethod === 'card' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <CreditCard size={14} /> Card
                </button>
                <button 
                  onClick={() => setPaymentMethod('bank')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${paymentMethod === 'bank' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Landmark size={14} /> Bank
                </button>
              </div>
            </div>
            
            <form onSubmit={handlePayment} className="space-y-8">
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Amount ({settings.currency})</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {settings.presetAmounts.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => { setAmount(a); setCustomAmount(''); }}
                      className={`py-4 rounded-2xl font-black text-sm transition-all border-2 ${amount === a && !customAmount ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg scale-[1.02]' : 'bg-white text-slate-600 border-slate-100 hover:border-indigo-200'}`}
                    >
                      {Number(a).toLocaleString()}
                    </button>
                  ))}
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Other"
                      className={`w-full py-4 px-4 bg-slate-50 rounded-2xl font-black text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 border-none transition-all ${customAmount ? 'bg-indigo-50 text-indigo-600' : ''}`}
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setAmount(''); }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">Purpose</label>
                <select 
                  className="w-full bg-slate-50 border-none py-4 px-6 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                >
                  <option>General Tithes & Offerings</option>
                  <option>Church Building Project</option>
                  <option>Missions & Outreach</option>
                  <option>Welfare & Support</option>
                </select>
              </div>

              {paymentMethod === 'mm' && (
                <div className="space-y-5 animate-in slide-in-from-top-4 duration-300">
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setProvider('mtn')} className={`py-3 rounded-2xl font-bold text-sm border-2 transition-all ${provider === 'mtn' ? 'bg-amber-400 border-amber-400 text-slate-900' : 'bg-slate-50 border-transparent text-slate-400'}`}>MTN</button>
                    <button type="button" onClick={() => setProvider('airtel')} className={`py-3 rounded-2xl font-bold text-sm border-2 transition-all ${provider === 'airtel' ? 'bg-rose-600 border-rose-600 text-white' : 'bg-slate-50 border-transparent text-slate-400'}`}>Airtel</button>
                  </div>
                  <input type="tel" placeholder="07XX XXX XXX" required className="w-full bg-slate-50 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 border-none font-bold" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
                  <input type="text" placeholder="Card Number" required className="w-full bg-slate-50 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 border-none font-mono font-bold" value={cardDetails.number} onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM / YY" required className="w-full bg-slate-50 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 border-none font-mono font-bold" value={cardDetails.expiry} onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})} />
                    <input type="password" placeholder="CVV" required className="w-full bg-slate-50 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 border-none font-mono font-bold" value={cardDetails.cvv} onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})} />
                  </div>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="space-y-5 animate-in slide-in-from-top-4 duration-300">
                  <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
                    <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-4">Transfer to:</div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-500 text-sm">Bank</span>
                      <span className="font-bold text-slate-900">{settings.bankName}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-500 text-sm">Account Name</span>
                      <span className="font-bold text-slate-900">Grace & Truth Church</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 text-sm">Account Number</span>
                      <span className="font-mono font-bold text-slate-900">{settings.bankAccountNumber}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="relative">
                       <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                       <input type="text" placeholder="Depositor's Full Name" required className="w-full bg-slate-50 pl-12 pr-6 py-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 border-none font-bold" value={senderName} onChange={(e) => setSenderName(e.target.value)} />
                    </div>
                    <div className="relative">
                       <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                       <input type="text" placeholder="Transfer Reference / TX ID" required className="w-full bg-slate-50 pl-12 pr-6 py-4 rounded-2xl focus:ring-2 focus:ring-indigo-500 border-none font-bold" value={bankRef} onChange={(e) => setBankRef(e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full bg-indigo-600 text-white py-6 rounded-3xl font-black text-xl shadow-xl hover:bg-indigo-700 transition-all flex flex-col items-center justify-center gap-1 disabled:opacity-80 active:scale-[0.98]"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="animate-spin" size={24} /> 
                    <span>{processingStep || 'Processing...'}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Confirm & Sow Seed <ArrowRight />
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Give;
