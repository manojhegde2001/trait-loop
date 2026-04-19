'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TestResult {
  id: string;
  email: string | null;
  emailSent: boolean;
  timeElapsed: number;
  summary: Record<string, string>;
  createdAt: string;
}

export function AdminDashboard() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [secret, setSecret] = useState('');
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);

  // Persistence for secret (for dev convenience)
  useEffect(() => {
    const saved = localStorage.getItem('trait-loop-admin-secret');
    if (saved) setSecret(saved);
  }, []);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/results', {
        headers: { 'x-admin-secret': secret }
      });
      if (res.ok) {
        const data = await res.json();
        setResults(data);
        setIsAuthed(true);
        localStorage.setItem('trait-loop-admin-secret', secret);
      } else {
        setIsAuthed(false);
        alert('Invalid Admin Secret');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async (id: string) => {
    try {
      const res = await fetch('/api/admin/resend-email', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-secret': secret 
        },
        body: JSON.stringify({ resultId: id })
      });
      if (res.ok) {
        alert('Email resent successfully');
        fetchResults(); // Refresh list
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to resend');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/questions/import', {
        method: 'POST',
        headers: { 'x-admin-secret': secret },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Successfully imported ${data.count} questions.`);
      } else {
        alert(data.message || 'Import failed');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b pb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <input 
            type="password" 
            placeholder="Admin Secret"
            className="px-4 py-2 border rounded-lg"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
          <button 
            onClick={fetchResults}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Authenticate
          </button>
        </div>
      </div>

      {!isAuthed ? (
        <div className="text-center py-20 text-gray-400 font-medium">
          Enter admin secret to view results.
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex justify-start items-center gap-4">
            <label className={cn(
              "px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors",
              importing && "opacity-50 cursor-wait"
            )}>
              {importing ? 'Importing...' : 'Import Questions (CSV)'}
              <input type="file" accept=".csv" className="hidden" onChange={handleImport} disabled={importing} />
            </label>
            <button onClick={fetchResults} className="text-sm font-medium text-blue-600 hover:underline">
              Refresh Data
            </button>
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto border rounded-xl shadow-sm">
            <table className="w-full text-left bg-white">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">OCEAN</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {results.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {r.email || <span className="text-gray-300 italic">None</span>}
                    </td>
                    <td className="px-6 py-4">
                      {r.emailSent ? (
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">SENT</span>
                      ) : r.email ? (
                        <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">FAILED</span>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 text-xs font-mono space-x-2">
                       {Object.entries(r.summary).map(([k, v]) => (
                         <span key={k} className={cn(
                           "px-1.5 py-0.5 rounded",
                           v === 'High' ? "bg-green-100 text-green-700" :
                           v === 'Low' ? "bg-red-100 text-red-700" :
                           "bg-blue-100 text-blue-700"
                         )}>{k}</span>
                       ))}
                    </td>
                    <td className="px-6 py-4 space-x-3">
                      <a href={`/result/${r.id}`} target="_blank" className="text-sm font-bold text-blue-600 hover:underline">View</a>
                      {r.email && (
                        <button 
                          onClick={() => handleResend(r.id)}
                          className="text-sm font-bold text-gray-600 hover:underline"
                        >
                          Resend
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
