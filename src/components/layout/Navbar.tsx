'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function Navbar() {
  const pathname = usePathname();
  
  // Hide main CTAs on test and result pages
  const isAssessmentRoute = pathname?.startsWith('/test') || pathname?.startsWith('/result');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <nav className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
          TRAITLOOP
        </Link>
        <div className="flex gap-4 sm:gap-8 items-center">
          {!isAssessmentRoute && (
            <>
              <Link href="/test" className="hidden sm:block text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600">Start Test</Link>
              <div className="w-px h-5 bg-slate-200 dark:bg-slate-800 hidden sm:block" />
            </>
          )}
          
          <ThemeToggle />
          
          {!isAssessmentRoute && (
            <Link 
              href="/test" 
              className="px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-md hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
