'use client';

import React, { useState, useEffect, useRef } from 'react';
import { executeQuery } from '@/lib/wordpress/client';

// WordPress query
const GET_PARTNER_LOGOS = `
  query GetPartnerLogos {
    partners {
      nodes {
        id
        title
        partnerFields {
          partnersList {
            partnerName
            logo {
              node {
                sourceUrl
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  }
`;

// Fallback data
const partners = [
  { name: 'Past Partners', url: 'https://rwua.com.np/wp-content/uploads/2024/04/SC_USA_Logo_RedBlack_Stacked-003-150x150-1.png', id: '1' },
  { name: 'DPTNet Nepal', url: 'https://rwua.com.np/wp-content/uploads/2014/12/21.jpg', id: '2' },
  { name: 'SNV Nepal', url: 'https://rwua.com.np/wp-content/uploads/2024/04/snv.jpg', id: '3' },
  { name: 'UNDP', url: 'https://rwua.com.np/wp-content/uploads/2022/01/undppp.png', id: '4' },
  { name: 'Nepal Gov', url: 'https://rwua.com.np/wp-content/uploads/2014/12/1.jpg', id: '5' },
  { name: 'OXFAM', url: 'https://rwua.com.np/wp-content/uploads/2022/01/images.jpeg', id: '6' },
];

export const PartnerSection: React.FC = () => {
  const [activePartnerId, setActivePartnerId] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [partnersData, setPartnersData] = useState<any[]>(partners);
  const [loading, setLoading] = useState(true);
  const targetCount = 5120;
  const sectionRef = useRef<HTMLElement>(null);

  // Fetch WordPress data
  useEffect(() => {
    const fetchPartnersData = async () => {
      try {
        const wpData = await executeQuery(GET_PARTNER_LOGOS);
        
        if (wpData?.partners?.nodes?.[0]?.partnerFields?.partnersList) {
          const wpPartners = wpData.partners.nodes[0].partnerFields.partnersList
            .filter((partner: any) => partner?.logo?.node?.sourceUrl || partner?.logo?.node?.mediaItemUrl)
            .map((partner: any, index: number) => ({
              id: (index + 1).toString(),
              name: partner.partnerName || `Partner ${index + 1}`,
              url: partner.logo.node.sourceUrl || partner.logo.node.mediaItemUrl
            }));
          
          setPartnersData(wpPartners);
        } else {
          // Only use fallback if WordPress returns no data
          setPartnersData(partners);
        }
      } catch (error) {
        console.error('Error fetching WordPress Partners data:', error);
        // Only use fallback if WordPress is completely unavailable
        setPartnersData(partners);
      } finally {
        setLoading(false);
      }
    };

    fetchPartnersData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const increment = Math.ceil(targetCount / (duration / 16));
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= targetCount) {
        setCount(targetCount);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, targetCount]);

  const handlePartnerClick = (id: string) => {
    setActivePartnerId(prev => prev === id ? null : id);
  };

  // Helper component for the Partner Card to ensure 100% consistency
  const PartnerCard = ({ partner }: { partner: typeof partnersData[0] }) => {
    const isActive = activePartnerId === partner.id;
    
    return (
      <div 
        onClick={() => handlePartnerClick(partner.id)}
        className={`relative w-44 h-44 bg-white rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden shrink-0 flex flex-col items-center justify-center p-6 shadow-sm group mx-4
          ${isActive 
            ? 'border-vibrant-gold ring-4 ring-vibrant-gold/10 z-20 scale-105 shadow-xl' 
            : 'border-stone-200/50 hover:border-vibrant-gold/30 hover:shadow-md z-10'
          }`}
      >
        {/* Decorative background pattern */}
        <div 
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isActive ? 'opacity-[0.08]' : 'opacity-[0.04]'}`}
          style={{
            backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)',
            backgroundSize: '10px 10px'
          }}
        ></div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full gap-3">
          {/* 4x4 Image Container */}
          <div className="w-full h-20 flex items-center justify-center">
            <img 
              src={partner.url} 
              alt={partner.name}
              className={`max-w-full max-h-full object-contain transition-all duration-700
                ${isActive 
                  ? 'grayscale-0 opacity-100' 
                  : 'grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100'
                }`}
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </div>
          
          <span className={`font-black text-[10px] text-center uppercase tracking-[0.2em] transition-all duration-500
            ${isActive 
              ? 'text-deep-purple translate-y-1 opacity-100' 
              : 'text-stone-300 opacity-0 group-hover:opacity-60'
            }`}>
            {partner.name}
          </span>
        </div>

        {/* Bottom indicator bar */}
        <div className={`absolute bottom-0 left-0 w-full h-[4px] bg-vibrant-gold transition-transform duration-500 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0'}`}></div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="pb-24 bg-white border-t border-stone-50 overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 mb-10">
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 items-center mb-24">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-impact-red text-7xl lg:text-8xl font-black tracking-tighter mb-4">
              {count.toLocaleString()}+
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-[2px] bg-deep-purple"></div>
              <span className="text-black text-xs font-black uppercase tracking-[0.3em]">Lives Empowered</span>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left border-y md:border-y-0 md:border-x border-stone-100 py-12 md:py-0 md:px-12 lg:px-24">
            <div className="text-core-blue text-6xl lg:text-7xl font-black tracking-tighter mb-4">442</div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-[2px] bg-stone-200"></div>
              <span className="text-black text-xs font-black uppercase tracking-[0.3em]">Blankets Provided</span>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left border-y md:border-y-0 md:border-x border-stone-100 py-12 md:py-0 md:px-12 lg:px-24">
            <div className="text-flash-yellow text-6xl lg:text-7xl font-black tracking-tighter mb-4">SDG</div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-[2px] bg-stone-200"></div>
              <span className="text-black text-xs font-black uppercase tracking-[0.3em]">Policy Aligned</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-6 mb-16">
            <div className="h-[1px] w-12 bg-stone-200"></div>
            <span className="text-black font-black uppercase tracking-[0.5em] text-[10px]">Strategic Partners</span>
            <div className="h-[1px] w-12 bg-stone-200"></div>
          </div>
        </div>
      </div>

      {/* Infinite Scrolling Partners */}
      <div className="relative group/scroll">
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex animate-scroll-rtl hover:[animation-play-state:paused]">
          {/* First set */}
          {partnersData.map((partner) => (
            <PartnerCard key={`first-${partner.id}`} partner={partner} />
          ))}
          {/* Duplicate set for seamless looping */}
          {partnersData.map((partner) => (
            <PartnerCard key={`second-${partner.id}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
};