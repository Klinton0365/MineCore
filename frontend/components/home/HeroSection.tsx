'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-[72px] overflow-hidden dark-section">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#060d1b]" />
      <div className="absolute inset-0 bg-grid opacity-100" />
      <div className="absolute inset-0 bg-radial opacity-100" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-blue/[0.07] rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent-cyan/[0.05] rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-blue/[0.03] rounded-full blur-[150px]" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <div className="inline-flex items-center gap-2.5 glass rounded-full px-4 py-2 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
              </span>
              <span className="text-[13px] text-text-secondary font-medium">Live Inventory Tracking</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="text-white">Underground &amp; Surface</span>
              <br />
              <span className="gradient-text">Mining Equipment</span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl leading-relaxed">
              Premium equipment sourced globally with real-time stock visibility across Bangalore, Dubai, and London. Browse, enquire, and procure — all in one platform.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/products" className="btn-primary inline-flex items-center gap-2">
                <span>Explore Catalog</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a href="https://wa.me/918012345678?text=Hello%2C%20I%20am%20interested%20in%20your%20mining%20equipment." target="_blank" rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Contact Sales</span>
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <div className="mt-16 flex items-center gap-8 sm:gap-12">
              {[
                { value: '3', label: 'Global Branches' },
                { value: '16+', label: 'Product Lines' },
                { value: '24/7', label: 'Expert Support' },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-8 sm:gap-12">
                  {i > 0 && <div className="w-px h-10 bg-white/[0.06]" />}
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-xs text-text-muted mt-1 tracking-wide">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Decorative right-side elements (desktop) */}
        <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-8 xl:right-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
            className="relative"
          >
            <div className="glass-card rounded-2xl p-5 w-56 mb-4 animate-float">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-success" />
                </div>
                <span className="text-xs font-medium text-text-secondary">Stock Update</span>
              </div>
              <p className="text-[13px] text-white font-medium">Atlas Copco Boomer S2</p>
              <p className="text-[11px] text-success mt-1">In Stock — Bangalore</p>
            </div>

            <div className="glass-card rounded-2xl p-5 w-48 ml-8 animate-float" style={{ animationDelay: '3s' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-accent-blue/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-text-secondary">3 Regions</span>
              </div>
              <div className="flex gap-1.5">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-text-secondary">IN</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-text-secondary">AE</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-text-secondary">GB</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-primary)] to-transparent pointer-events-none" />
    </section>
  );
}
