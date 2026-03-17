import type { PaginatedResponse, Product } from '@/lib/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

async function fetchProductsPage(page: number): Promise<PaginatedResponse<Product>> {
  const response = await fetch(`${API_URL}/products?page=${page}`, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products for static export (page ${page})`);
  }

  return response.json();
}

export async function getStaticProducts(): Promise<Product[]> {
  const firstPage = await fetchProductsPage(1);
  const products = [...firstPage.data];

  for (let page = 2; page <= firstPage.last_page; page += 1) {
    const nextPage = await fetchProductsPage(page);
    products.push(...nextPage.data);
  }

  return products.filter(product => product.slug && product.id);
}
