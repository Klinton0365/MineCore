'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { Category } from '@/lib/types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', parent_id: '', description: '' });
  const [editId, setEditId] = useState<number | null>(null);

  const fetchCategories = () => {
    setLoading(true);
    Promise.all([
      api.get<Category[]>('/categories'),
      api.get<Category[]>('/categories?all=true'),
    ]).then(([tree, flat]) => {
      setCategories(tree);
      setAllCategories(flat);
    }).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name: form.name, parent_id: form.parent_id ? Number(form.parent_id) : null, description: form.description || null };
    if (editId) {
      await api.put(`/admin/categories/${editId}`, payload);
    } else {
      await api.post('/admin/categories', payload);
    }
    setShowForm(false);
    setEditId(null);
    setForm({ name: '', parent_id: '', description: '' });
    fetchCategories();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this category and all sub-categories?')) return;
    await api.delete(`/admin/categories/${id}`);
    fetchCategories();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Categories</h1>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ name: '', parent_id: '', description: '' }); }}
          className="bg-[var(--color-accent-blue)] text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600">
          {showForm ? 'Cancel' : '+ Add Category'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[var(--color-primary-light)] border border-white/10 rounded-xl p-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-[var(--color-text-muted)] mb-1">Name *</label>
              <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full bg-[var(--color-secondary)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--color-accent-blue)]" />
            </div>
            <div>
              <label className="block text-sm text-[var(--color-text-muted)] mb-1">Parent Category</label>
              <select value={form.parent_id} onChange={e => setForm(f => ({ ...f, parent_id: e.target.value }))}
                className="w-full bg-[var(--color-secondary)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--color-accent-blue)]">
                <option value="">None (Root)</option>
                {allCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-[var(--color-text-muted)] mb-1">Description</label>
              <input type="text" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="w-full bg-[var(--color-secondary)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--color-accent-blue)]" />
            </div>
          </div>
          <button type="submit" className="mt-4 bg-[var(--color-accent-blue)] text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-600">
            {editId ? 'Update' : 'Create'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="space-y-4">{[1,2,3,4].map(i => <div key={i} className="h-16 bg-[var(--color-secondary)] rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="space-y-3">
          {categories.map(cat => (
            <div key={cat.id} className="bg-[var(--color-primary-light)] border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">{cat.name}</h3>
                <div className="flex gap-2">
                  <button onClick={() => { setEditId(cat.id); setForm({ name: cat.name, parent_id: '', description: cat.description || '' }); setShowForm(true); }}
                    className="text-xs text-[var(--color-accent-blue)] hover:underline">Edit</button>
                  <button onClick={() => handleDelete(cat.id)} className="text-xs text-red-400 hover:underline">Delete</button>
                </div>
              </div>
              {cat.children && cat.children.length > 0 && (
                <div className="mt-3 ml-4 space-y-2">
                  {cat.children.map(sub => (
                    <div key={sub.id} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
                      <span className="text-sm text-[var(--color-text-muted)]">{sub.name}</span>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditId(sub.id); setForm({ name: sub.name, parent_id: String(sub.parent_id || ''), description: sub.description || '' }); setShowForm(true); }}
                          className="text-xs text-[var(--color-accent-blue)] hover:underline">Edit</button>
                        <button onClick={() => handleDelete(sub.id)} className="text-xs text-red-400 hover:underline">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
