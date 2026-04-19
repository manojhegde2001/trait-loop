'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  Users, 
  Mail, 
  Send, 
  FileUp, 
  RefreshCcw, 
  ExternalLink, 
  CheckCircle2, 
  XCircle,
  Lock,
  Search,
  Download
} from 'lucide-react';

interface TestResult {
  id: string;
  email: string | null;
  emailSent: boolean;
  timeElapsed: number;
  summary: Record<string, string>;
  createdAt: string;
}

export function AdminDashboard() {
  // Use initializer function for secret to avoid the useEffect setState warning
  const [secret, setSecret] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('trait-loop-admin-secret') || '';
    }
    return '';
  });
  
  const [results, setResults] = useState<TestResult[]>([]);
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchResults = async () => {
    if (!secret) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/results', {
        headers: { 'x-admin-secret': secret }
      });
      if (res.ok) {
        const data = await res.json();
        setResults(data);
        setIsAuthed(true);
        localStorage.setItem('trait-loop-admin-secret', secret);
      } else {
        setIsAuthed(false);
        // Better error handling than alert
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Attempt auto-auth on mount if secret exists
  useEffect(() => {
    if (secret) {
      fetchResults();
    }
  }, []);

  const handleResend = async (id: string) => {
    try {
      const res = await fetch('/api/admin/resend-email', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-secret': secret 
        },
        body: JSON.stringify({ resultId: id })
      });
      if (res.ok) {
        fetchResults(); // Refresh list
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/questions/import', {
        method: 'POST',
        headers: { 'x-admin-secret': secret },
        body: formData
      });
      if (res.ok) {
        alert('Questions imported successfully');
      } else {
        const data = await res.json();
        alert(data.message || 'Import failed');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setImporting(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent = "id,text,domain,facet,keyed\nQ1,I love large parties,E,Friendliness,plus\nQ2,I often feel sad,N,Depression,plus\nQ3,I trust others,A,Trust,plus\nQ4,I love to read challenging material,O,Intellect,plus\nQ5,I am always prepared,C,Dutifulness,plus";
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'traitloop_questions_template.csv';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const filteredResults = results.filter(r => 
    r.email?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAuthed) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 glass rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-2xl">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600">
            <Lock size={32} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black">Admin Access</h1>
            <p className="text-slate-500 text-sm">Enter your secret key to manage the TraitLoop platform.</p>
          </div>
          <div className="w-full space-y-4">
            <input 
              type="password" 
              placeholder="Admin Secret Key"
              className="w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 transition-all font-mono"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchResults()}
            />
            <button 
              onClick={fetchResults}
              disabled={loading}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex justify-center items-center gap-2"
            >
              {loading ? <RefreshCcw size={18} className="animate-spin" /> : 'Enter Dashboard'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-8 pb-32">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white dark:bg-slate-950 sticky top-[72px] z-20 py-6 border-b dark:border-slate-800 transition-all">
        <div>
          <h1 className="text-3xl font-black tracking-tight">System Console</h1>
          <p className="text-slate-500 font-medium">Monitoring {results.length} total assessments</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search by email..."
              className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 transition-all text-sm w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button 
            onClick={downloadTemplate}
            className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Template CSV</span>
          </button>
          
          <label className={cn(
            "flex items-center gap-2 px-6 py-2.5 bg-slate-900 dark:bg-slate-800 text-white text-sm font-bold rounded-xl cursor-pointer hover:scale-105 transition-all shadow-lg",
            importing && "opacity-50 cursor-wait"
          )}>
            <FileUp size={16} />
            {importing ? 'Importing...' : 'Import Questions'}
            <input type="file" accept=".csv" className="hidden" onChange={handleImport} disabled={importing} />
          </label>
          
          <button 
            onClick={fetchResults}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Assessments', value: results.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Email Notifications', value: results.filter(r => r.emailSent).length, icon: Send, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Avg. Completion Time', value: `${Math.round(results.reduce((acc, r) => acc + r.timeElapsed, 0) / (results.length || 1) / 60)}m`, icon: RefreshCcw, color: 'text-purple-600', bg: 'bg-purple-50' }
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">{stat.label}</span>
              <div className="text-3xl font-black">{stat.value}</div>
            </div>
            <div className={cn("p-4 rounded-2xl", stat.bg, stat.color)}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Table */}
      <div className="overflow-hidden border border-slate-100 dark:border-slate-800 rounded-[32px] shadow-sm bg-white dark:bg-slate-950">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900 border-b dark:border-slate-800">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Timestamp</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Assessment Participant</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Communication</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">OCEAN Summary</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredResults.map((r) => (
              <tr key={r.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-8 py-6">
                  <div className="text-sm font-bold">{new Date(r.createdAt).toLocaleDateString()}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">{new Date(r.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </td>
                <td className="px-8 py-6">
                  {r.email ? (
                    <div className="flex items-center gap-2">
                       <Mail size={14} className="text-slate-500 dark:text-slate-400" />
                       <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{r.email}</span>
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-slate-400 italic">Anonymous</span>
                  )}
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-1 uppercase">{r.id.slice(-8)}</div>
                </td>
                <td className="px-8 py-6">
                  {r.emailSent ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase">
                       <CheckCircle2 size={10} /> Delivered
                    </div>
                  ) : r.email ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-[10px] font-black uppercase">
                       <XCircle size={10} /> Pending/Failed
                    </div>
                  ) : (
                    <span className="text-slate-400 dark:text-slate-500">-</span>
                  )}
                </td>
                <td className="px-8 py-6">
                   <div className="flex flex-wrap gap-1">
                      {Object.entries(r.summary).map(([k, v]) => (
                        <span key={k} className={cn(
                          "px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter",
                          v === 'High' ? "bg-emerald-100 text-emerald-700" :
                          v === 'Low' ? "bg-rose-100 text-rose-700" :
                          "bg-blue-100 text-blue-700"
                        )}>{k}</span>
                      ))}
                   </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                    <a 
                      href={`/result/${r.id}`} 
                      target="_blank" 
                      className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all"
                    >
                      <ExternalLink size={16} />
                    </a>
                    {r.email && (
                      <button 
                        onClick={() => handleResend(r.id)}
                        className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-emerald-600 hover:border-emerald-600 transition-all"
                      >
                        <Send size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredResults.length === 0 && (
          <div className="py-32 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-400 mx-auto">
              <Search size={32} />
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">No records found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
