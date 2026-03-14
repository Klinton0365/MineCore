'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { StockBadge } from '@/components/ui/StockBadge';
import { useEnquiryCart } from '@/lib/enquiry-store';
import { FadeIn } from '@/components/ui/MotionWrapper';
import type { Product } from '@/lib/types';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem, items } = useEnquiryCart();

  useEffect(() => {
    api.get<Product>(`/products/${slug}`)
      .then(setProduct)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-[72px] min-h-screen bg-primary">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb skeleton */}
          <div className="flex items-center gap-2 mb-10">
            <div className="h-3.5 w-12 bg-surface/50 rounded animate-pulse" />
            <div className="h-3.5 w-3 bg-surface/30 rounded animate-pulse" />
            <div className="h-3.5 w-16 bg-surface/50 rounded animate-pulse" />
            <div className="h-3.5 w-3 bg-surface/30 rounded animate-pulse" />
            <div className="h-3.5 w-32 bg-surface/50 rounded animate-pulse" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image skeleton */}
            <div>
              <div className="glass-card rounded-2xl overflow-hidden aspect-square animate-pulse bg-surface" />
              <div className="flex gap-3 mt-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-20 h-20 rounded-xl bg-surface/50 animate-pulse" />
                ))}
              </div>
            </div>
            {/* Info skeleton */}
            <div className="space-y-6">
              <div>
                <div className="h-5 w-24 bg-surface/50 rounded-full animate-pulse mb-4" />
                <div className="h-9 w-3/4 bg-surface rounded-lg animate-pulse" />
                <div className="h-4 w-32 bg-surface/40 rounded animate-pulse mt-3" />
              </div>
              <div className="space-y-2">
                <div className="h-3.5 bg-surface/40 rounded w-full animate-pulse" />
                <div className="h-3.5 bg-surface/40 rounded w-full animate-pulse" />
                <div className="h-3.5 bg-surface/40 rounded w-5/6 animate-pulse" />
                <div className="h-3.5 bg-surface/30 rounded w-2/3 animate-pulse" />
              </div>
              <div className="glass-card rounded-2xl p-5">
                <div className="h-4 w-40 bg-surface/50 rounded animate-pulse mb-4" />
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`flex justify-between py-3 ${i > 1 ? 'border-t border-white/[0.04]' : ''}`}>
                    <div className="h-3.5 w-28 bg-surface/40 rounded animate-pulse" />
                    <div className="h-3.5 w-20 bg-surface/40 rounded animate-pulse" />
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <div className="h-14 flex-1 bg-surface/50 rounded-2xl animate-pulse" />
                <div className="h-14 w-40 bg-surface/30 rounded-2xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-[72px] min-h-screen bg-primary flex items-center justify-center">
        <FadeIn>
          <div className="text-center">
            <div className="w-20 h-20 rounded-2xl bg-surface/50 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-text-muted/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Product Not Found</h1>
            <p className="text-text-muted text-sm mb-8">
              The product you are looking for does not exist or has been removed.
            </p>
            <Link
              href="/products"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Products
            </Link>
          </div>
        </FadeIn>
      </div>
    );
  }

  const isInCart = items.some(item => item.id === product.id);
  const images = product.images || [];
  const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || '';
  const specs = product.specifications ? Object.entries(product.specifications) : [];
  const availableCountries = product.countries?.filter(c => c.is_available) || [];

  return (
    <div className="pt-[72px] min-h-screen bg-primary">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <FadeIn>
          <nav className="flex items-center gap-2.5 text-sm mb-10">
            <Link href="/" className="text-text-muted hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-text-muted/30">/</span>
            <Link href="/products" className="text-text-muted hover:text-white transition-colors">
              Products
            </Link>
            {product.category && (
              <>
                <span className="text-text-muted/30">/</span>
                <Link
                  href={`/products?category=${product.category.slug}`}
                  className="text-text-muted hover:text-white transition-colors"
                >
                  {product.category.name}
                </Link>
              </>
            )}
            <span className="text-text-muted/30">/</span>
            <span className="text-text-secondary truncate max-w-[200px]">{product.name}</span>
          </nav>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <FadeIn direction="left">
            <div className="sticky top-[96px]">
              <div className="glass-card rounded-2xl overflow-hidden aspect-square">
                <AnimatePresence mode="wait">
                  {images.length > 0 ? (
                    <motion.img
                      key={selectedImage}
                      src={`${apiBase}/storage/${images[selectedImage]?.image_path}`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-surface/30">
                      <svg className="w-20 h-20 text-text-muted/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M6.75 7.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18 7.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                      </svg>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {images.map((img, i) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all duration-200 ${
                        i === selectedImage
                          ? 'ring-2 ring-accent-blue ring-offset-2 ring-offset-primary'
                          : 'opacity-50 hover:opacity-80'
                      }`}
                    >
                      <img
                        src={`${apiBase}/storage/${img.image_path}`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Title section */}
            <FadeIn delay={0.1}>
              <div>
                {/* Badge */}
                {product.featured_badge && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                    <span className="gradient-gold">
                      {product.featured_badge === 'best_seller' ? 'Best Seller' : 'Featured'}
                    </span>
                  </span>
                )}

                <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                  {product.name}
                </h1>

                {product.category && (
                  <Link
                    href={`/products?category=${product.category.slug}`}
                    className="inline-flex items-center gap-1.5 mt-3 text-sm text-accent-blue hover:text-accent-cyan transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                    </svg>
                    {product.category.name}
                  </Link>
                )}
              </div>
            </FadeIn>

            {/* Description */}
            <FadeIn delay={0.15}>
              <p className="text-text-muted leading-relaxed text-[15px]">
                {product.description}
              </p>
            </FadeIn>

            {/* Specifications */}
            {specs.length > 0 && (
              <FadeIn delay={0.2}>
                <div className="glass-card rounded-2xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-white/[0.06]">
                    <h3 className="text-sm font-semibold text-white uppercase tracking-[0.08em]">
                      Technical Specifications
                    </h3>
                  </div>
                  <div className="divide-y divide-white/[0.04]">
                    {specs.map(([key, value], i) => (
                      <div
                        key={key}
                        className={`flex items-center justify-between px-6 py-3.5 text-sm ${
                          i % 2 === 0 ? 'bg-white/[0.01]' : 'bg-white/[0.03]'
                        }`}
                      >
                        <span className="text-text-muted capitalize">
                          {key.replace(/_/g, ' ')}
                        </span>
                        <span className="text-white font-medium text-right ml-4">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Branch Availability */}
            {product.branches && product.branches.length > 0 && (
              <FadeIn delay={0.25}>
                <div className="glass-card rounded-2xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-white/[0.06]">
                    <h3 className="text-sm font-semibold text-white uppercase tracking-[0.08em]">
                      Branch Availability
                    </h3>
                  </div>
                  <div className="divide-y divide-white/[0.04]">
                    {product.branches.map(branch => (
                      <div
                        key={branch.id}
                        className="flex items-center justify-between px-6 py-3.5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-surface/60 flex items-center justify-center">
                            <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                          </div>
                          <div>
                            <span className="text-white text-sm font-medium">{branch.name}</span>
                            <span className="text-text-muted text-xs ml-2">
                              {branch.region_code}
                            </span>
                          </div>
                        </div>
                        <StockBadge status={branch.pivot.stock_status} />
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Country Availability */}
            {availableCountries.length > 0 && (
              <FadeIn delay={0.3}>
                <div>
                  <h3 className="text-xs font-semibold text-text-muted uppercase tracking-[0.1em] mb-3">
                    Available In
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {availableCountries.map(country => (
                      <span
                        key={country.id}
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-success/[0.08] text-success border border-success/10 font-medium"
                      >
                        <span className="w-1 h-1 rounded-full bg-success" />
                        {country.country_name}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            {/* CTA Section */}
            <FadeIn delay={0.35}>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: isInCart ? 1 : 1.01 }}
                  whileTap={{ scale: isInCart ? 1 : 0.98 }}
                  onClick={() => !isInCart && addItem(product)}
                  className={`flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl font-medium text-[15px] transition-all duration-300 ${
                    isInCart
                      ? 'bg-success/10 text-success border border-success/20 cursor-default'
                      : 'btn-primary shadow-lg shadow-accent-blue/20 hover:shadow-accent-blue/30'
                  }`}
                >
                  {isInCart ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Added to Enquiry
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      Add to Enquiry
                    </>
                  )}
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  href={`https://wa.me/918012345678?text=${encodeURIComponent(`Hello, I am interested in ${product.name}. Please share details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl border border-green-500/20 text-green-400 hover:bg-green-500/[0.06] hover:border-green-500/30 transition-all duration-300 font-medium text-[15px]"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </motion.a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
