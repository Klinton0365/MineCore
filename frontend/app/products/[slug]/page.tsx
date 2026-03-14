'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { StockBadge } from '@/components/ui/StockBadge';
import { useEnquiryCart } from '@/lib/enquiry-store';
import type { Product } from '@/lib/types';
import Link from 'next/link';

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
      <div className="pt-16 min-h-screen bg-primary">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse grid md:grid-cols-2 gap-8">
            <div className="aspect-square bg-secondary rounded-xl" />
            <div className="space-y-4">
              <div className="h-8 bg-secondary rounded w-3/4" />
              <div className="h-4 bg-secondary rounded w-1/2" />
              <div className="h-32 bg-secondary rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-16 min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Product Not Found</h1>
          <Link href="/products" className="text-accent-blue mt-4 inline-block">Back to Products</Link>
        </div>
      </div>
    );
  }

  const isInCart = items.some(item => item.id === product.id);
  const images = product.images || [];
  const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || '';

  return (
    <div className="pt-16 min-h-screen bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-white">Products</Link>
          {product.category && (
            <>
              <span>/</span>
              <Link href={`/products?category=${product.category.slug}`} className="hover:text-white">{product.category.name}</Link>
            </>
          )}
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-secondary rounded-xl overflow-hidden mb-4">
              {images.length > 0 ? (
                <img
                  src={`${apiBase}/storage/${images[selectedImage]?.image_path}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-muted">
                  <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button key={img.id} onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-accent-blue' : 'border-transparent'}`}>
                    <img src={`${apiBase}/storage/${img.image_path}`} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {product.featured_badge && (
              <span className="inline-block mb-3 bg-accent-gold text-black text-xs font-bold px-2.5 py-1 rounded">
                {product.featured_badge === 'best_seller' ? 'Best Seller' : 'Featured'}
              </span>
            )}

            <h1 className="text-3xl font-bold text-white">{product.name}</h1>

            {product.category && (
              <p className="text-accent-blue text-sm mt-2">{product.category.name}</p>
            )}

            <p className="text-text-muted mt-4 leading-relaxed">{product.description}</p>

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Technical Specifications</h3>
                <div className="bg-secondary rounded-lg overflow-hidden">
                  {Object.entries(product.specifications).map(([key, value], i) => (
                    <div key={key} className={`flex justify-between px-4 py-3 text-sm ${i % 2 === 0 ? '' : 'bg-white/5'}`}>
                      <span className="text-text-muted capitalize">{key.replace(/_/g, ' ')}</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Branch Availability */}
            {product.branches && product.branches.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Branch Availability</h3>
                <div className="space-y-2">
                  {product.branches.map(branch => (
                    <div key={branch.id} className="flex items-center justify-between bg-secondary rounded-lg px-4 py-3">
                      <div>
                        <span className="text-white text-sm">{branch.name}</span>
                        <span className="text-text-muted text-xs ml-2">({branch.region_code})</span>
                      </div>
                      <StockBadge status={branch.pivot.stock_status} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Country Availability */}
            {product.countries && product.countries.length > 0 && (
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {product.countries.filter(c => c.is_available).map(country => (
                    <span key={country.id} className="text-xs px-2 py-1 rounded-full bg-success/10 text-success border border-success/20">
                      Available in {country.country_name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => !isInCart && addItem(product)}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors text-center ${
                  isInCart
                    ? 'bg-green-500/20 text-green-400 cursor-default'
                    : 'bg-accent-blue text-white hover:bg-blue-600'
                }`}
              >
                {isInCart ? 'Added to Enquiry' : 'Add to Enquiry'}
              </button>
              <a
                href={`https://wa.me/918012345678?text=${encodeURIComponent(`Hello, I am interested in ${product.name}. Please share details.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-green-500/50 text-green-400 hover:bg-green-500/10 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
