'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ScoreResult {
  scores: {
    domains: Record<string, number>;
    facets: Record<string, number>;
  };
  summary: Record<string, 'High' | 'Neutral' | 'Low'>;
  timeElapsed: number;
}

const domainNames: Record<string, string> = {
  O: 'Openness to Experience',
  C: 'Conscientiousness',
  E: 'Extraversion',
  A: 'Agreeableness',
  N: 'Neuroticism'
};

const domainColors: Record<string, string> = {
  O: 'bg-purple-500',
  C: 'bg-blue-500',
  E: 'bg-yellow-500',
  A: 'bg-green-500',
  N: 'bg-red-500'
};

export function ResultDashboard({ data }: { data: ScoreResult }) {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-12 pb-20">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          Your Personality Profile
        </h1>
        <p className="text-gray-500 font-medium">
          Test completed in {Math.floor(data.timeElapsed / 60)} minutes
        </p>
      </div>

      {/* Main Domains */}
      <div className="grid gap-6">
        {Object.entries(data.scores.domains).map(([key, score]) => {
          const category = data.summary[key];
          const percentage = (score / 5) * 100;
          
          return (
            <div key={key} className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{domainNames[key]}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-black text-gray-800">{score.toFixed(1)}</span>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest",
                      category === 'High' ? "bg-green-100 text-green-700" :
                      category === 'Low' ? "bg-red-100 text-red-700" :
                      "bg-blue-100 text-blue-700"
                    )}>
                      {category}
                    </span>
                  </div>
                </div>
                <div className="text-right text-xs font-medium text-gray-400">
                  Scale: 1.0 — 5.0
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={cn("absolute inset-y-0 left-0 transition-all duration-1000 ease-out", domainColors[key])}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Facets (Optional collapsible or listing) */}
      <div className="pt-8 border-t">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Detailed Facet Breakdown</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(data.scores.facets).sort().map(([facet, score]) => (
            <div key={facet} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{facet}</span>
              <span className="text-sm font-bold text-gray-900">{score.toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
