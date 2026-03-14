'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { ProductQrCode } from '@/components/ui/ProductQrCode';
import Link from 'next/link';

interface QrAnalytics {
  total_scans: number;
  scans_by_day: { date: string; count: number }[];
  top_products: { id: number; name: string; slug: string; scan_count: number }[];
  recent_scans: { id: number; product: { id: number; name: string; slug: string } | null; ip_address: string; source: string; created_at: string }[];
  scans_by_source: { source: string; count: number }[];
}

export default function AdminQrPage() {
  const [data, setData] = useState<QrAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);
  const [selectedProduct, setSelectedProduct] = useState<{ id: number; name: string } | null>(null);

  useEffect(() => {
    setLoading(true);
    api.get<QrAnalytics>(`/admin/qr/analytics?days=${days}`)
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [days]);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">QR Code Analytics</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1,2,3].map(i => <div key={i} className="h-28 bg-secondary rounded-xl animate-pulse" />)}
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">QR Code Analytics</h1>
          <p className="text-sm text-text-muted mt-1">Track how customers interact with your product QR codes</p>
        </div>
        <select
          value={days}
          onChange={e => setDays(Number(e.target.value))}
          className="bg-secondary border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-blue/50"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-primary-light border border-white/10 rounded-xl p-5">
          <p className="text-xs text-text-muted uppercase tracking-wider">Total Scans</p>
          <p className="text-3xl font-bold text-white mt-2">{data.total_scans}</p>
          <p className="text-xs text-text-muted mt-1">Last {days} days</p>
        </div>
        <div className="bg-primary-light border border-white/10 rounded-xl p-5">
          <p className="text-xs text-text-muted uppercase tracking-wider">Top Product</p>
          <p className="text-lg font-bold text-white mt-2 line-clamp-1">{data.top_products[0]?.name || 'N/A'}</p>
          <p className="text-xs text-text-muted mt-1">{data.top_products[0]?.scan_count || 0} scans</p>
        </div>
        <div className="bg-primary-light border border-white/10 rounded-xl p-5">
          <p className="text-xs text-text-muted uppercase tracking-wider">Scan Sources</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {data.scans_by_source.map(s => (
              <span key={s.source} className="text-xs px-2 py-1 rounded-full bg-accent-blue/10 text-accent-blue">
                {s.source}: {s.count}
              </span>
            ))}
            {data.scans_by_source.length === 0 && <p className="text-sm text-text-muted">No scans yet</p>}
          </div>
        </div>
      </div>

      {/* Scan chart (simple bar representation) */}
      {data.scans_by_day.length > 0 && (
        <div className="bg-primary-light border border-white/10 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Scans Over Time</h2>
          <div className="flex items-end gap-1 h-32">
            {data.scans_by_day.map(day => {
              const max = Math.max(...data.scans_by_day.map(d => d.count));
              const height = max > 0 ? (day.count / max) * 100 : 0;
              return (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-1" title={`${day.date}: ${day.count} scans`}>
                  <span className="text-[9px] text-text-muted">{day.count}</span>
                  <div className="w-full bg-accent-blue/60 rounded-t-sm transition-all" style={{ height: `${Math.max(height, 4)}%` }} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top scanned products with QR codes */}
        <div className="bg-primary-light border border-white/10 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Top Scanned Products</h2>
          {data.top_products.length === 0 ? (
            <p className="text-sm text-text-muted py-4">No scans recorded yet. Share QR codes to start tracking.</p>
          ) : (
            <div className="space-y-3">
              {data.top_products.map((product, i) => (
                <div key={product.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-text-muted w-5">{i + 1}.</span>
                    <div>
                      <p className="text-sm text-white font-medium">{product.name}</p>
                      <p className="text-xs text-text-muted">{product.scan_count} scans</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProduct({ id: product.id, name: product.name })}
                    className="text-xs text-accent-blue hover:underline"
                  >
                    View QR
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* QR Code Preview / Generator */}
        <div className="bg-primary-light border border-white/10 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">
            {selectedProduct ? `QR Code: ${selectedProduct.name}` : 'Select a Product'}
          </h2>
          {selectedProduct ? (
            <div className="flex flex-col items-center py-4">
              <ProductQrCode
                productId={selectedProduct.id}
                productName={selectedProduct.name}
                size={180}
                showDownload={true}
              />
              <p className="text-xs text-text-muted mt-4 text-center max-w-xs">
                Print this QR code on product labels, catalogs, or trade show materials. Each scan is tracked automatically.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center py-8 text-center">
              <svg className="w-12 h-12 text-text-muted/30 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75H16.5v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75H16.5v-.75z" />
              </svg>
              <p className="text-sm text-text-muted">Click &quot;View QR&quot; on any product to generate its QR code</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent scans table */}
      <div className="bg-primary-light border border-white/10 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-white mb-4">Recent Scans</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2 px-2 text-text-muted font-medium text-xs">Product</th>
                <th className="text-left py-2 px-2 text-text-muted font-medium text-xs hidden sm:table-cell">IP Address</th>
                <th className="text-left py-2 px-2 text-text-muted font-medium text-xs">Source</th>
                <th className="text-left py-2 px-2 text-text-muted font-medium text-xs">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.recent_scans.length === 0 ? (
                <tr><td colSpan={4} className="py-8 text-center text-text-muted">No scans yet</td></tr>
              ) : data.recent_scans.map(scan => (
                <tr key={scan.id} className="border-b border-white/5">
                  <td className="py-2.5 px-2 text-white">{scan.product?.name || 'Unknown'}</td>
                  <td className="py-2.5 px-2 text-text-muted font-mono text-xs hidden sm:table-cell">{scan.ip_address || '-'}</td>
                  <td className="py-2.5 px-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue">{scan.source}</span>
                  </td>
                  <td className="py-2.5 px-2 text-text-muted text-xs">{new Date(scan.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
