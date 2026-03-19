'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import type { Category } from '@/lib/types';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';
import { useTheme } from '@/lib/theme';

export function CategoryGrid() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
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

      <FadeIn className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className={`text-[10px] font-semibold tracking-[0.25em] uppercase block mb-3 ${isDark ? 'text-text-muted' : 'text-slate-400'}`}>
              Equipment Categories
            </span>
            <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Browse by <span className="gradient-text">Category</span>
            </h2>
            <p className={`mt-2 text-sm max-w-lg ${isDark ? 'text-text-muted' : 'text-slate-500'}`}>
              From heavy machinery to personal protective equipment — find exactly what your operation needs.
            </p>
          </div>
          <Link href="/products" className={`text-xs font-semibold tracking-wide flex items-center gap-1 flex-shrink-0 ${isDark ? 'text-accent-blue hover:text-blue-400' : 'text-blue-600 hover:text-blue-700'} transition-colors`}>
            View All
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </FadeIn>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 animate-pulse">
              <div className="w-12 h-12 rounded-xl bg-white/[0.06] mb-4" />
              <div className="h-5 bg-white/[0.06] rounded-md w-2/3 mb-3" />
              <div className="h-3 bg-white/[0.04] rounded-md w-full" />
            </div>
          ))}
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <StaggerItem key={cat.id}>
              <Link href={`/products?category=${cat.slug}`} className="block group">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-2xl p-6 h-full transition-all duration-400 border ${isDark ? 'glass-card hover:border-accent-blue/25' : 'bg-white border-slate-200/80 shadow-sm hover:shadow-lg hover:shadow-blue-100/50 hover:border-blue-200'}`}
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 ${isDark ? 'bg-accent-blue/10 border border-accent-blue/20' : 'bg-blue-50 border border-blue-100'}`}>
                    <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>

                  <h3 className={`text-[15px] font-semibold mb-2 transition-colors duration-300 ${isDark ? 'text-white group-hover:text-accent-blue' : 'text-slate-800 group-hover:text-blue-600'}`}>
                    {cat.name}
                  </h3>

                  {cat.children && cat.children.length > 0 && (
                    <p className={`text-xs leading-relaxed line-clamp-2 ${isDark ? 'text-text-muted' : 'text-slate-500'}`}>
                      {cat.children.map((c) => c.name).join(', ')}
                    </p>
                  )}

                  {/* Arrow indicator */}
                  <div className={`mt-4 pt-3 border-t flex items-center gap-1 ${isDark ? 'border-white/[0.04]' : 'border-slate-100'}`}>
                    <span className={`text-[11px] font-medium ${isDark ? 'text-text-muted group-hover:text-accent-blue' : 'text-slate-400 group-hover:text-blue-600'} transition-colors`}>
                      Browse
                    </span>
                    <svg className={`w-3 h-3 transition-all duration-300 group-hover:translate-x-1 ${isDark ? 'text-text-muted group-hover:text-accent-blue' : 'text-slate-400 group-hover:text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </section>
  );
}
