'use client';

import { HeroSection } from '@/components/home/HeroSection';
import { AnimatedStats } from '@/components/home/AnimatedStats';
import { FeaturedCategories } from '@/components/home/FeaturedCategories';
import { HiddenGemsPreview } from '@/components/home/HiddenGemsPreview';

export default function HomePage() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <AnimatedStats />
      <FeaturedCategories />
      <HiddenGemsPreview />
    </div>
  );
}
