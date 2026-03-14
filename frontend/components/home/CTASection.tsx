'use client';

import Link from 'next/link';
import { FadeIn } from '@/components/ui/MotionWrapper';

export function CTASection() {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden dark-section">
      {/* Layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue via-accent-blue/80 to-blue-950" />

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
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Ready to Get a Quote?
          </h2>
          <p className="text-base sm:text-lg text-white/70 mb-10 max-w-lg mx-auto leading-relaxed">
            Add products to your enquiry list and submit a request. Our team
            responds within 24 hours with pricing and availability.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-gray-900 text-sm font-semibold hover:bg-white/90 transition-colors duration-200 shadow-lg shadow-black/10 w-full sm:w-auto"
            >
              Browse Products
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
