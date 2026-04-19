import Link from 'next/link';

export default function Home() {
  const ocean = [
    { 
      letter: 'O', 
      title: 'Openness', 
      desc: 'Appreciation for art, emotion, adventure, and unusual ideas.',
      color: 'bg-blue-500',
      gradient: 'from-blue-400 to-blue-600'
    },
    { 
      letter: 'C', 
      title: 'Conscientiousness', 
      desc: 'Tendency to be organized, dependable, and disciplined.',
      color: 'bg-indigo-500',
      gradient: 'from-indigo-400 to-indigo-600'
    },
    { 
      letter: 'E', 
      title: 'Extraversion', 
      desc: 'Energy, positive emotions, surgency, and talkativeness.',
      color: 'bg-purple-500',
      gradient: 'from-purple-400 to-purple-600'
    },
    { 
      letter: 'A', 
      title: 'Agreeableness', 
      desc: 'Tendency to be compassionate and cooperative.',
      color: 'bg-pink-500',
      gradient: 'from-pink-400 to-pink-600'
    },
    { 
      letter: 'N', 
      title: 'Neuroticism', 
      desc: 'The degree of emotional stability and impulse control.',
      color: 'bg-rose-500',
      gradient: 'from-rose-400 to-rose-600'
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[30%] bg-purple-500/20 rounded-full blur-[100px] animate-pulse [animation-delay:2s]" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 dark:bg-blue-900/30 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Scientifically Validated Model
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Discover the DNA of <br />
            <span className="text-gradient">Your Personality</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000">
            The Big Five (OCEAN) model is the world gold standard for psychological assessment. 
            Gain deep insights into your behavior in less than 10 minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-16 duration-1000">
            <Link 
              href="/test" 
              className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white text-lg font-bold rounded-2xl hover:bg-blue-700 hover:scale-105 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
            >
              Start Free Assessment
            </Link>
            <a 
              href="#science" 
              className="w-full sm:w-auto px-10 py-5 glass dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-lg font-bold rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
            >
              Learn the Science
            </a>
          </div>
          
          <div className="pt-20 grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto opacity-70">
            {ocean.map((item) => (
              <div key={item.letter} className="flex flex-col items-center gap-2 group cursor-default">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl font-black ${item.color} shadow-lg transition-transform group-hover:scale-110`}>
                  {item.letter}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Science Section */}
      <section id="science" className="py-32 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">The OCEAN Model</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Our assessment measures five broad domains of personality used by psychologists worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {ocean.map((item) => (
              <div key={item.letter} className="glass-card p-8 rounded-3xl flex flex-col gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white text-3xl font-black shadow-inner`}>
                  {item.letter}
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Social Proof */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="glass p-12 rounded-[40px] text-center space-y-6 border-slate-200 dark:border-slate-800">
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-gradient italic">100% Data Privacy</h3>
            <p className="text-lg md:text-xl text-slate-500 font-medium">
              We never sell your data. Your results are your own. Period.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[48px] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,#ffffff33,transparent_70%)] pointer-events-none" />
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">Ready to see <br /> the results?</h2>
            <p className="text-blue-100 text-lg max-w-xl mx-auto leading-relaxed">
              Join thousands of others who have used TraitLoop to understand their strengths and growth areas.
            </p>
            <div className="pt-4">
              <Link 
                href="/test" 
                className="inline-flex items-center px-12 py-5 bg-white text-blue-600 text-xl font-black rounded-2xl hover:bg-slate-50 hover:scale-105 transition-all shadow-xl active:scale-95"
              >
                Start assessment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
