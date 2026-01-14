'use client';

import { ImpactHero } from '@/components/new/ImpactHero';
import { MissionSection } from '@/components/new/MissionSection';
import { FocusAreas } from '@/components/new/FocusAreas';
import { ChairpersonSection } from '@/components/new/ChairpersonSection';
import { FacesOfChange } from '@/components/new/FacesOfChange';
import { NewsUpdates } from '@/components/new/NewsUpdates';
import { PartnerSection } from '@/components/new/PartnerSection';
import { GallerySection } from '@/components/new/GallerySection';
import { CoolDivider } from '@/components/new/CoolDivider';
import { About } from '@/components/new/About';

export default function Home() {
  return (
    <div className="bg-white">
      <ImpactHero />
      <MissionSection />
      <FocusAreas />
      <ChairpersonSection />
      <About />
      <CoolDivider />
      <NewsUpdates />
      <GallerySection />
      <FacesOfChange />
      <PartnerSection />
    </div>
  );
}
