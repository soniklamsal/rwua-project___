import { ImpactHero } from '@/components/new/ImpactHero';
import { MissionSection } from '@/components/new/MissionSection';
import { FocusAreas } from '@/components/new/FocusAreas';
import { StatsSection } from '@/components/new/StatsSection';
import { ChairpersonSection } from '@/components/new/ChairpersonSection';
import { FacesOfChange } from '@/components/new/FacesOfChange';
import { NewsUpdates } from '@/components/new/NewsUpdates';
import { PartnerSection } from '@/components/new/PartnerSection';
import { GallerySection } from '@/components/new/GallerySection';
import { CoolDivider } from '@/components/new/CoolDivider';
import { About } from '@/components/new/About';
import { Metadata } from 'next';

// Enable static generation with revalidation
export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: 'Home - Empowering Rural Women Since 1998',
  description: 'RWUA Nepal has been empowering rural women through education, skill development, and sustainable livelihood programs in Sarlahi district since 1998. Join us in building resilient communities.',
  keywords: 'rural development, women empowerment, education, skill development, NGO Nepal, Sarlahi, Haripur, community development, sustainable livelihood',
  authors: [{ name: 'RWUA Nepal' }],
  openGraph: {
    title: 'RWUA Nepal - Empowering Rural Women Since 1998',
    description: 'RWUA Nepal has been empowering rural women through education, skill development, and sustainable livelihood programs in Sarlahi district since 1998.',
    url: 'https://rwua.com.np',
    siteName: 'RWUA Nepal',
    images: [
      {
        url: 'https://rwua.com.np/wp-content/uploads/2023/02/cropped-RWUA-Logo-Approval-2.jpg',
        width: 1200,
        height: 630,
        alt: 'RWUA Nepal - Rural Women Upliftment Association',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RWUA Nepal - Empowering Rural Women Since 1998',
    description: 'RWUA Nepal has been empowering rural women through education, skill development, and sustainable livelihood programs.',
    images: ['https://rwua.com.np/wp-content/uploads/2023/02/cropped-RWUA-Logo-Approval-2.jpg'],
  },
  alternates: {
    canonical: 'https://rwua.com.np',
  },
};

export default function Home() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'Rural Women Upliftment Association (RWUA)',
    alternateName: 'RWUA Nepal',
    url: 'https://rwua.com.np',
    logo: 'https://rwua.com.np/wp-content/uploads/2023/02/cropped-RWUA-Logo-Approval-2.jpg',
    description: 'Empowering rural women through education, skill development, and sustainable livelihood opportunities in Nepal since 1998.',
    foundingDate: '1998',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Haripur Municipality-2',
      addressLocality: 'Haripur',
      addressRegion: 'Sarlahi',
      addressCountry: 'NP',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+977-46-411109',
      contactType: 'Customer Service',
      email: 'rwua.haripur@rwua.org',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RWUA Nepal',
    url: 'https://rwua.com.np',
    description: 'Official website of Rural Women Upliftment Association Nepal',
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      
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
        <StatsSection />
        <PartnerSection />
      </div>
    </>
  );
}
