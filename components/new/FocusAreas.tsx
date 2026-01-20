'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Globe, Rocket, ArrowUpRight } from 'lucide-react';
import { executeQuery } from '@/lib/wordpress/client';

// --- SKELETON COMPONENT ---
const FocusAreasSkeleton = () => (
  <section className="py-20 lg:py-32 bg-white overflow-hidden relative">
    <div className="container mx-auto px-6 relative z-10">
      <div className="mb-16 lg:mb-24 flex flex-col lg:flex-row lg:items-end gap-8 justify-between border-b border-slate-50 pb-12 lg:pb-16 animate-pulse">
        <div className="flex-1">
          <div className="w-32 h-4 bg-slate-100 rounded-full mb-6" />
          <div className="h-20 lg:h-32 w-3/4 bg-slate-100 rounded-2xl" />
        </div>
        <div className="w-64 h-16 bg-slate-50 rounded-xl lg:mb-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[450px] bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 lg:p-10 flex flex-col justify-between animate-pulse">
            <div>
              <div className="w-16 h-16 bg-slate-200 rounded-2xl mb-10" />
              <div className="h-10 w-2/3 bg-slate-200 rounded-lg mb-6" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-slate-100 rounded" />
                <div className="h-4 w-full bg-slate-100 rounded" />
                <div className="h-4 w-5/6 bg-slate-100 rounded" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-24 h-12 bg-white rounded-2xl border border-slate-100" />
              <div className="w-12 h-12 bg-white rounded-full border border-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const GET_FOCUS_AREAS_SECTION = `
  query GetFocusAreasSection {
    focusArea(id: "focusarea", idType: SLUG) {
      title
      focusAreaFieldsType {
        focusCards {
          title
          desc
          metric
        }
      }
    }
  }
`;

const focusData = [
  {
    id: 1,
    title: "Core Vision",
    desc: "Desire of Rural Women Upliftment Association “Establishment of Quality and Equitable and Prosperous Society.",
    metric: "1,200+ Students",
    icon: <Globe className="w-6 h-6" />,
    color: "bg-core-blue",
    hex: "#0100FA", // Added hex for dynamic background
    glow: "bg-[#0100FA]/5",
    shadow: "shadow-[0_20px_50px_rgba(1,0,250,0.3)]", 
    border: "group-hover:border-[#0100FA]/40"
  },
  {
    id: 2,
    title: "Core Mission",
    desc: "To transform the community by mobilizing and empowering the target group, improving economic and social life.",
    metric: "45+ Cooperatives",
    icon: <Rocket className="w-6 h-6" />,
    color: "bg-impact-red",
    hex: "#C2410C", // Added hex for dynamic background
    glow: "bg-[#C2410C]/5",
    shadow: "shadow-[0_20px_50px_rgba(194,65,12,0.3)]",
    border: "group-hover:border-[#C2410C]/40"
  },
  {
    id: 3,
    title: "Core Goal",
    desc: "A dignified life will be built by improving the quality of education healthy life and income of the Community.",
    metric: "5k+ Lives",
    icon: <Target className="w-6 h-6" />,
    color: "bg-flash-yellow",
    hex: "#D97706", // Added hex for dynamic background
    glow: "bg-[#D97706]/5",
    shadow: "shadow-[0_20px_50px_rgba(217,119,6,0.3)]",
    border: "group-hover:border-[#D97706]/40"
  }
];

export const FocusAreas: React.FC = () => {
  const [focusAreasData, setFocusAreasData] = useState(focusData);
  const [loading, setLoading] = useState(true);
  const [activeColor, setActiveColor] = useState("#0100FA"); // State for primaryAccent

  useEffect(() => {
    const fetchFocusAreasData = async () => {
      try {
        setLoading(true);
        const wpData = await executeQuery(GET_FOCUS_AREAS_SECTION);
        if (wpData?.focusArea?.focusAreaFieldsType?.focusCards?.length > 0) {
          const wpFocusCards = wpData.focusArea.focusAreaFieldsType.focusCards.map((card: any, index: number) => ({
            ...focusData[index],
            title: card.title || focusData[index]?.title,
            desc: card.desc || focusData[index]?.desc,
            metric: card.metric || focusData[index]?.metric,
          }));
          setFocusAreasData(wpFocusCards);
        }
      } catch (error) {
        console.error('Error fetching WordPress Focus Areas data:', error);
      } finally {
        setTimeout(() => setLoading(false), 600);
      }
    };
    fetchFocusAreasData();
  }, []);

  if (loading) return <FocusAreasSkeleton />;

  return (
    <section className="py-20 lg:py-32 bg-[#ffffff] text-slate-900 overflow-hidden relative">
      {/* Dynamic Background Accents */}
      <motion.div 
        className="absolute top-0 right-0 w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] rounded-full blur-[100px] lg:blur-[140px] -z-0 opacity-0 transition-colors duration-700" 
        style={{ backgroundColor: activeColor }}
      />
      <div className="absolute bottom-0 left-0 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-[#C2410C]/5 rounded-full blur-[80px] lg:blur-[100px] -z-0" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="mb-16 lg:mb-24 flex flex-col lg:flex-row lg:items-end gap-8 justify-between border-b border-slate-100 pb-12 lg:pb-16">
          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-[#C2410C]" />
              <span className="text-[10px] lg:text-xs font-black uppercase tracking-[0.5em] text-slate-400">Strategic Framework</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl lg:text-[110px] font-black tracking-tighter leading-[0.9] lg:leading-none uppercase text-[#1e293b]">
              Pillars of <br className="lg:hidden" />
              <span className="text-impact-red italic font-serif lowercase lg:px-4">Impact.</span>
            </h2>
          </div>

          <div className="max-w-[320px] lg:mb-4">
            <div className="h-[2px] w-12 bg-[#D97706] mb-6 hidden lg:block" />
            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium opacity-80">
              Nurturing rural potential through education, healthcare, and economic empowerment initiatives.
            </p>
          </div>
        </div>

        {/* The Warp Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {focusAreasData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              onMouseEnter={() => setActiveColor(item.hex)}
              whileHover={{ scale: 1.02, rotateY: 5, rotateX: 2 }} 
              className="group relative"
              style={{ perspective: '1200px' }}
            >
              <div className={`h-full bg-white border border-slate-50 rounded-[2.5rem] p-8 lg:p-10 flex flex-col justify-between transition-all duration-500 
                ${item.border} 
                shadow-[0_30px_70px_-15px_rgba(0,0,0,0.12),0_20px_40px_-20px_rgba(0,0,0,0.08)]
                group-hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.18),0_30px_60px_-30px_rgba(0,0,0,0.22)]`}
              >
                <div className={`absolute inset-0 ${item.glow} opacity-0 group-hover:opacity-100 rounded-[2.5rem] transition-opacity duration-500 -z-10`} />

                <div>
                  <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-2xl ${item.color} flex items-center justify-center mb-8 lg:mb-10 ${item.shadow} group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out`}>
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>

                  <div className="space-y-4 lg:space-y-6">
                    <h3 className="text-3xl lg:text-4xl font-bold tracking-tighter text-slate-800 transition-colors group-hover:text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-base lg:text-lg leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-10 lg:mt-12 flex items-center justify-between">
                  <div className="px-4 py-2 lg:px-5 lg:py-2.5 rounded-2xl bg-white border border-slate-100 shadow-sm group-hover:shadow-md transition-shadow">
                    <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-0.5">Reach</span>
                    <span className="text-xs lg:text-sm font-bold text-slate-700 uppercase">{item.metric}</span>
                  </div>
                  
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center bg-white shadow-lg text-slate-400 transition-all duration-500`}>
                    <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5" />
                  </div>
                </div>

                <div className={`absolute bottom-0 left-8 lg:left-12 right-8 lg:right-12 h-[3px] bg-gradient-to-r ${item.color} opacity-20 group-hover:opacity-100 transition-all duration-500 rounded-full`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
