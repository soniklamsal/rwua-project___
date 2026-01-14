
import React, { useState, useEffect, useRef } from 'react';

export const StatsSection: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const targetCount = 5120;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
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

  return (
    <section ref={sectionRef} className="bg-white py-24 relative z-20 -mt-12 lg:-mt-20">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="bg-white rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-stone-50 p-12 lg:p-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 items-center">
            
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
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="text-deep-purple text-6xl lg:text-7xl font-black tracking-tighter mb-4">
                SDG
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-[2px] bg-stone-200"></div>
                <span className="text-stone-400 text-xs font-black uppercase tracking-[0.3em]">Policy Aligned</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
