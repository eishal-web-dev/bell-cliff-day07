import { useRef } from 'react';
import { motion } from 'framer-motion';
import DishHero from '@/components/DishHero';
import InfoStrip from '@/components/sections/InfoStrip';
import WelcomeSection from '@/components/sections/WelcomeSection';
import FeaturedMenu from '@/components/sections/FeaturedMenu';
import ExperienceSection from '@/components/sections/ExperienceSection';
import GalleryPreview from '@/components/sections/GalleryPreview';
import ReviewsPreview from '@/components/sections/ReviewsPreview';
import VisitSection from '@/components/sections/VisitSection';
import FinalCTA from '@/components/sections/FinalCTA';
import { useSEO } from '@/lib/useSEO';

export default function HomePage() {
  const menuRef = useRef<HTMLDivElement>(null);
  useSEO({
    title: 'The Bell Cliff Restaurant · Lyme Regis · Traditional English Dining',
    description:
      'Traditional English restaurant, café and tea room in the heart of Lyme Regis, Dorset. Warm hospitality and comforting British favourites by the Jurassic Coast.',
    path: '/',
  });

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <DishHero onEnterMenu={scrollToMenu} />
      <InfoStrip />
      <WelcomeSection />
      <div ref={menuRef}>
        <FeaturedMenu />
      </div>
      <ExperienceSection />
      <GalleryPreview />
      <ReviewsPreview />
      <VisitSection />
      <FinalCTA />
    </>
  );
}
