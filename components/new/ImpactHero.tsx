
import React from 'react';
import { CORE_VISION, CORE_MISSION } from '@/lib/constants';

export const ImpactHero: React.FC = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center pt-32 lg:pt-10 bg-white overflow-hidden">
      {/* Decorative Topographical Background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]">
        <svg className="w-full h-full text-deep-purple" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M0,500 C200,300 400,700 600,500 S800,300 1000,500" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 10" />
          <path d="M0,600 C300,800 600,400 900,600" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
          <circle cx="850" cy="150" r="100" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="w-full lg:w-[60%]">
            <div className="flex items-center gap-4 mb-10 animate-in slide-in-from-left duration-700">
              <span className="w-16 h-[2px] bg-terracotta"></span>
              <span className="text-terracotta font-black uppercase tracking-[0.6em] text-[10px]">Madhesh Province // Est. 1998</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[70px] font-black text-deep-purple leading-[0.85] mb-12 tracking-tighter animate-in fade-in slide-in-from-bottom duration-1000 delay-100">
              Dignified <br/>
              <span className="font-serif-impact italic text-terracotta font-medium">Voices</span>, <br/>
              United <span className="text-vibrant-gold">Power.</span>
            </h1>
            
            <div className="max-w-xl mb-14 animate-in fade-in duration-1000 delay-300">
              <p className="text-stone-500 text-xl lg:text-3xl leading-snug font-black opacity-80 mb-8 tracking-tight">
                {CORE_VISION}
              </p>
              <div className="p-8 bg-stone-50 border-l-[12px] border-vibrant-gold rounded-r-[40px] italic text-stone-600 font-bold text-lg lg:text-xl shadow-sm">
                "{CORE_MISSION}"
              </div>
            </div>
            
            <div className="flex flex-wrap gap-8 animate-in fade-in duration-1000 delay-500">
              <button className="bg-deep-purple hover:bg-black text-white font-black py-6 px-14 rounded-2xl transition-all shadow-[0_30px_70px_-15px_rgba(76,29,149,0.35)] hover:scale-105 active:scale-95 text-[11px] uppercase tracking-[0.3em]">
                Join the movement
              </button>
              <button className="flex items-center gap-6 text-deep-purple font-black text-[11px] uppercase tracking-[0.3em] group">
                <span className="border-b-2 border-deep-purple/10 group-hover:border-deep-purple transition-all pb-1">Our Impact Film</span>
                <div className="w-14 h-14 rounded-full border-2 border-stone-100 flex items-center justify-center group-hover:bg-terracotta group-hover:text-white group-hover:border-terracotta transition-all shadow-md">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <div className="w-full lg:w-[40%] relative">
            <div className="relative z-10 animate-in zoom-in duration-1000 delay-200">
              {/* Refined Petal Frame */}
              <div className="relative aspect-[4/5] bg-stone-50 rounded-tr-[200px] rounded-bl-[200px] overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,0.2)] border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200" 
                  alt="Rural Women Upliftment" 
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-1000 scale-110 hover:scale-100"
                />
                
                <div className="absolute bottom-10 left-10 right-10 p-10 bg-white/95 backdrop-blur-2xl rounded-[40px] shadow-2xl border border-white/20 transform hover:-translate-y-3 transition-transform duration-700">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-vibrant-gold flex items-center justify-center text-stone-950 shadow-lg">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-deep-purple">Social Resilience</span>
                  </div>
                  <p className="text-stone-800 font-black text-xl leading-tight tracking-tight">"Leadership is the seed; community is the harvest."</p>
                </div>
              </div>

              {/* Enhanced Rotating Text Badge */}
              <div className="absolute -top-[650px] -left-10 w-40 h-40 bg-white rounded-full shadow-[0_30px_60px_-10px_rgba(0,0,0,0.15)] flex items-center justify-center border border-stone-50 group cursor-default">
                <div className="relative w-full h-full animate-[spin_15s_linear_infinite] group-hover:pause flex items-center justify-center">
                   <svg viewBox="0 0 100 100" className="w-32 h-32">
                    <path id="badgePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent"/>
                    <text className="text-[9px] font-black uppercase tracking-[0.3em] fill-deep-purple">
                      <textPath xlinkHref="#badgePath">
                        • 27 YEARS OF IMPACT • BRAVE • RESILIENT • 
                      </textPath>
                    </text>
                   </svg>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-terracotta text-3xl font-black leading-none">27</span>
                  <span className="text-[8px] font-black uppercase tracking-widest text-stone-300">Years</span>
                </div>
              </div>

              <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-vibrant-gold opacity-[0.05] rounded-full blur-[100px] -z-10"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
