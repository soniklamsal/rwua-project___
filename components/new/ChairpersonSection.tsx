
'use client';

import React, { useState, useEffect } from 'react';
import { ORG_MEMBERS } from '@/lib/constants';

export const ChairpersonSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % ORG_MEMBERS.length);
      setIsTransitioning(false);
    }, 400);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + ORG_MEMBERS.length) % ORG_MEMBERS.length);
      setIsTransitioning(false);
    }, 400);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  const member = ORG_MEMBERS[activeIndex];

  return (
    <section className="py-24 bg-deep-purple text-white overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-5 skew-x-12 translate-x-1/2"></div>
      
      <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className={`flex flex-col lg:flex-row gap-16 items-center transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          
          {/* Member Portrait Card */}
          <div className="w-full lg:w-[40%] flex justify-center lg:justify-start">
            <div className="relative p-4 border border-white/20 rounded-2xl w-full max-w-sm aspect-[3/4]">
              {/* Double Border Frame Effect from Screenshot */}
              <div className="absolute inset-2 border border-white/40 rounded-xl"></div>
              
              <img 
                src={member.imageUrl} 
                alt={member.name}
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
              
              {/* Semi-transparent name card overlay */}
              <div className="absolute bottom-10 left-6 right-6 bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow-xl">
                <h4 className="text-2xl font-bold font-nepali mb-1">{member.nepaliName}</h4>
                <p className="text-vibrant-gold text-xs font-black uppercase tracking-widest">{member.role}</p>
              </div>
            </div>
          </div>
          
          {/* Quote Side */}
          <div className="w-full lg:w-[60%] relative">
            {/* Large Golden Quote Icon */}
            <div className="text-vibrant-gold text-8xl mb-4 leading-none font-serif select-none opacity-80">“</div>
            
            {/* Nepali Quote Text with Highlight logic embedded in constants */}
            <div className="text-xl lg:text-2xl font-nepali leading-[1.8] text-stone-200 mb-12 min-h-[160px]">
              {member.quote}
            </div>

            {/* Navigation Controls */}
            <div className="flex gap-4 mt-12">
              <button 
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all group"
                aria-label="Previous member"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all group"
                aria-label="Next member"
              >
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex gap-2 mt-8">
              {ORG_MEMBERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-12 bg-vibrant-gold' : 'w-4 bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
