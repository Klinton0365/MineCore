'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { DashboardStats } from '@/lib/types';

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<DashboardStats>('/dashboard')
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="h-28 bg-secondary rounded-xl animate-pulse" />)}
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-primary-light border border-white/10 rounded-xl p-5">
          <p className="text-xs text-text-muted uppercase tracking-wider">Total Enquiries</p>
          <p className="text-3xl font-bold text-white mt-2">{stats.total_enquiries}</p>
          <p className={`text-xs mt-1 ${stats.enquiries_trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {stats.enquiries_trend >= 0 ? '+' : ''}{stats.enquiries_trend.toFixed(1)}% vs last month
          </p>
        </div>

        <div className="bg-primary-light border border-white/10 rounded-xl p-5">
          <p className="text-xs text-text-muted uppercase tracking-wider">Top Product Interest</p>
          <p className="text-lg font-bold text-white mt-2 line-clamp-1">{stats.top_product?.name || 'N/A'}</p>
          <p className="text-xs text-text-muted mt-1">{stats.top_product?.count || 0} enquiries</p>
        </div>

        <div className="bg-primary-light border border-white/10 rounded-xl p-5">
          <p className="text-xs text-text-muted uppercase tracking-wider">Top Region Demand</p>
          <p className="text-lg font-bold text-white mt-2">{stats.top_region?.country || 'N/A'}</p>
          <p className="text-xs text-text-muted mt-1">{stats.top_region?.count || 0} enquiries</p>
        </div>

        <div className="bg-primary-light border border-white/10 rounded-xl p-5">
          <p className="text-xs text-text-muted uppercase tracking-wider">Total Products</p>
          <p className="text-3xl font-bold text-white mt-2">{stats.products_count}</p>
          <p className="text-xs text-text-muted mt-1">{stats.categories_count} categories, {stats.branches_count} branches</p>
        </div>
      </div>

      {/* Recent enquiries */}
      <div className="bg-primary-light border border-white/10 rounded-xl p-5">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Enquiries</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-2 text-text-muted font-medium">Name</th>
                <th className="text-left py-3 px-2 text-text-muted font-medium">Email</th>
                <th className="text-left py-3 px-2 text-text-muted font-medium">Country</th>
                <th className="text-left py-3 px-2 text-text-muted font-medium">Status</th>
                <th className="text-left py-3 px-2 text-text-muted font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recent_enquiries.map(enquiry => (
                <tr key={enquiry.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 px-2 text-white">{enquiry.customer_name}</td>
                  <td className="py-3 px-2 text-text-muted">{enquiry.email}</td>
                  <td className="py-3 px-2 text-text-muted">{enquiry.country}</td>
                  <td className="py-3 px-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      enquiry.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                      enquiry.status === 'contacted' ? 'bg-yellow-500/20 text-yellow-400' :
                      enquiry.status === 'converted' ? 'bg-green-500/20 text-green-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {enquiry.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-text-muted">{new Date(enquiry.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
