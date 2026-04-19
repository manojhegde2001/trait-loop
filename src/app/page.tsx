import React from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Dna, 
  BrainCircuit, 
  ArrowRight, 
  ShieldCheck, 
  Microscope,
  Sparkles
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 overflow-hidden flex flex-col items-center justify-center text-center px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-blue-50/50 dark:from-blue-900/20 -z-10" />
        
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest border border-blue-100 dark:border-blue-800 mb-8">
            <Sparkles size={14} /> The Gold Standard of Personality Science
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-8 max-w-4xl mx-auto">
            Unlock Your <span className="text-gradient">Psychological</span> Blueprint
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            Based on the world-renowned IPIP-NEO model, TraitLoop provides an ultra-precise analysis of your personality across five core domains.
          </p>
        </div>

        {/* Mode Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          {/* Quick Mode */}
          <Link href="/test?mode=quick" className="group relative">
            <div className="h-full p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 shadow-xl shadow-slate-200/20 dark:shadow-none hover:shadow-blue-500/10 hover:-translate-y-1 flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap size={24} />
              </div>
              <h3 className="text-2xl font-black mb-2">Quick Snapshot</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8 flex-grow">
                Get a high-level overview of your top traits in just 3 minutes. Perfect for a fast professional profile.
              </p>
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">30 Questions</span>
                <div className="flex items-center gap-2 font-black text-blue-600">
                  Starts <ArrowRight size={18} />
                </div>
              </div>
            </div>
          </Link>

          {/* Full Mode */}
          <Link href="/test?mode=full" className="group relative">
            <div className="h-full p-8 rounded-[32px] border-2 border-slate-900 dark:border-blue-500 bg-slate-900 dark:bg-slate-900 text-white hover:border-blue-400 transition-all duration-300 shadow-2xl shadow-blue-500/10 hover:-translate-y-1 flex flex-col items-start text-left">
              <div className="absolute -top-3 right-8 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
                Recommended
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Microscope size={24} />
              </div>
              <h3 className="text-2xl font-black mb-2">Scientific Depth</h3>
              <p className="text-slate-300 text-sm font-medium mb-8 flex-grow">
                The full 120-item deep dive. Unlock detailed facet analysis used by professional psychologists worldwide.
              </p>
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">120 Questions</span>
                <div className="flex items-center gap-2 font-black text-blue-400">
                  Full Access <ArrowRight size={18} />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="w-full py-16 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex items-center gap-4">
             <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-sm text-blue-600 text-6xl">
                <ShieldCheck />
             </div>
             <div>
                <h4 className="font-black text-lg">100% Private</h4>
                <p className="text-sm text-slate-500 font-medium">Your data is never sold or shared.</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-sm text-indigo-600">
                <BrainCircuit />
             </div>
             <div>
                <h4 className="font-black text-lg">Open Source</h4>
                <p className="text-sm text-slate-500 font-medium">Built on validated IPIP-NEO research.</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-sm text-blue-400">
                <Dna />
             </div>
             <div>
                <h4 className="font-black text-lg">Dynamic Analysis</h4>
                <p className="text-sm text-slate-500 font-medium">Real-time calculations as you go.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Model Breakdown */}
      <section className="max-w-7xl mx-auto py-32 px-6">
        <div className="flex flex-col md:flex-row gap-20 items-center">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl md:text-5xl font-black">Powered by the OCEAN Model</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Psychologists categorize personality into five broad domains. Our test goes deeper, analyzing 30 distinct facets to give you a profile that is uniquely yours.
            </p>
            <div className="space-y-4">
              {[
                { label: 'Openness', desc: 'Curiosity and preference for novelty.' },
                { label: 'Conscientiousness', desc: 'Organization and dependability.' },
                { label: 'Extraversion', desc: 'Sociability and assertiveness.' },
                { label: 'Agreeableness', desc: 'Compassion and cooperation.' },
                { label: 'Neuroticism', desc: 'Sensitivity and emotional range.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start p-4 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-2xl transition-colors group">
                  <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black shrink-0 group-hover:scale-110 transition-transform">{item.label[0]}</span>
                  <div>
                    <h5 className="font-black leading-none mb-1">{item.label}</h5>
                    <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full flex justify-center">
             <div className="relative w-full max-w-md aspect-square glass rounded-[40px] border border-slate-200 p-8 shadow-2xl flex items-center justify-center animate-pulse duration-[4000ms]">
                <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full" />
                <BrainCircuit size={200} className="text-blue-600 relative z-10 opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-64 h-64 border-2 border-dashed border-blue-200 rounded-full animate-spin duration-[20s]" />
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
