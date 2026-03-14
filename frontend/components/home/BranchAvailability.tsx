'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { Branch } from '@/lib/types';

export function BranchAvailability() {
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    api.get<Branch[]>('/branches/public')
      .then(setBranches)
      .catch(() => {});
  }, []);

  if (branches.length === 0) return null;

  const flags: Record<string, string> = {
    'India': '&#127470;&#127475;',
    'UAE': '&#127462;&#127466;',
    'United Kingdom': '&#127468;&#127463;',
  };

  return (
    <section className="py-16 bg-[var(--color-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white">Global Presence</h2>
          <p className="text-[var(--color-text-muted)] mt-2">Real-time stock availability across our branches</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {branches.map(branch => (
            <div key={branch.id} className="bg-[var(--color-secondary)] border border-white/10 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3" dangerouslySetInnerHTML={{ __html: flags[branch.country] || '' }} />
              <h3 className="text-white font-semibold text-lg">{branch.name}</h3>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">{branch.country}</p>
              <span className="inline-block mt-3 text-xs px-3 py-1 rounded-full bg-[var(--color-accent-blue)]/10 text-[var(--color-accent-blue)] border border-[var(--color-accent-blue)]/30">
                {branch.region_code}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
