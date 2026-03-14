'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
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
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="glass-card rounded-2xl overflow-hidden group"
    >
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-[4/3] bg-secondary overflow-hidden">
        {primaryImage ? (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}/storage/${primaryImage.image_path}`}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-10 h-10 text-text-muted/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V15m0 0l-2.25 1.313M3 16.5v2.25M21 16.5v2.25M12 3v2.25m6.75 9l2.25-1.313M6.75 14.25l-2.25-1.313" />
            </svg>
          </div>
        )}
        {product.featured_badge && (
          <span className="absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-sm border border-accent-gold/20">
            <span className="gradient-gold">{product.featured_badge === 'best_seller' ? 'Best Seller' : 'Featured'}</span>
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-medium text-white group-hover:text-accent-blue transition-colors duration-300 line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-text-muted mt-1.5 leading-relaxed line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.04]">
          {bestStock ? <StockBadge status={bestStock} /> : <span />}
          <button
            onClick={() => !isInCart && addItem(product)}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-300 ${
              isInCart
                ? 'bg-success/10 text-success border border-success/20'
                : 'bg-accent-blue/10 text-accent-blue hover:bg-accent-blue hover:text-white border border-accent-blue/20 hover:border-accent-blue'
            }`}
          >
            {isInCart ? 'Added' : 'Enquire'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
