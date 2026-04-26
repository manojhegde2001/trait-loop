'use client';

import React, { useEffect, useState } from 'react';
import { ResultDashboard } from '@/features/result/ResultDashboard';
import { useParams } from 'next/navigation';

export default function ResultPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/result/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(setData)
      .catch(() => setError(true));
  }, [id]);

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Result Not Found</h1>
      <p className="text-slate-500 dark:text-slate-400">The test result you are looking for does not exist or has been deleted.</p>
      <a href="/" className="px-6 py-2 bg-blue-600 text-white rounded-md font-bold">Go Home</a>
    </div>
  );

  if (!data) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-slate-400 font-bold text-sm uppercase tracking-widest">
        Generating Report...
      </div>
    </div>
  );

  return <ResultDashboard data={data} />;
}
