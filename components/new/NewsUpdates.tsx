'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { executeQuery } from '@/lib/wordpress/client';

// --- SKELETON COMPONENT ---
const NewsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
    {[1, 2, 3].map((i) => (
      <div 
        key={i} 
        className="bg-white ring-1 ring-stone-100 p-8 lg:p-14 flex flex-col h-full animate-pulse"
      >
        <div className="mb-6 -mx-8 -mt-8 lg:-mx-14 lg:-mt-14 h-48 lg:h-56 bg-stone-100" />
        <div className="flex justify-between items-start mb-10">
          <div className="space-y-2">
            <div className="h-2 w-12 bg-stone-100 rounded" />
            <div className="h-3 w-20 bg-stone-100 rounded" />
          </div>
          <div className="h-6 w-16 bg-stone-50 rounded-full" />
        </div>
        <div className="h-8 w-full bg-stone-100 rounded mb-4" />
        <div className="h-8 w-3/4 bg-stone-100 rounded mb-8" />
        <div className="space-y-3 flex-grow">
          <div className="h-3 w-full bg-stone-50 rounded" />
          <div className="h-3 w-full bg-stone-50 rounded" />
          <div className="h-3 w-2/3 bg-stone-50 rounded" />
        </div>
        <div className="pt-8 mt-auto border-t border-stone-50 flex gap-4">
          <div className="h-4 w-24 bg-stone-100 rounded" />
          <div className="h-8 w-8 bg-stone-100 rounded-lg" />
        </div>
      </div>
    ))}
  </div>
);

const GET_LATEST_NEWS = `
  query GetLatestNews {
    posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        date
        excerpt
        slug
        categories {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export const NewsUpdates: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [newsData, setNewsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const wpData = await executeQuery(GET_LATEST_NEWS);
        if (wpData?.posts?.nodes) {
          const wpNews = wpData.posts.nodes.map((post: any) => ({
            id: post.id,
            title: post.title,
            content: post.excerpt?.replace(/<[^>]*>/g, '').substring(0, 120) + '...',
            date: new Date(post.date).toLocaleDateString('en-US', { 
              year: 'numeric', month: 'short', day: 'numeric' 
            }),
            category: post.categories?.nodes?.[0]?.name || 'News',
            slug: post.slug,
            featuredImage: post.featuredImage?.node?.sourceUrl,
            altText: post.featuredImage?.node?.altText
          }));
          setNewsData(wpNews);
        }
      } catch (error) {
        console.error('Error fetching News:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewsData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-32 bg-[#F9F8F6] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-terracotta opacity-[0.02] rounded-full blur-[80px] lg:blur-[120px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-6 md:px-16 lg:px-24 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-20 gap-8">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-vibrant-gold"></div>
              <h4 className="text-vibrant-gold font-black uppercase tracking-[0.4em] text-[10px]">Latest Updates</h4>
            </div>
            <h2 className="text-4xl lg:text-6xl font-serif-impact text-core-blue leading-tight">
              Impact <span className="italic text-impact-red">Highlights</span>.
            </h2>
          </div>
          
          <Link href="/news" className={`group flex items-center gap-4 text-core-blue font-black text-xs uppercase tracking-[0.3em] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="border-b border-impact-red/20 group-hover:border-impact-red pb-1">All Vacancy & Press</span>
            <div className="w-10 h-10 rounded-full border border-impact-red/10 flex items-center justify-center group-hover:bg-impact-red group-hover:text-white transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
          </Link>
        </div>

        {/* Dynamic Content: Skeleton or Grid */}
        {loading ? (
          <NewsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {newsData.map((news, index) => (
              <Link
                key={news.id}
                href={`/post/${news.slug}`}
                className={`group relative bg-white ring-1 ring-stone-100 p-8 lg:p-14 flex flex-col h-full transition-all duration-700 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_40px_80px_-20px_rgba(76,29,149,0.12)] transform cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="absolute top-0 left-0 w-0 h-1 bg-vibrant-gold group-hover:w-full transition-all duration-700" />
                
                {news.featuredImage && (
                  <div className="relative mb-6 -mx-8 -mt-8 lg:-mx-14 lg:-mt-14 overflow-hidden h-48 lg:h-56">
                    <Image 
                      src={news.featuredImage} 
                      alt={news.altText || news.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-6 lg:mb-10">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-stone-300 tracking-[0.3em]">Date</span>
                    <span className="text-sm font-bold text-stone-500">{news.date}</span>
                  </div>
                  <div className="px-4 py-1.5 rounded-full border border-stone-100 bg-stone-50 text-impact-red text-[9px] font-black uppercase tracking-widest group-hover:bg-impact-red group-hover:text-white transition-all">
                    {news.category}
                  </div>
                </div>

                <h3 className="text-xl lg:text-3xl font-bold text-core-blue mb-4 lg:mb-8 leading-[1.3] font-nepali group-hover:text-terracotta transition-colors">
                  {news.title}
                </h3>
                
                <p className="text-stone-500 mb-8 lg:mb-12 leading-relaxed text-sm lg:text-base flex-grow opacity-80">
                  {news.content}
                </p>

                <div className="pt-8 mt-auto border-t border-stone-50">
                  <div className="inline-flex items-center gap-4 text-core-blue font-black text-xs uppercase tracking-[0.3em] group/link">
                    <span className="relative">
                      Read Story
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-terracotta transition-all group-hover/link:w-full" />
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-stone-50 flex items-center justify-center group-hover/link:bg-terracotta group-hover/link:text-vibrant-gold transition-all">
                      <svg className="w-4 h-4 transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};