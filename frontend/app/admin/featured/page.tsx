'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { FeaturedSchedule, Product, PaginatedResponse } from '@/lib/types';

export default function AdminFeaturedPage() {
  const [schedules, setSchedules] = useState<FeaturedSchedule[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ product_id: '', start_date: '', end_date: '', countdown_end: '' });

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      api.get<FeaturedSchedule[]>('/admin/featured'),
      api.get<PaginatedResponse<Product>>('/products?per_page=100'),
    ]).then(([sched, prods]) => {
      setSchedules(sched);
      setProducts(prods.data);
    }).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/admin/featured', {
      product_id: Number(form.product_id),
      start_date: form.start_date,
      end_date: form.end_date,
      countdown_end: form.countdown_end || null,
    });
    setShowForm(false);
    setForm({ product_id: '', start_date: '', end_date: '', countdown_end: '' });
    fetchData();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Remove this featured schedule?')) return;
    await api.delete(`/admin/featured/${id}`);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Featured Products</h1>
        <button onClick={() => setShowForm(!showForm)}
          className="bg-[var(--color-accent-blue)] text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
          {showForm ? 'Cancel' : '+ Add Schedule'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[var(--color-primary-light)] border border-white/10 rounded-xl p-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-[var(--color-text-muted)] mb-1">Product *</label>
              <select required value={form.product_id} onChange={e => setForm(f => ({ ...f, product_id: e.target.value }))}
                className="w-full bg-[var(--color-secondary)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--color-accent-blue)]">
                <option value="">Select product</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-[var(--color-text-muted)] mb-1">Start Date *</label>
              <input type="date" required value={form.start_date} onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))}
                className="w-full bg-[var(--color-secondary)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--color-accent-blue)]" />
            </div>
            <div>
              <label className="block text-sm text-[var(--color-text-muted)] mb-1">End Date *</label>
              <input type="date" required value={form.end_date} onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))}
                className="w-full bg-[var(--color-secondary)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--color-accent-blue)]" />
            </div>
            <div>
              <label className="block text-sm text-[var(--color-text-muted)] mb-1">Countdown End</label>
              <input type="datetime-local" value={form.countdown_end} onChange={e => setForm(f => ({ ...f, countdown_end: e.target.value }))}
                className="w-full bg-[var(--color-secondary)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--color-accent-blue)]" />
            </div>
          </div>
          <button type="submit" className="mt-4 bg-[var(--color-accent-blue)] text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-600">Add Schedule</button>
        </form>
      )}

      <div className="space-y-3">
        {loading ? (
          [1,2].map(i => <div key={i} className="h-20 bg-[var(--color-secondary)] rounded-xl animate-pulse" />)
        ) : schedules.length === 0 ? (
          <p className="text-[var(--color-text-muted)] text-center py-12">No featured schedules</p>
        ) : schedules.map(schedule => (
          <div key={schedule.id} className="bg-[var(--color-primary-light)] border border-white/10 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-white font-medium">{schedule.product?.name || `Product #${schedule.product_id}`}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                {schedule.start_date} to {schedule.end_date}
                {schedule.is_active ? <span className="ml-2 text-green-400">Active</span> : <span className="ml-2 text-red-400">Inactive</span>}
              </p>
            </div>
            <button onClick={() => handleDelete(schedule.id)} className="text-red-400 hover:underline text-xs">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
