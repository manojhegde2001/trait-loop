'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { 
  CheckCircle2, 
  Info, 
  Share2, 
  Download, 
  TrendingUp, 
  Clock,
  LayoutDashboard,
  BrainCircuit,
  Binary,
  BarChart,
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface ScoreResult {
  scores: {
    domains: Record<string, number>;
    facets: Record<string, number>;
  };
  summary: Record<string, 'High' | 'Neutral' | 'Low'>;
  timeElapsed: number;
}

const domainDetails: Record<string, { name: string; icon: string; description: string; colors: string; text: string; bg: string; insights: Record<string, string> }> = {
  O: { 
    name: 'Openness', 
    icon: 'O', 
    description: 'Reflects the degree of intellectual curiosity, creativity and a preference for novelty and variety.',
    colors: 'from-blue-400 to-blue-600',
    text: 'text-blue-600',
    bg: 'bg-blue-50',
    insights: {
        High: 'You are highly creative and open to new experiences. You enjoy abstract thinking and variety.',
        Neutral: 'You balance traditional values with a healthy curiosity for new ideas.',
        Low: 'You prefer familiarity and traditional approaches. You are practical and grounded.'
    }
  },
  C: { 
    name: 'Conscientiousness', 
    icon: 'C', 
    description: 'A tendency to be organized and dependable, show self-discipline, act dutifully, and aim for achievement.',
    colors: 'from-indigo-400 to-indigo-600',
    text: 'text-indigo-600',
    bg: 'bg-indigo-50',
    insights: {
        High: 'You are extremely organized, reliable, and focused on long-term goals.',
        Neutral: 'You are generally dependable but can be flexible when plans change.',
        Low: 'You prefer a spontaneous, flexible lifestyle and may struggle with rigid structures.'
    }
  },
  E: { 
    name: 'Extraversion', 
    icon: 'E', 
    description: 'Energy, positive emotions, surgency, assertiveness, sociability and the tendency to seek stimulation.',
    colors: 'from-purple-400 to-purple-600',
    text: 'text-purple-600',
    bg: 'bg-purple-50',
    insights: {
        High: 'You gain energy from social interactions and are comfortable taking charge.',
        Neutral: 'You are an "ambivert," enjoying social time but also valuing solitude.',
        Low: 'You prefer quiet, intimate settings and process your thoughts internally.'
    }
  },
  A: { 
    name: 'Agreeableness', 
    icon: 'A', 
    description: 'A tendency to be compassionate and cooperative rather than suspicious and antagonistic towards others.',
    colors: 'from-pink-400 to-pink-600',
    text: 'text-pink-600',
    bg: 'bg-pink-50',
    insights: {
        High: 'You are deeply empathetic, cooperative, and value harmony in relationships.',
        Neutral: 'You are compassionate but also know when to stand your ground.',
        Low: 'You are competitive and skeptical, prioritizing logic over emotions.'
    }
  },
  N: { 
    name: 'Neuroticism', 
    icon: 'N', 
    description: 'The tendency to experience unpleasant emotions easily, such as anger, anxiety, depression, and vulnerability.',
    colors: 'from-rose-400 to-rose-600',
    text: 'text-rose-600',
    bg: 'bg-rose-50',
    insights: {
        High: 'You have a rich emotional life but may be more sensitive to stress and anxiety.',
        Neutral: 'You are emotionally stable but react appropriately to life events.',
        Low: 'You are calm, resilient, and stay composed even in high-pressure situations.'
    }
  }
};

