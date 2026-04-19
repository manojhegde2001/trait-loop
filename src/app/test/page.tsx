import { TestFlow } from '@/features/test/TestFlow';

export default function TestPage() {
  return (
    <div className="py-10">
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Personality Assessment</h1>
        <p className="text-gray-500 font-medium">Please answer all 120 questions as honestly as possible.</p>
      </div>
      <TestFlow />
    </div>
  );
}
