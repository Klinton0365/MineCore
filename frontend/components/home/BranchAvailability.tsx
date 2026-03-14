'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { api } from '@/lib/api';
import type { Branch } from '@/lib/types';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';

const WorldMap = dynamic(() => import('@/components/ui/WorldMap'), { ssr: false });

// Bangalore: 12.9716° N, 77.5946° E
// Dubai:     25.2048° N, 55.2708° E
// London:    51.5074° N, 0.1278° W
const mapDots = [
  {
    start: { lat: 12.9716, lng: 77.5946 },   // Bangalore
    end:   { lat: 25.2048, lng: 55.2708 },    // Dubai
  },
  {
    start: { lat: 25.2048, lng: 55.2708 },    // Dubai
    end:   { lat: 51.5074, lng: -0.1278 },    // London
  },
  {
    start: { lat: 51.5074, lng: -0.1278 },    // London
    end:   { lat: 12.9716, lng: 77.5946 },    // Bangalore
  },
];

const branchMeta: Record<string, { flag: string; role: string }> = {
  'India':          { flag: '🇮🇳', role: 'HQ & Main Warehouse' },
  'UAE':            { flag: '🇦🇪', role: 'Middle East Hub' },
  'United Kingdom': { flag: '🇬🇧', role: 'European Center' },
};

export function BranchAvailability() {
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
        <FadeIn className="text-center mb-6">
          <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-text-muted block mb-3">
            Global Presence
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Real-Time Stock, <span className="gradient-text">Worldwide</span>
          </h2>
          <p className="text-text-secondary mt-3 max-w-xl mx-auto text-sm">
            Three continents, one unified inventory. Live stock visibility across every branch.
          </p>
        </FadeIn>
      </div>

      {/* World Map */}
      <FadeIn delay={0.2} className="max-w-6xl mx-auto px-4">
        <WorldMap dots={mapDots} lineColor="#3b82f6" />
      </FadeIn>

      {/* Branch Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-card rounded-xl p-5 animate-pulse">
                <div className="h-4 bg-white/[0.06] rounded w-24 mb-3" />
                <div className="h-3 bg-white/[0.04] rounded w-16" />
              </div>
            ))}
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {branches.map(branch => {
              const meta = branchMeta[branch.country] || { flag: '🌍', role: 'Branch' };
              return (
                <StaggerItem key={branch.id}>
                  <div className="glass-card rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{meta.flag}</span>
                        <div>
                          <h3 className="text-sm font-semibold text-white">{branch.country}</h3>
                          <p className="text-[11px] text-text-muted">{meta.role}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-white/[0.06] text-text-secondary border border-white/[0.08]">
                        {branch.region_code}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-white/[0.04]">
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
