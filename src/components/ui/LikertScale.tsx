import React from 'react';
import { cn } from '@/lib/utils';

interface LikertScaleProps {
  value: number;
  onChange: (value: number) => void;
}

const scaleOptions = [
  { value: 1, label: 'Strongly Disagree', color: 'hover:border-red-400 hover:bg-red-50', active: 'border-red-500 bg-red-50 text-red-700 ring-4 ring-red-100' },
  { value: 2, label: 'Disagree', color: 'hover:border-orange-400 hover:bg-orange-50', active: 'border-orange-500 bg-orange-50 text-orange-700 ring-4 ring-orange-100' },
  { value: 3, label: 'Neutral', color: 'hover:border-gray-400 hover:bg-gray-50', active: 'border-gray-500 bg-gray-50 text-gray-700 ring-4 ring-gray-100' },
  { value: 4, label: 'Agree', color: 'hover:border-emerald-400 hover:bg-emerald-50', active: 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-4 ring-emerald-100' },
  { value: 5, label: 'Strongly Agree', color: 'hover:border-blue-400 hover:bg-blue-50', active: 'border-blue-500 bg-blue-50 text-blue-700 ring-4 ring-blue-100' },
];

export function LikertScale({ value, onChange }: LikertScaleProps) {
  return (
    <div className="grid grid-cols-5 gap-2 sm:gap-4 w-full">
      {scaleOptions.map((opt) => {
        const isActive = value === opt.value;
        
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={cn(
              "group relative flex flex-col items-center justify-center py-5 px-1 rounded-2xl border-2 transition-all duration-300 transform active:scale-95",
              opt.color,
              isActive 
                ? opt.active
                : "border-slate-100 bg-white dark:bg-slate-900 dark:border-slate-800 text-slate-500 dark:text-slate-400"
            )}
          >
            <div className={cn(
              "mb-2 text-2xl font-black transition-colors",
              isActive ? "text-inherit" : "text-slate-200 dark:text-slate-700 group-hover:text-slate-400"
            )}>
              {opt.value}
            </div>
            <div className={cn(
                "hidden md:block text-[10px] font-bold uppercase tracking-wider text-center px-1",
                isActive ? "opacity-100" : "opacity-40 group-hover:opacity-100"
            )}>
              {opt.label}
            </div>
            
            {/* Mobile indicator for the dot */}
            <div className={cn(
              "mt-1 w-1.5 h-1.5 rounded-full md:hidden",
              isActive ? "bg-current" : "bg-slate-200 dark:bg-slate-700"
            )} />
          </button>
        );
      })}
    </div>
  );
}