export function ResultDashboard({ data }: { data: ScoreResult }) {
  const isFullVersion = Object.keys(data.scores.facets).length > 10; // Simple heuristic

  const radarData = [
    { subject: 'Openness', score: data.scores.domains['O'], fullMark: 5 },
    { subject: 'Conscientiousness', score: data.scores.domains['C'], fullMark: 5 },
    { subject: 'Extraversion', score: data.scores.domains['E'], fullMark: 5 },
    { subject: 'Agreeableness', score: data.scores.domains['A'], fullMark: 5 },
    { subject: 'Neuroticism', score: data.scores.domains['N'], fullMark: 5 },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-20 pb-48">
      {/* Header Section */}
      <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        <div className="flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 size={14} /> Comprehensive Analysis Complete
            </div>
            {isFullVersion ? (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-black uppercase border border-blue-100">
                    <Binary size={12} /> High-Precision Full Mode
                </div>
            ) : (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-orange-50 text-orange-600 text-[10px] font-black uppercase border border-orange-100">
                    <TrendingUp size={12} /> Quick Snapshot Mode
                </div>
            )}
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
          Your Personality <br />
          <span className="text-gradient">Trait Profile</span>
        </h1>
        
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <span className="flex items-center gap-2">
            <Clock size={16} className="text-blue-500" /> {Math.floor(data.timeElapsed / 60)}m {data.timeElapsed % 60}s Completion
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
          <span className="flex items-center gap-2">
            <Info size={16} className="text-blue-500" /> {isFullVersion ? '120-Item' : '30-Item'} IPIP-NEO
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
          <span className="flex items-center gap-2">
            <BrainCircuit size={16} className="text-blue-500" /> Deep Analytics Unlocked
          </span>
        </div>
      </div>

      {/* Radar Chart Section */}
      <div className="w-full glass rounded-[48px] border border-slate-200 shadow-2xl shadow-slate-200/50 p-8 sm:p-12 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-3">
            <BarChart className="text-blue-600" /> Core Personality Traits
          </h2>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">
            A clear visual breakdown of your Big Five personality traits.
          </p>
        </div>
        
        <div className="w-full h-[400px] sm:h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid strokeOpacity={0.2} />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#64748b', fontSize: 13, fontWeight: 800 }} 
              />
              <Tooltip 
                wrapperStyle={{ outline: 'none' }}
                contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontWeight: 700 }}
                itemStyle={{ color: '#2563eb', fontWeight: 900 }}
              />
              <Radar 
                name="Score" 
                dataKey="score" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fill="#3b82f6" 
                fillOpacity={0.3} 
                isAnimationActive={true}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
        <div className="p-10 glass rounded-[48px] border border-slate-200 shadow-2xl shadow-slate-200/50 space-y-8">
          <div className="flex items-center gap-4 text-slate-900 dark:text-white">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center"><TrendingUp /></div>
            <h2 className="text-3xl font-black">Top Insights</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-lg">
            Based on your responses, you demonstrate a balanced psychological profile with unique strengths in 
            <span className="font-bold text-slate-900 dark:text-white mx-1 underline decoration-blue-500 underline-offset-4">
              {Object.keys(data.summary).filter(k => data.summary[k] === 'High')[0] || 'Adaptability'}
            </span>.
          </p>
          <div className="flex gap-4">
             <button className="flex-1 py-5 bg-slate-900 dark:bg-blue-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-all active:scale-95 shadow-xl">
                <Share2 size={18} /> Share Profile
             </button>
             <button className="px-8 py-5 border-2 border-slate-100 dark:border-slate-800 rounded-3xl font-black hover:bg-slate-50 transition-all active:scale-95">
                <Download size={18} />
             </button>
          </div>
        </div>

        <div className="p-10 glass rounded-[48px] border border-slate-200 shadow-2xl shadow-slate-200/50 flex flex-col justify-center text-center space-y-6">
           <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center text-white mx-auto shadow-2xl scale-110">
              <LayoutDashboard size={40} />
           </div>
           <div className="space-y-2">
             <h3 className="text-2xl font-black">Professional Blueprint</h3>
             <p className="text-sm text-slate-500 font-medium px-8">
               Learn how your traits influence your career path, leadership style, and key relationships.
             </p>
           </div>
           <button className="text-xs font-black text-blue-600 border border-blue-100 px-6 py-2 rounded-full mx-auto hover:bg-blue-50 transition-all uppercase tracking-widest">
                Analytics Report Available
           </button>
        </div>
      </div>

      {/* Domain Cards */}
      <div className="grid gap-12 pt-12">
        <div className="text-center space-y-4">
           <h2 className="text-4xl font-black">Detailed Breakdown</h2>
           <p className="text-slate-500 font-medium">A closer look at what drives your personality.</p>
        </div>
        {Object.entries(data.scores.domains).map(([key, score]) => {
          const detail = domainDetails[key];
          const category = data.summary[key];
          const percentage = (score / 5) * 100;
          
          return (
            <div key={key} className="group relative glass rounded-[48px] border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row shadow-2xl hover:shadow-blue-500/5 transition-all duration-500">
              <div className={cn("p-12 md:w-96 flex flex-col items-center justify-center text-center gap-6", detail.bg)}>
                <div className={cn("w-24 h-24 rounded-[32px] bg-gradient-to-br flex items-center justify-center text-white text-5xl font-black shadow-2xl group-hover:scale-110 transition-transform duration-500", detail.colors)}>
                  {detail.icon}
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Scientific Score</div>
                  <div className="text-6xl font-black text-slate-900 flex items-center gap-1">
                    {score.toFixed(1)}
                    <span className="text-xl text-slate-300">/5</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 p-10 md:p-14 space-y-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h3 className="text-4xl font-black tracking-tighter">{detail.name}</h3>
                    <div className={cn(
                      "inline-flex px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                      category === 'High' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      category === 'Low' ? "bg-rose-50 text-rose-700 border-rose-200" :
                      "bg-blue-50 text-blue-700 border-blue-200"
                    )}>
                      {category} Category
                    </div>
                  </div>
                  <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest border border-slate-100 px-4 py-2 rounded-xl">
                    Confidence: High
                  </div>
                </div>

                <div className="space-y-4">
                    <p className="text-slate-700 dark:text-slate-200 text-lg font-bold leading-relaxed max-w-2xl">
                        {detail.insights[category]}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl text-sm">
                        {detail.description}
                    </p>
                </div>

                {/* Range Bar */}
                <div className="space-y-4 pt-4">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Low</span>
                    <span>Average</span>
                    <span>High</span>
                  </div>
                  <div className="relative h-4 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className={cn("absolute inset-y-0 left-0 bg-gradient-to-r transition-all duration-1000 ease-out shadow-lg", detail.colors)}
                      style={{ width: `${percentage}%` }}
                    />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-white/40 dark:bg-white/10" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Facet Explorer */}
      <div className="pt-24 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black tracking-tight">Granular Analysis</h2>
          <p className="text-slate-500 font-medium">A deep dive into the 30 facets of your personality.</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {Object.entries(data.scores.facets).sort().map(([facet, score]) => (
            <div key={facet} className="group p-8 glass rounded-[36px] border border-slate-100 dark:border-slate-800 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 text-center space-y-4">
               <div className="text-[10px] font-black uppercase tracking-tighter text-slate-400 group-hover:text-blue-600 transition-colors h-8 flex items-center justify-center leading-tight">
                    {facet}
               </div>
               <div className="text-3xl font-black tabular-nums">{score.toFixed(1)}</div>
               <div className="w-full bg-slate-100 dark:bg-slate-900 h-2 rounded-full overflow-hidden mt-2">
                 <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full transition-all duration-1000 delay-500" style={{ width: `${(score/5)*100}%` }} />
               </div>
            </div>
          ))}
        </div>
        
        {!isFullVersion && (
            <div className="p-8 rounded-[36px] bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 text-center space-y-4 animate-pulse">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">Want more scientific detail?</p>
                <Link href="/?mode=full" className="inline-block py-3 px-8 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl">Take the 120-item Full Version</Link>
            </div>
        )}
      </div>
    </div>
  );
}
