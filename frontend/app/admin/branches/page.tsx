'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { Branch } from '@/lib/types';

export default function AdminBranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', region_code: '', country: '', description: '', address: '', display_logic: '' });
  const [editId, setEditId] = useState<number | null>(null);

  const fetchBranches = () => {
    setLoading(true);
    api.get<Branch[]>('/admin/branches')
      .then(setBranches)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBranches(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await api.put(`/admin/branches/${editId}`, form);
    } else {
      await api.post('/admin/branches', form);
    }
    setShowForm(false);
    setEditId(null);
    setForm({ name: '', region_code: '', country: '', description: '', address: '', display_logic: '' });
    fetchBranches();
  };

  const startEdit = (branch: Branch) => {
    setForm({ name: branch.name, region_code: branch.region_code, country: branch.country, description: branch.description || '', address: branch.address || '', display_logic: branch.display_logic || '' });
    setEditId(branch.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this branch?')) return;
    await api.delete(`/admin/branches/${id}`);
    fetchBranches();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Branches</h1>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ name: '', region_code: '', country: '', description: '', address: '', display_logic: '' }); }}
          className="bg-accent-blue text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
          {showForm ? 'Cancel' : '+ Add Branch'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-primary-light border border-white/10 rounded-xl p-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {(['name', 'region_code', 'country', 'description', 'address', 'display_logic'] as const).map(field => (
              <div key={field}>
                <label className="block text-sm text-text-muted mb-1 capitalize">{field.replace('_', ' ')}</label>
                <input type="text" value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                  required={['name', 'region_code', 'country'].includes(field)}
                  className="w-full bg-secondary border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-blue" />
              </div>
            ))}
          </div>
          <button type="submit" className="mt-4 bg-accent-blue text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-600">
            {editId ? 'Update Branch' : 'Create Branch'}
          </button>
        </form>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {loading ? (
          [1,2,3].map(i => <div key={i} className="h-40 bg-secondary rounded-xl animate-pulse" />)
        ) : branches.map(branch => (
          <div key={branch.id} className="bg-primary-light border border-white/10 rounded-xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white font-semibold">{branch.name}</h3>
                <span className="text-xs font-mono text-accent-blue">{branch.region_code}</span>
              </div>
              <span className={`w-2.5 h-2.5 rounded-full ${branch.is_visible ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>
            <p className="text-sm text-text-muted mt-2">{branch.country}</p>
            {branch.display_logic && <p className="text-xs text-text-muted mt-1">{branch.display_logic}</p>}
            <div className="flex gap-2 mt-4">
              <button onClick={() => startEdit(branch)} className="text-xs text-accent-blue hover:underline">Edit</button>
              <button onClick={() => handleDelete(branch.id)} className="text-xs text-red-400 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
