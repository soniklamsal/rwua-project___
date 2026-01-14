'use client';

import React, { useState, useEffect, useRef } from 'react';
import { executeQuery } from '@/lib/wordpress/client';

// WordPress query
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

// Fallback data
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
  const containerRef = useRef<HTMLDivElement>(null);
  
  const dragStart = useRef({ x: 0, y: 0, cardId: -1 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const lastTime = useRef(0);

  // Fetch WordPress data
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const wpData = await executeQuery(GET_ABOUT_SECTION_DATA);
        
        if (wpData?.aboutFields?.nodes?.[0]?.aboutPageFieldsType) {
          setAboutData(wpData.aboutFields.nodes[0].aboutPageFieldsType);
        } else {
          setAboutData(null);
        }
      } catch (error) {
        console.error('Error fetching WordPress About data:', error);
        setAboutData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Initialize cards when data is loaded
  useEffect(() => {
    let cardData = STACK_IMAGES;
    
    // Use WordPress data if available
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
      x: 0, 
      y: 0,
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

      // Phase 1: Throw the card out
      setCards(prev => prev.map(c => 
        c.id === activeId 
          ? { ...c, isThrown: true, x: throwDirectionX, y: throwDirectionY, opacity: 0 } 
          : c
      ));

      // Phase 2: Reset card position silently while invisible
      setTimeout(() => {
        setCards(prev => prev.map(c => {
          if (c.id === activeId) {
            return { 
              ...c, 
              isThrown: false, 
              x: 0, 
              y: 0, 
              rot: (Math.random() - 0.5) * 8, 
              scale: 1, 
              opacity: 0, // Keep hidden briefly
              zIndex: 1,
              noAnim: true // Kill the "sliding back" transition
            };
          }
          return { ...c, zIndex: c.zIndex + 1, noAnim: false };
        }));

        // Phase 3: Fade card back in at bottom
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
    <section className="py-24 bg-white overflow-hidden select-none" onMouseUp={handleMouseUp} onTouchEnd={handleMouseUp}>
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          
          <div className="w-full lg:w-1/2">
            <h2 className="text-6xl lg:text-[65px] font-serif-impact text-core-blue leading-[0.9] tracking-tighter mb-10">
              {aboutData?.sectionTitle || "Rural Women"} <br />
              <span className="text-impact-red text-nowrap italic">
                {aboutData?.sectionTitleItalic || "Upliftment Association"}
              </span>
            </h2>
            <div className="text-xl lg:text-base font-nepali leading-[1.8] text-black">
              {aboutData?.nepaliDescription || 
                "ग्रामीण नारी उत्थान संघ हरिपुरले विगत लामो समय देखि ग्रामीण भेगका नागरिकहरुको ज्ञान एवं शिपसाग सम्बन्धित विविध किसिमका सशक्तिकरणको कार्यलाई अगाडि बढाउादै आएको छ । लोकतन्त्रको सम्बद्र्वन र सुशासनको अभिवृद्विका लागि सामाीजक तथा नागरिक समूह एवं संगठनहरुको महत्वपुर्ण भूमिका हुन्छ । प्रजातन्त्रको विकास सगै जनउत्तरदायी व्यवस्थाको विकासमा बल पुग्ने हुादा यसका अति आवश्यक संयन्त्रहरु र अवलम्बन गरिएका प्रक्रियाहरु जब मजबुत र फलदायी हुदैनन तब सम्म नागरिक तथा सामाजिक संगठनहरुले प्रभाकारी र रचनात्मक भूमिका निर्वाह गर्न सक्दैनन् । नागरिक तथा सामाजिक संगठनहरुको भूमिका प्रभावकारी र फलदायी बनाउान उनीहरुको सांगठनिक एवं नेतृत्वदयी क्षमता चुस्त र मजबुत हुनु अति आवश्यक पर्दछ । यति मात्र होईन समान उद्देश्य बोकेका संगठन एवं मञ्चहरुसाग हातेमालो गरी बलियो संञ्जाल निर्माण गर्ने, विकास एवं अधिकारको पैरवि एवं वकालत गर्दै प्रभावकारी जनपरिचालनका माध्यमबाट सरकारी संयन्त्रहरुलाई जनउत्तरदायी बनाउन सक्दो प्रयत्न गर्ने, विद्यमान नीति तथा कार्यक्रमहरु कार्यान्वयन गर्न सामुहिक दवाव श्रृजना गर्ने साथै नागरिकहरुका हक अधिकार, मर्यादा र चाहानाहरुको संरक्षण र सम्बद्र्वनका लागि राज्यका विभिन्न निकायहरुलाई जिम्मेवारी बोध गराउाने जस्ता विषयहरुमा सामाजिक एवं नागरिक संगठनहरुले अहंम भूमिका निर्वाह गर्नु पर्दछ । यस्तो कार्यको लागि ग्रामीण नारी उत्थान संघले स्थापना कालदेखिनै आफ्ना प्राय: सबै किमिका प्रयत्नहरु अगाडि बढाउदै समुदायको मन मष्तिक सम्म पुग्न सफल भएको छ ।"
              }
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
                  className="absolute w-full h-full bg-white p-4 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.12)] border border-stone-100 rounded-[32px] pointer-events-auto overflow-hidden"
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
                    className="w-full h-full object-cover rounded-2xl grayscale-[15%] transition-all duration-700"
                    draggable={false}
                  />
                  <div className="absolute bottom-10 left-10 right-10">
                     <div className="bg-white/95 backdrop-blur-xl px-6 py-2.5 rounded-full shadow-2xl border border-white/20 inline-flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-vibrant-gold animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-purple">
                          {card.title || `Impact Area 0${card.id}`}
                        </span>
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