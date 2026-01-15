'use client';

import React, { useState, useEffect } from 'react';
import { executeQuery } from '@/lib/wordpress/client';

const GET_IMPACT_HERO_DATA = `
  query GetImpactHeroData {
    impactHeroes(first: 1) {
      nodes {
        title
        impactHeroFields {
          heroSubtitle
          heroTitle1
          heroTitleItalic
          heroTitle2
          heroTitleEnd
          heroVision
          heroMission
          heroBadgeNum
          heroQuote
          heroVideoUrl
          heroCtaPrimary {
            target
            title
            url
          }
          heroImage {
            node {
              sourceUrl
              mediaItemUrl
              altText
            }
          }
        }
      }
    }
  }
`;

const CORE_VISION = "Empowering rural women through sustainable development, education, and community-driven initiatives that create lasting positive change.";
const CORE_MISSION = "To build resilient communities where every woman has the opportunity to thrive, lead, and contribute to a more equitable society.";

const fallbackData = {
  heroSubtitle: "Madhesh Province // Est. 1998",
  heroTitle1: "Dignified",
  heroTitleItalic: "Voices",
  heroTitle2: "United",
  heroTitleEnd: "Power.",
  heroVision: CORE_VISION,
  heroMission: CORE_MISSION,
  heroBadgeNum: "27",
  heroQuote: "Leadership is the seed; community is the harvest.",
  heroVideoUrl: "https://www.youtube.com/",
  heroCtaPrimary: {
    url: "/contact",
    title: "Join the movement",
    target: "_self"
  },
  heroImage: {
    node: {
      sourceUrl: "/images/hero.png",
      mediaItemUrl: "/images/hero.png",
      altText: "Rural Women Upliftment"
    }
  }
};

