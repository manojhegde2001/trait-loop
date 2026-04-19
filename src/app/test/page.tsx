import { TestFlow } from '@/features/test/TestFlow';
import { Suspense } from 'react';

export default function TestPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-black uppercase tracking-widest text-xs animate-pulse">Initializing Protocol...</p>
      </div>
    }>
      <TestFlow />
    </Suspense>
  );
}
