
import React, { useState, useEffect, useRef } from 'react';

const TOGETHER_STACK = [
  { id: 't1', url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=1200' },
  { id: 't2', url: 'https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?auto=format&fit=crop&q=80&w=1200' },
  { id: 't3', url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200' },
  { id: 't4', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200' },
];

interface CardState {
  id: string;
  url: string;
  x: number;
  y: number;
  rot: number;
  scale: number;
  opacity: number;
  isThrown: boolean;
  zIndex: number;
}

export const TogetherSection: React.FC = () => {
  const [cards, setCards] = useState<CardState[]>([]);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const dragStart = useRef({ x: 0, y: 0, cardId: '' });
  const velocity = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const lastTime = useRef(0);

  useEffect(() => {
    const initial = TOGETHER_STACK.map((img, i) => ({
      ...img,
      x: i * 2,
      y: i * 2,
      rot: (i % 2 === 0 ? 0.8 : -0.8) * i,
      scale: 1,
      opacity: 1,
      isThrown: false,
      zIndex: TOGETHER_STACK.length - i
    }));
    setCards(initial);
  }, []);

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    const topCard = cards.reduce((prev, current) => (prev.zIndex > current.zIndex) ? prev : current);
    if (id !== topCard.id || topCard.isThrown) return;

    e.preventDefault();
    setIsGrabbing(true);
    dragStart.current = { x: e.clientX, y: e.clientY, cardId: id };
    lastPos.current = { x: e.clientX, y: e.clientY };
    lastTime.current = Date.now();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart.current.cardId === '') return;

    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = {
        x: (e.clientX - lastPos.current.x) / dt,
        y: (e.clientY - lastPos.current.y) / dt
      };
    }
    
    lastPos.current = { x: e.clientX, y: e.clientY };
    lastTime.current = now;

    setCards(prev => prev.map(c => 
      c.id === dragStart.current.cardId 
        ? { 
            ...c, 
            x: c.x + (e.movementX), 
            y: c.y + (e.movementY), 
            rot: c.rot + (e.movementX * 0.1) 
          } 
        : c
    ));
  };

  const handleMouseUp = () => {
    const activeId = dragStart.current.cardId;
    if (activeId === '') return;

    const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
    
    if (speed > 0.6) {
      const throwDirectionX = velocity.current.x * 600;
      const throwDirectionY = velocity.current.y * 600;

      setCards(prev => prev.map(c => 
        c.id === activeId 
          ? { 
              ...c, 
              isThrown: true, 
              x: c.x + throwDirectionX, 
              y: c.y + throwDirectionY, 
              rot: c.rot + (velocity.current.x * 40),
              scale: 0.5,
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
                rot: (Math.random() - 0.5) * 12, 
                scale: 1, 
                opacity: 1, 
                zIndex: 1 
              };
            }
            return { ...c, zIndex: c.zIndex + 1 };
          });
        });
      }, 500);
    } else {
      setCards(prev => prev.map(c => 
        c.id === activeId ? { ...c, x: 0, y: 0, rot: 0 } : c
      ));
    }

    dragStart.current.cardId = '';
    setIsGrabbing(false);
  };

  return (
    <section className="py-24 lg:py-32 bg-stone-50 overflow-hidden select-none" onMouseUp={handleMouseUp}>
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          
          {/* Content Side */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <h2 className="text-5xl lg:text-7xl font-serif-impact text-deep-purple leading-tight mb-8">
              Together, we <br />
              can build <span className="text-terracotta italic">resilience</span>.
            </h2>
            
            <div className="space-y-6 text-stone-600 text-lg leading-relaxed max-w-xl font-medium">
              <p>
                Whether you can invest time or money, everyone has a role 
                to play in sustainably empowering rural communities. When one woman 
                is trained, the ripple effect reaches children, spouses, 
                neighbors and entire communities. 
              </p>
              <p>
                Real progress is made when we move beyond isolated aid and 
                invest in community-led initiatives that thrive long after the 
                distribution trucks leave.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <button className="bg-vibrant-gold text-stone-950 font-black py-4 px-10 rounded-full text-[10px] tracking-widest uppercase hover:bg-black hover:text-white transition-all shadow-xl">
                Become a Partner
              </button>
              <button className="border-2 border-deep-purple text-deep-purple font-black py-4 px-10 rounded-full text-[10px] tracking-widest uppercase hover:bg-deep-purple hover:text-white transition-all">
                Make a Donation
              </button>
            </div>
          </div>

          {/* INTERACTIVE STACK SIDE */}
          <div 
            className="w-full lg:w-1/2 relative order-1 lg:order-2 flex justify-center lg:justify-end"
            onMouseMove={handleMouseMove}
          >
            <div 
              ref={containerRef}
              className="relative w-full max-w-[400px] aspect-square flex items-center justify-center transition-all"
              style={{ cursor: isGrabbing ? 'grabbing' : 'grab' }}
            >
              {cards.map((card) => (
                <div
                  key={card.id}
                  onMouseDown={(e) => handleMouseDown(e, card.id)}
                  className="absolute w-full h-full bg-white p-3 shadow-2xl border border-stone-100 rounded-2xl group overflow-hidden transition-all"
                  style={{
                    transform: `translate(${card.x}px, ${card.y}px) rotate(${card.rot}deg) scale(${card.scale})`,
                    zIndex: card.zIndex,
                    opacity: card.opacity,
                    transition: card.isThrown ? 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)' : (isGrabbing && dragStart.current.cardId === card.id ? 'none' : 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)')
                  }}
                >
                  <img 
                    src={card.url} 
                    alt="Smiling woman in community" 
                    className="w-full h-full object-cover rounded-xl grayscale-[15%] group-hover:grayscale-0 transition-all duration-700"
                    draggable={false}
                  />
                </div>
              ))}
              
              <div className="absolute -bottom-12 flex flex-col items-center gap-2 opacity-20">
                <div className="w-12 h-1 bg-deep-purple rounded-full"></div>
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-deep-purple">Cycle Through Stories</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
