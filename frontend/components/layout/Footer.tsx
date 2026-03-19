'use client';

import Link from 'next/link';
import { useTheme } from '@/lib/theme';

export function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer className={`relative ${isDark ? 'bg-[#060d1b]' : 'bg-slate-50'}`}>
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand — wider column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <span className={`text-sm font-semibold tracking-[0.15em] ${isDark ? 'text-white' : 'text-slate-900'}`}>MINECORE <span className={isDark ? 'text-text-secondary font-normal' : 'text-slate-400 font-normal'}>Global</span></span>
            </div>
            <p className={`text-sm leading-relaxed max-w-xs mb-6 ${isDark ? 'text-text-muted' : 'text-slate-500'}`}>
              Premium mining equipment supplier with real-time inventory across three continents. Haul trucks, drill rigs, excavators, and safety gear — sourced from the world&apos;s top manufacturers.
            </p>
            {/* Social / WhatsApp */}
            <div className="flex items-center gap-3">
              <a href="https://wa.me/918012345678" target="_blank" rel="noopener noreferrer"
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${isDark ? 'bg-white/[0.04] text-emerald-400 hover:bg-emerald-500/10 border border-white/[0.06]' : 'bg-emerald-50 text-emerald-500 hover:bg-emerald-100 border border-emerald-100'}`}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a href="mailto:info@minecoreglobal.com"
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${isDark ? 'bg-white/[0.04] text-text-secondary hover:bg-accent-blue/10 hover:text-accent-blue border border-white/[0.06]' : 'bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600 border border-slate-200'}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              </a>
              <a href="tel:+918012345678"
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${isDark ? 'bg-white/[0.04] text-text-secondary hover:bg-accent-blue/10 hover:text-accent-blue border border-white/[0.06]' : 'bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600 border border-slate-200'}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className={`text-[11px] font-semibold uppercase tracking-[0.2em] mb-5 ${isDark ? 'text-text-secondary' : 'text-slate-400'}`}>Navigate</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/products', label: 'Products' },
                { href: '/enquiry', label: 'Enquiry' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className={`group flex items-center gap-2 text-sm transition-colors duration-300 ${isDark ? 'text-text-muted hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
                    <span className={`w-0 group-hover:w-3 h-[1px] transition-all duration-300 ${isDark ? 'bg-accent-blue' : 'bg-blue-500'}`} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className={`text-[11px] font-semibold uppercase tracking-[0.2em] mb-5 ${isDark ? 'text-text-secondary' : 'text-slate-400'}`}>Contact</h4>
            <ul className={`space-y-3 text-sm ${isDark ? 'text-text-muted' : 'text-slate-500'}`}>
              <li>
                <a href="mailto:info@minecoreglobal.com" className={`transition-colors duration-300 ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>
                  info@minecoreglobal.com
                </a>
              </li>
              <li>
                <a href="tel:+918012345678" className={`transition-colors duration-300 ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>
                  +91 80 1234 5678
                </a>
              </li>
              <li className={`pt-1 leading-relaxed ${isDark ? 'text-text-muted/70' : 'text-slate-400'}`}>
                Tech Park, Whitefield<br/>Bangalore 560066, India
              </li>
            </ul>
          </div>

          {/* Global Presence */}
          <div className="lg:col-span-3">
            <h4 className={`text-[11px] font-semibold uppercase tracking-[0.2em] mb-5 ${isDark ? 'text-text-secondary' : 'text-slate-400'}`}>Global Presence</h4>
            <ul className="space-y-3">
              {[
                { location: 'Bangalore, India', status: 'HQ', color: 'bg-success' },
                { location: 'Dubai, UAE', status: 'Hub', color: 'bg-accent-gold' },
                { location: 'London, UK', status: 'Office', color: 'bg-accent-blue' },
              ].map(item => (
                <li key={item.location} className={`flex items-center gap-3 text-sm ${isDark ? 'text-text-muted' : 'text-slate-500'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${item.color} flex-shrink-0`} />
                  <span>{item.location}</span>
                  <span className={`text-[10px] uppercase tracking-wider ml-auto ${isDark ? 'text-text-muted/50' : 'text-slate-300'}`}>{item.status}</span>
                </li>
              ))}
            </ul>

            {/* Newsletter hint */}
            <div className={`mt-6 pt-5 border-t ${isDark ? 'border-white/[0.04]' : 'border-slate-200'}`}>
              <p className={`text-xs mb-3 ${isDark ? 'text-text-muted/60' : 'text-slate-400'}`}>Get mining industry updates</p>
              <a href="mailto:info@minecoreglobal.com?subject=Newsletter%20Subscription"
                className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors ${isDark ? 'text-accent-blue hover:text-blue-400' : 'text-blue-600 hover:text-blue-700'}`}>
                Subscribe to Newsletter
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="section-divider" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className={`text-xs ${isDark ? 'text-text-muted/50' : 'text-slate-400'}`}>
            &copy; {new Date().getFullYear()} MineCore Global. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/admin/login" className={`text-xs transition-colors ${isDark ? 'text-text-muted/30 hover:text-text-muted/60' : 'text-slate-300 hover:text-slate-500'}`}>Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
