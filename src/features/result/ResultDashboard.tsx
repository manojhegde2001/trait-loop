'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { 
  CheckCircle2, 
  Info, 
  Share2, 
  Download, 
  TrendingUp, 
  Clock,
  LayoutDashboard
} from 'lucide-react';

interface ScoreResult {
  scores: {
    domains: Record<string, number>;
    facets: Record<string, number>;
  };
  summary: Record<string, 'High' | 'Neutral' | 'Low'>;
  timeElapsed: number;
}

const domainDetails: Record<string, { name: string; icon: string; description: string; colors: string; text: string; bg: string }> = {
  O: { 
    name: 'Openness', 
    icon: 'O', 
    description: 'Reflects the degree of intellectual curiosity, creativity and a preference for novelty and variety.',
    colors: 'from-blue-400 to-blue-600',
    text: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  C: { 
    name: 'Conscientiousness', 
    icon: 'C', 
    description: 'A tendency to be organized and dependable, show self-discipline, act dutifully, and aim for achievement.',
    colors: 'from-indigo-400 to-indigo-600',
    text: 'text-indigo-600',
    bg: 'bg-indigo-50'
  },
  E: { 
    name: 'Extraversion', 
    icon: 'E', 
    description: 'Energy, positive emotions, surgency, assertiveness, sociability and the tendency to seek stimulation.',
    colors: 'from-purple-400 to-purple-600',
    text: 'text-purple-600',
    bg: 'bg-purple-50'
  },
  A: { 
    name: 'Agreeableness', 
    icon: 'A', 
    description: 'A tendency to be compassionate and cooperative rather than suspicious and antagonistic towards others.',
    colors: 'from-pink-400 to-pink-600',
    text: 'text-pink-600',
    bg: 'bg-pink-50'
  },
  N: { 
    name: 'Neuroticism', 
    icon: 'N', 
    description: 'The tendency to experience unpleasant emotions easily, such as anger, anxiety, depression, and vulnerability.',
    colors: 'from-rose-400 to-rose-600',
    text: 'text-rose-600',
    bg: 'bg-rose-50'
  }
};

export function ResultDashboard({ data }: { data: ScoreResult }) {
  const totalQuestions = Object.keys(data.scores.facets).length * 4; // Approx for 120 questions

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-16 pb-32">
      {/* Header Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-wider border border-emerald-100">
          <CheckCircle2 size={14} /> Analysis Complete
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
          Your Personality <br />
          <span className="text-gradient">Trait Profile</span>
        </h1>
        <div className="flex items-center justify-center gap-6 pt-4 text-sm font-bold text-slate-400">
          <span className="flex items-center gap-2">
            <Clock size={16} /> {Math.floor(data.timeElapsed / 60)}m {data.timeElapsed % 60}s
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
          <span className="flex items-center gap-2">
            <Info size={16} /> 120-Item IPIP-NEO
          </span>
        </div>
      </div>

      {/* Main Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 glass rounded-[40px] border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center gap-3 text-blue-600">
            <TrendingUp size={24} />
            <h2 className="text-xl font-black">Top Insights</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            Based on your responses, you show a particularly <span className="font-bold text-slate-900 dark:text-white underline decoration-blue-500 underline-offset-4">
              {Object.entries(data.summary).find(([_, v]) => v === 'High')?.[0] || 'Neutral'}
            </span> score in several key domains. This suggests a personality that balances {Object.values(data.summary).filter(v => v === 'High').length > 2 ? 'dynamic adaptability' : 'stable consistency'}.
          </p>
          <div className="flex gap-4">
             <button className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all active:scale-95">
                <Share2 size={18} /> Share Results
             </button>
             <button className="px-6 py-4 border border-slate-200 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all active:scale-95">
                <Download size={18} />
             </button>
          </div>
        </div>

        <div className="p-8 glass rounded-[40px] border border-slate-200 shadow-xl flex flex-col justify-center text-center space-y-4">
           <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl">
              <LayoutDashboard size={32} />
           </div>
           <h3 className="text-xl font-black">Professional Report</h3>
           <p className="text-sm text-slate-500 px-4">
             Learn how your traits influence your career, relationships, and daily productivity in our extended report.
           </p>
           <button className="text-sm font-black text-blue-600 hover:underline">Unlocked in this session</button>
        </div>
      </div>

      {/* Domain Cards */}
      <div className="grid gap-8">
        {Object.entries(data.scores.domains).map(([key, score]) => {
          const detail = domainDetails[key];
          const category = data.summary[key];
          const percentage = (score / 5) * 100;
          
          return (
            <div key={key} className="group relative glass-card p-1 items-stretch rounded-[40px] border border-slate-100 overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-slate-200/50">
              <div className={cn("p-10 md:w-80 flex flex-col items-center justify-center text-center gap-4", detail.bg)}>
                <div className={cn("w-20 h-20 rounded-3xl bg-gradient-to-br flex items-center justify-center text-white text-4xl font-black shadow-lg", detail.colors)}>
                  {detail.icon}
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Score Result</div>
                  <div className="text-4xl font-black text-slate-900">{score.toFixed(1)}</div>
                </div>
              </div>
              
              <div className="flex-1 p-8 md:p-12 space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black tracking-tight">{detail.name}</h3>
                    <div className={cn(
                      "inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                      category === 'High' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      category === 'Low' ? "bg-rose-50 text-rose-700 border-rose-200" :
                      "bg-blue-50 text-blue-700 border-blue-200"
                    )}>
                      {category} Category
                    </div>
                  </div>
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                    Confidence: High
                  </div>
                </div>

                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
                  {detail.description}
                </p>

                {/* Range Bar */}
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Low</span>
                    <span>Neutral</span>
                    <span>High</span>
                  </div>
                  <div className="relative h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={cn("absolute inset-y-0 left-0 bg-gradient-to-r transition-all duration-1000 ease-out shadow-lg", detail.colors)}
                      style={{ width: `${percentage}%` }}
                    />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-white/50" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Facet Explorer */}
      <div className="pt-20 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black">Detailed Facet Analysis</h2>
          <p className="text-slate-500">A deeper look into the components that define your major domains.</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {Object.entries(data.scores.facets).sort().map(([facet, score]) => (
            <div key={facet} className="group p-6 glass rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all text-center space-y-2">
               <div className="text-[10px] font-black uppercase tracking-tighter text-slate-400 group-hover:text-blue-500 transition-colors">{facet}</div>
               <div className="text-2xl font-black">{score.toFixed(1)}</div>
               <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-2">
                 <div className="bg-slate-300 h-full transition-all duration-1000" style={{ width: `${(score/5)*100}%` }} />
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
