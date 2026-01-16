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

// Fallback data
const fallbackStats: Stat[] = [
  { statValue: '5120', statLabel: 'Lives Empowered' },
  { statValue: '442', statLabel: 'Blankets Provided' },
  { statValue: 'SDG', statLabel: 'Policy Aligned' }
];

export const StatsSection: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>(fallbackStats);
  const [counts, setCounts] = useState<number[]>([0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log('=== FETCHING IMPACT STATS ===');
        console.log('Query:', GET_IMPACT_STATS);
        console.log('WordPress URL:', process.env.NEXT_PUBLIC_WORDPRESS_URL);
        
        const data = await executeQuery<StatsData>(GET_IMPACT_STATS);
        console.log('Raw response:', JSON.stringify(data, null, 2));
        
        if (data?.impactstats?.nodes && data.impactstats.nodes.length > 0) {
          console.log('✅ Found', data.impactstats.nodes.length, 'node(s)');
          
          const firstNode = data.impactstats.nodes[0];
          console.log('First node:', firstNode);
          
          if (firstNode?.statsFieldsData?.statsList) {
            const fetchedStats = firstNode.statsFieldsData.statsList;
            console.log('✅ SUCCESS! Fetched stats:', fetchedStats);
            setStats(fetchedStats);
            setCounts(new Array(fetchedStats.length).fill(0));
          } else {
            console.warn('⚠️ Node exists but statsFieldsData.statsList is empty');
            console.log('Available keys in node:', Object.keys(firstNode || {}));
          }
        } else {
          console.warn('⚠️ WordPress returned empty nodes array');
          console.log('');
          console.log('📝 TO FIX THIS:');
          console.log('1. Go to: https://rwua.bishalbaniya.com.np/wp-admin');
          console.log('2. Find "Impact Stats" in the left menu');
          console.log('3. Click "Add New"');
          console.log('4. Fill in the ACF fields:');
          console.log('   - titlestatsFieldsData > statsList');
          console.log('   - Add rows with statValue and statLabel');
          console.log('5. Publish the post');
          console.log('');
          console.log('Using fallback data for now...');
        }
      } catch (error) {
        console.error('❌ ERROR fetching stats:', error);
        console.log('Using fallback data');
      }
    };

    fetchStats();
  }, []);

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
    if (!isVisible || stats.length === 0) return;

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
  }, [isVisible, stats]);

  const getColorClass = (index: number) => {
    const colors = ['text-impact-red', 'text-core-blue', 'text-flash-yellow'];
    return colors[index % colors.length];
  };

  const getBorderClass = (index: number) => {
    const borders = ['bg-core-blue', 'bg-stone-200', 'bg-stone-200'];
    return borders[index % borders.length];
  };

  const getLabelColorClass = (index: number) => {
    return 'text-black';
  };

  if (stats.length === 0) {
    return (
      <section className="bg-white py-24 relative z-20 -mt-12 lg:-mt-20">
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
          <div className="bg-white rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-stone-50 p-12 lg:p-20">
            <div className="text-center text-stone-400">
              No stats data available
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="bg-white py-24 relative z-20 -mt-12 lg:-mt-20">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="bg-white rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-stone-50 p-12 lg:p-20">
          <div className={`grid grid-cols-1 md:grid-cols-${Math.min(stats.length, 3)} gap-16 lg:gap-24 items-center`}>
            
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`flex flex-col items-center md:items-start text-center md:text-left ${
                  index > 0 && index < stats.length - 1 
                    ? 'border-y md:border-y-0 md:border-x border-stone-100 py-12 md:py-0 md:px-12 lg:px-24' 
                    : index > 0 ? 'border-y md:border-y-0 md:border-x border-stone-100 py-12 md:py-0 md:px-12 lg:px-24' : ''
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
        </div>
      </div>
    </section>
  );
};
