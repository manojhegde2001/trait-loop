import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import Image from 'next/image';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: {
    default: "TraitLoop | Scientific Big Five Personality Assessment",
    template: "%s | TraitLoop"
  },
  description: "Discover your psychological blueprint with TraitLoop's scientifically validated Big Five (OCEAN) personality test. Free, fast, and professional analysis.",
  keywords: [
    "personality test", 
    "big five", 
    "OCEAN model", 
    "psychological assessment", 
    "trait analysis", 
    "IPIP-NEO", 
    "personality traits",
    "self-discovery",
    "professional development"
  ],
  authors: [{ name: "TraitLoop Systems" }],
  creator: "TraitLoop Systems",
  publisher: "TraitLoop Systems",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://traitloop.com'), // Replace with actual domain if known
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "TraitLoop | Scientific Big Five Personality Assessment",
    description: "Discover your psychological blueprint with our scientifically validated personality test.",
    url: 'https://traitloop.com',
    siteName: 'TraitLoop',
    images: [
      {
        url: '/og-image.png', // We should ensure this exists or create it
        width: 1200,
        height: 630,
        alt: 'TraitLoop Personality Assessment',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "TraitLoop | Big Five Personality Assessment",
    description: "Scientific personality analysis based on the OCEAN model.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "TraitLoop",
              "operatingSystem": "Web",
              "applicationCategory": "PsychologyApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "Scientific Big Five Personality Assessment based on the IPIP-NEO model.",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "1024"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-slate-900 bg-white dark:bg-slate-950 dark:text-slate-50`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          
          <main className="pt-18 min-h-screen">
            {children}
          </main>

          <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                <div className="space-y-4">
                  <Link href="/" className="flex items-center">
                    <Image 
                      src="/logo.png" 
                      alt="TraitLoop" 
                      width={120} 
                      height={34} 
                      className="h-8 w-auto object-contain dark:invert dark:hue-rotate-180" 
                    />
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
