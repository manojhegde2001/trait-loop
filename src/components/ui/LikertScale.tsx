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
    emoji: '😠',
    label: 'Strongly Disagree',
    shortLabel: 'Strongly\nDisagree',
    // Active state
    activeBorder: 'border-rose-500',
    activeBg: 'bg-rose-50 dark:bg-rose-950/60',
    activeText: 'text-rose-600 dark:text-rose-400',
    activeRing: 'ring-rose-400/25',
    activeNum: 'text-rose-600 dark:text-rose-400',
    activeLabel: 'text-rose-600 dark:text-rose-400',
  },
  {
    value: 2,
    emoji: '😕',
    label: 'Disagree',
    shortLabel: 'Disagree',
    activeBorder: 'border-orange-500',
    activeBg: 'bg-orange-50 dark:bg-orange-950/60',
    activeText: 'text-orange-600 dark:text-orange-400',
    activeRing: 'ring-orange-400/25',
    activeNum: 'text-orange-600 dark:text-orange-400',
    activeLabel: 'text-orange-600 dark:text-orange-400',
  },
  {
    value: 3,
    emoji: '😐',
    label: 'Neutral',
    shortLabel: 'Neutral',
    activeBorder: 'border-slate-500',
    activeBg: 'bg-slate-100 dark:bg-slate-800/60',
    activeText: 'text-slate-700 dark:text-slate-300',
    activeRing: 'ring-slate-400/25',
    activeNum: 'text-slate-700 dark:text-slate-300',
    activeLabel: 'text-slate-600 dark:text-slate-400',
  },
  {
    value: 4,
    emoji: '🙂',
    label: 'Agree',
    shortLabel: 'Agree',
    activeBorder: 'border-teal-500',
    activeBg: 'bg-teal-50 dark:bg-teal-950/60',
    activeText: 'text-teal-600 dark:text-teal-400',
    activeRing: 'ring-teal-400/25',
    activeNum: 'text-teal-600 dark:text-teal-400',
    activeLabel: 'text-teal-600 dark:text-teal-400',
  },
  {
    value: 5,
    emoji: '😄',
    label: 'Strongly Agree',
    shortLabel: 'Strongly\nAgree',
    activeBorder: 'border-blue-600',
    activeBg: 'bg-blue-50 dark:bg-blue-950/60',
    activeText: 'text-blue-700 dark:text-blue-400',
    activeRing: 'ring-blue-400/25',
    activeNum: 'text-blue-700 dark:text-blue-400',
    activeLabel: 'text-blue-700 dark:text-blue-400',
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

  const selectedOpt = scaleOptions.find((o) => o.value === value);

  return (
    <div
      role="radiogroup"
      aria-label="Rate your agreement with this statement"
      className="w-full space-y-3"
    >
      {/* ── Button row ── */}
      <div className="flex w-full gap-2">
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
                'likert-option',
                isActive
                  ? cn(opt.activeBorder, opt.activeBg, 'ring-4', opt.activeRing, 'scale-[1.05]')
                  : 'unselected'
              )}
            >
              {/* Emoji */}
              <span
                className={cn(
                  'text-2xl leading-none select-none transition-all duration-200',
                  isActive
                    ? 'scale-110 drop-shadow-sm'
                    : 'opacity-45 grayscale-[60%] hover:opacity-75 hover:grayscale-0'
                )}
                aria-hidden="true"
              >
                {opt.emoji}
              </span>

              {/* Number badge */}
              <span
                className={cn(
                  'text-xs font-black leading-none tabular-nums transition-colors',
                  isActive
                    ? opt.activeNum
                    : 'text-slate-400 dark:text-slate-500'
                )}
              >
                {opt.value}
              </span>

              {/* Selected checkmark */}
              {isActive && (
                <span
                  className="absolute top-1.5 right-1.5 animate-check-pop"
                  aria-hidden="true"
                >
                  <svg
                    className={cn('w-3.5 h-3.5', opt.activeText)}
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="2.5,7 5.5,10 11.5,4" />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Label row (desktop) — high contrast slate-600 ── */}
      <div className="hidden sm:flex w-full" aria-hidden="true">
        {scaleOptions.map((opt) => {
          const isActive = value === opt.value;
          return (
            <div key={opt.value} className="flex-1 flex justify-center px-0.5">
              <span
                className={cn(
                  'text-[10px] font-bold text-center leading-snug whitespace-pre-line transition-colors',
                  isActive
                    ? opt.activeLabel
                    : 'text-slate-600 dark:text-slate-500' // slate-600 = 7:1 on white
                )}
              >
                {opt.shortLabel}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Active label pill (mobile) ── */}
      <div className="sm:hidden h-5 flex items-center justify-center" aria-live="polite">
        {selectedOpt && (
          <span
            className={cn(
              'text-[11px] font-black uppercase tracking-wider animate-slide-up',
              selectedOpt.activeLabel
            )}
          >
            {selectedOpt.label}
          </span>
        )}
      </div>
    </div>
  );
}
