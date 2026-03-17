'use client';

import Link from 'next/link';
import { FadeIn } from '@/components/ui/MotionWrapper';
import { useTheme } from '@/lib/theme';

export function CTASection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden dark-section">
      {/* Layered gradient background */}
      <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-accent-blue via-accent-blue/80 to-blue-950' : 'bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-700'}`} />

      {/* Grid texture overlay */}
      <div className="absolute inset-0 bg-grid opacity-[0.06]" />

      {/* Radial glow from center */}
      <div className="absolute inset-0 bg-radial opacity-30" />

      {/* Vignette for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

      {/* Side glow accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto text-center">
        <FadeIn>
          {/* Mining icon */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="h-px w-8 bg-white/20" />
            <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <span className="h-px w-8 bg-white/20" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Ready to Equip Your Operation?
          </h2>
          <p className="text-base sm:text-lg text-white/70 mb-4 max-w-lg mx-auto leading-relaxed">
            From haul trucks to safety helmets — add products to your enquiry list and get a custom quote. Our procurement team responds within 24 hours.
          </p>

          {/* Quick stats */}
          <div className="flex items-center justify-center gap-6 mb-10 text-white/50 text-xs font-medium">
            <span>48hr Dispatch</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>Free Consultation</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>Global Shipping</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-gray-900 text-sm font-semibold hover:bg-white/90 transition-colors duration-200 shadow-lg shadow-black/10 w-full sm:w-auto"
            >
              Browse Equipment
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/enquiry"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/30 text-white text-sm font-semibold hover:bg-white/10 backdrop-blur-sm transition-colors duration-200 w-full sm:w-auto"
            >
              View Enquiry List
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
