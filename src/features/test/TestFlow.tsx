'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { LikertScale } from '@/components/ui/LikertScale';
import { useTimer } from '@/hooks/useTimer';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ShieldCheck, Timer, Info } from 'lucide-react';

interface Question {
  id: string;
  text: string;
}

export function TestFlow() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [email, setEmail] = useState('');
  const [sendEmail, setSendEmail] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { seconds, start, stop, setSeconds, isActive } = useTimer();
  const router = useRouter();

  // Load questions and local storage state
  useEffect(() => {
    async function init() {
      try {
        const res = await fetch('/api/questions');
        const data = await res.json();
        setQuestions(data);

        // Restore from localStorage
        const savedAnswers = localStorage.getItem('trait-loop-answers');
        const answersObj = savedAnswers ? JSON.parse(savedAnswers) : {};
        if (savedAnswers) setAnswers(answersObj);

        const savedTimer = localStorage.getItem('trait-loop-timer');
        if (savedTimer) {
          const time = parseInt(savedTimer);
          setSeconds(time);
          if (Object.keys(answersObj).length > 0) start();
        }

        const savedEmail = localStorage.getItem('trait-loop-email');
        if (savedEmail) setEmail(savedEmail);

        setLoading(false);
      } catch (error) {
        console.error('Failed to init test:', error);
      }
    }
    init();
  }, [setSeconds, start]);

  // Sync with localStorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('trait-loop-answers', JSON.stringify(answers));
      localStorage.setItem('trait-loop-timer', seconds.toString());
      localStorage.setItem('trait-loop-email', email);
    }
  }, [answers, seconds, email, loading]);

  const handleAnswer = useCallback((qId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
    if (!isActive) start();
  }, [isActive, start]);

  const progress = questions.length > 0 ? (Object.keys(answers).length / questions.length) * 100 : 0;
  const isComplete = questions.length > 0 && Object.keys(answers).length === questions.length;

  const handleSubmit = async () => {
    if (!isComplete) return;
    setSubmitting(true);
    stop();

    try {
      const res = await fetch('/api/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          email,
          sendEmail,
          timeElapsed: seconds,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.removeItem('trait-loop-answers');
        localStorage.removeItem('trait-loop-timer');
        router.push(`/result/${data.testId}`);
      } else {
        alert(data.message || 'Submission failed');
        setSubmitting(false);
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">Initializing assessment questions...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
      {/* Privacy Badge */}
      <div className="flex items-center justify-center gap-2 mb-8 py-2 px-4 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100 w-fit mx-auto">
        <ShieldCheck size={14} />
        Secure & Private
      </div>

      {/* Progress Header */}
      <div className="sticky top-[72px] z-30 mb-12 glass rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/20">
        <div className="flex justify-between items-end mb-4">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">Completion</span>
            <div className="text-2xl font-black">{Math.round(progress)}%</div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
              <Timer size={12} /> Time Elapsed
            </span>
            <div className="text-xl font-mono font-bold text-slate-700 dark:text-slate-300">
              {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}
            </div>
          </div>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(37,99,235,0.4)]" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Instructions Info */}
      <div className="flex gap-4 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-3xl border border-blue-100 dark:border-blue-800 mb-16">
        <div className="text-blue-600 pt-1"><Info size={20} /></div>
        <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed font-medium">
          There are no right or wrong answers. Describe yourself as you generally are now, not as you wish to be in the future. 
          Your first instinct is usually the most accurate.
        </p>
      </div>

      {/* Questions List */}
      <div className="space-y-24 pb-48">
        {questions.map((q, idx) => (
          <div key={q.id} className="group space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${(idx % 5) * 100}ms` }}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {idx + 1}
                </span>
                <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 pr-4 leading-tight">
                {q.text}
              </h3>
            </div>
            <LikertScale 
              value={answers[q.id] || 0} 
              onChange={(val) => handleAnswer(q.id, val)} 
            />
          </div>
        ))}
      </div>

      {/* Sticky Footer Submission */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl z-40">
        <div className="glass shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[32px] p-6 md:p-8 border border-white/40 dark:border-slate-800 overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-4 w-full md:w-auto">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input 
                  type="email" 
                  placeholder="name@example.com (optional)"
                  className="w-full sm:w-72 px-5 py-3 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 transition-all font-medium text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0">
                  <input 
                    type="checkbox" 
                    checked={sendEmail} 
                    onChange={(e) => setSendEmail(e.target.checked)}
                    className="w-5 h-5 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Email results</span>
                </label>
              </div>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={!isComplete || submitting}
              className={cn(
                "w-full md:w-auto px-12 py-4 rounded-2xl font-black text-lg transition-all shadow-2xl active:scale-95",
                isComplete && !submitting
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/30"
                  : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed"
              )}
            >
              {submitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </div>
              ) : (
                'Generate My Profile'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
