'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { apolloClient } from '../../lib/wordpress/client';
import { gql } from '@apollo/client';
import { ShowcaseMember } from '../../lib/faust-types';
import { ORG_MEMBERS } from '../../lib/constants';

// --- SKELETON COMPONENT ---
const ChairpersonSkeleton = () => (
  <section className="relative w-full min-h-screen lg:h-screen bg-black overflow-hidden flex flex-col lg:flex-row animate-pulse">
    <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-20 lg:pl-32">
      <div className="h-20 w-3/4 bg-zinc-900 rounded-xl mb-6" />
      <div className="h-8 w-1/2 bg-zinc-900 rounded-lg mb-4" />
      <div className="h-4 w-1/4 bg-zinc-900 rounded-md mb-8" />
      <div className="h-32 w-full bg-zinc-900/50 rounded-xl" />
    </div>
    <div className="w-full lg:w-1/2 relative h-[700px] lg:h-full flex items-end pb-24 lg:pb-32 px-8">
       <div className="w-[280px] h-[400px] md:w-[350px] md:h-[500px] lg:w-[420px] lg:h-[580px] bg-zinc-900 rounded-[3rem]" />
    </div>
  </section>
);

const GET_ALL_SHOWCASE_MEMBERS = gql`
  query GetAllShowcaseMembers {
    showcaseMembers {
      nodes {
        id
        title
        showcaseMemberFieldsType {
          members {
            name
            nepaliName
            role
            quote
            phone
            memberUrl { node { sourceUrl mediaItemUrl } }
            bgImage { node { sourceUrl mediaItemUrl } }
          }
        }
      }
    }
  }
`;

