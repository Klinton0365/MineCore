'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { ProductCard } from '@/components/ui/ProductCard';
import { CountdownTimer } from './CountdownTimer';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';
import type { FeaturedSchedule } from '@/lib/types';

export function FeaturedProducts() {
  const [featured, setFeatured] = useState<FeaturedSchedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<FeaturedSchedule[]>('/featured/active')
      .then(setFeatured)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && featured.length === 0) return null;

  const countdownEnd = featured.find((s) => s.countdown_end)?.countdown_end;

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg
                className="w-4 h-4 text-accent-gold"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
              </svg>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase gradient-gold">
                Featured
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Products of the Week
            </h2>
          </div>

          {countdownEnd && (
            <div className="flex-shrink-0">
              <CountdownTimer targetDate={countdownEnd} />
            </div>
          )}
        </div>
      </FadeIn>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="glass-card rounded-xl overflow-hidden animate-pulse"
            >
              <div className="aspect-[4/3] bg-white/[0.03]" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-white/[0.06] rounded-md w-3/4" />
                <div className="h-3 bg-white/[0.04] rounded-md w-full" />
                <div className="h-3 bg-white/[0.04] rounded-md w-1/2" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-5 bg-white/[0.06] rounded-full w-16" />
                  <div className="h-7 bg-white/[0.06] rounded-lg w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map(
            (f) =>
              f.product && (
                <StaggerItem key={f.id}>
                  <ProductCard product={f.product} />
                </StaggerItem>
              )
          )}
        </StaggerContainer>
      )}
    </section>
  );
}
