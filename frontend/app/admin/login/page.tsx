'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      router.push('/admin');
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-primary)] flex items-center justify-center pt-16 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-[var(--color-text-muted)] mt-2 text-sm">Sign in to the management panel</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[var(--color-primary-light)] border border-white/10 rounded-xl p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[var(--color-text-muted)] mb-1">Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full bg-[var(--color-secondary)] border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[var(--color-accent-blue)]"
                placeholder="admin@minecore.com" />
            </div>
            <div>
              <label className="block text-sm text-[var(--color-text-muted)] mb-1">Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-[var(--color-secondary)] border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[var(--color-accent-blue)]"
                placeholder="password" />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full mt-6 bg-[var(--color-accent-blue)] text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
