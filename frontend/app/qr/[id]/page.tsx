'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';

interface ScanResponse {
  slug: string;
  name: string;
  product_id: number;
}

export default function QrRedirectPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [error, setError] = useState(false);
  const [productName, setProductName] = useState('');

  useEffect(() => {
    if (!id) return;

    api.get<ScanResponse>(`/qr/${id}/scan?source=qr`)
      .then(data => {
        setProductName(data.name);
        // Small delay so user sees the branding
        setTimeout(() => {
          router.replace(`/products/${data.slug}`);
        }, 800);
      })
      .catch(() => {
        setError(true);
      });
  }, [id, router]);

  return (
    <div className="min-h-screen bg-[#060d1b] flex items-center justify-center px-4">
      <div className="text-center">
        {/* Logo */}
        <div className="inline-flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
        </div>

        {error ? (
          <>
            <h1 className="text-xl font-semibold text-white mb-2">Product Not Found</h1>
            <p className="text-sm text-[#94a3b8] mb-6">This QR code doesn&apos;t match any product.</p>
            <a href="/products" className="btn-primary">
              <span>Browse All Products</span>
            </a>
          </>
        ) : (
          <>
            {/* Spinner */}
            <div className="w-8 h-8 border-2 border-accent-blue/30 border-t-accent-blue rounded-full animate-spin mx-auto mb-6" />
            <p className="text-sm text-[#94a3b8]">
              {productName ? `Opening ${productName}...` : 'Loading product details...'}
            </p>
            <p className="text-xs text-[#64748b] mt-2">Powered by MineCore Global</p>
          </>
        )}
      </div>
    </div>
  );
}
