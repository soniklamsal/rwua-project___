'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { apolloClient } from '../../lib/wordpress/client';
import { gql } from '@apollo/client';
import { ShowcaseMember } from '../../lib/faust-types';
import { ORG_MEMBERS } from '../../lib/constants';

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
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const fetchShowcaseMembers = async () => {
      try {
        setIsLoading(true);
        const { data } = await apolloClient.query({ query: GET_ALL_SHOWCASE_MEMBERS, fetchPolicy: 'network-only' });
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
          setSlides(ORG_MEMBERS.map((m, i) => ({
            id: i.toString(),
            name: m.name,
            nepaliName: m.nepaliName,
            role: m.role,
            quote: typeof m.quote === 'string' ? m.quote : 'Leading community transformation.',
            phone: m.phone || '',
            description: typeof m.quote === 'string' ? m.quote : 'Leading community transformation.',
            imageUrl: m.imageUrl,
            bgImageUrl: m.imageUrl,
          })));
        }
      } catch (error) {
        setSlides(ORG_MEMBERS.map((m, i) => ({
          id: i.toString(),
          name: m.name,
          nepaliName: m.nepaliName,
          role: m.role,
          quote: typeof m.quote === 'string' ? m.quote : 'Leading community transformation.',
          phone: m.phone || '',
          description: typeof m.quote === 'string' ? m.quote : 'Leading community transformation.',
          imageUrl: m.imageUrl,
          bgImageUrl: m.imageUrl,
        })));
      } finally {
        setIsLoading(false);
      }
    };
    fetchShowcaseMembers();
  }, []);

  const handleNext = useCallback(() => {
    if (isAnimating || slides.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 800);
  }, [slides.length, isAnimating]);

  useEffect(() => {
    timerRef.current = window.setInterval(handleNext, 7000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [handleNext]);

  if (isLoading || slides.length === 0) return null;

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
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0 bg-cover bg-center grayscale"
          style={{ 
            backgroundImage: `url(${currentSlide.bgImageUrl})`,
            filter: 'blur(8px) grayscale(100%)'
          }}
        />
        <div className="absolute inset-0 z-0 bg-black/60" />
      </AnimatePresence>

      {/* LEFT CONTENT: TEXT (Repositioned for mobile) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center pt-24 pb-12 lg:py-0 px-8 md:px-20 lg:pl-32 lg:pr-10 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
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
            <p className="text-zinc-300 text-base lg:text-lg leading-relaxed max-w-md mb-8 lg:mb-10">
              {currentSlide.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RIGHT CONTENT: IMAGES (Repositioned for mobile stack) */}
      <div className="w-full lg:w-1/2 relative h-[500px] md:h-[600px] lg:h-full flex items-center overflow-visible px-8 lg:px-0">
        <div className="relative w-full h-full lg:h-[600px] flex items-center">
          
          <AnimatePresence mode="popLayout">
            {/* 1. MAIN IMAGE */}
            <motion.div
              key={`main-${currentSlide.id}`}
              layoutId="main"
              className="absolute left-0 lg:left-0 z-30 w-[280px] h-[400px] md:w-[350px] md:h-[500px] lg:w-[420px] lg:h-[580px] rounded-[2rem] lg:rounded-[3rem] border-[6px] lg:border-[10px] border-white shadow-2xl overflow-hidden cursor-pointer"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onClick={handleNext}
            >
              <img src={currentSlide.imageUrl} className="w-full h-full object-cover" alt="Main" />
            </motion.div>

            {/* 2. SECOND IMAGE (Hidden on small mobile, shown from md up) */}
            <motion.div
              key={`second-${nextSlide.id}`}
              className="absolute left-[220px] md:left-[300px] lg:left-[380px] z-20 w-[200px] h-[300px] md:w-[280px] md:h-[420px] lg:w-[320px] lg:h-[480px] rounded-[1.5rem] lg:rounded-[2.5rem] opacity-30 lg:opacity-50 grayscale overflow-hidden hidden sm:block"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 0.5, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img src={nextSlide.imageUrl} className="w-full h-full object-cover" alt="Second" />
            </motion.div>

            {/* 3. THIRD IMAGE (Desktop only) */}
            <motion.div
              key={`third-${thirdSlide.id}`}
              className="absolute left-[650px] z-10 w-[300px] h-[400px] rounded-[2.5rem] opacity-20 grayscale overflow-hidden hidden lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <img src={thirdSlide.imageUrl} className="w-full h-full object-cover" alt="Third" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* NAVIGATION FOOTER */}
      <footer className="absolute bottom-6 lg:bottom-10 left-8 md:left-20 lg:left-32 z-50 flex items-center gap-3 lg:gap-4">
        {slides.map((_, idx) => (
          <div key={idx} className={`h-[2px] transition-all duration-500 ${idx === currentIndex ? 'w-8 lg:w-12 bg-white' : 'w-3 lg:w-4 bg-white/20'}`} />
        ))}
        <span className="text-[9px] lg:text-[10px] font-bold text-white/40 ml-2 lg:ml-4">0{currentIndex + 1} / 0{slides.length}</span>
      </footer>

    </section>
  );
};