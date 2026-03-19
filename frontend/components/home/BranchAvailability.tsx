'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { api } from '@/lib/api';
import type { Branch } from '@/lib/types';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';
import { useTheme } from '@/lib/theme';

const WorldMap = dynamic(() => import('@/components/ui/WorldMap'), { ssr: false });

const mapDots = [
  { start: { lat: 12.9716, lng: 77.5946 }, end: { lat: 25.2048, lng: 55.2708 } },
  { start: { lat: 25.2048, lng: 55.2708 }, end: { lat: 51.5074, lng: -0.1278 } },
  { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 12.9716, lng: 77.5946 } },
];

const branchMeta: Record<string, { flag: string; role: string; color: string }> = {
  'India':          { flag: '🇮🇳', role: 'HQ & Main Warehouse', color: 'success' },
  'UAE':            { flag: '🇦🇪', role: 'Middle East Hub', color: 'accent-gold' },
  'United Kingdom': { flag: '🇬🇧', role: 'European Center', color: 'accent-blue' },
};

export function BranchAvailability() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Branch[]>('/branches/public')
      .then(data => setBranches(data.filter(b => b.is_visible)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-divider mb-16" />

        <FadeIn className="text-center mb-8">
          <span className={`text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3 ${isDark ? 'text-text-muted' : 'text-slate-400'}`}>
            Global Presence
          </span>
          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Real-Time Stock, <span className="gradient-text">Worldwide</span>
          </h2>
          <p className={`mt-3 max-w-xl mx-auto text-sm ${isDark ? 'text-text-secondary' : 'text-slate-500'}`}>
            Three continents, one unified inventory. Live stock visibility across every branch.
          </p>
        </FadeIn>
      </div>

      {/* World Map */}
      <FadeIn delay={0.2} className="max-w-6xl mx-auto px-4">
        <WorldMap dots={mapDots} lineColor="#3b82f6" />
      </FadeIn>

      {/* Branch Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-card rounded-2xl p-5 animate-pulse">
                <div className="h-5 bg-white/[0.06] rounded w-24 mb-3" />
                <div className="h-3 bg-white/[0.04] rounded w-16" />
              </div>
            ))}
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {branches.map(branch => {
              const meta = branchMeta[branch.country] || { flag: '🌍', role: 'Branch', color: 'accent-blue' };
              return (
                <StaggerItem key={branch.id}>
                  <div className={`rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 border ${isDark ? 'glass-card hover:border-accent-blue/20' : 'bg-white border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-200'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{meta.flag}</span>
                        <div>
                          <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>{branch.country}</h3>
                          <p className={`text-[11px] ${isDark ? 'text-text-muted' : 'text-slate-500'}`}>{meta.role}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-lg ${isDark ? 'bg-white/[0.06] text-text-secondary border border-white/[0.08]' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                        {branch.region_code}
                      </span>
                    </div>
                    <div className={`flex items-center gap-2 pt-3 border-t ${isDark ? 'border-white/[0.04]' : 'border-slate-100'}`}>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                      </span>
                      <span className="text-xs text-success font-medium">Live Inventory</span>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}
