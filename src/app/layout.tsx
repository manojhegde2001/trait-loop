import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "TraitLoop | Scientific Big Five Personality Assessment",
  description: "Discover your genetic traits with our scientifically validated Big Five (OCEAN) personality test. Free, fast, and insightful.",
  keywords: ["personality test", "big five", "OCEAN model", "psychological assessment", "trait analysis"],
  authors: [{ name: "TraitLoop Systems" }],
  openGraph: {
    title: "TraitLoop | Big Five Personality Assessment",
    description: "Scientifically validated Big Five Personality Test",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-slate-900 bg-white dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          
          <main className="pt-18 min-h-screen">
            {children}
          </main>

          <footer className="py-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 mt-32">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                <div className="space-y-4">
                  <Link href="/" className="text-xl font-black tracking-tighter text-blue-600">
                    TRAIT<span className="text-slate-900 dark:text-white">LOOP</span>
                  </Link>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                    Providing scientifically validated personality assessments to help individuals and teams unlock their potential.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-slate-900 dark:text-white">Platform</h4>
                  <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                    <li><Link href="/test" className="hover:text-blue-600 transition-colors">Big Five Assessment</Link></li>
                    <li><Link href="/#science" className="hover:text-blue-600 transition-colors">The Science</Link></li>
                    <li><Link href="/#faq" className="hover:text-blue-600 transition-colors">FAQ</Link></li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-slate-900 dark:text-white">Admin</h4>
                  <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                    <li><Link href="/admin" className="hover:text-blue-600 transition-colors">Portal Login</Link></li>
                    <li><Link href="/admin" className="hover:text-blue-600 transition-colors">Import Data</Link></li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-800 gap-4">
                <p className="text-xs text-slate-400 font-medium">© 2026 TraitLoop Assessment Systems. Built for growth.</p>
                <div className="flex gap-6">
                  <a href="#" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors text-xs uppercase tracking-widest font-bold">Privacy</a>
                  <a href="#" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors text-xs uppercase tracking-widest font-bold">Terms</a>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
