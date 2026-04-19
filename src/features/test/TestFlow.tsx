'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { LikertScale } from '@/components/ui/LikertScale';
import { useTimer } from '@/hooks/useTimer';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

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
        if (savedAnswers) setAnswers(JSON.parse(savedAnswers));

        const savedTimer = localStorage.getItem('trait-loop-timer');
        if (savedTimer) {
          const time = parseInt(savedTimer);
          setSeconds(time);
          if (Object.keys(JSON.parse(savedAnswers || '{}')).length > 0) start();
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
    localStorage.setItem('trait-loop-answers', JSON.stringify(answers));
    localStorage.setItem('trait-loop-timer', seconds.toString());
    localStorage.setItem('trait-loop-email', email);
  }, [answers, seconds, email]);

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

  if (loading) return <div className="flex items-center justify-center min-h-[400px]">Loading questions...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8">
      {/* Progress Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 py-4 border-b">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-600">Progress: {Math.round(progress)}%</span>
          <span className="text-sm font-mono text-gray-500">Time: {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-12 pb-24">
        {questions.map((q, idx) => (
          <div key={q.id} className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              <span className="text-gray-400 mr-2">{idx + 1}.</span>
              {q.text}
            </h3>
            <LikertScale 
              value={answers[q.id] || 0} 
              onChange={(val) => handleAnswer(q.id, val)} 
            />
          </div>
        ))}
      </div>

      {/* Footer Submission */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 sm:p-6 shadow-2xl">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <input 
              type="email" 
              placeholder="Your email (optional)"
              className="px-4 py-2 border rounded-lg w-full sm:w-64"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input 
                type="checkbox" 
                checked={sendEmail} 
                onChange={(e) => setSendEmail(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600"
              />
              Send results to my email
            </label>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={!isComplete || submitting}
            className={cn(
              "w-full sm:w-auto px-8 py-3 rounded-xl font-bold transition-all",
              isComplete && !submitting
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            {submitting ? 'Submitting...' : 'Complete Test'}
          </button>
        </div>
      </div>
    </div>
  );
}
