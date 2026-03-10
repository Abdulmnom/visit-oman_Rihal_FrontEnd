'use client';

import { HeroSection } from '@/components/home/HeroSection';
import { AnimatedStats } from '@/components/home/AnimatedStats';
import { FeaturedCategories } from '@/components/home/FeaturedCategories';
import { HiddenGemsPreview } from '@/components/home/HiddenGemsPreview';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AnimatedStats />
      <FeaturedCategories />
      <HiddenGemsPreview />
    </>
  );
}
