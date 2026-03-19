'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/ui/MotionWrapper';
import { useTheme } from '@/lib/theme';

const steps = [
  {
    number: '01',
    title: 'Browse Equipment',
    desc: 'Explore our catalog of 500+ products across underground mining, surface mining, and safety equipment categories.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Check Live Stock',
    desc: 'View real-time availability across our Bangalore, Dubai, and London hubs. Know exactly what\'s ready to ship.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Submit Enquiry',
    desc: 'Add items to your enquiry list and submit a request. No commitment required — get a custom quote first.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Get Quote & Deliver',
    desc: 'Our team responds within 24 hours with pricing and logistics. Equipment dispatched within 48 hours of confirmation.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${isDark ? 'bg-primary-light' : 'bg-slate-50/50'}`}>
      {/* Background accents */}
      <div className={`absolute inset-0 ${isDark ? 'bg-grid opacity-20' : 'hero-grid-light opacity-40'}`} />
      <div className={`absolute top-0 left-0 right-0 h-px ${isDark ? 'bg-gradient-to-r from-transparent via-white/[0.04] to-transparent' : 'bg-gradient-to-r from-transparent via-slate-200/60 to-transparent'}`} />
      <div className={`absolute bottom-0 left-0 right-0 h-px ${isDark ? 'bg-gradient-to-r from-transparent via-white/[0.04] to-transparent' : 'bg-gradient-to-r from-transparent via-slate-200/60 to-transparent'}`} />

      <div className="relative max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className={`text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3 ${isDark ? 'text-text-muted' : 'text-slate-400'}`}>
            Simple Process
          </span>
          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className={`mt-3 max-w-lg mx-auto text-sm ${isDark ? 'text-text-muted' : 'text-slate-500'}`}>
            From browsing to delivery in four simple steps. No complexity, no middlemen.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative"
            >
              {/* Connector line (desktop only) */}
              {i < steps.length - 1 && (
                <div className={`hidden lg:block absolute top-10 left-[calc(50%+30px)] w-[calc(100%-20px)] h-px ${isDark ? 'bg-gradient-to-r from-white/[0.08] to-white/[0.02]' : 'bg-gradient-to-r from-slate-200 to-slate-100'}`}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent-blue/40" />
                </div>
              )}

              <div className={`relative rounded-2xl p-6 text-center h-full border transition-all duration-300 hover:-translate-y-1 ${isDark ? 'glass-card hover:border-accent-blue/20' : 'bg-white border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-200'}`}>
                {/* Step number */}
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full ${isDark ? 'bg-primary-light border border-white/[0.08] text-accent-blue' : 'bg-white border border-blue-200 text-blue-600 shadow-sm'}`}>
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl mx-auto mt-3 mb-5 flex items-center justify-center transition-colors duration-300 ${isDark ? 'bg-accent-blue/10 text-accent-blue' : 'bg-blue-50 text-blue-600'}`}>
                  {step.icon}
                </div>

                <h3 className={`text-[15px] font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>{step.title}</h3>
                <p className={`text-[13px] leading-relaxed ${isDark ? 'text-text-muted' : 'text-slate-500'}`}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.4}>
          <div className="text-center mt-12">
            <Link href="/products" className="btn-primary !py-3 !px-7 group">
              <span>Start Browsing</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
