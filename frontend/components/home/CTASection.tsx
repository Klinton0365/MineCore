'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/ui/MotionWrapper';

export function CTASection() {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden dark-section">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c1a3d] via-[#0f2255] to-[#091638]" />
      <div className="absolute inset-0 bg-grid opacity-[0.04]" />

      {/* Radial glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-accent-blue/[0.08] via-transparent to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-radial from-accent-cyan/[0.04] via-transparent to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center">
          <FadeIn>
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              className="w-16 h-16 rounded-2xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center mx-auto mb-8"
            >
              <svg className="w-8 h-8 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5">
              Ready to Equip Your<br />
              <span className="gradient-text">Mining Operation?</span>
            </h2>
            <p className="text-base sm:text-lg text-white/50 mb-6 max-w-xl mx-auto leading-relaxed">
              From haul trucks to safety helmets — get a custom quote tailored to your operation. Our procurement team responds within 24 hours.
            </p>

            {/* Trust stats */}
            <div className="flex items-center justify-center gap-8 mb-10">
              {[
                { label: '48hr Dispatch', icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' },
                { label: 'Free Consultation', icon: 'M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155' },
                { label: 'Global Shipping', icon: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-white/40">
                  <svg className="w-4 h-4 text-accent-blue/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                  <span className="text-xs font-medium hidden sm:inline">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-accent-blue text-white text-sm font-semibold hover:bg-blue-500 transition-all duration-200 shadow-lg shadow-accent-blue/20 w-full sm:w-auto group"
              >
                Browse Equipment
                <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/enquiry"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl border border-white/15 text-white text-sm font-semibold hover:bg-white/5 hover:border-white/25 transition-all duration-200 w-full sm:w-auto"
              >
                View Enquiry List
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
