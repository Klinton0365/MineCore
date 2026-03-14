'use client';

import { useState } from 'react';
import { useEnquiryCart } from '@/lib/enquiry-store';
import { api } from '@/lib/api';
import Link from 'next/link';
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from '@/components/ui/MotionWrapper';

const countries = [
  'India',
  'UAE',
  'United Kingdom',
  'Saudi Arabia',
  'South Africa',
  'Australia',
  'Canada',
  'United States',
  'Other',
];

export default function EnquiryPage() {
  const { items, removeItem, clearCart } = useEnquiryCart();
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    email: '',
    country: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
        product_ids: items.map((item) => item.id),
      });
      setSubmitted(true);
      clearCart();

      const productNames = items.map((i) => i.name).join(', ');
      const message = `Hello, I am interested in ${productNames}, available in ${formData.country}. Please share details.`;
      window.open(
        `https://wa.me/918012345678?text=${encodeURIComponent(message)}`,
        '_blank',
      );
    } catch (err: unknown) {
      const e = err as { message?: string; errors?: Record<string, string[]> };
      setError(e.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ──────────────────────── Success State ──────────────────────── */
  if (submitted) {
    return (
      <main className="pt-[72px] min-h-screen bg-primary flex items-center justify-center">
        <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />

        <ScaleIn>
          <div className="glass-card rounded-2xl p-10 sm:p-14 max-w-md mx-4 text-center relative">
            {/* Glow ring */}
            <div className="absolute -top-px -left-px -right-px -bottom-px rounded-2xl bg-gradient-to-b from-success/20 to-transparent pointer-events-none" style={{ zIndex: -1 }} />

            <div className="w-20 h-20 rounded-full bg-success/10 border border-success/20 flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-10 h-10 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-text">Enquiry Submitted</h1>
            <p className="text-text-muted mt-3 leading-relaxed">
              Thank you for your enquiry. Our team will review your request and
              contact you shortly. A confirmation email has been sent.
            </p>

            <Link
              href="/products"
              className="btn-primary inline-flex items-center gap-2 mt-8 px-8 py-3 rounded-xl text-sm font-medium"
            >
              Continue Browsing
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </ScaleIn>
      </main>
    );
  }

  /* ──────────────────────── Main Layout ──────────────────────── */
  return (
    <main className="pt-[72px] min-h-screen bg-primary">
      <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Page header */}
        <FadeIn>
          <div className="mb-10">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent-cyan mb-3">
              Review & Submit
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-text tracking-tight">
              Enquiry Cart
            </h1>
            {items.length > 0 && (
              <p className="mt-2 text-text-muted">
                {items.length} {items.length === 1 ? 'product' : 'products'} selected for enquiry
              </p>
            )}
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* ──── Cart Items (2/3) ──── */}
          <div className="lg:col-span-2">
            {items.length === 0 ? (
              /* Empty state */
              <FadeIn>
                <div className="glass-card rounded-2xl p-12 sm:p-16 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 text-text-muted/40">
                    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="16" y="28" width="64" height="52" rx="6" stroke="currentColor" strokeWidth="2" />
                      <path d="M16 40h64" stroke="currentColor" strokeWidth="2" />
                      <path d="M32 20L24 28h48l-8-8H32z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      <circle cx="48" cy="58" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
                      <path d="M45 58h6M48 55v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-text">
                    Your enquiry cart is empty
                  </h2>
                  <p className="text-text-muted mt-2 max-w-sm mx-auto">
                    Browse our catalogue and add the products you&apos;re interested
                    in to get started.
                  </p>
                  <Link
                    href="/products"
                    className="btn-primary inline-flex items-center gap-2 mt-8 px-7 py-3 rounded-xl text-sm font-medium"
                  >
                    Browse Products
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </FadeIn>
            ) : (
              /* Cart items list */
              <StaggerContainer className="space-y-3">
                {items.map((item) => (
                  <StaggerItem key={item.id}>
                    <div className="glass-card rounded-xl p-5 flex items-start sm:items-center justify-between gap-4 group hover:border-white/[0.12] transition-colors duration-300">
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/products/${item.slug}`}
                          className="text-text font-medium hover:text-accent-blue transition-colors duration-200 line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        {item.description && (
                          <p className="text-sm text-text-muted mt-1 line-clamp-1">
                            {item.description}
                          </p>
                        )}
                        {item.category?.name && (
                          <span className="inline-block mt-2 text-xs font-medium text-accent-cyan/80 bg-accent-cyan/10 px-2 py-0.5 rounded">
                            {item.category.name}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex-shrink-0 p-2 rounded-lg text-text-muted hover:text-danger hover:bg-danger/10 transition-all duration-200"
                        aria-label={`Remove ${item.name}`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </div>

          {/* ──── Enquiry Form (1/3 sticky) ──── */}
          <div className="lg:col-span-1">
            <FadeIn delay={0.15}>
              <div className="glass-card rounded-2xl p-6 sm:p-7 sticky top-24">
                <h2 className="text-lg font-semibold text-text mb-1">
                  Submit Enquiry
                </h2>
                <p className="text-sm text-text-muted mb-6">
                  Fill in your details and we&apos;ll get back to you promptly.
                </p>

                {/* Error state */}
                {error && (
                  <div className="mb-5 glass-card rounded-xl p-4 border-danger/30 bg-danger/[0.06]">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                      </svg>
                      <p className="text-sm text-danger">{error}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="customer_name"
                      required
                      value={formData.customer_name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full glass rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-text-muted/50 border border-white/[0.06] focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-all duration-200"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">
                      Phone <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 8012345678"
                      className="w-full glass rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-text-muted/50 border border-white/[0.06] focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-all duration-200"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="w-full glass rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-text-muted/50 border border-white/[0.06] focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-all duration-200"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">
                      Country <span className="text-danger">*</span>
                    </label>
                    <select
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full glass rounded-xl px-4 py-2.5 text-sm text-text border border-white/[0.06] focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat"
                    >
                      <option value="">Select country</option>
                      {countries.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">
                      Message <span className="text-danger">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements..."
                      className="w-full glass rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-text-muted/50 border border-white/[0.06] focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting || items.length === 0}
                    className="btn-primary w-full py-3 rounded-xl text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                  >
                    {submitting ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Enquiry
                        {items.length > 0 && (
                          <span className="ml-1 bg-white/20 text-xs px-2 py-0.5 rounded-full">
                            {items.length}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                </form>

                <p className="text-xs text-text-muted text-center mt-4 leading-relaxed">
                  We&apos;ll also open WhatsApp for instant communication after submission.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </main>
  );
}
