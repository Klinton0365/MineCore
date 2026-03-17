import { QrRedirectClient } from '@/components/qr/QrRedirectClient';
import { getStaticProducts } from '@/lib/static-products';

export const dynamicParams = false;

export async function generateStaticParams() {
  const products = await getStaticProducts();

  return products.map(product => ({
    id: String(product.id),
  }));
}

interface QrRedirectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function QrRedirectPage({ params }: QrRedirectPageProps) {
  const { id } = await params;

  return <QrRedirectClient id={id} />;
}
