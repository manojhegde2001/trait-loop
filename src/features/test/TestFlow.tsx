'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { LikertScale } from '@/components/ui/LikertScale';
import { useTimer } from '@/hooks/useTimer';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Badge } from 'rizzui';
import {
  FiChevronLeft,
  FiChevronRight,
  FiArrowRight,
  FiShield,
  FiClock,
  FiAward,
  FiCheckCircle,
  FiZap,
  FiBookOpen,
  FiLock,
  FiRefreshCw,
  FiMail,
} from 'react-icons/fi';

interface Question {
  id: string;
  text: string;
}

const QUESTIONS_PER_PAGE = 5;

// OCEAN accent colours – border-left tint per global question index
const ACCENT_BORDERS = [
  'border-l-blue-500',    // O
  'border-l-violet-500',  // C
  'border-l-amber-500',   // E
  'border-l-teal-500',    // A
  'border-l-rose-500',    // N
];

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = (s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}


function CompleteScreen({
  seconds,
  answeredCount,
  mode,
  email,
  sendEmail,
  submitting,
  onEmailChange,
  onSendEmailChange,
  onSubmit,
}: {
  seconds: number;
  answeredCount: number;
  mode: string;
  email: string;
  sendEmail: boolean;
  submitting: boolean;
  onEmailChange: (v: string) => void;
  onSendEmailChange: (v: boolean) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-8 md:p-10 space-y-8 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Assessment Complete</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Your responses are ready. Reveal your personality profile below.
          </p>
        </div>

        <div className="flex justify-center gap-8 py-4 border-y border-slate-100 dark:border-slate-800">
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Answered</div>
            <div className="text-xl font-bold">{answeredCount}</div>
          </div>
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Time</div>
            <div className="text-xl font-bold">{formatTime(seconds)}</div>
          </div>
        </div>

        <div className="space-y-4 text-left">
          <input
            type="email"
            placeholder="Email (Optional)"
            className="w-full px-4 py-3 rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:border-blue-500 text-sm"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={sendEmail}
              onChange={(e) => onSendEmailChange(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300"
            />
            <span className="text-xs text-slate-600 dark:text-slate-400">Email me a copy of my results</span>
          </label>

          <button
            onClick={onSubmit}
            disabled={submitting}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-md transition-colors"
          >
            {submitting ? 'Processing...' : 'Reveal Results'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function TestFlow() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'full';

  const [questions, setQuestions]   = useState<Question[]>([]);
  const [answers, setAnswers]       = useState<Record<string, number>>({});
  const [email, setEmail]           = useState('');
  const [sendEmail, setSendEmail]   = useState(false);
  const [loading, setLoading]       = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab]   = useState<'test' | 'complete'>('test');
  const [currentPage, setCurrentPage] = useState(0);

  const { seconds, start, stop, setSeconds, isActive } = useTimer();
  const router = useRouter();

  useEffect(() => {
    async function init() {
      try {
        const res  = await fetch(`/api/questions?mode=${mode}`);
        const data = await res.json();
        setQuestions(data);

        const savedAnswers = localStorage.getItem(`trait-loop-answers-${mode}`);
        const answersObj   = savedAnswers ? JSON.parse(savedAnswers) : {};
        if (savedAnswers) {
          setAnswers(answersObj);
          const lastIdx = Object.keys(answersObj).length;
          const page    = Math.floor(lastIdx / QUESTIONS_PER_PAGE);
          setCurrentPage(page >= Math.ceil(data.length / QUESTIONS_PER_PAGE) ? 0 : page);
          if (Object.keys(answersObj).length > 0) setActiveTab('test');
        }

        const savedTimer = localStorage.getItem(`trait-loop-timer-${mode}`);
        if (savedTimer) {
          const time = parseInt(savedTimer);
          setSeconds(time);
          if (Object.keys(answersObj).length > 0) start();
        }

        const savedEmail = localStorage.getItem('trait-loop-email');
        if (savedEmail) setEmail(savedEmail);

        setLoading(false);
        start();
      } catch (err) {
        console.error('Failed to init test:', err);
      }
    }
    init();
  }, [mode, setSeconds, start]);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(`trait-loop-answers-${mode}`, JSON.stringify(answers));
      localStorage.setItem(`trait-loop-timer-${mode}`, seconds.toString());
      localStorage.setItem('trait-loop-email', email);
    }
  }, [answers, seconds, email, loading, mode]);

  const handleAnswer = useCallback(
    (qId: string, value: number) => {
      setAnswers((prev) => ({ ...prev, [qId]: value }));
      if (!isActive) start();
    },
    [isActive, start]
  );

  const progress = questions.length > 0
    ? (Object.keys(answers).length / questions.length) * 100
    : 0;

  const isComplete = questions.length > 0
    && Object.keys(answers).length === questions.length;

  const paginatedQuestions = useMemo(
    () => questions.slice(currentPage * QUESTIONS_PER_PAGE, (currentPage + 1) * QUESTIONS_PER_PAGE),
    [questions, currentPage]
  );

  const isPageComplete = useMemo(
    () => paginatedQuestions.every((q) => answers[q.id] !== undefined),
    [paginatedQuestions, answers]
  );

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (isComplete) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      setActiveTab('complete');
      stop();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((p) => p - 1);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleSubmit = async () => {
    if (!isComplete) return;
    setSubmitting(true);
    try {
      const res  = await fetch('/api/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, email, sendEmail, timeElapsed: seconds }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.removeItem(`trait-loop-answers-${mode}`);
        localStorage.removeItem(`trait-loop-timer-${mode}`);
        router.push(`/result/${data.testId}`);
      } else {
        alert(data.message || 'Submission failed');
        setSubmitting(false);
      }
    } catch (err) {
      console.error('Submit error:', err);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Loading...</p>
      </div>
    );
  }


  if (activeTab === 'complete') {
    return (
      <CompleteScreen
        seconds={seconds}
        answeredCount={Object.keys(answers).length}
        mode={mode}
        email={email}
        sendEmail={sendEmail}
        submitting={submitting}
        onEmailChange={setEmail}
        onSendEmailChange={setSendEmail}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col">
      <div className="sticky top-18 left-0 w-full z-40 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900">
        <div className="h-1 w-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="max-w-4xl mx-auto px-6 h-12 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Page {currentPage + 1} of {totalPages}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Time: {formatTime(seconds)}
          </span>
        </div>
      </div>

      <div className="flex-1 w-full max-w-3xl mx-auto px-6 pt-8 pb-32">
        <div className="space-y-6">
          {paginatedQuestions.map((q, idx) => {
            const globalIdx = currentPage * QUESTIONS_PER_PAGE + idx;
            return (
              <div key={q.id} className="p-6 border border-slate-200 dark:border-slate-800 rounded-lg space-y-6">
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Question {globalIdx + 1}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                    {q.text}
                  </h2>
                </div>
                <LikertScale
                  value={answers[q.id] || 0}
                  onChange={(val) => handleAnswer(q.id, val)}
                  questionId={q.id}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 z-50">
        <div className="max-w-3xl mx-auto flex justify-between gap-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="px-6 py-2 border border-slate-200 dark:border-slate-800 rounded text-sm font-bold disabled:opacity-30"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={!isPageComplete}
            className="px-6 py-2 bg-blue-600 text-white rounded text-sm font-bold disabled:opacity-30"
          >
            {currentPage === totalPages - 1 ? 'Finalize' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
