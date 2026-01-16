'use client';

import React, { useState, useEffect, useRef } from 'react';
import { executeQuery } from '@/lib/wordpress/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// WordPress query remains the same
const GET_ABOUT_SECTION_DATA = `
  query GetAboutSectionData {
    aboutFields {
      nodes {
        aboutPageFieldsType {
          sectionTitle
          sectionTitleItalic
          nepaliDescription
          imageStack {
            tagline
            cardImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  }
`;

const STACK_IMAGES = [
  { id: 1, url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200', title: 'Life in Hands' },
  { id: 2, url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=1200', title: 'Community Bonds' },
  { id: 3, url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200', title: 'Empowerment' },
  { id: 4, url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200', title: 'Sustainable Growth' },
];

interface CardState {
  id: number;
  url: string;
  title: string;
  x: number;
  y: number;
  rot: number;
  scale: number;
  opacity: number;
  isThrown: boolean;
  zIndex: number;
  noAnim?: boolean;
}

export const About: React.FC = () => {
  const [cards, setCards] = useState<CardState[]>([]);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [aboutData, setAboutData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const dragStart = useRef({ x: 0, y: 0, cardId: -1 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const lastTime = useRef(0);

  // 1. GSAP Scroll Entrance
  useEffect(() => {
    if (loading || !aboutData) return;

    const ctx = gsap.context(() => {
      // Text reveal
      gsap.from(".about-gsap-text", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2
      });

      // Card stack reveal
      gsap.from(".about-card-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        scale: 0.9,
        opacity: 0,
        y: 40,
        rotationX: 10,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.08
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, aboutData]);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const wpData = await executeQuery(GET_ABOUT_SECTION_DATA);
        if (wpData?.aboutFields?.nodes?.[0]?.aboutPageFieldsType) {
          setAboutData(wpData.aboutFields.nodes[0].aboutPageFieldsType);
        }
      } catch (error) {
        console.error('Error fetching WordPress About data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  useEffect(() => {
    let cardData = STACK_IMAGES;
    if (aboutData?.imageStack && aboutData.imageStack.length > 0) {
      cardData = aboutData.imageStack
        .filter((item: any) => item?.cardImage?.node?.sourceUrl)
        .map((item: any, i: number) => ({
          id: i + 1,
          url: item.cardImage.node.sourceUrl,
          title: item.tagline || `Impact Area ${i + 1}`
        }));
    }
    
    const initial = cardData.map((img, i) => ({
      ...img,
      x: 0, y: 0,
      rot: (i % 2 === 0 ? 1.5 : -1.5) * i,
      scale: 1,
      opacity: 1,
      isThrown: false,
      zIndex: cardData.length - i,
      noAnim: false
    }));
    setCards(initial);
  }, [aboutData, loading]);

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
        ? { ...c, x: deltaX, y: deltaY, rot: deltaX * 0.1, noAnim: false } 
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
          ? { ...c, isThrown: true, x: throwDirectionX, y: throwDirectionY, opacity: 0 } 
          : c
      ));

      setTimeout(() => {
        setCards(prev => prev.map(c => {
          if (c.id === activeId) {
            return { 
              ...c, 
              isThrown: false, x: 0, y: 0, 
              rot: (Math.random() - 0.5) * 8, 
              scale: 1, opacity: 0, zIndex: 1, noAnim: true 
            };
          }
          return { ...c, zIndex: c.zIndex + 1, noAnim: false };
        }));

        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === activeId ? { ...c, opacity: 1, noAnim: false } : c
          ));
        }, 30);
      }, 400);
    } else {
      setCards(prev => prev.map(c => 
        c.id === activeId ? { ...c, x: 0, y: 0, rot: 0, noAnim: false } : c
      ));
    }

    dragStart.current.cardId = -1;
    setIsGrabbing(false);
  };

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-white overflow-hidden select-none" onMouseUp={handleMouseUp} onTouchEnd={handleMouseUp}>
      <div className="container mx-auto px-6 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-32">
          
          {/* TEXT CONTENT */}
          <div ref={textRef} className="w-full lg:w-1/2">
            <h2 className="about-gsap-text text-4xl md:text-6xl lg:text-[65px] font-serif-impact text-core-blue leading-[1.1] lg:leading-[0.9] tracking-tighter mb-8 lg:mb-10">
              {aboutData?.sectionTitle || "Rural Women"} <br />
              <span className="text-impact-red italic block sm:inline">
                {aboutData?.sectionTitleItalic || "Upliftment Association"}
              </span>
            </h2>
            <div className="about-gsap-text text-lg lg:text-base font-nepali leading-[1.8] text-black">
              {aboutData?.nepaliDescription || 
                "ग्रामीण नारी उत्थान संघ हरिपुरले विगत लामो समय देखि ग्रामीण भेगका नागरिकहरुको ज्ञान एवं शिपसाग सम्बन्धित विविध किसिमका सशक्तिकरणको कार्यलाई अगाडि बढाउादै आएको छ ।..."
              }
            </div>
          </div>

          {/* INTERACTIVE CARD STACK */}
          <div className="w-full lg:w-1/2 relative flex flex-col items-center">
            <div 
              ref={containerRef}
              className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[460px] aspect-square flex items-center justify-center touch-none"
              onMouseMove={handleMouseMove}
              onTouchMove={handleMouseMove}
              style={{ cursor: isGrabbing ? 'grabbing' : 'grab' }}
            >
              <div className="absolute inset-0 bg-stone-100/40 rounded-full blur-3xl -z-10 scale-110 lg:scale-125"></div>
              
              {cards.map((card) => (
                <div
                  key={card.id}
                  onMouseDown={(e) => handleMouseDown(e, card.id)}
                  onTouchStart={(e) => handleMouseDown(e, card.id)}
                  className="about-card-anim absolute w-full h-full bg-white p-3 lg:p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] lg:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.12)] border border-stone-100 rounded-[24px] lg:rounded-[32px] pointer-events-auto overflow-hidden"
                  style={{
                    transform: `translate(${card.x}px, ${card.y}px) rotate(${card.rot}deg) scale(${card.scale})`,
                    zIndex: card.zIndex,
                    opacity: card.opacity,
                    transition: card.noAnim 
                      ? 'none' 
                      : (card.isThrown 
                          ? 'all 0.4s ease-out' 
                          : (isGrabbing && dragStart.current.cardId === card.id ? 'none' : 'all 0.5s ease-out'))
                  }}
                >
                  <img 
                    src={card.url} 
                    alt={card.title || "Mission focus"} 
                    className="w-full h-full object-cover rounded-xl lg:rounded-2xl grayscale-[15%] hover:grayscale-0 transition-all duration-700"
                    draggable={false}
                  />
                  <div className="absolute bottom-6 lg:bottom-10 left-6 lg:left-10 right-6 lg:right-10">
                     <div className="bg-white/95 backdrop-blur-xl px-4 lg:px-6 py-2 rounded-full shadow-2xl border border-white/20 inline-flex items-center gap-2 lg:gap-3">
                        <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-impact-red animate-pulse"></div>
                        <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] text-core-blue">
                          {card.title || `Impact Area 0${card.id}`}
                        </span>
                     </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="about-gsap-text mt-12 lg:mt-16 flex items-center gap-4 lg:gap-6 group">
              <div className="w-8 lg:w-12 h-[1px] bg-stone-200 group-hover:w-16 transition-all"></div>
              <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-[0.3em] lg:tracking-[0.5em] text-stone-300 text-center">
                Grab & Swipe to cycle
              </span>
              <div className="w-8 lg:w-12 h-[1px] bg-stone-200 group-hover:w-16 transition-all"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};