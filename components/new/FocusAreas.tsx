
import React, { useEffect, useRef, useState } from 'react';

const pillars = [
  {
    id: 1,
    title: "Core Vision",
    impact: "1,200+ Students",
    description: "Desire of Rural Women Upliftment Association “Establishment of Quality and Equitable and Prosperous Society.",
    color: "bg-deep-purple",
    textColor: "text-deep-purple",
    accent: "border-deep-purple/30",
    hoverBorder: "hover:border-deep-purple",
    glow: "group-hover:shadow-[0_40px_100px_rgba(76,29,149,0.2)]",
    offset: "lg:-translate-y-16"
  },
  {
    id: 2,
    title: "Core Mission",
    impact: "45+ Cooperatives",
    description: "To transform the community by mobilizing and empowering the target group, improving economic, social and healthy life.",
    color: "bg-terracotta",
    textColor: "text-terracotta",
    accent: "border-terracotta/30",
    hoverBorder: "hover:border-terracotta",
    glow: "group-hover:shadow-[0_40px_100px_rgba(194,65,12,0.2)]",
    offset: "lg:translate-y-16"
  },
  {
    id: 3,
    title: "Core Goal",
    impact: "5k+ Lives",
    description: "A dignified life will be built by improving the quality of education healthy life and income of the Community.",
    color: "bg-vibrant-gold",
    textColor: "text-vibrant-gold",
    accent: "border-vibrant-gold/30",
    hoverBorder: "hover:border-vibrant-gold",
    glow: "group-hover:shadow-[0_40px_100px_rgba(217,119,6,0.2)]",
    offset: "lg:-translate-y-8"
  }
];

export const FocusAreas: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section ref={sectionRef} className="pb-20 lg:pb-36 bg-white relative overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        
        <div className={`mb-28 max-w-5xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center gap-6 mb-10">
            <div className="h-[2px] w-16 bg-stone-100"></div>
            <span className="text-terracotta font-black uppercase tracking-[0.6em] text-[10px]">Strategic Framework</span>
            <div className="h-[2px] w-16 bg-stone-100"></div>
          </div>
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif-impact text-deep-purple leading-[0.9] tracking-tighter">
            Pillars of <span className="italic text-terracotta">Transformation.</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-20 items-start">
          {pillars.map((pillar, index) => (
            <div 
              key={pillar.id}
              className={`group relative transition-all duration-1000 transform ${pillar.offset} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Ultra-Petal Shape Card */}
              <div className={`relative bg-white p-16 lg:p-20 border-2 border-stone-50 ${pillar.accent} ${pillar.hoverBorder} rounded-tr-[160px] rounded-bl-[160px] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.08)] ${pillar.glow} transition-all duration-700 h-full flex flex-col group-hover:-translate-y-4`}>
                
                <div className="flex-grow">
                  <div className={`w-16 h-16 rounded-[24px] ${pillar.color} mb-10 flex items-center justify-center text-white shadow-xl transform group-hover:rotate-12 transition-transform`}>
                    <span className="text-2xl font-black">0{pillar.id}</span>
                  </div>
                  
                  <h3 className="text-4xl font-black text-deep-purple mb-8 leading-tight tracking-tight transition-colors duration-500 group-hover:text-black">
                    {pillar.title}
                  </h3>
                  <p className="text-stone-500 text-xl leading-relaxed font-bold mb-14 opacity-70 group-hover:opacity-100 transition-opacity">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-12 mt-auto border-t border-stone-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-2">Metrics</span>
                    <span className={`text-lg font-black ${pillar.textColor} tracking-tight`}>{pillar.impact}</span>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-stone-50 flex items-center justify-center group-hover:bg-deep-purple group-hover:text-vibrant-gold transition-all duration-500 shadow-sm">
                    <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-stone-100 -z-10"></div>
    </section>
  );
};
