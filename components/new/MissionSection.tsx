
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

export const MissionSection: React.FC = () => {
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
    <section className="py-24 lg:py-36 bg-white overflow-hidden select-none" onMouseUp={handleMouseUp} onTouchEnd={handleMouseUp}>
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">

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

          <div className="w-full lg:w-1/2">
            <h2 className="text-6xl lg:text-[84px] font-serif-impact text-deep-purple leading-[0.9] tracking-tighter mb-10">
              A Dignified <br />
              <span className="text-terracotta italic">Life for All.</span>
            </h2>

            <div className="mb-12 p-8 bg-stone-50 border-l-8 border-vibrant-gold rounded-r-3xl">
              <p className="text-stone-800 text-xl lg:text-2xl font-bold italic leading-relaxed">
                "{CORE_GOAL}"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {OBJECTIVES.map((obj, index) => (
                <div key={index} className="group flex gap-5 items-start">
                  <span className="text-terracotta font-black text-xs shrink-0 mt-1 transition-transform group-hover:scale-125">0{index + 1}</span>
                  <p className="text-stone-500 text-[15px] leading-relaxed font-semibold opacity-80 group-hover:opacity-100 transition-opacity">
                    {obj}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <button className="bg-deep-purple text-white font-black py-5 px-12 rounded-2xl text-[10px] tracking-[0.3em] uppercase hover:bg-black transition-all shadow-2xl active:scale-95">
                Explore Our Ecosystem
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
