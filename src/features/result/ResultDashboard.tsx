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
  const isFullVersion = Object.keys(data.scores.facets).length > 10;

  const radarData = [
    { subject: 'Openness', score: data.scores.domains['O'], fullMark: 5 },
    { subject: 'Conscientiousness', score: data.scores.domains['C'], fullMark: 5 },
    { subject: 'Extraversion', score: data.scores.domains['E'], fullMark: 5 },
    { subject: 'Agreeableness', score: data.scores.domains['A'], fullMark: 5 },
    { subject: 'Neuroticism', score: data.scores.domains['N'], fullMark: 5 },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <div className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            {isFullVersion ? 'Full 120-Item Analysis' : 'Quick 30-Item Snapshot'}
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Your Personality Profile</h1>
        </div>
        <p className="text-base text-slate-500 dark:text-slate-400 max-w-2xl">
          Completed in {Math.floor(data.timeElapsed / 60)}m {data.timeElapsed % 60}s.
          Based on the validated IPIP-NEO model.
        </p>
      </div>

      {/* Radar Chart */}
      <div className="p-8 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900">
        <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
          <BarChart size={20} className="text-blue-600" />
          Core Dimensions
        </h2>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid strokeOpacity={0.1} />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '4px',
                  border: '1px solid #e2e8f0',
                  fontSize: '12px',
                  fontWeight: 700,
                }}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#2563eb"
                strokeWidth={2}
                fill="#2563eb"
                fillOpacity={0.15}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Domain Breakdown */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">Detailed Results</h2>
        <div className="grid gap-6">
          {Object.entries(data.scores.domains).map(([key, score]) => {
            const detail = domainDetails[key];
            const category = data.summary[key];
            const percentage = (score / 5) * 100;

            return (
              <div key={key} className="p-8 border border-slate-200 dark:border-slate-800 rounded-lg space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">{detail.name}</h3>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Score: {score.toFixed(1)} / 5.0 • {category}
                    </div>
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded">
                    Confidence: High
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  <span className="font-bold text-slate-900 dark:text-white">{detail.insights[category]}</span>
                  {" "}{detail.description}
                </p>

                <div className="space-y-2">
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Facet Explorer */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">Facet Analysis</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {Object.entries(data.scores.facets).sort().map(([facet, score]) => (
            <div key={facet} className="p-4 border border-slate-100 dark:border-slate-800 rounded-lg text-center space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 truncate px-1">
                {facet}
              </div>
              <div className="text-xl font-bold">{score.toFixed(1)}</div>
              <div className="w-full bg-slate-50 dark:bg-slate-900 h-1 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full" style={{ width: `${(score / 5) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-12 pb-24">
        <button className="flex-1 h-12 bg-blue-600 text-white rounded-md font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2">
          <Share2 size={16} /> Share Results
        </button>
        <button className="flex-1 h-12 border border-slate-200 dark:border-slate-800 rounded-md font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2">
          <Download size={16} /> Download PDF
        </button>
      </div>
    </div>
  );
}
