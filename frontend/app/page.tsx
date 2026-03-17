import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { BranchAvailability } from '@/components/home/BranchAvailability';
import { CTASection } from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <CategoryGrid />
      <BranchAvailability />
      <CTASection />
    </>
  );
}
