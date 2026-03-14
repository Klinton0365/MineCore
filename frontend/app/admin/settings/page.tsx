'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get<Record<string, string>>('/admin/settings')
      .then(setSettings)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const pairs = Object.entries(settings).map(([key, value]) => ({ key, value }));
    await api.put('/admin/settings', { settings: pairs });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const settingsConfig = [
    { key: 'site_name', label: 'Site Name' },
    { key: 'contact_email', label: 'Contact Email' },
    { key: 'contact_phone', label: 'Contact Phone' },
    { key: 'whatsapp_number', label: 'WhatsApp Number' },
    { key: 'company_address', label: 'Company Address' },
    { key: 'sync_interval_minutes', label: 'API Sync Interval (minutes)' },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <div className="space-y-4">{[1,2,3,4].map(i => <div key={i} className="h-16 bg-[var(--color-secondary)] rounded-xl animate-pulse" />)}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <button onClick={handleSave} disabled={saving}
          className="bg-[var(--color-accent-blue)] text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 disabled:opacity-50 transition-colors">
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>

      <div className="bg-[var(--color-primary-light)] border border-white/10 rounded-xl p-6 space-y-4">
        {settingsConfig.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm text-[var(--color-text-muted)] mb-1">{label}</label>
            <input type="text" value={settings[key] || ''} onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))}
              className="w-full bg-[var(--color-secondary)] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[var(--color-accent-blue)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
