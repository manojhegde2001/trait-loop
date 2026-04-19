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

/* ══════════════════════════════════════════════════════════
   WELCOME SCREEN
══════════════════════════════════════════════════════════ */
function WelcomeScreen({
  mode,
  questionCount,
  onStart,
}: {
  mode: string;
  questionCount: number;
  onStart: () => void;
}) {
  const isQuick = mode === 'quick';
  const estimatedMinutes = isQuick ? '3–4' : '15–20';

  const features = [
    { icon: FiClock,       text: `~${estimatedMinutes} minutes to complete` },
    { icon: FiRefreshCw,   text: 'Auto-saves — resume any time' },
    { icon: FiShield,      text: 'Private — your data is never sold' },
    { icon: FiAward,       text: 'Validated IPIP-NEO model' },
  ];

  const traits = [
    { letter: 'O', name: 'Openness',          cls: 'bg-blue-100   text-blue-800   dark:bg-blue-900/50  dark:text-blue-200' },
    { letter: 'C', name: 'Conscientiousness', cls: 'bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-200' },
    { letter: 'E', name: 'Extraversion',      cls: 'bg-amber-100  text-amber-800  dark:bg-amber-900/50  dark:text-amber-200' },
    { letter: 'A', name: 'Agreeableness',     cls: 'bg-teal-100   text-teal-800   dark:bg-teal-900/50   dark:text-teal-200' },
    { letter: 'N', name: 'Neuroticism',       cls: 'bg-rose-100   text-rose-800   dark:bg-rose-900/50   dark:text-rose-200' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 relative overflow-hidden">
      {/* Soft background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-500/6 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-violet-500/5 dark:bg-violet-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700">

        {/* ── Card wrapper ── */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">

          {/* Top colour bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-violet-500 to-teal-400" />

          <div className="px-8 sm:px-12 py-10 sm:py-12 space-y-8">

            {/* Icon + heading */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <FiBookOpen size={28} className="text-white" />
                </div>
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-1.5">
                  <FiZap size={10} />
                  {isQuick ? 'Quick Snapshot' : 'Scientific Depth'} &bull; {questionCount} Questions
                </div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                  Discover Your&nbsp;
                  <span className="text-gradient">OCEAN Profile</span>
                </h1>
              </div>
            </div>

            {/* Instruction copy */}
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Answer based on how you <em className="not-italic font-semibold text-slate-800 dark:text-slate-200">typically</em> behave — not how you&apos;d like to.
              There are no right or wrong answers.
            </p>

            {/* OCEAN trait pills */}
            <div className="flex flex-wrap gap-2" aria-label="Dimensions measured">
              {traits.map((t) => (
                <span
                  key={t.letter}
                  className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold', t.cls)}
                  title={t.name}
                >
                  <span className="font-black">{t.letter}</span>
                  <span className="hidden sm:inline opacity-90">{t.name}</span>
                </span>
              ))}
            </div>

            {/* Feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700"
                >
                  <f.icon className="shrink-0 text-blue-500 dark:text-blue-400" size={15} />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {f.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="space-y-3 pt-1">
              <button
                onClick={onStart}
                className="group relative w-full h-14 rounded-2xl font-black text-base text-white overflow-hidden shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                aria-label="Begin personality assessment"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 animate-gradient-x" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Begin Assessment
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={17} />
                </span>
              </button>

              <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-500 font-medium">
                <FiLock size={10} />
                Encrypted &bull; Anonymous &bull; Free forever
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   COMPLETE SCREEN
══════════════════════════════════════════════════════════ */
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
  const stats = [
    { label: 'Answered',  value: String(answeredCount), icon: '✓' },
    { label: 'Time',      value: formatTime(seconds),   icon: '⏱' },
    { label: 'Mode',      value: mode === 'quick' ? 'Quick' : 'Full', icon: '🏷' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/6 dark:bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg mx-auto animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500" />

          <div className="px-8 sm:px-10 py-10 space-y-8">
            {/* Success icon */}
            <div className="flex justify-center">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-2 border-emerald-400/40 animate-ring-pulse" />
                <div className="absolute inset-0 rounded-full border-2 border-emerald-400/25 animate-ring-pulse [animation-delay:0.6s]" />
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-xl shadow-emerald-500/30">
                  <FiCheckCircle size={38} className="text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                Assessment Complete!
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                Your responses are ready to be analysed.<br />
                Reveal your full OCEAN personality profile below.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center gap-1.5 py-4 px-2 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center"
                >
                  <span className="text-xl leading-none" aria-hidden="true">{s.icon}</span>
                  <span className="text-lg font-black text-slate-900 dark:text-white tabular-nums">{s.value}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-500">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Email + submit */}
            <div className="space-y-4">
              <div className="relative">
                <FiMail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  placeholder="Email (Optional — leave blank to skip)"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm font-semibold text-slate-800 dark:text-slate-200 placeholder:text-slate-500"
                  value={email}
                  onChange={(e) => onEmailChange(e.target.value)}
                  aria-label="Email address for results"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={sendEmail}
                  onChange={(e) => onSendEmailChange(e.target.checked)}
                  className="w-4.5 h-4.5 rounded border-slate-300 cursor-pointer accent-blue-600"
                  aria-label="Email me a copy of my results"
                />
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
                  Yes, email me a copy of my results
                </span>
              </label>

              <button
                onClick={onSubmit}
                disabled={submitting}
                className={cn(
                  'group relative w-full h-13 py-3.5 rounded-2xl font-black text-base text-white overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                  submitting
                    ? 'opacity-70 cursor-wait'
                    : 'hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30 shadow-lg shadow-blue-500/20'
                )}
                aria-label="Reveal my personality profile"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 animate-gradient-x" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing…
                    </>
                  ) : (
                    <>
                      Reveal Results (No Email Required)
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                    </>
                  )}
                </span>
              </button>

              <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-500 font-medium">
                <FiLock size={9} />
                Results are private and never shared
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN TESTFLOW
══════════════════════════════════════════════════════════ */
export function TestFlow() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'full';

  const [questions, setQuestions]   = useState<Question[]>([]);
  const [answers, setAnswers]       = useState<Record<string, number>>({});
  const [email, setEmail]           = useState('');
  const [sendEmail, setSendEmail]   = useState(false);
  const [loading, setLoading]       = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab]   = useState<'welcome' | 'test' | 'complete'>('welcome');
  const [currentPage, setCurrentPage] = useState(0);

  const { seconds, start, stop, setSeconds, isActive } = useTimer();
  const router = useRouter();

  /* ── Init ─────────────────────────────────────────── */
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
      } catch (err) {
        console.error('Failed to init test:', err);
      }
    }
    init();
  }, [mode, setSeconds, start]);

  /* ── Persist ──────────────────────────────────────── */
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

  /* ── Derived state ────────────────────────────────── */
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

  const totalPages      = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const answeredOnPage  = paginatedQuestions.filter((q) => answers[q.id] !== undefined).length;
  const remainingOnPage = QUESTIONS_PER_PAGE - answeredOnPage;

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

  /* ── Page dot helper ──────────────────────────────── */
  const isPageDone = (pageIdx: number) =>
    questions
      .slice(pageIdx * QUESTIONS_PER_PAGE, (pageIdx + 1) * QUESTIONS_PER_PAGE)
      .every((q) => answers[q.id] !== undefined);

  /* ────────────────────────────────────────────────── */
  /*  Loading                                           */
  /* ────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-800" />
          <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Loading Assessment
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-600 font-medium">
            Preparing your questions…
          </p>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────── */
  /*  Welcome                                           */
  /* ────────────────────────────────────────────────── */
  if (activeTab === 'welcome') {
    return (
      <WelcomeScreen
        mode={mode}
        questionCount={questions.length}
        onStart={() => { setActiveTab('test'); start(); }}
      />
    );
  }

  /* ────────────────────────────────────────────────── */
  /*  Complete                                          */
  /* ────────────────────────────────────────────────── */
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

  /* ────────────────────────────────────────────────── */
  /*  Test — main view                                  */
  /* ────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">

      {/* ══ Top Bar ════════════════════════════════════ */}
      <div className="sticky top-18 left-0 w-full z-[40] bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
        {/* Progress bar */}
        <div
          className="h-[3px] w-full bg-slate-200 dark:bg-slate-800"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${Math.round(progress)}% complete`}
        >
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Info strip */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-13 flex items-center justify-between gap-4">
          {/* Left — page + count */}
          <div className="flex items-center gap-3 min-w-0">
            <Badge
              variant="flat"
              color="primary"
              className="font-black text-[10px] tracking-tight rounded-lg px-2.5 py-0.5 shrink-0"
            >
              {currentPage + 1} / {totalPages}
            </Badge>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">
              <span className="font-black text-emerald-600 dark:text-emerald-400">{answeredOnPage}</span>
              <span className="text-slate-400 dark:text-slate-600">/5</span>
              <span className="hidden sm:inline text-slate-500 dark:text-slate-400"> answered</span>
            </span>
          </div>

          {/* Center — page dot stepper (md+) */}
          <div className="hidden md:flex items-center gap-1.5" aria-hidden="true">
            {[...Array(totalPages)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-500',
                  i === currentPage
                    ? 'w-6 bg-blue-500'
                    : isPageDone(i)
                    ? 'w-2 bg-emerald-400'
                    : 'w-2 bg-slate-300 dark:bg-slate-700'
                )}
              />
            ))}
          </div>

          {/* Right — timer + privacy */}
          <div className="flex items-center gap-3 shrink-0">
            <span
              className="flex items-center gap-1.5 text-xs font-black font-mono text-slate-600 dark:text-slate-400"
              aria-label={`Time elapsed: ${formatTime(seconds)}`}
            >
              <FiClock className="text-amber-500" size={12} />
              {formatTime(seconds)}
            </span>
            <span className="hidden sm:flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-500">
              <FiShield size={11} /> Encrypted
            </span>
          </div>
        </div>
      </div>

      {/* ══ Question Cards ═════════════════════════════ */}
      {/*
        Layout:
          ≥ 1280px (xl)  → 2-col grid, max-w-6xl
          ≥ 1024px (lg)  → 1-col, max-w-4xl (wider than before)
          < 1024px       → 1-col, full px padding
      */}
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-36">
        <div className="flex flex-col gap-4">
          {paginatedQuestions.map((q, idx) => {
            const globalIdx  = currentPage * QUESTIONS_PER_PAGE + idx;
            const isAnswered = answers[q.id] !== undefined;
            const accentBorder = ACCENT_BORDERS[globalIdx % ACCENT_BORDERS.length];

            return (
              <div
                key={q.id}
                className={cn(
                  'question-card border-l-4 animate-fade-in-up',
                  accentBorder,
                  isAnswered ? 'answered' : 'unanswered'
                )}
              >
                {/* Question meta + number badge */}
                <div className="flex items-start gap-3 mb-5">
                  <div
                    className={cn(
                      'w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300',
                      isAnswered
                        ? 'bg-emerald-500 shadow-md shadow-emerald-500/30 animate-check-pop'
                        : 'bg-blue-600 shadow-md shadow-blue-500/30'
                    )}
                  >
                    {isAnswered
                      ? <FiCheckCircle size={17} className="text-white" />
                      : <span className="text-white text-[11px] font-black">Q{globalIdx + 1}</span>
                    }
                  </div>

                  <div className="flex-1 min-w-0 pt-0.5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">
                      Question {globalIdx + 1} of {questions.length}
                    </p>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug tracking-tight">
                      {q.text}
                    </h2>
                  </div>
                </div>

                {/* Likert scale */}
                <LikertScale
                  value={answers[q.id] || 0}
                  onChange={(val) => handleAnswer(q.id, val)}
                  questionId={q.id}
                />
              </div>
            );
          })}
        </div>

        {/* All-answered nudge */}
        {isPageComplete && (
          <div className="mt-6 flex justify-center animate-in fade-in slide-in-from-bottom-3 duration-400">
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 shadow-sm">
              <FiCheckCircle size={13} />
              <span className="text-xs font-black uppercase tracking-wide">
                All answered — tap{' '}
                {currentPage === totalPages - 1 ? 'Finalize' : 'Continue'}!
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ══ Floating Nav Pill ══════════════════════════ */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 z-[120]">
        {/* Remaining hint — shown above pill only if incomplete */}
        {!isPageComplete && (
          <div className="flex justify-center mb-2.5">
            <div className="flex items-center gap-1.5 bg-slate-900/85 dark:bg-slate-100/85 text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full backdrop-blur-sm shadow-lg">
              {remainingOnPage} question{remainingOnPage !== 1 ? 's' : ''} remaining
            </div>
          </div>
        )}

        <div className="nav-pill px-3 py-2.5 flex items-center justify-between gap-2">
          {/* Back */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={cn(
              'flex items-center gap-1 px-4 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-200',
              currentPage === 0
                ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white active:scale-95'
            )}
            aria-label="Go to previous page"
          >
            <FiChevronLeft size={14} /> Back
          </button>

          {/* Dot stepper — mobile */}
          <div className="flex md:hidden items-center gap-1.5" aria-hidden="true">
            {[...Array(Math.min(totalPages, 12))].map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-400',
                  i === currentPage
                    ? 'w-5 bg-blue-500'
                    : isPageDone(i)
                    ? 'w-1.5 bg-emerald-400'
                    : 'w-1.5 bg-slate-300 dark:bg-slate-700'
                )}
              />
            ))}
          </div>

          {/* Page fraction — desktop */}
          <span className="hidden md:block text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-500">
            Page {currentPage + 1} / {totalPages}
          </span>

          {/* Continue / Finalize */}
          <button
            onClick={handleNextPage}
            disabled={!isPageComplete}
            className={cn(
              'flex items-center gap-1.5 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-200',
              isPageComplete
                ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 hover:scale-[1.03] active:scale-[0.97]'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
            )}
            aria-label={
              isPageComplete
                ? currentPage === totalPages - 1 ? 'Finalize assessment' : 'Go to next page'
                : 'Answer all questions to continue'
            }
          >
            {currentPage === totalPages - 1 ? 'Finalize' : 'Continue'}
            <FiChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