export const ChairpersonSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [slides, setSlides] = useState<ShowcaseMember[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Use ReturnType to avoid NodeJS vs Window timer conflicts
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const fetchShowcaseMembers = async () => {
      try {
        setIsLoading(true);
        const { data } = await apolloClient.query({ 
          query: GET_ALL_SHOWCASE_MEMBERS, 
          fetchPolicy: 'network-only' 
        });
        
        if (data?.showcaseMembers?.nodes?.[0]?.showcaseMemberFieldsType?.members) {
          const wpMembers = data.showcaseMembers.nodes[0].showcaseMemberFieldsType.members.map((member: any, index: number) => ({
            id: index.toString(),
            name: member.name || 'Member',
            nepaliName: member.nepaliName || '',
            role: member.role || 'Team Member',
            quote: member.quote || 'Leading community transformation.',
            phone: member.phone || '',
            description: member.quote || 'Leading community transformation.',
            imageUrl: member.memberUrl?.node?.sourceUrl || ORG_MEMBERS[0].imageUrl,
            bgImageUrl: member.bgImage?.node?.sourceUrl || member.memberUrl?.node?.sourceUrl || ORG_MEMBERS[0].imageUrl,
          }));
          setSlides(wpMembers);
        } else {
          setSlides(ORG_MEMBERS.map((m: any, i: number) => ({
            id: i.toString(),
            name: m.name || '',
            nepaliName: m.nepaliName || '',
            role: m.role || '',
            quote: m.quote || '',
            phone: m.phone || '',
            description: typeof m.quote === 'string' ? m.quote : 'Leading community transformation.',
            imageUrl: m.imageUrl || '',
            bgImageUrl: m.imageUrl || '',
          })) as ShowcaseMember[]);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 800);
      }
    };
    fetchShowcaseMembers();
  }, []);

  const handleNext = useCallback(() => {
    if (isAnimating || slides.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [slides.length, isAnimating]);

  useEffect(() => {
    if (slides.length === 0) return;
    timerRef.current = setInterval(handleNext, 7000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [handleNext, slides.length]);

  if (isLoading || slides.length === 0) return <ChairpersonSkeleton />;

  const currentSlide = slides[currentIndex];
  const nextSlide = slides[(currentIndex + 1) % slides.length];
  const thirdSlide = slides[(currentIndex + 2) % slides.length];

  return (
    <section className="relative w-full min-h-screen lg:h-screen bg-black overflow-hidden flex flex-col lg:flex-row">
      
      {/* BACKGROUND LAYER */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentSlide.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0 bg-cover bg-center grayscale blur-md"
          style={{ backgroundImage: `url(${currentSlide.bgImageUrl})` }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

      {/* LEFT CONTENT */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center pt-24 pb-12 lg:py-0 px-8 md:px-20 lg:pl-32 lg:pr-10 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-[110px] font-bold leading-[0.9] mb-4 text-white">
              {currentSlide.name}
            </h1>
            <h2 className="text-blue-400 text-xl lg:text-2xl font-bold mb-4 font-nepali">
              {currentSlide.nepaliName}
            </h2>
            <p className="text-zinc-500 text-[10px] lg:text-xs tracking-[0.4em] uppercase font-bold mb-6">
              {currentSlide.role}
            </p>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-zinc-300 text-base lg:text-lg leading-relaxed max-w-md mb-8 lg:mb-10"
            >
              {currentSlide.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RIGHT CONTENT: STACKED IMAGES */}
      <div className="w-full lg:w-1/2 relative h-[600px] lg:h-full flex items-end pb-10 lg:pb-16 px-10 lg:px-0">
        <div className="relative w-full h-full flex items-end overflow-visible">
          <AnimatePresence mode="popLayout">
            
            {/* 1. MAIN IMAGE - DRAGGABLE WITH HAND CURSOR */}
            <motion.div
              key={`main-${currentSlide.id}`}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -100) handleNext();
              }}
              initial={{ x: 100, opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -200, opacity: 0, scale: 0.8, rotate: -5 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 z-30 w-[280px] h-[400px] md:w-[350px] md:h-[500px] lg:w-[420px] lg:h-[580px] rounded-[2rem] lg:rounded-[3rem] border-[6px] lg:border-[10px] border-white shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing touch-none"
              onClick={handleNext}
            >
              <img 
                src={currentSlide.imageUrl} 
                className="w-full h-full object-cover pointer-events-none select-none" 
                alt="Main" 
                draggable={false}
              />
            </motion.div>

            {/* 2. SECOND IMAGE */}
            <motion.div
              key={`second-${nextSlide.id}`}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="absolute left-[180px] md:left-[280px] lg:left-[360px] z-20 w-[180px] h-[260px] md:w-[280px] md:h-[400px] lg:w-[320px] lg:h-[460px] rounded-[1.5rem] lg:rounded-[2.5rem] border-[4px] lg:border-[8px] border-white grayscale opacity-50 overflow-hidden hidden sm:block shadow-xl"
            >
              <img src={nextSlide.imageUrl} className="w-full h-full object-cover select-none" alt="Next" draggable={false} />
            </motion.div>

            {/* 3. THIRD IMAGE */}
            <motion.div
              key={`third-${thirdSlide.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="absolute left-[380px] md:left-[550px] lg:left-[640px] z-10 w-[140px] h-[200px] md:w-[220px] md:h-[320px] lg:w-[280px] lg:h-[400px] rounded-[1.5rem] lg:rounded-[2.5rem] border-[3px] lg:border-[6px] border-white grayscale overflow-hidden hidden lg:block shadow-lg"
            >
              <img src={thirdSlide.imageUrl} className="w-full h-full object-cover select-none" alt="Third" draggable={false} />
            </motion.div>

          </AnimatePresence>
        </div>
      </div>

      {/* FOOTER PAGER */}
      <footer className="absolute bottom-6 lg:bottom-10 left-8 md:left-20 lg:left-32 z-50 flex items-center gap-3">
        {slides.map((_, idx) => (
          <button key={idx} onClick={() => setCurrentIndex(idx)} className="group py-4">
            <div className={`h-[2px] transition-all duration-700 ease-in-out ${idx === currentIndex ? 'w-12 bg-blue-500' : 'w-4 bg-white/20 group-hover:bg-white/40'}`} />
          </button>
        ))}
      </footer>

    </section>
  );
};