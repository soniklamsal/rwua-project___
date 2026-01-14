
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CORE_GOAL, OBJECTIVES } from '@/lib/constants';

const STACK_IMAGES = [
  { id: 1, url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200', title: 'Life in Hands' },
  { id: 2, url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=1200', title: 'Community Bonds' },
  { id: 3, url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200', title: 'Empowerment' },
  { id: 4, url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200', title: 'Sustainable Growth' },
];

interface CardState {
  id: number;
  url: string;
  x: number;
  y: number;
  rot: number;
  scale: number;
  opacity: number;
  isThrown: boolean;
  zIndex: number;
}

export const About: React.FC = () => {
  const [cards, setCards] = useState<CardState[]>([]);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const dragStart = useRef({ x: 0, y: 0, cardId: -1 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const lastTime = useRef(0);

  useEffect(() => {
    const initial = STACK_IMAGES.map((img, i) => ({
      ...img,
      x: 0, 
      y: 0,
      rot: (i % 2 === 0 ? 1.5 : -1.5) * i,
      scale: 1,
      opacity: 1,
      isThrown: false,
      zIndex: STACK_IMAGES.length - i
    }));
    setCards(initial);
  }, []);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent, id: number) => {
    const topCard = cards.reduce((prev, current) => (prev.zIndex > current.zIndex) ? prev : current);
    if (id !== topCard.id || topCard.isThrown) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    setIsGrabbing(true);
    dragStart.current = { x: clientX, y: clientY, cardId: id };
    lastPos.current = { x: clientX, y: clientY };
    lastTime.current = Date.now();
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStart.current.cardId === -1) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = {
        x: (clientX - lastPos.current.x) / dt,
        y: (clientY - lastPos.current.y) / dt
      };
    }
    
    lastPos.current = { x: clientX, y: clientY };
    lastTime.current = now;

    const deltaX = clientX - dragStart.current.x;
    const deltaY = clientY - dragStart.current.y;

    setCards(prev => prev.map(c => 
      c.id === dragStart.current.cardId 
        ? { ...c, x: deltaX, y: deltaY, rot: deltaX * 0.1 } 
        : c
    ));
  };

  const handleMouseUp = () => {
    const activeId = dragStart.current.cardId;
    if (activeId === -1) return;

    const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
    
    if (speed > 0.6) {
      const throwDirectionX = velocity.current.x * 800;
      const throwDirectionY = velocity.current.y * 800;

      setCards(prev => prev.map(c => 
        c.id === activeId 
          ? { 
              ...c, 
              isThrown: true, 
              x: throwDirectionX, 
              y: throwDirectionY, 
              rot: c.rot + (velocity.current.x * 50),
              scale: 0.8,
              opacity: 0
            } 
          : c
      ));

      setTimeout(() => {
        setCards(prev => {
          const movingCard = prev.find(c => c.id === activeId);
          if (!movingCard) return prev;

          return prev.map(c => {
            if (c.id === activeId) {
              return { 
                ...c, 
                isThrown: false, 
                x: 0, 
                y: 0, 
                rot: (Math.random() - 0.5) * 8, 
                scale: 1, 
                opacity: 1, 
                zIndex: 1 
              };
            }
            return { ...c, zIndex: c.zIndex + 1 };
          });
        });
      }, 400);
    } else {
      setCards(prev => prev.map(c => 
        c.id === activeId ? { ...c, x: 0, y: 0, rot: 0 } : c
      ));
    }

    dragStart.current.cardId = -1;
    setIsGrabbing(false);
  };

  return (
    <section className="py-24 bg-white overflow-hidden select-none" onMouseUp={handleMouseUp} onTouchEnd={handleMouseUp}>
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          
          

          <div className="w-full lg:w-1/2">
            <h2 className="text-6xl lg:text-[65px] font-serif-impact text-deep-purple leading-[0.9] tracking-tighter mb-10">
              Rural Women <br />
              <span className="text-terracotta text-nowrap italic">Upliftment Association</span>
            </h2>
            <div className="text-xl lg:text-base font-nepali leading-[1.8] text-black">
                ग्रामीण नारी उत्थान संघ हरिपुरले विगत लामो समय देखि ग्रामीण भेगका नागरिकहरुको ज्ञान एवं शिपसाग सम्बन्धित विविध किसिमका सशक्तिकरणको कार्यलाई अगाडि बढाउादै आएको छ । लोकतन्त्रको सम्बद्र्वन र सुशासनको अभिवृद्विका लागि सामाीजक तथा नागरिक समूह एवं संगठनहरुको महत्वपुर्ण भूमिका हुन्छ । प्रजातन्त्रको विकास सगै जनउत्तरदायी व्यवस्थाको विकासमा बल पुग्ने हुादा यसका अति आवश्यक संयन्त्रहरु र अवलम्बन गरिएका प्रक्रियाहरु जब मजबुत र फलदायी हुदैनन तब सम्म नागरिक तथा सामाजिक संगठनहरुले प्रभाकारी र रचनात्मक भूमिका निर्वाह गर्न सक्दैनन् । नागरिक तथा सामाजिक संगठनहरुको भूमिका प्रभावकारी र फलदायी बनाउान उनीहरुको सांगठनिक एवं नेतृत्वदयी क्षमता चुस्त र मजबुत हुनु अति आवश्यक पर्दछ । यति मात्र होईन समान उद्देश्य बोकेका संगठन एवं मञ्चहरुसाग हातेमालो गरी बलियो संञ्जाल निर्माण गर्ने, विकास एवं अधिकारको पैरवि एवं वकालत गर्दै प्रभावकारी जनपरिचालनका माध्यमबाट सरकारी संयन्त्रहरुलाई जनउत्तरदायी बनाउन सक्दो प्रयत्न गर्ने, विद्यमान नीति तथा कार्यक्रमहरु कार्यान्वयन गर्न सामुहिक दवाव श्रृजना गर्ने साथै नागरिकहरुका हक अधिकार, मर्यादा र चाहानाहरुको संरक्षण र सम्बद्र्वनका लागि राज्यका विभिन्न निकायहरुलाई जिम्मेवारी बोध गराउाने जस्ता विषयहरुमा सामाजिक एवं नागरिक संगठनहरुले अहंम भूमिका निर्वाह गर्नु पर्दछ । यस्तो कार्यको लागि ग्रामीण नारी उत्थान संघले स्थापना कालदेखिनै आफ्ना प्राय: सबै किमिका प्रयत्नहरु अगाडि बढाउदै समुदायको मन मष्तिक सम्म पुग्न सफल भएको छ ।
            </div>
          </div>

              <div className="w-full lg:w-1/2 relative flex flex-col items-center">
            <div 
              ref={containerRef}
              className="relative w-full max-w-[460px] aspect-square flex items-center justify-center"
              onMouseMove={handleMouseMove}
              onTouchMove={handleMouseMove}
              style={{ cursor: isGrabbing ? 'grabbing' : 'grab' }}
            >
              <div className="absolute inset-0 bg-stone-100/40 rounded-full blur-3xl -z-10 scale-125"></div>
              
              {cards.map((card) => (
                <div
                  key={card.id}
                  onMouseDown={(e) => handleMouseDown(e, card.id)}
                  onTouchStart={(e) => handleMouseDown(e, card.id)}
                  className={`absolute w-full h-full bg-white p-4 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.12)] border border-stone-100 rounded-[32px] pointer-events-auto overflow-hidden`}
                  style={{
                    transform: `translate(${card.x}px, ${card.y}px) rotate(${card.rot}deg) scale(${card.scale})`,
                    zIndex: card.zIndex,
                    opacity: card.opacity,
                    transition: card.isThrown ? 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : (isGrabbing && dragStart.current.cardId === card.id ? 'none' : 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)')
                  }}
                >
                  <img 
                    src={card.url} 
                    alt="Mission focus" 
                    className="w-full h-full object-cover rounded-2xl grayscale-[15%] group-hover:grayscale-0 transition-all duration-700"
                    draggable={false}
                  />
                  <div className="absolute bottom-10 left-10 right-10">
                     <div className="bg-white/95 backdrop-blur-xl px-6 py-2.5 rounded-full shadow-2xl border border-white/20 inline-flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-vibrant-gold animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-purple">Impact Area 0{card.id}</span>
                     </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 flex items-center gap-6 group">
              <div className="w-12 h-[1px] bg-stone-200 group-hover:w-20 transition-all"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-300">
                Grab & Swipe card to cycle
              </span>
              <div className="w-12 h-[1px] bg-stone-200 group-hover:w-20 transition-all"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
