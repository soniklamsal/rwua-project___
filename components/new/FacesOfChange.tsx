'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { executeQuery } from '@/lib/wordpress/client';
import { SUCCESS_STORIES } from '@/lib/constants';

const GET_SUCCESS_STORIES = `
  query GetSuccessStories {
    posts(first: 3, where: { categoryName: "success-story", orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        excerpt
        slug
        categories {
          nodes {
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

export const FacesOfChange: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [stories, setStories] = useState<any[]>(SUCCESS_STORIES);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0); // Tracks 0 to 1
  const sectionRef = useRef<HTMLElement>(null);

  // 1. Fetch Stories
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const wpData = await executeQuery(GET_SUCCESS_STORIES);
        if (wpData?.posts?.nodes && wpData.posts.nodes.length > 0) {
          const formattedStories = wpData.posts.nodes.map((post: any, index: number) => ({
            id: post.id || (index + 1).toString(),
            name: post.title,
            slug: post.slug,
            content: post.excerpt 
              ? post.excerpt.replace(/<[^>]*>/g, '').replace(/&hellip;/g, '...').substring(0, 160) + '...' 
              : 'Discover the full impact of this journey...',
            category: post.categories?.nodes?.[0]?.name || 'Success Story',
            location: 'Global Impact',
            imageUrl: post.featuredImage?.node?.sourceUrl || null
          }));
          setStories(formattedStories);
        }
      } catch (error) {
        console.error('Error fetching Success Stories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  // 2. Intersection Observer for Entry Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // 3. Scroll Listener for Progress Bar Fill
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the section has passed through the viewport
      // 0 = section just entered bottom, 1 = section leaving top
      const totalHeight = rect.height + windowHeight;
      const progress = 1 - (rect.bottom / totalHeight);
      
      // Clamp between 0 and 1
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-white overflow-hidden selection:bg-deep-purple selection:text-white relative">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
        
        <div className="mb-24 flex flex-col items-center text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-8 h-[2px] bg-terracotta/40"></div>
              <h4 className="text-terracotta font-black uppercase tracking-[0.4em] text-[10px]">Voices of Impact</h4>
              <div className="w-8 h-[2px] bg-terracotta/40"></div>
            </div>
            <h2 className="text-5xl lg:text-7xl font-serif-impact text-deep-purple leading-tight tracking-tighter">
              Real people. <span className="italic opacity-80 ml-2">Real stories.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {stories.map((story, index) => (
            <Link 
              key={story.id}
              href={`/post/${story.slug}`}
              className={`bg-white rounded-none overflow-hidden ring-1 ring-stone-100 shadow-md hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 group flex flex-col h-full transform cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${(index + 2) * 200}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                {story.imageUrl ? (
                  <img 
                    src={story.imageUrl} 
                    alt={story.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                  />
                ) : (
                  <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                    <span className="text-stone-300 text-[10px] font-black uppercase tracking-widest">No Image Found</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-white/90 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest px-3 py-1 text-deep-purple border border-deep-purple/10">
                    {story.category}
                  </span>
                </div>
              </div>

              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-deep-purple mb-6 leading-[1.15] group-hover:text-terracotta transition-colors duration-500">
                  {story.name}
                </h3>
                <p className="text-stone-600 text-lg leading-relaxed mb-10 flex-grow font-medium opacity-90">
                  {story.content}
                </p>
                
                <div className="pt-6 mt-auto border-t border-stone-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
                      LOCATION: {story.location}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-vibrant-gold scale-0 group-hover:scale-100 transition-transform"></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* --- FIXED PROGRESS BAR SECTION --- */}
        <div className={`mt-24 flex items-center gap-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex-grow h-[2px] bg-stone-100 relative overflow-hidden rounded-full">
            <div 
              className="absolute inset-0 bg-terracotta origin-left transition-transform duration-150 ease-out"
              style={{ transform: `scaleX(${scrollProgress})` }}
            ></div>
          </div>
          <Link 
            href="/success-story"
            className="relative group px-10 py-4 overflow-hidden border border-deep-purple/20 bg-stone-50/50 hover:bg-deep-purple transition-all duration-500 shrink-0 inline-block"
          >
            <span className="relative z-10 text-deep-purple group-hover:text-vibrant-gold font-black text-xs tracking-[0.3em] uppercase">More Stories</span>
            <div className="absolute inset-0 bg-deep-purple translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </Link>
        </div>
      </div>
    </section>
  );
};