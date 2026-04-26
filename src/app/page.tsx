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
      <section className="relative w-full py-16 md:py-24 flex flex-col items-center justify-center text-center px-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-6">
            Scientific Personality Assessment
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl mx-auto text-slate-900 dark:text-white">
            Unlock Your Psychological Blueprint
          </h1>
          <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Based on the world-renowned IPIP-NEO model, TraitLoop provides an ultra-precise analysis of your personality across five core domains.
          </p>
        </div>

        {/* Mode Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* Quick Mode */}
          <Link href="/test?mode=quick" className="group">
            <div className="h-full p-8 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 dark:hover:border-blue-400 transition-colors flex flex-col items-start text-left">
              <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 flex items-center justify-center mb-6">
                <Zap size={20} />
              </div>
              <h3 className="text-xl font-bold mb-2">Quick Snapshot</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-grow">
                Get a high-level overview of your top traits in just 3 minutes. Perfect for a fast professional profile.
              </p>
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">30 Questions</span>
                <div className="flex items-center gap-2 font-bold text-blue-600 text-sm">
                  Start Test <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </Link>

          {/* Full Mode */}
          <Link href="/test?mode=full" className="group">
            <div className="h-full p-8 rounded-lg border border-slate-900 dark:border-slate-700 bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors flex flex-col items-start text-left">
              <div className="w-10 h-10 rounded bg-white/10 text-white flex items-center justify-center mb-6">
                <Microscope size={20} />
              </div>
              <h3 className="text-xl font-bold mb-2">Scientific Depth</h3>
              <p className="text-slate-400 text-sm mb-6 flex-grow">
                The full 120-item deep dive. Unlock detailed facet analysis used by professional psychologists worldwide.
              </p>
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">120 Questions</span>
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  Full Access <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="w-full py-12 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
             <div className="text-slate-400 text-3xl">
                <ShieldCheck />
             </div>
             <div>
                <h4 className="font-bold text-base">100% Private</h4>
                <p className="text-xs text-slate-500">Your data is never sold or shared.</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-slate-400 text-3xl">
                <BrainCircuit />
             </div>
             <div>
                <h4 className="font-bold text-base">Open Source</h4>
                <p className="text-xs text-slate-500">Built on validated IPIP-NEO research.</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-slate-400 text-3xl">
                <Dna />
             </div>
             <div>
                <h4 className="font-bold text-base">Dynamic Analysis</h4>
                <p className="text-xs text-slate-500">Real-time calculations as you go.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Model Breakdown */}
      <section className="max-w-4xl mx-auto py-24 px-6">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Powered by the OCEAN Model</h2>
            <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Psychologists categorize personality into five broad domains. Our test goes deeper, analyzing 30 distinct facets to give you a profile that is uniquely yours.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Openness', desc: 'Curiosity and preference for novelty.' },
              { label: 'Conscientiousness', desc: 'Organization and dependability.' },
              { label: 'Extraversion', desc: 'Sociability and assertiveness.' },
              { label: 'Agreeableness', desc: 'Compassion and cooperation.' },
              { label: 'Neuroticism', desc: 'Sensitivity and emotional range.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start p-6 border border-slate-100 dark:border-slate-800 rounded-lg">
                <span className="w-6 h-6 rounded bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center text-xs font-bold shrink-0">{item.label[0]}</span>
                <div>
                  <h5 className="font-bold text-sm mb-1">{item.label}</h5>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
