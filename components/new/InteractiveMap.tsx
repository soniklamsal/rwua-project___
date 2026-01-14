
import React, { useState } from 'react';
import { PROJECT_LOCATIONS } from '@/lib/constants';

export const InteractiveMap: React.FC = () => {
  const [selectedLoc, setSelectedLoc] = useState(PROJECT_LOCATIONS[0]);

  return (
    <section className="py-24 lg:py-36 bg-[#FBFBFB] overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* LEFT CONTENT COLUMN */}
          <div className="w-full lg:w-[40%] sticky top-32">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-[1px] bg-terracotta"></span>
              <span className="text-terracotta font-black uppercase tracking-[0.5em] text-[10px]">Geographic Reach</span>
            </div>
            
            <h2 className="text-6xl lg:text-7xl font-serif-impact text-deep-purple mb-8 leading-tight tracking-tighter">
              Our Rural <br/>
              <span className="italic">Footprint.</span>
            </h2>
            
            <p className="text-stone-600 mb-12 text-lg lg:text-xl leading-relaxed font-medium opacity-80 max-w-md">
              We operate in the most remote regions of Sarlahi, bringing resources and education directly to marginalized settlements.
            </p>
            
            {/* LOCATION SELECTION LIST */}
            <div className="space-y-4">
              {PROJECT_LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLoc(loc)}
                  className={`group relative w-full text-left p-8 rounded-3xl transition-all duration-500 border-2 ${
                    selectedLoc.id === loc.id 
                    ? 'bg-white border-white shadow-xl scale-[1.02] z-10' 
                    : 'bg-transparent border-transparent hover:bg-stone-50'
                  }`}
                >
                  <div className={`font-black text-xl lg:text-2xl mb-1 transition-colors duration-300 ${
                    selectedLoc.id === loc.id ? 'text-deep-purple' : 'text-stone-300 group-hover:text-stone-500'
                  }`}>
                    {loc.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${
                      selectedLoc.id === loc.id ? 'text-stone-400' : 'text-stone-200'
                    }`}>
                      {loc.impactCount.toLocaleString()} Women Supported
                    </span>
                  </div>
                  
                  {/* Selected Indicator */}
                  {selectedLoc.id === loc.id && (
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 w-2 h-2 bg-vibrant-gold rounded-full shadow-[0_0_10px_rgba(217,119,6,0.6)]"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT MAP COLUMN */}
          <div className="w-full lg:w-[60%] relative pt-12">
            {/* The "Map" Container */}
            <div className="relative w-full aspect-[11/10] bg-white rounded-[40px] shadow-2xl p-12 border border-stone-100 overflow-hidden">
               
               {/* Abstract Topographical Design Background */}
               <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
                 <svg viewBox="0 0 1000 1000" className="w-full h-full">
                    <circle cx="200" cy="200" r="150" fill="none" stroke="#4C1D95" strokeWidth="1" strokeDasharray="10 10" />
                    <circle cx="800" cy="600" r="300" fill="none" stroke="#D97706" strokeWidth="1" strokeDasharray="15 5" />
                    <path d="M-100,500 Q200,300 500,500 T1100,500" fill="none" stroke="#C2410C" strokeWidth="1" />
                    <path d="M-100,700 Q300,900 600,700 T1100,700" fill="none" stroke="#4C1D95" strokeWidth="1" />
                 </svg>
               </div>
               
               {/* Map Markers */}
               {PROJECT_LOCATIONS.map((loc, i) => (
                 <button
                   key={loc.id}
                   onClick={() => setSelectedLoc(loc)}
                   className={`absolute w-12 h-12 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-700 transform hover:scale-110 cursor-pointer z-20 ${
                    selectedLoc.id === loc.id 
                    ? 'bg-deep-purple text-vibrant-gold scale-125 rotate-6' 
                    : 'bg-white text-stone-200 hover:text-deep-purple'
                   }`}
                   style={{
                     left: `${35 + (i * 30)}%`,
                     top: `${25 + (i * 25)}%`
                   }}
                 >
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                   </svg>
                   {selectedLoc.id === loc.id && (
                     <div className="absolute inset-0 rounded-2xl animate-ping bg-deep-purple/20 -z-10"></div>
                   )}
                 </button>
               ))}

               {/* THE IMPACT DETAIL CARD */}
               <div className={`absolute bottom-8 left-8 right-8 bg-white p-10 rounded-[40px] shadow-2xl border border-stone-50 transition-all duration-700 transform ${
                 selectedLoc ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
               }`}>
                 <div className="flex justify-between items-start mb-6">
                   <h3 className="text-3xl font-black text-deep-purple tracking-tight">{selectedLoc.name}</h3>
                   <span className="bg-stone-50 text-stone-400 px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Active Settlement</span>
                 </div>
                 
                 <p className="text-stone-500 text-lg mb-10 leading-relaxed italic opacity-80 font-serif-impact">
                   "{selectedLoc.description}"
                 </p>

                 <div className="flex justify-between items-end border-t border-stone-50 pt-8">
                   <div className="flex flex-col">
                     <div className="text-terracotta text-4xl font-black tracking-tighter mb-1">
                       {selectedLoc.impactCount.toLocaleString()}
                     </div>
                     <span className="text-[10px] text-stone-300 font-black uppercase tracking-widest">Women Reached</span>
                   </div>
                   
                   <button className="group flex items-center gap-4 text-deep-purple font-black text-[10px] uppercase tracking-widest">
                     <span className="border-b border-deep-purple/20 group-hover:border-deep-purple transition-all pb-1">View Projects</span>
                     <div className="w-10 h-10 rounded-full border border-deep-purple/10 flex items-center justify-center group-hover:bg-deep-purple group-hover:text-white transition-all">
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                     </div>
                   </button>
                 </div>
               </div>
            </div>
            
            {/* Background Decorative Accent */}
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-vibrant-gold opacity-[0.03] rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
