'use client';

import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from '@/components/ui/MotionWrapper';

const branches = [
  {
    name: 'Bangalore, India',
    code: 'IN-BLR',
    role: 'Main Warehouse & HQ',
    desc: 'Our primary distribution center and headquarters, serving the Indian subcontinent with comprehensive stock of underground and surface mining equipment.',
    flag: '🇮🇳',
  },
  {
    name: 'Dubai, UAE',
    code: 'AE-DXB',
    role: 'Middle East Hub',
    desc: 'Strategic hub serving the Gulf Cooperation Council region, providing rapid access to mining equipment for operations across the Middle East and North Africa.',
    flag: '🇦🇪',
  },
  {
    name: 'London, UK',
    code: 'GB-LDN',
    role: 'European Center',
    desc: 'Our European operations center, supporting mining projects across the United Kingdom and continental Europe with enquiry-based procurement services.',
    flag: '🇬🇧',
  },
];

const strengths = [
  {
    title: 'Real-Time Stock',
    desc: 'Live inventory tracking across all branches with seamless API integration and instant updates.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
  },
  {
    title: 'Global Delivery',
    desc: 'Shipping and logistics support from Bangalore, Dubai, and London with end-to-end tracking.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: 'Expert Support',
    desc: '24/7 technical assistance and product consultation from experienced mining specialists.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    title: 'Quality Assured',
    desc: 'ISO certified equipment from world-class manufacturers like Caterpillar, Sandvik, and Epiroc.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <main className="pt-[72px] min-h-screen bg-primary">
      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid opacity-[0.03]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial opacity-30 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <FadeIn>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent-cyan mb-6">
              Who We Are
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text tracking-tight leading-[1.1]">
              About{' '}
              <span className="gradient-text">Alkebulan</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg sm:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
              Alkebulan Underground & Surface Mining Services is a global provider
              of premium mining equipment, tools, and safety solutions — connecting
              operations worldwide with the resources they need.
            </p>
          </FadeIn>

          {/* Decorative line */}
          <FadeIn delay={0.35}>
            <div className="mt-12 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-accent-gold/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-accent-gold" />
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-accent-gold/60" />
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider" />

      {/* ───── Vision & Mission ───── */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent-cyan text-center mb-3">
              Our Purpose
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text text-center tracking-tight">
              Vision & Mission
            </h2>
          </FadeIn>

          <div className="mt-14 grid md:grid-cols-2 gap-6 lg:gap-8">
            <FadeIn delay={0.1}>
              <div className="glass-card rounded-2xl p-8 sm:p-10 h-full group hover:border-accent-blue/30 transition-colors duration-500">
                <div className="w-12 h-12 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-text mb-4">Our Vision</h3>
                <p className="text-text-muted leading-relaxed">
                  To be the world&apos;s most trusted and accessible supplier of mining
                  equipment, enabling operations of all sizes to access premium tools
                  and technology through innovative digital solutions.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="glass-card rounded-2xl p-8 sm:p-10 h-full group hover:border-accent-gold/30 transition-colors duration-500">
                <div className="w-12 h-12 rounded-xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-text mb-4">Our Mission</h3>
                <p className="text-text-muted leading-relaxed">
                  To deliver real-time inventory visibility, automated procurement
                  workflows, and seamless customer experiences across our global
                  branches — eliminating barriers between mining operations and the
                  equipment they need.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ───── Branches ───── */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-radial-gold opacity-10 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent-cyan text-center mb-3">
              Our Reach
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text text-center tracking-tight">
              Global Branches
            </h2>
            <p className="mt-4 text-text-muted text-center max-w-xl mx-auto">
              Strategically positioned across three continents to serve mining
              operations worldwide with minimal lead times.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-14 grid md:grid-cols-3 gap-6">
            {branches.map((branch) => (
              <StaggerItem key={branch.code}>
                <div className="glass-card rounded-2xl p-7 h-full group hover:border-accent-blue/30 transition-all duration-500">
                  {/* Region badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-lg bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                      {branch.code}
                    </span>
                    <span className="text-2xl" aria-hidden="true">{branch.flag}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-text">{branch.name}</h3>
                  <p className="text-sm font-medium text-accent-gold mt-1">{branch.role}</p>

                  <div className="mt-4 pt-4 border-t border-white/[0.06]">
                    <p className="text-sm text-text-muted leading-relaxed">
                      {branch.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <div className="section-divider" />

      {/* ───── Why Choose Us ───── */}
      <section className="relative py-20 sm:py-28 pb-28 sm:pb-36">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent-cyan text-center mb-3">
              Our Edge
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-text text-center tracking-tight">
              Why Choose Us
            </h2>
          </FadeIn>

          <StaggerContainer className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {strengths.map((item) => (
              <StaggerItem key={item.title}>
                <div className="glass-card rounded-2xl p-7 text-center h-full group hover:border-accent-gold/20 transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center mx-auto mb-5 text-accent-gold group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-semibold text-text mb-2">{item.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </main>
  );
}
