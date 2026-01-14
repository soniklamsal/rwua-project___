'use client';

import React, { useEffect, useRef, useState } from 'react';
import { executeQuery } from '@/lib/wordpress/client';
import { SUCCESS_STORIES } from '@/lib/constants';

// Refined Query: Changed 'categoryName' to 'categorySlug' often works better in WPGraphQL
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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const wpData = await executeQuery(GET_SUCCESS_STORIES);
        
        // DEBUG: Check your console to see if data is returning
        console.log("WP Success Stories Raw Data:", wpData);

        if (wpData?.posts?.nodes && wpData.posts.nodes.length > 0) {
          const formattedStories = wpData.posts.nodes.map((post: any, index: number) => ({
            id: post.id || (index + 1).toString(),
            name: post.title,
            // Strip HTML and decode entities for the content
            content: post.excerpt 
              ? post.excerpt.replace(/<[^>]*>/g, '').replace(/&hellip;/g, '...').substring(0, 160) + '...' 
              : 'Discover the full impact of this journey...',
            category: post.categories?.nodes?.[0]?.name || 'Success Story',
            location: 'Global Impact', // Replace with post.acf.location if using ACF
            imageUrl: post.featuredImage?.node?.sourceUrl || null
          }));
          
          setStories(formattedStories);
        }
      } catch (error) {
        console.error('Error fetching Success Stories:', error);
        // Fallback is already set in state
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
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
            <div 
              key={story.id} 
              className={`bg-white rounded-none overflow-hidden ring-1 ring-stone-100 shadow-md hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 group flex flex-col h-full transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${(index + 2) * 200}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                {story.imageUrl ? (
                  <img 
                    src={story.imageUrl} 
                    alt={story.name}
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
            </div>
          ))}
        </div>

        {/* Dynamic Progress Bar based on Scroll */}
        <div className={`mt-24 flex items-center gap-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex-grow h-[2px] bg-stone-100 relative overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-vibrant-gold origin-left w-1/4"></div>
          </div>
          <button className="relative group px-10 py-4 overflow-hidden border border-deep-purple/20 bg-stone-50/50 hover:bg-deep-purple transition-all duration-500 shrink-0">
            <span className="relative z-10 text-deep-purple group-hover:text-vibrant-gold font-black text-xs tracking-[0.3em] uppercase">More Stories</span>
            <div className="absolute inset-0 bg-deep-purple translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
        </div>
      </div>
    </section>
  );
};