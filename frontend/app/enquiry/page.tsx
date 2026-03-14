'use client';

import { useState } from 'react';
import { useEnquiryCart } from '@/lib/enquiry-store';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function EnquiryPage() {
  const { items, removeItem, clearCart } = useEnquiryCart();
  const [formData, setFormData] = useState({ customer_name: '', phone: '', email: '', country: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setError('Please add at least one product to your enquiry.');
      return;
    }
    setSubmitting(true);
    setError('');

    try {
      await api.post('/enquiries', {
        ...formData,
        product_ids: items.map(item => item.id),
      });
      setSubmitted(true);
      clearCart();

      // Open WhatsApp with pre-filled message
      const productNames = items.map(i => i.name).join(', ');
      const message = `Hello, I am interested in ${productNames}, available in ${formData.country}. Please share details.`;
      window.open(`https://wa.me/918012345678?text=${encodeURIComponent(message)}`, '_blank');
    } catch (err: unknown) {
      const e = err as { message?: string; errors?: Record<string, string[]> };
      setError(e.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-16 min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Enquiry Submitted!</h1>
          <p className="text-text-muted mt-3">
            Thank you for your enquiry. Our team will contact you shortly. A confirmation email has been sent.
          </p>
          <Link href="/products" className="inline-block mt-6 bg-accent-blue text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
            Continue Browsing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Enquiry Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2">
            {items.length === 0 ? (
              <div className="bg-primary-light border border-white/10 rounded-xl p-12 text-center">
                <svg className="w-16 h-16 text-text-muted mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                <p className="text-text-muted text-lg">Your enquiry cart is empty</p>
                <Link href="/products" className="inline-block mt-4 text-accent-blue hover:underline">
                  Browse products to add items
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.id} className="bg-primary-light border border-white/10 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <Link href={`/products/${item.slug}`} className="text-white font-medium hover:text-accent-blue">
                        {item.name}
                      </Link>
                      <p className="text-xs text-text-muted mt-1 line-clamp-1">{item.description}</p>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-300 p-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Enquiry Form */}
          <div>
            <form onSubmit={handleSubmit} className="bg-primary-light border border-white/10 rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-white mb-4">Submit Enquiry</h2>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-text-muted mb-1">Full Name *</label>
                  <input type="text" required value={formData.customer_name} onChange={e => setFormData(f => ({ ...f, customer_name: e.target.value }))}
                    className="w-full bg-secondary border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-blue" />
                </div>
                <div>
                  <label className="block text-sm text-text-muted mb-1">Phone *</label>
                  <input type="tel" required value={formData.phone} onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))}
                    className="w-full bg-secondary border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-blue" />
                </div>
                <div>
                  <label className="block text-sm text-text-muted mb-1">Email *</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                    className="w-full bg-secondary border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-blue" />
                </div>
                <div>
                  <label className="block text-sm text-text-muted mb-1">Country *</label>
                  <select required value={formData.country} onChange={e => setFormData(f => ({ ...f, country: e.target.value }))}
                    className="w-full bg-secondary border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-blue">
                    <option value="">Select country</option>
                    <option value="India">India</option>
                    <option value="UAE">UAE</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-text-muted mb-1">Message *</label>
                  <textarea required rows={3} value={formData.message} onChange={e => setFormData(f => ({ ...f, message: e.target.value }))}
                    className="w-full bg-secondary border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-accent-blue resize-none" />
                </div>
              </div>

              <button type="submit" disabled={submitting || items.length === 0}
                className="w-full mt-4 bg-accent-blue text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {submitting ? 'Submitting...' : `Submit Enquiry (${items.length} items)`}
              </button>

              <p className="text-xs text-text-muted mt-3 text-center">
                We'll also open WhatsApp for instant communication
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
