'use client';

import { useState, useCallback, useEffect, ReactNode } from 'react';
import { EnquiryCartContext } from '@/lib/enquiry-store';
import type { Product } from '@/lib/types';

export function EnquiryCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('enquiry_cart');
    if (stored) {
      try { setItems(JSON.parse(stored)); } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('enquiry_cart', JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Product) => {
    setItems(prev => {
      if (prev.some(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <EnquiryCartContext value={{ items, addItem, removeItem, clearCart, itemCount: items.length }}>
      {children}
    </EnquiryCartContext>
  );
}
