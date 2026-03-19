'use client';

import Link from 'next/link';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTheme } from '@/lib/theme';

function AnimatedCounter({ target, suffix = '', delay = 0 }: { target: number; suffix?: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
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
  }, [target, started]);

  return <>{count}{suffix}</>;
}

function ParticleField({ isDark }: { isDark: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-[2px] h-[2px] rounded-full ${isDark ? 'bg-accent-blue/30' : 'bg-accent-blue/20'}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -80 - Math.random() * 60],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

function HeroVisual({ isDark }: { isDark: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Ambient glow behind visual */}
      <div className={`absolute w-[400px] h-[400px] rounded-full blur-[100px] ${isDark ? 'bg-accent-blue/[0.07]' : 'bg-accent-blue/[0.05]'}`} />

      {/* Outer rotating ring */}
      <motion.div
        className={`absolute w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] rounded-full border ${isDark ? 'border-white/[0.04]' : 'border-slate-300/30'}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-accent-blue rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
        <div className="absolute top-1/2 -right-1 w-2 h-2 bg-accent-blue/40 rounded-full" />
      </motion.div>

      {/* Middle dashed ring */}
      <motion.div
        className={`absolute w-[240px] h-[240px] sm:w-[290px] sm:h-[290px] rounded-full border border-dashed ${isDark ? 'border-white/[0.05]' : 'border-slate-300/40'}`}
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-accent-cyan rounded-full shadow-[0_0_12px_rgba(6,182,212,0.5)]" />
      </motion.div>

      {/* Inner ring */}
      <motion.div
        className={`absolute w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] rounded-full border ${isDark ? 'border-white/[0.06]' : 'border-slate-300/50'}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute top-0 right-0 w-2 h-2 bg-accent-gold rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
      </motion.div>

      {/* Center icon */}
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.5, duration: 0.8, type: 'spring', stiffness: 100 }}
        className="relative z-10"
      >
        <div className={`w-24 h-24 sm:w-28 sm:h-28 ${isDark ? 'bg-gradient-to-br from-accent-blue/20 to-accent-cyan/10 border-white/[0.08]' : 'bg-gradient-to-br from-accent-blue/10 to-cyan-100/50 border-slate-200/60'} backdrop-blur-2xl border flex items-center justify-center`}
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
        >
          <svg className="w-10 h-10 sm:w-12 sm:h-12 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-accent-blue/5 animate-ping rounded-full" style={{ animationDuration: '3s' }} />
      </motion.div>

      {/* Floating cards */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1, duration: 0.7 }}
        className="absolute right-0 sm:right-2 top-8 sm:top-14"
      >
        <div className={`${isDark ? 'glass-card' : 'bg-white border border-slate-200/80 shadow-xl shadow-slate-200/40'} rounded-2xl p-3.5 w-52 animate-float`}>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-7 h-7 rounded-lg bg-success/10 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            </div>
            <span className={`text-[10px] font-semibold uppercase tracking-wider ${isDark ? 'text-[#94a3b8]' : 'text-slate-400'}`}>Stock Alert</span>
          </div>
          <p className={`text-[12px] font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>CAT 797F Haul Truck</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
            <p className="text-[10px] text-success font-medium">12 Units — Bangalore</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -40, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        className="absolute left-0 sm:left-2 bottom-12 sm:bottom-20"
      >
        <div className={`${isDark ? 'glass-card' : 'bg-white border border-slate-200/80 shadow-xl shadow-slate-200/40'} rounded-2xl p-3.5 w-48 animate-float`} style={{ animationDelay: '2s' }}>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-7 h-7 rounded-lg bg-accent-gold/10 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <span className={`text-[10px] font-semibold uppercase tracking-wider ${isDark ? 'text-[#94a3b8]' : 'text-slate-400'}`}>New Enquiry</span>
          </div>
          <p className={`text-[12px] font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>Sandvik DD422i Drill</p>
          <p className="text-[10px] text-accent-gold mt-1 font-medium">Dubai, UAE</p>
        </div>
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const moveX = useTransform(springX, [0, 1], [-6, 6]);
  const moveY = useTransform(springY, [0, 1], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const ease = [0.25, 0.46, 0.45, 0.94] as const;

  return (
    <section
      className={`relative min-h-screen flex items-center pt-[72px] overflow-hidden ${isDark ? 'dark-section' : ''}`}
      onMouseMove={handleMouseMove}
    >
      {/* Background */}
      <div className={`absolute inset-0 transition-colors duration-500 ${isDark ? 'bg-[#040a15]' : 'bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/20'}`} />

      {/* Grid parallax */}
      <motion.div className="absolute inset-0" style={{ x: moveX, y: moveY }}>
        <div className={`absolute inset-0 ${isDark ? 'bg-grid opacity-100' : 'hero-grid-light opacity-100'}`} />
      </motion.div>

      {/* Radial glows */}
      <div className={`absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-3xl ${isDark ? 'bg-gradient-radial from-accent-blue/[0.07] via-transparent to-transparent' : 'bg-gradient-radial from-blue-400/[0.06] via-transparent to-transparent'}`} />
      <div className={`absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full blur-3xl ${isDark ? 'bg-gradient-radial from-accent-cyan/[0.04] via-transparent to-transparent' : 'bg-gradient-radial from-cyan-300/[0.06] via-transparent to-transparent'}`} />
      {!isDark && <div className="absolute top-1/3 left-[-100px] w-[400px] h-[400px] bg-gradient-radial from-amber-200/[0.06] via-transparent to-transparent rounded-full blur-3xl" />}

      <ParticleField isDark={isDark} />

      {/* Accent lines */}
      <div className={`absolute top-0 right-[20%] w-px h-full transform rotate-12 origin-top ${isDark ? 'bg-gradient-to-b from-transparent via-accent-blue/8 to-transparent' : 'bg-gradient-to-b from-transparent via-blue-300/10 to-transparent'}`} />

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text */}
          <div>
            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
            >
              <div className={`inline-flex items-center gap-2.5 rounded-full px-4 py-2 mb-8 ${isDark ? 'glass' : 'bg-white/80 border border-slate-200/80 shadow-sm backdrop-blur-sm'}`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                </span>
                <span className={`text-[12px] font-semibold tracking-wide ${isDark ? 'text-[#94a3b8]' : 'text-slate-500'}`}>Live Inventory Tracking</span>
              </div>
            </motion.div>

            {/* Heading — word stagger */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-[3.75rem] font-bold tracking-tight leading-[1.08]">
                <span className={isDark ? 'text-white' : 'text-slate-900'}>Powering Mines</span>
                <br />
                <span className={isDark ? 'text-white' : 'text-slate-900'}>With Premium </span>
                <span className="gradient-text">Equipment</span>
              </h1>
              <p className={`mt-2 text-lg sm:text-xl font-medium tracking-wide ${isDark ? 'text-[#64748b]' : 'text-slate-400'}`}>
                From Pit to Processing Plant
              </p>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease }}
            >
              <p className={`mt-5 text-[15px] sm:text-base max-w-lg leading-relaxed ${isDark ? 'text-[#64748b]' : 'text-slate-600'}`}>
                Source heavy-duty haul trucks, drill rigs, excavators, and safety gear from three global hubs. Real-time stock visibility across every branch.
              </p>
            </motion.div>

            {/* Trust pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease }}
            >
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {['ISO 9001 Certified', 'OEM Authorized', '24/7 Support'].map((item) => (
                  <span key={item} className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full ${isDark ? 'bg-white/[0.03] border border-white/[0.06] text-[#94a3b8]' : 'bg-white/70 border border-slate-200/80 text-slate-500'}`}>
                    <svg className="w-3 h-3 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease }}
            >
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/products" className="btn-primary group !py-3 !px-6 !text-[14px]">
                  <span>Explore Catalog</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href="https://wa.me/918012345678?text=Hello%2C%20I%20am%20interested%20in%20your%20mining%20equipment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-secondary group !py-3 !px-6 !text-[14px] ${!isDark ? '!bg-white/80 !text-slate-700 !border-slate-200 hover:!bg-white hover:!border-slate-300' : ''}`}
                >
                  <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Contact Sales</span>
                </a>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className={`mt-12 grid grid-cols-3 gap-8 max-w-md pt-8 border-t ${isDark ? 'border-white/[0.06]' : 'border-slate-200/60'}`}>
                {[
                  { target: 3, suffix: '', label: 'Global Hubs' },
                  { target: 500, suffix: '+', label: 'Products' },
                  { target: 98, suffix: '%', label: 'Uptime' },
                ].map((stat, i) => (
                  <div key={stat.label}>
                    <div className={`text-3xl sm:text-4xl font-bold tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      <AnimatedCounter target={stat.target} suffix={stat.suffix} delay={900 + i * 200} />
                    </div>
                    <div className={`text-[11px] mt-1.5 uppercase tracking-widest font-medium ${isDark ? 'text-[#475569]' : 'text-slate-400'}`}>{stat.label}</div>
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
            className="hidden lg:block relative h-[520px]"
          >
            <HeroVisual isDark={isDark} />
          </motion.div>
        </div>
      </div>

      {/* Bottom edge */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className={`h-px ${isDark ? 'bg-gradient-to-r from-transparent via-accent-blue/15 to-transparent' : 'bg-gradient-to-r from-transparent via-slate-300/40 to-transparent'}`} />
        <div className="h-24 bg-gradient-to-t from-[var(--color-primary)] to-transparent" />
      </div>
    </section>
  );
}
