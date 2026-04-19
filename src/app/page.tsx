import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center space-y-8">
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Discover Your <span className="text-blue-600">Genetic Traits</span>
        </h1>
        <p className="text-xl text-gray-500 font-medium leading-relaxed">
          The Big Five Personality Test is the most scientifically validated model 
          for understanding human personality. Take the 120-question assessment 
          to see where you stand on the OCEAN domains.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/test" 
          className="px-10 py-4 bg-blue-600 text-white text-lg font-bold rounded-2xl hover:bg-blue-700 hover:scale-105 transition-all shadow-xl shadow-blue-100"
        >
          Start Assessment
        </Link>
        <Link 
          href="/admin" 
          className="px-10 py-4 bg-white text-gray-600 text-lg font-bold rounded-2xl border-2 hover:bg-gray-50 transition-all"
        >
          Admin Portal
        </Link>
      </div>

      <div className="pt-12 grid grid-cols-2 sm:grid-cols-5 gap-4 opacity-50 font-black text-xl tracking-widest text-gray-400">
        <span>O</span>
        <span>C</span>
        <span>E</span>
        <span>A</span>
        <span>N</span>
      </div>
    </div>
  );
}
