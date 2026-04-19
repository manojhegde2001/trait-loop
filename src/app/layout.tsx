import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "TraitLoop | Big Five Personality Assessment",
  description: "Scientifically validated Big Five Personality Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-slate-900`}>
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b">
          <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-2xl font-black tracking-tighter text-blue-600">
              TRAIT<span className="text-slate-900">LOOP</span>
            </Link>
            <div className="flex gap-6 items-center">
              <Link href="/test" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Take Test</Link>
              <Link href="/admin" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Admin</Link>
            </div>
          </nav>
        </header>
        <main className="pt-16 min-h-screen">
          {children}
        </main>
        <footer className="py-12 border-t mt-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-slate-400 font-medium">© 2026 TraitLoop Assessment Systems. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
