'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';
import type { Product, PaginatedResponse } from '@/lib/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchProducts = () => {
    setLoading(true);
    api.get<PaginatedResponse<Product>>(`/products?page=${page}`)
      .then(data => { setProducts(data.data); setLastPage(data.last_page); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, [page]);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this product?')) return;
    await api.delete(`/admin/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Products</h1>
        <Link href="/admin/products/create" className="bg-accent-blue text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
          + Add Product
        </Link>
      </div>

      <div className="bg-primary-light border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-text-muted font-medium">Name</th>
              <th className="text-left py-3 px-4 text-text-muted font-medium hidden md:table-cell">Category</th>
              <th className="text-left py-3 px-4 text-text-muted font-medium hidden sm:table-cell">Status</th>
              <th className="text-left py-3 px-4 text-text-muted font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({length: 5}).map((_, i) => (
                <tr key={i}><td colSpan={4} className="py-4 px-4"><div className="h-4 bg-secondary rounded animate-pulse" /></td></tr>
              ))
            ) : products.map(product => (
              <tr key={product.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="py-3 px-4">
                  <p className="text-white font-medium">{product.name}</p>
                  <p className="text-xs text-text-muted">{product.slug}</p>
                </td>
                <td className="py-3 px-4 text-text-muted hidden md:table-cell">{product.category?.name}</td>
                <td className="py-3 px-4 hidden sm:table-cell">
                  <div className="flex gap-1">
                    {product.is_featured && <span className="text-xs px-2 py-0.5 rounded bg-accent-gold/20 text-accent-gold">Featured</span>}
                    {product.is_product_of_week && <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">POTW</span>}
                    {product.is_active ? <span className="text-xs px-2 py-0.5 rounded bg-green-500/20 text-green-400">Active</span> : <span className="text-xs px-2 py-0.5 rounded bg-red-500/20 text-red-400">Inactive</span>}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <Link href={`/admin/products/${product.id}/edit`} className="text-accent-blue hover:underline text-xs">Edit</Link>
                    <button onClick={() => handleDelete(product.id)} className="text-red-400 hover:underline text-xs">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {lastPage > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({length: lastPage}, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)}
              className={`w-10 h-10 rounded-lg text-sm ${p === page ? 'bg-accent-blue text-white' : 'bg-secondary text-text-muted hover:text-white'}`}>
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
