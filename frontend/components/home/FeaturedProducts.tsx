'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { ProductCard } from '@/components/ui/ProductCard';
import { CountdownTimer } from './CountdownTimer';
import type { FeaturedSchedule } from '@/lib/types';

export function FeaturedProducts() {
  const [featured, setFeatured] = useState<FeaturedSchedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<FeaturedSchedule[]>('/featured/active')
      .then(setFeatured)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-[var(--color-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => <div key={i} className="h-64 bg-[var(--color-secondary)] rounded-xl" />)}
          </div>
        </div>
      </section>
    );
  }

  if (featured.length === 0) return null;

  const countdownEnd = featured[0]?.countdown_end;

  return (
    <section className="py-16 bg-[var(--color-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[var(--color-accent-gold)]">&#9733;</span>
              <span className="text-sm font-medium text-[var(--color-accent-gold)] uppercase tracking-wider">Products of the Week</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Featured Equipment</h2>
          </div>
          {countdownEnd && <CountdownTimer targetDate={countdownEnd} />}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(f => f.product && (
            <ProductCard key={f.id} product={f.product} />
          ))}
        </div>
      </div>
    </section>
  );
}
