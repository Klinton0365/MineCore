'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { Branch } from '@/lib/types';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';

export function BranchAvailability() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Branch[]>('/branches/public')
      .then((data) => setBranches(data.filter((b) => b.is_visible)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <FadeIn className="mb-10">
        <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-text-muted block mb-3">
          Global Presence
        </span>
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Real-Time Stock, Worldwide
        </h2>
      </FadeIn>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-card rounded-xl p-6 animate-pulse">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  <div className="h-4 bg-white/[0.06] rounded-md w-24" />
                  <div className="h-3 bg-white/[0.04] rounded-md w-16" />
                </div>
                <div className="h-5 bg-white/[0.06] rounded w-10" />
              </div>
              <div className="h-3 bg-white/[0.04] rounded-md w-12" />
            </div>
          ))}
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {branches.map((branch) => (
            <StaggerItem key={branch.id}>
              <div className="glass-card rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.12]">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {branch.country}
                    </h3>
                    <p className="text-xs text-text-muted mt-1">{branch.name}</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-white/[0.06] text-text-secondary border border-white/[0.08] uppercase">
                    {branch.region_code}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                  </span>
                  <span className="text-xs text-success font-medium">Online</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </section>
  );
}
