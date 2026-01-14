
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { NEWS_UPDATES } from '@/lib/constants';

export const NewsUpdates: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, NEWS_UPDATES.length));
  };

  const visibleNews = NEWS_UPDATES.slice(0, visibleCount);
  const hasMore = visibleCount < NEWS_UPDATES.length;

  return (
    <section ref={sectionRef} className="py-20 bg-[#F9F8F6] relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-terracotta opacity-[0.02] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-vibrant-gold"></div>
              <h4 className="text-vibrant-gold font-black uppercase tracking-[0.4em] text-[10px]">Latest Updates</h4>
            </div>
            <h2 className="text-5xl lg:text-6xl font-serif-impact text-deep-purple leading-tight">
              Impact <span className="italic">Highlights</span>.
            </h2>
          </div>

          <button className={`group flex items-center gap-4 text-deep-purple font-black text-xs uppercase tracking-[0.3em] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="border-b border-deep-purple/20 group-hover:border-deep-purple pb-1">All Vacancy & Press</span>
            <div className="w-10 h-10 rounded-full border border-deep-purple/10 flex items-center justify-center group-hover:bg-deep-purple group-hover:text-vibrant-gold transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {visibleNews.map((news, index) => (
            <div
              key={news.id}
              className={`group relative bg-white ring-1 ring-stone-100 p-12 lg:p-14 flex flex-col h-full transition-all duration-700 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_-20px_rgba(76,29,149,0.12)] transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{
                transitionDelay: `${index * 150}ms`,
                marginTop: `${index === 1 ? '2rem' : '0'}`
              }}
            >
              <div className="absolute top-0 left-0 w-0 h-1 bg-vibrant-gold group-hover:w-full transition-all duration-700 ease-in-out"></div>

              <div className="flex justify-between items-start mb-10">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-stone-300 tracking-[0.3em] mb-1">
                    Date
                  </span>
                  <span className="text-sm font-bold text-stone-500">
                    {news.date}
                  </span>
                </div>
                <div className="px-4 py-1.5 rounded-full border border-stone-100 bg-stone-50 text-deep-purple text-[9px] font-black uppercase tracking-widest group-hover:bg-deep-purple group-hover:text-vibrant-gold group-hover:border-deep-purple transition-all duration-500">
                  {news.category}
                </div>
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-deep-purple mb-8 leading-[1.3] font-nepali group-hover:text-terracotta transition-colors duration-500">
                {news.title}
              </h3>

              <p className="text-stone-500 mb-12 leading-relaxed text-base flex-grow font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                {news.content}
              </p>

              <div className="pt-8 mt-auto border-t border-stone-50">
                <a href="#" className="inline-flex items-center gap-4 text-deep-purple font-black text-xs uppercase tracking-[0.3em] group/link">
                  <span className="relative">
                    Read Story
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-terracotta transition-all duration-500 group-hover/link:w-full"></span>
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-stone-50 flex items-center justify-center group-hover/link:bg-terracotta group-hover/link:text-vibrant-gold transition-all">
                    <svg className="w-4 h-4 transform transition-transform duration-500 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </a>
              </div>

              <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 right-0 w-full h-full bg-vibrant-gold/5 transform rotate-45 translate-x-1/2 translate-y-1/2"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-16">
            <button
              onClick={handleLoadMore}
              className="group relative px-12 py-5 bg-deep-purple text-vibrant-gold font-black text-xs uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_-10px_rgba(76,29,149,0.3)] transform hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center gap-4">
                Load More News
                <svg className="w-4 h-4 transform transition-transform duration-500 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-terracotta transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
