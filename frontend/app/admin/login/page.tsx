'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const { login, user } = useAuth();
  const router = useRouter();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user) router.push('/admin');
  }, [user, router]);

  // Check if backend API is reachable
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    fetch(`${apiUrl}/categories`, { method: 'GET', headers: { Accept: 'application/json' } })
      .then(res => {
        if (res.ok) setApiStatus('online');
        else setApiStatus('offline');
      })
      .catch(() => setApiStatus('offline'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      router.push('/admin');
    } catch (err: unknown) {
      const e = err as { message?: string; status?: number };
      if (e.status === 401) {
        setError('Invalid email or password.');
      } else if (e.message) {
        setError(e.message);
      } else {
        setError('Cannot reach the server. Make sure the backend is running on localhost:8000 (php artisan serve).');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center pt-16 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-text-muted mt-2 text-sm">Sign in to MineCore Global dashboard</p>
        </div>

        {/* API Status Indicator */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <span className={`w-2 h-2 rounded-full ${
            apiStatus === 'online' ? 'bg-success' : apiStatus === 'offline' ? 'bg-danger' : 'bg-warning animate-pulse'
          }`} />
          <span className="text-xs text-text-muted">
            {apiStatus === 'checking' && 'Connecting to API...'}
            {apiStatus === 'online' && 'API Connected'}
            {apiStatus === 'offline' && (
              <span className="text-danger">
                API Offline — run: <code className="bg-white/5 px-1.5 py-0.5 rounded text-text-secondary">cd backend && php artisan serve</code>
              </span>
            )}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6">
          {error && (
            <div className="mb-4 p-3 bg-danger/10 border border-danger/20 rounded-xl text-danger text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-all placeholder:text-text-muted"
                placeholder="admin@minecore.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-all placeholder:text-text-muted"
                placeholder="Enter password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || apiStatus === 'offline'}
            className="w-full mt-6 btn-primary justify-center py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Signing in...
              </span>
            ) : (
              <span>Sign In</span>
            )}
          </button>

          <p className="mt-4 text-center text-[11px] text-text-muted/50">
            Default: admin@minecore.com / password
          </p>
        </form>
      </div>
    </div>
  );
}
