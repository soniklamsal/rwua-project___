'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { executeQuery } from '@/lib/wordpress/client';
import { NEWS_UPDATES } from '@/lib/constants';

// WordPress query remains the same
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
          }
        }
      }
    }
  }
`;

export const NewsUpdates: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [newsData, setNewsData] = useState<any[]>(NEWS_UPDATES.slice(0, 3)); 
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const wpData = await executeQuery(GET_LATEST_NEWS);
        if (wpData?.posts?.nodes && wpData.posts.nodes.length > 0) {
          const wpNews = wpData.posts.nodes.slice(0, 3).map((post: any, index: number) => ({
            id: post.id || (index + 1).toString(),
            title: post.title || `News Article ${index + 1}`,
            content: post.excerpt ? post.excerpt.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : 'Read more about this news update...',
            date: post.date ? new Date(post.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            }) : 'Recent',
            category: post.categories?.nodes?.[0]?.name || 'News',
            slug: post.slug || '',
            featuredImage: post.featuredImage?.node?.sourceUrl || null
          }));
          setNewsData(wpNews);
        }
      } catch (error) {
        console.error('Error fetching WordPress News data:', error);
      }
    };
    fetchNewsData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-32 bg-[#F9F8F6] relative overflow-hidden">
      {/* Decorative Background Element - Scaled for mobile */}
      <div className="absolute top-0 right-0 w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-terracotta opacity-[0.02] rounded-full blur-[80px] lg:blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-6 md:px-16 lg:px-24 relative z-10">
        
        {/* Header Section: Stacked on mobile, row on MD+ */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-20 gap-8">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="flex items-center gap-3 mb-4 lg:mb-6">
              <div className="w-6 lg:w-8 h-[2px] bg-vibrant-gold"></div>
              <h4 className="text-vibrant-gold font-black uppercase tracking-[0.4em] text-[8px] lg:text-[10px]">Latest Updates</h4>
            </div>
            <h2 className="text-4xl lg:text-6xl font-serif-impact text-core-blue leading-tight">
              Impact <span className="italic text-impact-red">Highlights</span>.
            </h2>
          </div>
          
          <Link 
            href="/news"
            className={`group flex items-center gap-3 lg:gap-4 text-deep-purple font-black text-[10px] lg:text-xs uppercase tracking-[0.3em] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <span className="border-b border-impact-red/20 group-hover:border-impact-red pb-1">All Vacancy & Press</span>
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-impact-red/10 flex items-center justify-center group-hover:bg-impact-red group-hover:text-white transition-all">
              <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {newsData.map((news, index) => (
            <Link
              key={news.id}
              href={news.slug ? `/post/${news.slug}` : '#'}
              className={`group relative bg-white ring-1 ring-stone-100 p-8 lg:p-14 flex flex-col h-full transition-all duration-700 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_-20px_rgba(76,29,149,0.12)] transform cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                // Remove offset on mobile (hidden below md breakpoint)
                marginTop: typeof window !== 'undefined' && window.innerWidth > 768 ? (index === 1 ? '2rem' : '0') : '0' 
              }}
            >
              <div className="absolute top-0 left-0 w-0 h-1 bg-vibrant-gold group-hover:w-full transition-all duration-700 ease-in-out"></div>
              
              {/* Featured Image - Responsive spacing */}
              {news.featuredImage && (
                <div className="mb-6 -mx-8 -mt-8 lg:-mx-14 lg:-mt-14 overflow-hidden">
                  <img 
                    src={news.featuredImage} 
                    alt={news.title}
                    loading="lazy"
                    className="w-full h-48 lg:h-56 object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                  />
                </div>
              )}
              
              <div className="flex justify-between items-start mb-6 lg:mb-10">
                <div className="flex flex-col">
                  <span className="text-[9px] lg:text-[10px] font-black uppercase text-stone-300 tracking-[0.3em] mb-1">Date</span>
                  <span className="text-xs lg:text-sm font-bold text-stone-500">{news.date}</span>
                </div>
                <div className="px-3 py-1 lg:px-4 lg:py-1.5 rounded-full border border-stone-100 bg-stone-50 text-impact-red text-[8px] lg:text-[9px] font-black uppercase tracking-widest group-hover:bg-impact-red group-hover:text-white group-hover:border-impact-red transition-all duration-500">
                  {news.category}
                </div>
              </div>

              <h3 className="text-xl lg:text-3xl font-bold text-deep-purple mb-4 lg:mb-8 leading-[1.3] font-nepali group-hover:text-terracotta transition-colors duration-500">
                {news.title}
              </h3>
              
              <p className="text-stone-500 mb-8 lg:mb-12 leading-relaxed text-sm lg:text-base flex-grow font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                {news.content}
              </p>

              <div className="pt-6 lg:pt-8 mt-auto border-t border-stone-50">
                <div className="inline-flex items-center gap-3 lg:gap-4 text-deep-purple font-black text-[10px] lg:text-xs uppercase tracking-[0.3em] group/link">
                  <span className="relative">
                    Read Story
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-terracotta transition-all duration-500 group-hover/link:w-full"></span>
                  </span>
                  <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg bg-stone-50 flex items-center justify-center group-hover/link:bg-terracotta group-hover/link:text-vibrant-gold transition-all">
                    <svg className="w-3 h-3 lg:w-4 lg:h-4 transform transition-transform duration-500 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute bottom-0 right-0 w-8 h-8 lg:w-12 lg:h-12 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 right-0 w-full h-full bg-vibrant-gold/5 transform rotate-45 translate-x-1/2 translate-y-1/2"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};