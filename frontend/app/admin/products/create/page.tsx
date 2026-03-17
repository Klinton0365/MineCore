'use client';

import Link from 'next/link';
import { ProductForm } from '@/components/admin/ProductForm';

export default function CreateProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/products" className="text-text-muted hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Add Product</h1>
          <p className="text-sm text-text-muted mt-0.5">Create a new product listing</p>
        </div>
      </div>

      <ProductForm />
    </div>
  );
}
