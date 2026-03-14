import Link from 'next/link';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { BranchAvailability } from '@/components/home/BranchAvailability';
import { CTASection } from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <CategoryGrid />
      <BranchAvailability />
      <CTASection />
    </>
  );
}
