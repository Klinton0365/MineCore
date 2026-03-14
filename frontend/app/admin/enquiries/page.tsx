'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';
import type { Enquiry, PaginatedResponse } from '@/lib/types';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchEnquiries = () => {
    setLoading(true);
    let url = `/admin/enquiries?page=${page}`;
    if (statusFilter) url += `&status=${statusFilter}`;
    api.get<PaginatedResponse<Enquiry>>(url)
      .then(data => { setEnquiries(data.data); setLastPage(data.last_page); setTotal(data.total); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchEnquiries(); }, [page, statusFilter]);

  const updateStatus = async (id: number, status: string) => {
    await api.put(`/admin/enquiries/${id}/status`, { status });
    fetchEnquiries();
  };

  const handleExport = () => {
    const token = localStorage.getItem('auth_token');
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    window.open(`${baseUrl}/admin/enquiries/export?token=${token}${statusFilter ? `&status=${statusFilter}` : ''}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Enquiries</h1>
          <p className="text-sm text-text-muted">{total} total enquiries</p>
        </div>
        <button onClick={handleExport} className="bg-accent-gold text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-500 transition-colors">
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['', 'new', 'contacted', 'converted', 'closed'].map(s => (
          <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${statusFilter === s ? 'bg-accent-blue text-white' : 'bg-secondary text-text-muted hover:text-white'}`}>
            {s || 'All'}
          </button>
        ))}
      </div>

      <div className="bg-primary-light border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-text-muted font-medium">Customer</th>
              <th className="text-left py-3 px-4 text-text-muted font-medium hidden md:table-cell">Email</th>
              <th className="text-left py-3 px-4 text-text-muted font-medium hidden sm:table-cell">Country</th>
              <th className="text-left py-3 px-4 text-text-muted font-medium">Status</th>
              <th className="text-left py-3 px-4 text-text-muted font-medium hidden md:table-cell">Date</th>
              <th className="text-left py-3 px-4 text-text-muted font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({length: 5}).map((_, i) => (
                <tr key={i}><td colSpan={6} className="py-4 px-4"><div className="h-4 bg-secondary rounded animate-pulse" /></td></tr>
              ))
            ) : enquiries.map(enquiry => (
              <tr key={enquiry.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="py-3 px-4">
                  <p className="text-white">{enquiry.customer_name}</p>
                  <p className="text-xs text-text-muted">{enquiry.phone}</p>
                </td>
                <td className="py-3 px-4 text-text-muted hidden md:table-cell">{enquiry.email}</td>
                <td className="py-3 px-4 text-text-muted hidden sm:table-cell">{enquiry.country}</td>
                <td className="py-3 px-4">
                  <select value={enquiry.status} onChange={e => updateStatus(enquiry.id, e.target.value)}
                    className="bg-secondary border border-white/10 rounded text-xs text-white px-2 py-1 focus:outline-none">
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td className="py-3 px-4 text-text-muted text-xs hidden md:table-cell">{new Date(enquiry.created_at).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <Link href={`/admin/enquiries/${enquiry.id}`} className="text-accent-blue hover:underline text-xs">View</Link>
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
              className={`w-10 h-10 rounded-lg text-sm ${p === page ? 'bg-accent-blue text-white' : 'bg-secondary text-text-muted'}`}>
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
