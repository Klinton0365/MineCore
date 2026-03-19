import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { HowItWorks } from '@/components/home/HowItWorks';
import { BranchAvailability } from '@/components/home/BranchAvailability';
import { CTASection } from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <CategoryGrid />
      <HowItWorks />
      <BranchAvailability />
      <CTASection />
    </>
  );
}
