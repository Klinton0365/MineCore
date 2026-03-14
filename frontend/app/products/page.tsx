'use client';

import { Suspense, useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import { ProductCard } from '@/components/ui/ProductCard';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/MotionWrapper';
import type { Product, Category, PaginatedResponse } from '@/lib/types';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

function LoadingSkeleton() {
  return (
    <div className="pt-[72px] min-h-screen bg-primary">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header skeleton */}
        <div className="mb-10">
          <div className="h-9 w-48 bg-surface rounded-lg animate-pulse" />
          <div className="h-4 w-32 bg-surface/60 rounded-md animate-pulse mt-3" />
        </div>
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar skeleton */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="glass-card rounded-2xl p-6">
              <div className="h-4 w-24 bg-surface rounded animate-pulse mb-6" />
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-9 bg-surface/50 rounded-xl animate-pulse" />
                ))}
              </div>
            </div>
          </aside>
          {/* Grid skeleton */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="glass-card rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-surface" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-surface rounded w-3/4" />
                    <div className="h-3 bg-surface/60 rounded w-full" />
                    <div className="h-3 bg-surface/40 rounded w-2/3" />
                    <div className="flex justify-between items-center pt-3 border-t border-white/[0.04]">
                      <div className="h-5 w-16 bg-surface/50 rounded" />
                      <div className="h-7 w-16 bg-surface/50 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ProductsContent />
    </Suspense>
  );
}

