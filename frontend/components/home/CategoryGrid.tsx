'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import type { Category } from '@/lib/types';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Category[]>('/categories')
      .then((data) =>
        setCategories(data.filter((c) => c.is_active && !c.parent_id))
      )
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="section-divider mb-16" />

      <FadeIn className="mb-10">
        <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-text-muted block mb-3">
          Categories
        </span>
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Browse Our Range
        </h2>
      </FadeIn>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass-card rounded-xl p-6 animate-pulse">
              <div className="w-10 h-10 rounded-lg bg-white/[0.06] mb-4" />
              <div className="h-4 bg-white/[0.06] rounded-md w-2/3 mb-3" />
              <div className="h-3 bg-white/[0.04] rounded-md w-full" />
            </div>
          ))}
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <StaggerItem key={cat.id}>
              <Link
                href={`/products?category=${cat.slug}`}
                className="block group"
              >
                <div className="glass-card rounded-xl p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-blue/5 hover:border-accent-blue/20">
                  {/* Icon placeholder */}
                  <div className="w-10 h-10 rounded-lg bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center mb-4 group-hover:bg-accent-blue/20 transition-colors duration-300">
                    <svg
                      className="w-5 h-5 text-accent-blue"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>

                  <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-accent-blue transition-colors">
                    {cat.name}
                  </h3>

                  {cat.children && cat.children.length > 0 && (
                    <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                      {cat.children.map((c) => c.name).join(', ')}
                    </p>
                  )}
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </section>
  );
}