export const ImpactHero: React.FC = () => {
  const [heroData, setHeroData] = useState<any>(fallbackData);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const wpData = await executeQuery(GET_IMPACT_HERO_DATA);
        if (wpData?.impactHeroes?.nodes?.[0]?.impactHeroFields) {
          setHeroData(wpData.impactHeroes.nodes[0].impactHeroFields);
        }
      } catch (error) {
        console.error('Error fetching WordPress Impact Hero data:', error);
      }
    };
    fetchHeroData();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 lg:pt-8 lg:pb-20 bg-white overflow-hidden">
      {/* Decorative Topographical Background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]">
        <svg className="w-full h-full text-core-blue" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M0,500 C200,300 400,700 600,500 S800,300 1000,500" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 10" />
          <circle cx="850" cy="150" r="100" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content Area */}
          <div className="w-full lg:w-[55%] order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-6 lg:mb-10 animate-in slide-in-from-left duration-700">
              <span className="w-12 lg:w-16 h-[2px] bg-impact-red"></span>
              <span className="text-impact-red font-black uppercase tracking-[0.4em] lg:tracking-[0.6em] text-[9px] lg:text-[10px]">
                {heroData.heroSubtitle}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[80px] font-black text-core-blue leading-[0.85] mb-8 lg:mb-12 tracking-tighter animate-in fade-in slide-in-from-bottom duration-1000 delay-100">
              {heroData.heroTitle1} <br className="hidden sm:block"/>
              <span className="font-serif-impact italic text-impact-red font-medium">
                {heroData.heroTitleItalic}
              </span>, <br className="hidden sm:block"/>
              {heroData.heroTitle2} <span className="text-impact-red">{heroData.heroTitleEnd}</span>
            </h1>
            
            <div className="max-w-xl mb-10 lg:mb-14 animate-in fade-in duration-1000 delay-300">
              <p className="text-stone-500 text-lg lg:text-2xl leading-snug font-bold opacity-80 mb-6 lg:mb-8 tracking-tight">
                {heroData.heroVision}
              </p>
              <div className="p-6 lg:p-8 bg-stone-50 border-l-[8px] lg:border-l-[12px] border-flash-yellow rounded-r-[30px] lg:rounded-r-[40px] italic text-stone-600 font-bold text-base lg:text-xl shadow-sm">
                "{heroData.heroMission}"
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 animate-in fade-in duration-1000 delay-500">
              <button 
                onClick={() => {
                  const ctaUrl = heroData.heroCtaPrimary?.url || '/contact';
                  window.location.href = ctaUrl;
                }}
                className="w-full sm:w-auto bg-impact-red/90 hover:bg-impact-red text-white font-black py-5 lg:py-6 px-10 lg:px-14 rounded-2xl transition-all shadow-xl hover:scale-105 active:scale-95 text-[10px] lg:text-[11px] uppercase tracking-[0.2em] cursor-pointer"
              >
                {heroData.heroCtaPrimary?.title || 'Join the movement'}
              </button>

              <button 
                onClick={() => window.open(heroData.heroVideoUrl || 'https://www.youtube.com', '_blank')}
                className="flex items-center gap-4 lg:gap-6 text-core-blue font-black text-[10px] lg:text-[11px] uppercase tracking-[0.2em] group cursor-pointer"
              >
                <span className="border-b-2 border-core-blue/10 group-hover:border-core-blue transition-all pb-1">Our Impact Film</span>
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-stone-100 flex items-center justify-center group-hover:bg-impact-red group-hover:text-white group-hover:border-impact-red transition-all shadow-md">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* Visual/Image Area */}
          <div className="w-full lg:w-[45%] order-1 lg:order-2 relative px-4 sm:px-10 lg:px-0">
            <div className="relative z-10 animate-in zoom-in duration-1000 delay-200">
              
              {/* Refined Petal Frame */}
              <div className="relative aspect-[4/5] bg-stone-50 rounded-tr-[120px] lg:rounded-tr-[200px] rounded-bl-[120px] lg:rounded-bl-[200px] overflow-hidden shadow-2xl border-4 lg:border-8 border-white">
                <img 
                  src={heroData.heroImage?.node?.sourceUrl || "/images/hero.png"}
                  alt={heroData.heroImage?.node?.altText || "Rural Women Upliftment"}
                  className="w-full h-full object-cover transition-all duration-1000 scale-105 hover:scale-100"
                />
                
                {/* Quote Card inside Image */}
                <div className="absolute bottom-4 left-4 right-4 lg:bottom-10 lg:left-10 lg:right-10 p-6 lg:p-10 bg-white/95 backdrop-blur-xl rounded-[25px] lg:rounded-[40px] shadow-2xl border border-white/20">
                  <div className="flex items-center gap-3 mb-2 lg:mb-4">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-impact-red flex items-center justify-center shadow-lg">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="white" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </div>
                    <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-core-blue">Social Resilience</span>
                  </div>
                  <p className="text-stone-800 font-black text-lg lg:text-xl leading-tight tracking-tight">
                    "{heroData.heroQuote}"
                  </p>
                </div>
              </div>

              {/* Rotating Badge - Repositioned for mobile */}
              <div className="absolute -top-6 -left-6 lg:-top-12 lg:-left-12 w-28 h-28 lg:w-40 lg:h-40 bg-white rounded-full shadow-xl flex items-center justify-center border border-stone-50 z-20">
                <div className="relative w-full h-full animate-[spin_20s_linear_infinite] flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-24 h-24 lg:w-32 lg:h-32">
                    <path id="badgePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent"/>
                    <text className="text-[9px] font-black uppercase tracking-[0.25em] fill-core-blue">
                      <textPath xlinkHref="#badgePath">
                        • {heroData.heroBadgeNum} YEARS OF IMPACT • BRAVE • RESILIENT • 
                      </textPath>
                    </text>
                  </svg>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-impact-red text-2xl lg:text-3xl font-black leading-none">{heroData.heroBadgeNum}</span>
                  <span className="text-[7px] lg:text-[8px] font-black uppercase tracking-widest text-stone-300">Years</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};