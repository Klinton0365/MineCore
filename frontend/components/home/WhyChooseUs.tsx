'use client';

import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';
import { useTheme } from '@/lib/theme';

const brands = [
  { name: 'Caterpillar', logo: '/brands/caterpillar.svg' },
  { name: 'Sandvik', logo: '/brands/sandvik.svg' },
  { name: 'Komatsu', logo: '/brands/komatsu.svg' },
  { name: 'Epiroc', logo: '/brands/epiroc.svg' },
  { name: 'Atlas Copco', logo: '/brands/atlas-copco.svg' },
  { name: 'Liebherr', logo: '/brands/liebherr.svg' },
  { name: 'Volvo', logo: '/brands/volvo.svg' },
  { name: 'BELAZ', logo: '/brands/belaz.svg' },
];

const features = [
  {
    title: 'Real-Time Inventory',
    desc: 'Track stock levels across Bangalore, Dubai, and London in real time. Know exactly what\'s available before you enquire.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    color: 'blue' as const,
  },
  {
    title: 'OEM Partnerships',
    desc: 'Authorized dealer for Caterpillar, Sandvik, Komatsu, Epiroc, and Atlas Copco. Genuine parts with manufacturer warranty.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    color: 'gold' as const,
  },
  {
    title: 'Rapid Logistics',
    desc: 'Strategically positioned warehouses ensure 48-hour dispatch across the Middle East, South Asia, and Europe.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    color: 'cyan' as const,
  },
  {
    title: 'Expert Consultation',
    desc: 'Mining engineers and procurement specialists available 24/7 to help you select the right equipment for your operation.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    color: 'blue' as const,
  },
];

const colorMap = {
  blue: {
    bg: 'bg-accent-blue/10',
    border: 'border-accent-blue/20',
    text: 'text-accent-blue',
    hover: 'group-hover:bg-accent-blue/20',
    cardHover: 'hover:border-accent-blue/30',
  },
  gold: {
    bg: 'bg-accent-gold/10',
    border: 'border-accent-gold/20',
    text: 'text-accent-gold',
    hover: 'group-hover:bg-accent-gold/20',
    cardHover: 'hover:border-accent-gold/30',
  },
  cyan: {
    bg: 'bg-accent-cyan/10',
    border: 'border-accent-cyan/20',
    text: 'text-accent-cyan',
    hover: 'group-hover:bg-accent-cyan/20',
    cardHover: 'hover:border-accent-cyan/30',
  },
};

export function WhyChooseUs() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="section-divider mb-16" />

        <FadeIn className="text-center mb-14">
          <span className={`text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3 ${isDark ? 'text-text-muted' : 'text-slate-500'}`}>
            Why MineCore
          </span>
          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Built for <span className="gradient-text">Mining Operations</span>
          </h2>
          <p className={`mt-4 max-w-2xl mx-auto text-sm leading-relaxed ${isDark ? 'text-text-muted' : 'text-slate-600'}`}>
            From open-pit excavation to deep underground tunneling, we supply the equipment that keeps your operation running at peak performance.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature) => {
            const colors = colorMap[feature.color];
            return (
              <StaggerItem key={feature.title}>
                <div className={`glass-card rounded-xl p-6 h-full group transition-all duration-300 hover:-translate-y-1 ${colors.cardHover}`}>
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center mb-5 ${colors.text} ${colors.hover} transition-colors duration-300 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className={`text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'} group-hover:${colors.text} transition-colors`}>
                    {feature.title}
                  </h3>
                  <p className={`text-[13px] leading-relaxed ${isDark ? 'text-text-muted' : 'text-slate-600'}`}>
                    {feature.desc}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Trusted brands marquee */}
        <FadeIn delay={0.3}>
          <div className={`mt-16 pt-10 border-t ${isDark ? 'border-white/[0.04]' : 'border-slate-200/80'}`}>
            <p className={`text-center text-[10px] font-semibold tracking-[0.25em] uppercase mb-8 ${isDark ? 'text-text-muted/60' : 'text-slate-400'}`}>
              Trusted Equipment from World-Class Manufacturers
            </p>
            <div className="relative overflow-hidden">
              {/* Fade edges */}
              <div className={`absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none ${isDark ? 'bg-gradient-to-r from-primary to-transparent' : 'bg-gradient-to-r from-[var(--color-primary)] to-transparent'}`} />
              <div className={`absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none ${isDark ? 'bg-gradient-to-l from-primary to-transparent' : 'bg-gradient-to-l from-[var(--color-primary)] to-transparent'}`} />

              <div className="marquee-track flex items-center gap-16 w-max">
                {/* First set */}
                {brands.map((brand) => (
                  <div key={brand.name} className="flex-shrink-0 group cursor-pointer px-2">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className={`h-8 w-auto object-contain transition-all duration-500 ${isDark ? 'invert opacity-25 grayscale' : 'opacity-30 grayscale'} group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110`}
                    />
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {brands.map((brand) => (
                  <div key={`dup-${brand.name}`} className="flex-shrink-0 group cursor-pointer px-2">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className={`h-8 w-auto object-contain transition-all duration-500 ${isDark ? 'invert opacity-25 grayscale' : 'opacity-30 grayscale'} group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
