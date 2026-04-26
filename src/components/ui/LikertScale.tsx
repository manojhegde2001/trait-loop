'use client';

import React, { useCallback } from 'react';
import { cn } from '@/lib/utils';

interface LikertScaleProps {
  value: number;
  onChange: (value: number) => void;
  questionId?: string;
}

const scaleOptions = [
  {
    value: 1,
    label: 'Strongly Disagree',
    activeBg: 'bg-red-600',
    activeText: 'text-white',
  },
  {
    value: 2,
    label: 'Disagree',
    activeBg: 'bg-orange-500',
    activeText: 'text-white',
  },
  {
    value: 3,
    label: 'Neutral',
    activeBg: 'bg-slate-500',
    activeText: 'text-white',
  },
  {
    value: 4,
    label: 'Agree',
    activeBg: 'bg-emerald-500',
    activeText: 'text-white',
  },
  {
    value: 5,
    label: 'Strongly Agree',
    activeBg: 'bg-blue-600',
    activeText: 'text-white',
  },
];

export function LikertScale({ value, onChange, questionId }: LikertScaleProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, optValue: number) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onChange(optValue);
      }
    },
    [onChange]
  );

  return (
    <div
      role="radiogroup"
      aria-label="Rate your agreement with this statement"
      className="w-full space-y-2"
    >
      <div className="flex w-full gap-1.5">
        {scaleOptions.map((opt) => {
          const isActive = value === opt.value;

          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={opt.label}
              id={questionId ? `${questionId}-opt-${opt.value}` : undefined}
              tabIndex={0}
              onClick={() => onChange(opt.value)}
              onKeyDown={(e) => handleKeyDown(e, opt.value)}
              className={cn(
                'likert-option flex-1 py-4 border rounded font-bold text-sm',
                isActive
                  ? cn(opt.activeBg, opt.activeText, 'border-transparent')
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
              )}
            >
              {opt.value}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
        <span>Disagree</span>
        <span>Agree</span>
      </div>
    </div>
  );
}
