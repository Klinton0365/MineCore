'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import { ProductCard } from '@/components/ui/ProductCard';
import type { Product, Category, PaginatedResponse } from '@/lib/types';
import Link from 'next/link';

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="pt-16 min-h-screen bg-[var(--color-primary)]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-72 bg-[var(--color-secondary)] rounded-xl animate-pulse" />)}
          </div>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
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

  useEffect(() => {
    setLoading(true);
    let url = `/products?page=${page}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (categorySlug) {
      // Find category ID from slug
      const findCat = (cats: Category[]): Category | undefined => {
        for (const c of cats) {
          if (c.slug === categorySlug) return c;
          if (c.children) {
            const found = findCat(c.children);
            if (found) return found;
          }
        }
      };
      const cat = findCat(categories);
      if (cat) url += `&category_id=${cat.id}`;
    }

    api.get<PaginatedResponse<Product>>(url)
      .then(data => {
        setProducts(data.data);
        setPagination({ current_page: data.current_page, last_page: data.last_page, total: data.total });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [search, categorySlug, page, categories]);

  return (
    <div className="pt-16 min-h-screen bg-[var(--color-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            {search ? `Search: "${search}"` : categorySlug ? categories.find(c => c.slug === categorySlug)?.name || 'Products' : 'All Products'}
          </h1>
          <p className="text-[var(--color-text-muted)] mt-1">{pagination.total} products found</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-[var(--color-primary-light)] border border-white/10 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Categories</h3>
              <ul className="space-y-1">
                <li>
                  <Link href="/products" className={`block px-3 py-2 text-sm rounded-lg transition-colors ${!categorySlug ? 'bg-[var(--color-accent-blue)]/10 text-[var(--color-accent-blue)]' : 'text-[var(--color-text-muted)] hover:text-white'}`}>
                    All Products
                  </Link>
                </li>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <Link href={`/products?category=${cat.slug}`} className={`block px-3 py-2 text-sm rounded-lg transition-colors ${categorySlug === cat.slug ? 'bg-[var(--color-accent-blue)]/10 text-[var(--color-accent-blue)]' : 'text-[var(--color-text-muted)] hover:text-white'}`}>
                      {cat.name}
                    </Link>
                    {cat.children && cat.children.length > 0 && (
                      <ul className="ml-3 mt-1 space-y-1">
                        {cat.children.map(sub => (
                          <li key={sub.id}>
                            <Link href={`/products?category=${sub.slug}`} className={`block px-3 py-1.5 text-xs rounded-lg transition-colors ${categorySlug === sub.slug ? 'text-[var(--color-accent-blue)]' : 'text-[var(--color-text-muted)] hover:text-white'}`}>
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => <div key={i} className="h-72 bg-[var(--color-secondary)] rounded-xl animate-pulse" />)}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-[var(--color-text-muted)] text-lg">No products found</p>
                <Link href="/products" className="text-[var(--color-accent-blue)] text-sm mt-2 inline-block">Clear filters</Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => <ProductCard key={product.id} product={product} />)}
                </div>

                {/* Pagination */}
                {pagination.last_page > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(p => (
                      <Link key={p} href={`/products?page=${p}${search ? `&search=${search}` : ''}${categorySlug ? `&category=${categorySlug}` : ''}`}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm transition-colors ${p === pagination.current_page ? 'bg-[var(--color-accent-blue)] text-white' : 'bg-[var(--color-secondary)] text-[var(--color-text-muted)] hover:text-white'}`}>
                        {p}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
