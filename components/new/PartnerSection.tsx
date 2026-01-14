
'use client';

import React, { useState, useEffect, useRef } from 'react';

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
  const targetCount = 5120;
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section ref={sectionRef} className="py-24 bg-white border-t border-stone-50 overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 mb-24">
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 items-center mb-24">
          {/* Main Stat */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-vibrant-gold text-7xl lg:text-8xl font-black tracking-tighter mb-4">
              {count.toLocaleString()}+
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-[2px] bg-deep-purple"></div>
              <span className="text-deep-purple text-xs font-black uppercase tracking-[0.3em]">Lives Empowered</span>
            </div>
          </div>

          {/* Sub Stat 1 */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left border-y md:border-y-0 md:border-x border-stone-100 py-12 md:py-0 md:px-12 lg:px-24">
            <div className="text-terracotta text-6xl lg:text-7xl font-black tracking-tighter mb-4">
              442
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-[2px] bg-stone-200"></div>
              <span className="text-stone-400 text-xs font-black uppercase tracking-[0.3em]">Blankets Provided</span>
            </div>
          </div>

          {/* Sub Stat 2 */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left border-y md:border-y-0 md:border-x border-stone-100 py-12 md:py-0 md:px-12 lg:px-24">
            <div className="text-deep-purple text-6xl lg:text-7xl font-black tracking-tighter mb-4">
              SDG
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-[2px] bg-stone-200"></div>
              <span className="text-stone-400 text-xs font-black uppercase tracking-[0.3em]">Policy Aligned</span>
            </div>
          </div>
        </div>

        {/* Section Label */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-6 mb-16">
            <div className="h-[1px] w-12 bg-stone-200"></div>
            <span className="text-stone-400 font-black uppercase tracking-[0.5em] text-[10px]">Strategic Partners</span>
            <div className="h-[1px] w-12 bg-stone-200"></div>
          </div>
        </div>
      </div>

      {/* Infinite Scrolling Partners */}
      <div className="relative">
        {/* Gradient masks for smooth fade effect */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex animate-scroll-rtl">
          {/* First set of partners */}
          {partners.map((partner) => (
            <div 
              key={`first-${partner.id}`}
              onClick={() => handlePartnerClick(partner.id)}
              className={`relative w-[280px] h-[140px] bg-white rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden shrink-0 flex items-center justify-center p-4 shadow-sm group mx-3
                ${activePartnerId === partner.id 
                  ? 'border-vibrant-gold ring-4 ring-vibrant-gold/10 z-20 scale-110 shadow-xl' 
                  : 'border-stone-200/50 hover:border-vibrant-gold/30 hover:shadow-md z-10'
                }`}
            >
              <div 
                className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${activePartnerId === partner.id ? 'opacity-[0.08]' : 'opacity-[0.04]'}`}
                style={{
                  backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)',
                  backgroundSize: '10px 10px'
                }}
              ></div>

              
              
              <div className="relative z-10 flex flex-col items-center transition-all duration-500 gap-3">
                <img 
                  src={partner.url} 
                  alt={partner.name}
                  className={`w-auto object-contain transition-all duration-700 max-h-20 grayscale-0 opacity-100
                     ${activePartnerId === partner.id 
                      ? '' 
                      : 'max-h-10'
                    }`
                  }
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                
                <span className={`font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500
                  ${activePartnerId === partner.id 
                    ? 'text-deep-purple translate-y-2 opacity-100' 
                    : 'text-stone-300 opacity-60'
                  }`}>
                  {partner.name}
                </span>
              </div>

              {activePartnerId !== partner.id && (
                <div className="absolute top-4 right-4 text-vibrant-gold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              )}

              {activePartnerId === partner.id && (
                <div className="absolute top-3 right-3 animate-in fade-in zoom-in duration-300">
                  <div className="w-6 h-6 rounded-full bg-vibrant-gold/10 flex items-center justify-center">
                    <svg className="w-3 h-3 text-vibrant-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              )}

              <div className={`absolute top-0 left-0 w-full h-[3px] bg-vibrant-gold transition-transform duration-500 origin-left ${activePartnerId === partner.id ? 'scale-x-100' : 'scale-x-0'}`}></div>
            </div>
          ))}
          
          {/* Second set of partners for seamless loop */}
          {partners.map((partner) => (
            <div 
              key={`second-${partner.id}`}
              onClick={() => handlePartnerClick(partner.id)}
              className={`relative w-[280px] h-[140px] bg-white rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden shrink-0 flex items-center justify-center p-4 shadow-sm group mx-3
                ${activePartnerId === partner.id 
                  ? 'border-vibrant-gold ring-4 ring-vibrant-gold/10 z-20 scale-110 shadow-xl' 
                  : 'border-stone-200/50 hover:border-vibrant-gold/30 hover:shadow-md z-10'
                }`}
            >
              <div 
                className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${activePartnerId === partner.id ? 'opacity-[0.08]' : 'opacity-[0.04]'}`}
                style={{
                  backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)',
                  backgroundSize: '10px 10px'
                }}
              ></div>
              
              <div className="relative z-10 flex flex-col items-center transition-all duration-500 gap-3">
                <img 
                  src={partner.url} 
                  alt={partner.name}
                  className={`w-auto object-contain transition-all duration-700 
                    ${activePartnerId === partner.id 
                      ? 'max-h-20 grayscale-0 opacity-100' 
                      : 'max-h-10 grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100'
                    }`}
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                
                <span className={`font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500
                  ${activePartnerId === partner.id 
                    ? 'text-deep-purple translate-y-2 opacity-100' 
                    : 'text-stone-300 opacity-60'
                  }`}>
                  {partner.name}
                </span>
              </div>

              {activePartnerId !== partner.id && (
                <div className="absolute top-4 right-4 text-vibrant-gold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              )}

              {activePartnerId === partner.id && (
                <div className="absolute top-3 right-3 animate-in fade-in zoom-in duration-300">
                  <div className="w-6 h-6 rounded-full bg-vibrant-gold/10 flex items-center justify-center">
                    <svg className="w-3 h-3 text-vibrant-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              )}

              <div className={`absolute top-0 left-0 w-full h-[3px] bg-vibrant-gold transition-transform duration-500 origin-left ${activePartnerId === partner.id ? 'scale-x-100' : 'scale-x-0'}`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
