import React from 'react';
import { cn } from '@/lib/utils'; // Assuming standard shadcn/tailwind merge utility

interface LikertScaleProps {
  value: number;
  onChange: (value: number) => void;
}

const labels = [
  'Strongly Disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly Agree'
];

export function LikertScale({ value, onChange }: LikertScaleProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 w-full max-w-2xl">
      {labels.map((label, index) => {
        const score = index + 1;
        const isActive = value === score;
        
        return (
          <button
            key={score}
            onClick={() => onChange(score)}
            className={cn(
              "flex-1 w-full py-3 px-2 text-xs font-medium rounded-lg border-2 transition-all duration-200",
              "hover:border-blue-400 hover:bg-blue-50",
              isActive 
                ? "border-blue-600 bg-blue-100 text-blue-700 ring-2 ring-blue-200" 
                : "border-gray-200 bg-white text-gray-600"
            )}
          >
            <div className="mb-1 text-lg font-bold">{score}</div>
            <div className="hidden sm:block">{label}</div>
          </button>
        );
      })}
    </div>
  );
}
