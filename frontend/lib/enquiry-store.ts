'use client';

import { createContext, useContext } from 'react';
import type { Product } from './types';

export interface EnquiryCartContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  itemCount: number;
}

export const EnquiryCartContext = createContext<EnquiryCartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  itemCount: 0,
});

export const useEnquiryCart = () => useContext(EnquiryCartContext);
