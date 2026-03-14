'use client';

import Link from 'next/link';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  return <>{count}{suffix}</>;
}

function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] bg-accent-blue/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -60 - Math.random() * 80],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer rotating ring */}
      <motion.div
        className="absolute w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full border border-white/[0.04]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        {/* Orbit dot */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-accent-blue rounded-full shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
      </motion.div>

      {/* Middle ring */}
      <motion.div
        className="absolute w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] rounded-full border border-dashed border-white/[0.06]"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent-cyan rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
      </motion.div>

      {/* Inner ring */}
      <motion.div
        className="absolute w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] rounded-full border border-white/[0.08]"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-accent-gold rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
      </motion.div>

      {/* Center hexagon icon */}
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.5, duration: 0.8, type: 'spring', stiffness: 100 }}
        className="relative z-10"
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-accent-blue/20 to-accent-cyan/10 backdrop-blur-xl border border-white/[0.08] flex items-center justify-center"
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
        >
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        {/* Pulse ring */}
        <div className="absolute inset-0 bg-accent-blue/5 animate-ping rounded-full" style={{ animationDuration: '3s' }} />
      </motion.div>

      {/* Floating data cards */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute -right-4 sm:right-0 top-8 sm:top-12"
      >
        <div className="glass-card rounded-xl p-3 w-44 animate-float">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-md bg-success/10 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-success" />
            </div>
            <span className="text-[10px] font-medium text-[#94a3b8]">Stock Update</span>
          </div>
          <p className="text-[11px] text-white font-medium">Atlas Copco Boomer S2</p>
          <p className="text-[10px] text-success mt-0.5">In Stock — Bangalore</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute -left-4 sm:left-0 bottom-12 sm:bottom-16"
      >
        <div className="glass-card rounded-xl p-3 w-40 animate-float" style={{ animationDelay: '2s' }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-md bg-accent-gold/10 flex items-center justify-center">
              <svg className="w-3 h-3 text-accent-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
              </svg>
            </div>
            <span className="text-[10px] font-medium text-[#94a3b8]">New Enquiry</span>
          </div>
          <p className="text-[11px] text-white font-medium">Cat 797F Dump Truck</p>
          <p className="text-[10px] text-accent-gold mt-0.5">Dubai, UAE</p>
        </div>
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const moveX = useTransform(springX, [0, 1], [-8, 8]);
  const moveY = useTransform(springY, [0, 1], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const ease = [0.25, 0.46, 0.45, 0.94] as const;

  return (
    <section
      className="relative min-h-screen flex items-center pt-[72px] overflow-hidden dark-section"
      onMouseMove={handleMouseMove}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#040a15]" />

      {/* Animated grid with parallax */}
      <motion.div className="absolute inset-0" style={{ x: moveX, y: moveY }}>
        <div className="absolute inset-0 bg-grid opacity-100" />
      </motion.div>

      {/* Radial glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-radial from-accent-blue/[0.08] via-transparent to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-gradient-radial from-accent-cyan/[0.04] via-transparent to-transparent rounded-full blur-3xl" />

      {/* Particles */}
      <ParticleField />

      {/* Diagonal accent line */}
      <div className="absolute top-0 right-[20%] w-px h-full bg-gradient-to-b from-transparent via-accent-blue/10 to-transparent transform rotate-12 origin-top" />
      <div className="absolute top-0 right-[22%] w-px h-full bg-gradient-to-b from-transparent via-accent-blue/5 to-transparent transform rotate-12 origin-top" />

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
            >
              <div className="inline-flex items-center gap-2.5 glass rounded-full px-4 py-2 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                </span>
                <span className="text-[13px] text-[#94a3b8] font-medium">Live Inventory Tracking</span>
              </div>
            </motion.div>

            {/* Heading with word-by-word reveal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold tracking-tight leading-[1.08]">
                <span className="text-white">Industrial-Grade</span>
                <br />
                <span className="text-white">Mining </span>
                <span className="gradient-text">Equipment</span>
                <br />
                <span className="text-white text-[0.65em] font-semibold tracking-normal text-[#94a3b8]">
                  Delivered Globally
                </span>
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease }}
            >
              <p className="mt-6 text-base sm:text-lg text-[#64748b] max-w-lg leading-relaxed">
                Source premium underground & surface mining equipment from three global hubs. Real-time inventory. Instant enquiries. Zero downtime.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease }}
            >
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link href="/products" className="btn-primary group">
                  <span>Explore Catalog</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href="https://wa.me/918012345678?text=Hello%2C%20I%20am%20interested%20in%20your%20mining%20equipment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary group"
                >
                  <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Contact Sales</span>
                </a>
              </div>
            </motion.div>

            {/* Animated Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="mt-14 grid grid-cols-3 gap-6 max-w-md">
                {[
                  { target: 3, suffix: '', label: 'Global Hubs', icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                  )},
                  { target: 500, suffix: '+', label: 'Products', icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                  )},
                  { target: 98, suffix: '%', label: 'Uptime', icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  )},
                ].map((stat) => (
                  <div key={stat.label} className="relative">
                    <div className="text-accent-blue/40 mb-2">{stat.icon}</div>
                    <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                      <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                    </div>
                    <div className="text-[11px] text-[#64748b] mt-1 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="hidden lg:block relative h-[500px]"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      {/* Bottom edge treatment */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent" />
        <div className="h-24 bg-gradient-to-t from-[var(--color-primary)] to-transparent" />
      </div>
    </section>
  );
}
