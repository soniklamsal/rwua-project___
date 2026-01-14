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
    <section className="relative w-full h-screen bg-black overflow-hidden flex flex-col lg:flex-row">
      
      {/* BACKGROUND LAYER */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentSlide.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-0 bg-cover bg-center grayscale blur-md"
          style={{ backgroundImage: `url(${currentSlide.imageUrl})` }}
        />
      </AnimatePresence>

      {/* LEFT: TEXT (50%) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-10 md:px-20 lg:pl-32 lg:pr-10 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-7xl md:text-8xl lg:text-[110px] font-bold leading-[0.9] mb-4 text-white">
              {currentSlide.name}
            </h1>
            <h2 className="text-blue-400 text-2xl font-bold mb-4 font-nepali">
              {currentSlide.nepaliName}
            </h2>
            <p className="text-zinc-500 text-xs tracking-[0.4em] uppercase font-bold mb-6">
              {currentSlide.role}
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed max-w-md mb-10">
              {currentSlide.description}
            </p>
            {/* <button className="px-10 py-4 border border-white/20 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all">
              View Profile
            </button> */}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full lg:w-1/2 relative h-full flex items-center overflow-visible">
        <div className="relative w-full h-[600px] flex items-center">
          
          <AnimatePresence mode="popLayout">
            {/* 1. MAIN IMAGE (BIG) */}
            <motion.div
              key={`main-${currentSlide.id}`}
              layoutId="main"
              className="absolute left-0 z-30 w-[420px] h-[580px] rounded-[3rem] border-[10px] border-white shadow-2xl overflow-hidden cursor-pointer"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onClick={handleNext}
            >
              <img src={currentSlide.imageUrl} className="w-full h-full object-cover" alt="Main" />
            </motion.div>

            {/* 2. SECOND IMAGE (SMALLER) */}
            <motion.div
              key={`second-${nextSlide.id}`}
              className="absolute left-[380px] z-20 w-[320px] h-[480px] rounded-[2.5rem] opacity-50 grayscale overflow-hidden hidden md:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 0.5, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img src={nextSlide.imageUrl} className="w-full h-full object-cover" alt="Second" />
            </motion.div>

            {/* 3. THIRD IMAGE (HALF OFF-SCREEN) */}
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
      <footer className="absolute bottom-10 left-10 md:left-20 lg:left-32 z-50 flex items-center gap-4">
        {slides.map((_, idx) => (
          <div key={idx} className={`h-[2px] transition-all duration-500 ${idx === currentIndex ? 'w-12 bg-white' : 'w-4 bg-white/20'}`} />
        ))}
        <span className="text-[10px] font-bold text-white/40 ml-4">0{currentIndex + 1} / 0{slides.length}</span>
      </footer>

    </section>
  );
};