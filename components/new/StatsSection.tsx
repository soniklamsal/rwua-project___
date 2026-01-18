'use client';

import React, { useState, useEffect, useRef } from 'react';
import { executeQuery } from '@/lib/wordpress/client';
import { GET_IMPACT_STATS } from '@/lib/wordpress/queries';

interface Stat {
  statValue: string;
  statLabel: string;
}

interface StatsData {
  impactstats: {
    nodes: Array<{
      title: string;
      statsFieldsData: {
        statsList: Stat[];
      };
    }>;
  };
}

// --- SKELETON COMPONENT ---
const StatsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 items-center">
    {[1, 2, 3].map((i) => (
      <div 
        key={i} 
        className={`flex flex-col items-center md:items-start space-y-4 animate-pulse ${
          i === 2 ? 'border-y md:border-y-0 md:border-x border-stone-100 py-12 md:py-0 md:px-12 lg:px-24' : ''
        }`}
      >
        <div className="h-16 lg:h-20 w-32 bg-stone-100 rounded-md" />
        <div className="flex items-center gap-3 w-full justify-center md:justify-start">
          <div className="w-6 h-[2px] bg-stone-100" />
          <div className="h-3 w-24 bg-stone-100 rounded" />
        </div>
      </div>
    ))}
  </div>
);

const fallbackStats: Stat[] = [
  { statValue: '5120', statLabel: 'Lives Empowered' },
  { statValue: '442', statLabel: 'Blankets Provided' },
  { statValue: 'SDG', statLabel: 'Policy Aligned' }
];

export const StatsSection: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [counts, setCounts] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await executeQuery<StatsData>(GET_IMPACT_STATS);
        if (data?.impactstats?.nodes?.[0]?.statsFieldsData?.statsList) {
          const fetchedStats = data.impactstats.nodes[0].statsFieldsData.statsList;
          setStats(fetchedStats);
          setCounts(new Array(fetchedStats.length).fill(0));
        } else {
          setStats(fallbackStats);
          setCounts(new Array(fallbackStats.length).fill(0));
        }
      } catch (error) {
        setStats(fallbackStats);
        setCounts(new Array(fallbackStats.length).fill(0));
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || stats.length === 0 || loading) return;

    const timers: NodeJS.Timeout[] = [];
    stats.forEach((stat, index) => {
      const targetValue = parseInt(stat.statValue.replace(/[^0-9]/g, '')) || 0;
      let start = 0;
      const duration = 2000;
      const increment = Math.ceil(targetValue / (duration / 16));
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= targetValue) {
          setCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = targetValue;
            return newCounts;
          });
          clearInterval(timer);
        } else {
          setCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = start;
            return newCounts;
          });
        }
      }, 16);
      timers.push(timer);
    });
    return () => timers.forEach(timer => clearInterval(timer));
  }, [isVisible, stats, loading]);

  return (
    <section ref={sectionRef} className="bg-white py-24 relative z-20 -mt-12 lg:-mt-20">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="bg-white rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-stone-50 p-12 lg:p-20">
          {loading ? (
            <StatsSkeleton />
          ) : (
            <div className={`grid grid-cols-1 md:grid-cols-${Math.min(stats.length, 3)} gap-16 lg:gap-24 items-center`}>
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`flex flex-col items-center md:items-start text-center md:text-left ${
                    index === 1 ? 'border-y md:border-y-0 md:border-x border-stone-100 py-12 md:py-0 md:px-12 lg:px-24' : ''
                  }`}
                >
                  <div className={`${
                    index === 0 ? 'text-impact-red text-7xl lg:text-8xl' : 
                    index === 1 ? 'text-core-blue text-6xl lg:text-7xl' : 
                    'text-flash-yellow text-6xl lg:text-7xl'
                  } font-black tracking-tighter mb-4`}>
                    {stat.statValue.match(/[^0-9]/) 
                      ? stat.statValue.replace(/[0-9]+/g, counts[index]?.toLocaleString() || '0')
                      : `${counts[index]?.toLocaleString() || '0'}+`
                    }
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-[2px] ${index === 0 ? 'bg-core-blue' : 'bg-stone-200'}`}></div>
                    <span className="text-black text-xs font-black uppercase tracking-[0.3em]">
                      {stat.statLabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};