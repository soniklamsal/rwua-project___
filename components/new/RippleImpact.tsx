
'use client';

import React, { useState } from 'react';

const IMPACT_NODES = [
  { id: 'family', label: 'Family Health', x: 20, y: 30, color: 'text-sage', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { id: 'education', label: 'Child Literacy', x: 80, y: 35, color: 'text-terracotta', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { id: 'economy', label: 'Local Market', x: 25, y: 75, color: 'text-vibrant-gold', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  { id: 'policy', label: 'Village Governance', x: 75, y: 70, color: 'text-deep-purple', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
];

const IMPACT_MESSAGES = {
  'family': "When women lead in family health, maternal mortality drops by 60% and child nutrition improves across three generations, creating healthier communities.",
  'education': "Female literacy champions increase village school enrollment by 80%, breaking cycles of poverty and empowering the next generation of leaders.",
  'economy': "Women-led cooperatives boost household income by 150%, creating sustainable livelihoods and strengthening local market resilience.",
  'policy': "Women in governance positions implement 40% more community-focused policies, ensuring inclusive development and social justice."
};

export const RippleImpact: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const triggerRipple = async (nodeId: string, label: string) => {
    setActiveNode(nodeId);
    setIsLoading(true);
    setAnalysis('');

    // Simulate loading time
    setTimeout(() => {
      setAnalysis(IMPACT_MESSAGES[nodeId as keyof typeof IMPACT_MESSAGES] || "Empowerment creates waves that reach further than we can measure.");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section className="py-32 bg-stone-950 text-white overflow-hidden relative">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-10 h-[1px] bg-terracotta"></span>
              <span className="text-terracotta font-black uppercase tracking-[0.4em] text-[10px]">Impact Simulator</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-serif-impact mb-10 leading-tight">
              The Ripple <br/><span className="italic text-vibrant-gold">Effect</span>.
            </h2>
            
            <div className="min-h-[220px] bg-white/5 backdrop-blur-md rounded-3xl p-10 border border-white/10 relative">
              {!activeNode && !isLoading ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-stone-500 italic">
                  <p className="text-lg">Click a sector on the map to visualize the transformation.</p>
                </div>
              ) : isLoading ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="w-8 h-8 border-2 border-vibrant-gold border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs font-black uppercase tracking-widest text-vibrant-gold animate-pulse">Calculating Generational Shift...</p>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-left-4 duration-700">
                  <h4 className="text-vibrant-gold font-black uppercase tracking-widest text-xs mb-4">
                    {IMPACT_NODES.find(n => n.id === activeNode)?.label} Forecast
                  </h4>
                  <p className="text-xl lg:text-2xl leading-relaxed text-stone-200 font-medium italic">
                    "{analysis}"
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="relative order-1 lg:order-2 aspect-square max-w-[600px] mx-auto w-full">
            {/* Central Woman Leader Node */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative z-20 group">
                <div className="w-32 h-32 rounded-full bg-deep-purple flex items-center justify-center border-4 border-white/10 shadow-[0_0_50px_rgba(76,29,149,0.3)] transition-all duration-700 group-hover:scale-110">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                {/* Ripples */}
                <div className={`absolute inset-0 rounded-full border border-vibrant-gold/40 animate-[ping_3s_linear_infinite] ${activeNode ? 'opacity-100' : 'opacity-0'}`}></div>
                <div className={`absolute inset-0 rounded-full border border-terracotta/40 animate-[ping_4s_linear_infinite_reverse] ${activeNode ? 'opacity-100' : 'opacity-0'}`}></div>
              </div>
            </div>

            {/* Impact Sector Nodes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              {IMPACT_NODES.map(node => (
                <line 
                  key={`line-${node.id}`}
                  x1="50%" y1="50%" x2={`${node.x}%`} y2={`${node.y}%`}
                  className={`stroke-white/10 transition-all duration-1000 ${activeNode === node.id ? 'stroke-vibrant-gold/40 stroke-[2px]' : 'stroke-dasharray-[5,5]'}`}
                />
              ))}
            </svg>

            {IMPACT_NODES.map(node => (
              <button
                key={node.id}
                onClick={() => triggerRipple(node.id, node.label)}
                className={`absolute w-20 h-20 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center transition-all duration-500 transform hover:scale-110 hover:bg-white/10 group z-20 ${activeNode === node.id ? 'border-vibrant-gold shadow-[0_0_30px_rgba(217,119,6,0.2)]' : ''}`}
                style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <svg className={`w-8 h-8 mb-2 transition-colors ${node.color} ${activeNode === node.id ? 'opacity-100' : 'opacity-60'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={node.icon} />
                </svg>
                <span className="text-[8px] font-black uppercase tracking-tighter text-white/50 text-center px-2 group-hover:text-white transition-colors">{node.label}</span>
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Background Decorative Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-deep-purple/20 rounded-full blur-[160px] pointer-events-none"></div>
    </section>
  );
};
