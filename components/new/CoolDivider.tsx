
'use client';

import React, { useEffect, useState, useRef } from 'react';

export const CoolDivider: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!dividerRef.current) return;
      const rect = dividerRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      if (rect.top < viewHeight && rect.bottom > 0) {
        const progress = (viewHeight - rect.top) / (viewHeight + rect.height);
        setScrollProgress(Math.min(Math.max(progress, 0), 1));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={dividerRef} 
      className="relative w-full h-32 overflow-hidden z-20"
      style={{ marginBottom: '-1px', marginTop: '-1px' }}
    >
      {/* <div className="absolute inset-0 bg-gradient-to-b from-deep-purple via-deep-purple to-[#F9F8F6]"></div> */}

      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 1440 200" 
        preserveAspectRatio="none"
        fill="none"
      >
        {/* <path 
          d="M0,160 C240,190 480,130 720,160 S1200,190 1440,160 V200 H0 Z" 
          fill="#4C1D95" 
          fillOpacity="0.1"
          style={{ transform: `translateX(${scrollProgress * -30}px)` }}
          className="transition-transform duration-1000 ease-out"
        /> */}
        
        <path 
          d="M0,60 C480,10 960,110 1440,60" 
          stroke="#D97706" 
          strokeWidth="3" 
          strokeOpacity="0.4"
          strokeDasharray="2000"
          strokeDashoffset={2000 * (1 - scrollProgress)}
          className="transition-all duration-[2.5s] ease-out"
        />
      </svg>

      <div 
        className="absolute top-1/4 w-4 h-4 bg-vibrant-gold rounded-full shadow-[0_0_25px_rgba(217,119,6,0.6)] animate-pulse"
        // style={{ transform: `translateY(${scrollProgress * -60}px)` }}
      ></div>
    </div>
  );
};
