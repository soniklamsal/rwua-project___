
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SUCCESS_STORIES } from '@/lib/constants';

export const FacesOfChange: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedImage, setExpandedImage] = useState<{url: string, name: string} | null>(null);
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

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const start = windowHeight;
      const end = 0;
      const current = rect.top;
      
      const totalDist = start - end;
      const currentDist = start - current;
      
      let progress = currentDist / (totalDist + rect.height);
      progress = Math.min(Math.max(progress, 0), 1);
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-white overflow-hidden selection:bg-deep-purple selection:text-white relative">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        
        {/* Top Heading Section */}
        <div className="mb-24 flex flex-col items-center text-center">
          <div className={`transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-8 h-[2px] bg-terracotta/40"></div>
              <h4 className="text-terracotta font-black uppercase tracking-[0.4em] text-[10px]">Voices of Impact</h4>
              <div className="w-8 h-[2px] bg-terracotta/40"></div>
            </div>
            <h2 className="text-5xl lg:text-7xl font-serif-impact text-deep-purple leading-tight tracking-tighter">
              Real people. <span className="italic opacity-80 ml-2">Real stories.</span>
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-stretch">
          {/* Impact Stories Grid */}
          <div className="flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
              {SUCCESS_STORIES.map((story, index) => (
                <div 
                  key={story.id} 
                  className={`bg-white rounded-none overflow-hidden ring-1 ring-stone-100 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07),0_4px_6px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 group flex flex-col h-full transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${(index + 2) * 200}ms` }}
                >
                  {/* Story Image Container with Hover Arrow & Click to Expand */}
                  <div 
                    className="aspect-[4/3] overflow-hidden relative cursor-pointer"
                    onClick={() => setExpandedImage({url: story.imageUrl, name: story.name})}
                  >
                  
                    
                    <img 
                      src={story.imageUrl} 
                      alt={story.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                    />
                    
                    {/* Subtle Overlay Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-white/90 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest px-3 py-1 text-deep-purple border border-deep-purple/10">
                        {story.category}
                      </span>
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className="p-10 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-deep-purple mb-6 leading-[1.15] group-hover:text-terracotta transition-colors">
                      {story.name}
                    </h3>
                    <p className="text-stone-600 text-lg leading-relaxed mb-10 flex-grow font-medium opacity-90">
                      {story.content}
                    </p>
                    
                    <div className="pt-6 mt-auto border-t border-stone-100">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
                          IMPACT REPORT: {story.location}
                        </span>
                        <div className="w-2 h-2 rounded-full bg-vibrant-gold scale-0 group-hover:scale-100 transition-transform"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dynamic Scrolling Navigation Element */}
            <div className={`mt-24 flex items-center gap-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex-grow h-[2px] bg-stone-100 relative overflow-hidden rounded-full">
                <div className="absolute inset-0 bg-deep-purple/5"></div>
                <div 
                  className="absolute inset-0 bg-vibrant-gold origin-left shadow-[0_0_15px_rgba(217,119,6,0.3)] transition-transform duration-150 ease-out"
                  style={{ transform: `scaleX(${scrollProgress})` }}
                ></div>
              </div>
              
              <button className="relative group px-10 py-4 overflow-hidden border border-deep-purple/20 bg-stone-50/50 hover:bg-deep-purple transition-all duration-500 shrink-0">
                <span className="relative z-10 text-deep-purple group-hover:text-vibrant-gold font-black text-xs tracking-[0.3em] uppercase transition-colors">
                  More Stories
                </span>
                <div className="absolute inset-0 bg-deep-purple translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Little Expand Modal (Minimalist Image Viewer) */}
      {expandedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setExpandedImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full aspect-video bg-white rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={expandedImage.url} 
              alt={expandedImage.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
              <h4 className="text-3xl font-serif-impact italic">{expandedImage.name}</h4>
              <p className="text-xs uppercase tracking-[0.4em] mt-2 opacity-60">Success Story Asset</p>
            </div>
            
            <button 
              onClick={() => setExpandedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-deep-purple transition-all flex items-center justify-center backdrop-blur-md border border-white/20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Background Decorative Accent */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sage opacity-[0.03] rounded-full blur-3xl pointer-events-none"></div>
    </section>
  );
};
