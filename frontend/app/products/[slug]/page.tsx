import { ProductDetailClient } from '@/components/products/ProductDetailClient';
import { getStaticProducts } from '@/lib/static-products';

export const dynamicParams = false;

export async function generateStaticParams() {
  const products = await getStaticProducts();

  return products.map(product => ({
    slug: product.slug,
  }));
}

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  return <ProductDetailClient slug={slug} />;
}
