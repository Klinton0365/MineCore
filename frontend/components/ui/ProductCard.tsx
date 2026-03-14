'use client';

import Link from 'next/link';
import { StockBadge } from './StockBadge';
import { useEnquiryCart } from '@/lib/enquiry-store';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useEnquiryCart();
  const isInCart = items.some(item => item.id === product.id);
  const primaryImage = product.images?.find(img => img.is_primary) || product.images?.[0];
  const bestStock = product.branches?.[0]?.pivot?.stock_status;

  return (
    <div className="group bg-[var(--color-primary-light)] border border-white/10 rounded-xl overflow-hidden hover:border-[var(--color-accent-blue)]/50 transition-all duration-300">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-[4/3] bg-[var(--color-secondary)] overflow-hidden">
        {primaryImage ? (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}/storage/${primaryImage.image_path}`}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--color-text-muted)]">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {product.featured_badge && (
          <span className="absolute top-2 left-2 bg-[var(--color-accent-gold)] text-black text-xs font-bold px-2 py-1 rounded">
            {product.featured_badge === 'best_seller' ? 'Best Seller' : 'Featured'}
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-semibold text-white group-hover:text-[var(--color-accent-blue)] transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-[var(--color-text-muted)] mt-1 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mt-3">
          {bestStock && <StockBadge status={bestStock} />}
          <button
            onClick={() => !isInCart && addItem(product)}
            className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
              isInCart
                ? 'bg-green-500/20 text-green-400 cursor-default'
                : 'bg-[var(--color-accent-blue)] text-white hover:bg-blue-600'
            }`}
          >
            {isInCart ? 'Added' : 'Enquire'}
          </button>
        </div>
      </div>
    </div>
  );
}