function CategoryItem({
  category,
  categorySlug,
  search,
  depth = 0,
}: {
  category: Category;
  categorySlug: string;
  search: string;
  depth?: number;
}) {
  const isActive = categorySlug === category.slug;
  const hasChildren = category.children && category.children.length > 0;
  const hasActiveChild = hasChildren && category.children!.some(
    c => c.slug === categorySlug || c.children?.some(sc => sc.slug === categorySlug)
  );

  return (
    <li>
      <Link
        href={`/products?category=${category.slug}${search ? `&search=${search}` : ''}`}
        className={`group flex items-center gap-3 px-4 py-2.5 text-sm rounded-xl transition-all duration-200 ${
          isActive
            ? 'border-l-2 border-accent-blue text-white bg-accent-blue/[0.06]'
            : 'text-text-muted hover:text-white hover:bg-white/[0.03]'
        } ${depth > 0 ? 'ml-4 text-[13px]' : ''}`}
      >
        <span className="truncate">{category.name}</span>
        {category.products && category.products.length > 0 && (
          <span className="text-[11px] text-text-muted/60 ml-auto tabular-nums">
            {category.products.length}
          </span>
        )}
      </Link>
      {hasChildren && (isActive || hasActiveChild || depth === 0) && (
        <ul className="mt-1 space-y-0.5">
          {category.children!.map(sub => (
            <CategoryItem
              key={sub.id}
              category={sub}
              categorySlug={categorySlug}
              search={search}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1, total: 0 });
  const [loading, setLoading] = useState(true);

  const search = searchParams.get('search') || '';
  const categorySlug = searchParams.get('category') || '';
  const page = searchParams.get('page') || '1';

  useEffect(() => {
    api.get<Category[]>('/categories').then(setCategories).catch(() => {});
  }, []);

  const findCategory = useCallback((cats: Category[], slug: string): Category | undefined => {
    for (const c of cats) {
      if (c.slug === slug) return c;
      if (c.children) {
        const found = findCategory(c.children, slug);
        if (found) return found;
      }
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    let url = `/products?page=${page}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (categorySlug) {
      const cat = findCategory(categories, categorySlug);
      if (cat) url += `&category_id=${cat.id}`;
    }

    api.get<PaginatedResponse<Product>>(url)
      .then(data => {
        setProducts(data.data);
        setPagination({ current_page: data.current_page, last_page: data.last_page, total: data.total });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [search, categorySlug, page, categories, findCategory]);

  const activeCategory = categorySlug ? findCategory(categories, categorySlug) : null;

  const buildPageUrl = (p: number) => {
    const params = new URLSearchParams();
    if (p > 1) params.set('page', String(p));
    if (search) params.set('search', search);
    if (categorySlug) params.set('category', categorySlug);
    const qs = params.toString();
    return `/products${qs ? `?${qs}` : ''}`;
  };

  const getPageTitle = () => {
    if (search) return `Search results for "${search}"`;
    if (activeCategory) return activeCategory.name;
    return 'All Products';
  };

  return (
    <div className="pt-[72px] min-h-screen bg-primary">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <FadeIn>
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {getPageTitle()}
            </h1>
            <p className="text-text-muted mt-2 text-[15px]">
              {pagination.total} {pagination.total === 1 ? 'product' : 'products'} available
            </p>
          </div>
        </FadeIn>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Category Sidebar */}
          <FadeIn direction="left" className="lg:w-72 flex-shrink-0">
            <div className="glass-card rounded-2xl p-5 sticky top-[96px]">
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-[0.1em] mb-5 px-4">
                Categories
              </h3>
              <nav>
                <ul className="space-y-0.5">
                  <li>
                    <Link
                      href={`/products${search ? `?search=${search}` : ''}`}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm rounded-xl transition-all duration-200 ${
                        !categorySlug
                          ? 'border-l-2 border-accent-blue text-white bg-accent-blue/[0.06]'
                          : 'text-text-muted hover:text-white hover:bg-white/[0.03]'
                      }`}
                    >
                      <span>All Products</span>
                    </Link>
                  </li>

                  {categories.map(cat => (
                    <CategoryItem
                      key={cat.id}
                      category={cat}
                      categorySlug={categorySlug}
                      search={search}
                    />
                  ))}
                </ul>
              </nav>
            </div>
          </FadeIn>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="glass-card rounded-2xl overflow-hidden animate-pulse">
                      <div className="aspect-[4/3] bg-surface" />
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-surface rounded w-3/4" />
                        <div className="h-3 bg-surface/60 rounded w-full" />
                        <div className="h-3 bg-surface/40 rounded w-2/3" />
                        <div className="flex justify-between items-center pt-3 border-t border-white/[0.04]">
                          <div className="h-5 w-16 bg-surface/50 rounded" />
                          <div className="h-7 w-16 bg-surface/50 rounded-lg" />
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : products.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-32"
                >
                  <div className="w-16 h-16 rounded-2xl bg-surface/50 flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-text-muted/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                  <p className="text-white text-lg font-medium mb-1">No products found</p>
                  <p className="text-text-muted text-sm mb-6">Try adjusting your search or filter criteria</p>
                  <Link
                    href="/products"
                    className="text-accent-blue text-sm font-medium hover:underline underline-offset-4"
                  >
                    Clear all filters
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="products"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(product => (
                      <StaggerItem key={product.id}>
                        <ProductCard product={product} />
                      </StaggerItem>
                    ))}
                  </StaggerContainer>

                  {/* Pagination */}
                  {pagination.last_page > 1 && (
                    <FadeIn delay={0.3}>
                      <div className="flex items-center justify-center gap-1.5 mt-12">
                        {/* Previous */}
                        {pagination.current_page > 1 && (
                          <Link
                            href={buildPageUrl(pagination.current_page - 1)}
                            className="flex items-center justify-center w-10 h-10 rounded-full glass text-text-muted hover:text-white transition-colors"
                            aria-label="Previous page"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                          </Link>
                        )}

                        {/* Page numbers */}
                        {Array.from({ length: pagination.last_page }, (_, i) => i + 1)
                          .filter(p => {
                            if (pagination.last_page <= 7) return true;
                            if (p === 1 || p === pagination.last_page) return true;
                            if (Math.abs(p - pagination.current_page) <= 1) return true;
                            return false;
                          })
                          .map((p, idx, arr) => {
                            const showEllipsis = idx > 0 && p - arr[idx - 1] > 1;
                            return (
                              <span key={p} className="flex items-center">
                                {showEllipsis && (
                                  <span className="w-10 h-10 flex items-center justify-center text-text-muted text-sm">
                                    ...
                                  </span>
                                )}
                                <Link
                                  href={buildPageUrl(p)}
                                  className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all duration-200 ${
                                    p === pagination.current_page
                                      ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20'
                                      : 'glass text-text-muted hover:text-white'
                                  }`}
                                >
                                  {p}
                                </Link>
                              </span>
                            );
                          })}

                        {/* Next */}
                        {pagination.current_page < pagination.last_page && (
                          <Link
                            href={buildPageUrl(pagination.current_page + 1)}
                            className="flex items-center justify-center w-10 h-10 rounded-full glass text-text-muted hover:text-white transition-colors"
                            aria-label="Next page"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                          </Link>
                        )}
                      </div>
                    </FadeIn>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
