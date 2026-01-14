'use client';

import { useState, useMemo } from 'react';
import React from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';
import TopSearch from './TopSearch';
import { useQuery, gql } from '@apollo/client';

// GraphQL query to fetch WordPress posts
const GET_POSTS = gql`
  query GetPosts {
    posts(first: 50) {
      nodes {
        id
        title
        content
        excerpt
        date
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`;

export default function NewsPressPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleGroups, setVisibleGroups] = useState(2); // Show 2 groups initially (Latest + Popular)

  // Fetch WordPress posts
  const { loading, error, data } = useQuery(GET_POSTS, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network', // Always fetch fresh data
    notifyOnNetworkStatusChange: true
  });

  // Transform WordPress data to match the expected format
  const newsArticles = useMemo(() => {
    if (!data?.posts?.nodes) return [];

    return data.posts.nodes.map((post: any) => {
      // Clean HTML entities from text
      const cleanText = (text: string) => {
        if (!text) return '';
        return text
          .replace(/<[^>]*>/g, '') // Remove HTML tags
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&hellip;/g, '...')
          .replace(/\s+/g, ' ')
          .trim();
      };

      return {
        id: post.id,
        title: cleanText(post.title),
        excerpt: cleanText(post.excerpt) || '',
        cleanContent: cleanText(post.content) || '',
        image: post.featuredImage?.node?.sourceUrl || '/placeholder-image.jpg',
        category: post.categories?.nodes?.[0]?.name || 'News',
        date: post.date,
        slug: post.slug,
        author: post.author?.node?.name || 'RWUA Team'
      };
    });
  }, [data]);

  // Filter news based on search query
  const filteredNews = useMemo(() => {
    if (!searchQuery.trim()) {
      return newsArticles;
    }

    const query = searchQuery.toLowerCase();
    return newsArticles.filter((news: any) =>
      news.title.toLowerCase().includes(query) ||
      news.excerpt.toLowerCase().includes(query) ||
      news.category.toLowerCase().includes(query)
    );
  }, [searchQuery, newsArticles]);

  // Reset visible groups when search query changes
  React.useEffect(() => {
    setVisibleGroups(2);
  }, [searchQuery]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 py-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading news articles...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 py-32">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading News</h2>
            <p className="text-red-700 mb-4">{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No articles found
  if (!newsArticles || newsArticles.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 py-32">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">No Articles Found</h2>
            <p className="text-gray-500">Please check back later for new content.</p>
          </div>
        </div>
      </div>
    );
  }

  // Get featured article
  const featuredArticle = filteredNews[0];

  // Get other articles (excluding featured)
  const otherArticles = filteredNews.filter((news: any) => news.id !== featuredArticle?.id);
  const subMainPosts = otherArticles.slice(0, 2);

  // Calculate groups for load more functionality
  const remainingArticles = otherArticles.slice(2); // Skip the first 2 (subMainPosts)
  const latestNews = remainingArticles.slice(0, 3); // First 3 articles
  const popularNews = remainingArticles.slice(3, 6); // Next 3 articles

  // For load more - start from index 6 (after popular news)
  const articlesAfterPopular = remainingArticles.slice(6);
  const visibleAfterPopular = articlesAfterPopular.slice(0, (visibleGroups - 2) * 3);
  const hasMoreArticles = articlesAfterPopular.length > visibleAfterPopular.length;

  return (
    <div className="min-h-screen" style={{
      backgroundColor: '#ffffff'
    }}>
      {/* Breadcrumb Section */}
      <section className="py-4 px-0 pt-[15px]" style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
      }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-end">
            <nav className="flex items-center text-sm text-gray-600 font-sans">
              <Link href="/" className="hover:text-purple-800 flex items-center">
                <Home className="w-4 h-4 mr-1" />
                मुख्य पृष्ठ
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-600 font-medium">News & Press</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <div className="max-w-screen-lg mx-auto px-4">
        {/* Search Section */}
        <TopSearch onSearch={setSearchQuery} />

        <main className="mt-12">
          {/* Show search results count */}
          {searchQuery && (
            <div className="mb-6 text-gray-600">
              <p className="text-sm">
                Showing {filteredNews.length} result{filteredNews.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
            </div>
          )}

          {/* No results message */}
          {searchQuery && filteredNews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found for "{searchQuery}"</p>
              <p className="text-gray-400 text-sm mt-2">Try searching with different keywords</p>
            </div>
          )}

          {/* Featured Section */}
          {featuredArticle && (
            <div className="flex flex-wrap md:flex-nowrap space-x-0 md:space-x-6 mb-16">
              {/* Main Post */}
              <div className="mb-4 lg:mb-0 p-4 lg:p-0 w-full md:w-4/7 relative rounded block cursor-pointer">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="rounded-md object-cover w-full h-64 hover:scale-105 transition-transform duration-300"
                />
                <span className="text-green-700 text-sm hidden md:block mt-4">{featuredArticle.category}</span>
                <h1 className="text-gray-800 text-4xl font-bold mt-2 mb-2 leading-tight cursor-pointer hover:text-[#0100FA] transition-colors duration-200">
                  <Link href={`/post/${encodeURIComponent(featuredArticle.slug)}`} className="hover:text-[#0100FA] transition-colors duration-200">
                    {featuredArticle.title}
                  </Link>
                </h1>
                <p className="text-gray-600 mb-4">
                  {featuredArticle.cleanContent.length > 200
                    ? featuredArticle.cleanContent.substring(0, 200) + '...'
                    : featuredArticle.cleanContent || featuredArticle.excerpt}
                </p>
                <Link href={`/post/${encodeURIComponent(featuredArticle.slug)}`}
                  className="inline-flex items-center text-[#0100FA] hover:text-white text-sm font-medium transition-all duration-300 hover:bg-[#0100FA] px-3 py-1.5 rounded-full border border-[#0100FA]/20 hover:border-[#0100FA] group hover:shadow-md cursor-pointer">
                  <span>Read More</span>
                  <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Sub-main Posts - Using Success Story Card Design */}
              <div className="w-full md:w-4/7">
                <div className="grid grid-cols-1 gap-4">
                  {subMainPosts.map((post: any) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group border border-gray-100">
                      {/* Image Section - Smaller */}
                      <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Category Badge */}
                        <div className="absolute top-2 left-2">
                          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-xs font-medium">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      {/* Content Section - More compact */}
                      <div className="p-3">
                        {/* Header */}
                        <h3 className="text-base font-bold text-gray-800 line-clamp-2 mb-2">
                          {post.title}
                        </h3>
                        {/* Description - Much shorter */}
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                          {post.excerpt.length > 80 ? post.excerpt.substring(0, 80) + '...' : post.excerpt}
                        </p>
                        {/* Footer - Inline Read More */}
                        <div className="flex justify-between items-center">
                          {/* Date */}
                          <div className="flex items-center text-xs text-gray-500">
                            <span>{post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recent'}</span>
                          </div>
                          {/* Read More Button - Better design */}
                          <Link
                            href={`/post/${encodeURIComponent(post.slug)}`}
                            className="inline-flex items-center text-[#0100FA] hover:text-white text-sm font-medium transition-all duration-300 hover:bg-[#0100FA] px-3 py-1.5 rounded-full border border-[#0100FA]/20 hover:border-[#0100FA] group hover:shadow-md cursor-pointer"
                          >
                            <span>Read More</span>
                            <svg className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Latest News Section - Using Success Story Card Design */}
          {latestNews.length > 0 && (
            <>
              <div className="flex mt-16 mb-4 px-4 lg:px-0 items-center justify-between">
                <h2 className="font-bold text-3xl text-gray-800 cursor-pointer hover:text-[#0100FA] transition-colors duration-200">
                  Latest News
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestNews.map((news: any) => (
                  <div key={news.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group border border-gray-100">
                    {/* Image Section - Smaller */}
                    <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Category Badge */}
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-xs font-medium">
                          {news.category}
                        </span>
                      </div>
                    </div>
                    {/* Content Section - More compact */}
                    <div className="p-3">
                      {/* Header */}
                      <h3 className="text-base font-bold text-gray-800 line-clamp-2 mb-2">
                        {news.title}
                      </h3>
                      {/* Description - Much shorter */}
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                        {news.excerpt.length > 80 ? news.excerpt.substring(0, 80) + '...' : news.excerpt}
                      </p>
                      {/* Footer - Inline Read More */}
                      <div className="flex justify-between items-center">
                        {/* Date */}
                        <div className="flex items-center text-xs text-gray-500">
                          <span>{news.date ? new Date(news.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recent'}</span>
                        </div>
                        {/* Read More Button - Better design */}
                        <Link
                          href={`/post/${encodeURIComponent(news.slug)}`}
                          className="inline-flex items-center text-[#0100FA] hover:text-white  text-sm font-medium transition-all duration-300 hover:bg-[#0100FA] px-3 py-1.5 rounded-full border border-[#0100FA]/20 hover:border-[#0100FA] group hover:shadow-md cursor-pointer"
                        >
                          <span>Read More</span>
                          <svg className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Newsletter Subscribe Section - Between Latest News and Popular News */}
          <div className="rounded-lg flex md:shadow-lg mt-12 border border-gray-100 overflow-hidden" style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <img
              src="https://rwua.com.np/wp-content/uploads/2021/10/1.jpg"
              alt="Newsletter"
              className="w-0 md:w-1/4 object-cover"
            />
            <div className="px-6 py-6 flex-1">
              <h3 className="text-3xl text-gray-800 font-bold mb-2">समाचार सदस्यता लिनुहोस्</h3>
              <p className="text-lg text-gray-600 mb-6">हामी हरेक हप्ता नवीनतम समाचार र पोस्टहरू पठाउँछौं</p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  className="flex-1 rounded-lg bg-gray-50 px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:bg-white focus:ring-indigo-200 focus:border-indigo-400 text-gray-900"
                  placeholder="your@email.com"
                />
                <button className="inline-flex items-center text-[#0100FA] hover:text-white text-sm font-medium transition-all duration-300 hover:bg-[#0100FA] px-3 py-1.5 rounded-full border border-[#0100FA]/20 hover:border-[#0100FA] group hover:shadow-md cursor-pointer">
                  <span>Subscribe</span>
                  <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
              <p className="text-green-700 opacity-70 text-sm mt-3">No spam. We promise</p>
            </div>
          </div>

          {/* Popular News Section - Using Success Story Card Design */}
          {popularNews.length > 0 && (
            <>
              <div className="flex mt-16 mb-4 px-4 lg:px-0 items-center justify-between">
                <h2 className="font-bold text-3xl text-gray-800 cursor-pointer hover:text-[#0100FA] transition-colors duration-200">
                  Popular News
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {popularNews.map((news: any) => (
                  <div key={news.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group border border-gray-100">
                    {/* Image Section - Smaller */}
                    <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Category Badge */}
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-xs font-medium">
                          {news.category}
                        </span>
                      </div>
                    </div>
                    {/* Content Section - More compact */}
                    <div className="p-3">
                      {/* Header */}
                      <h3 className="text-base font-bold text-gray-800 line-clamp-2 mb-2">
                        {news.title}
                      </h3>
                      {/* Description - Much shorter */}
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                        {news.excerpt.length > 80 ? news.excerpt.substring(0, 80) + '...' : news.excerpt}
                      </p>
                      {/* Footer - Inline Read More */}
                      <div className="flex justify-between items-center">
                        {/* Date */}
                        <div className="flex items-center text-xs text-gray-500">
                          <span>{news.date ? new Date(news.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recent'}</span>
                        </div>
                        {/* Read More Button - Better design */}
                        <Link
                          href={`/post/${encodeURIComponent(news.slug)}`}
                          className="inline-flex items-center text-[#0100FA] hover:text-white  text-sm font-medium transition-all duration-300 hover:bg-[#0100FA] px-3 py-1.5 rounded-full border border-[#0100FA]/20 hover:border-[#0100FA] group hover:shadow-md cursor-pointer"
                        >
                          <span>Read More</span>
                          <svg className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Additional News Sections for Load More */}
          {visibleAfterPopular.length > 0 && (
            <>
              {Array.from({ length: Math.ceil(visibleAfterPopular.length / 3) }, (_, groupIndex) => {
                const startIndex = groupIndex * 3;
                const groupNews = visibleAfterPopular.slice(startIndex, startIndex + 3);

                return (
                  <div key={`additional-${groupIndex}`}>
                    <div className="flex mt-16 mb-4 px-4 lg:px-0 items-center justify-between">
                      <h2 className="font-bold text-3xl text-gray-800 cursor-pointer hover:text-[#0100FA] transition-colors duration-200">
                        More News
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {groupNews.map((news: any) => (
                        <div key={news.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group border border-gray-100">
                          {/* Image Section - Smaller */}
                          <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
                            <img
                              src={news.image}
                              alt={news.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {/* Category Badge */}
                            <div className="absolute top-2 left-2">
                              <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-xs font-medium">
                                {news.category}
                              </span>
                            </div>
                          </div>
                          {/* Content Section - More compact */}
                          <div className="p-3">
                            {/* Header */}
                            <h3 className="text-base font-bold text-gray-800 line-clamp-2 mb-2">
                              {news.title}
                            </h3>
                            {/* Description - Much shorter */}
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                              {news.excerpt.length > 80 ? news.excerpt.substring(0, 80) + '...' : news.excerpt}
                            </p>
                            {/* Footer - Inline Read More */}
                            <div className="flex justify-between items-center">
                              {/* Date */}
                              <div className="flex items-center text-xs text-gray-500">
                                <span>{news.date ? new Date(news.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recent'}</span>
                              </div>
                              {/* Read More Button - Better design */}
                              <Link
                                href={`/post/${encodeURIComponent(news.slug)}`}
                                className="inline-flex items-center text-[#0100FA] hover:text-white  text-sm font-medium transition-all duration-300 hover:bg-[#0100FA] px-3 py-1.5 rounded-full border border-[#0100FA]/20 hover:border-[#0100FA] group hover:shadow-md cursor-pointer"
                              >
                                <span>Read More</span>
                                <svg className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* Load More Button */}
          {hasMoreArticles && (
            <div className="flex justify-center mt-12 mb-8">
              <button
                onClick={() => setVisibleGroups(prev => prev + 1)}
                className="group relative px-12 py-5 bg-[#0100FA] text-white font-bold text-sm uppercase tracking-wider overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_-10px_rgba(1,0,250,0.4)] transform hover:-translate-y-1 rounded-full"
              >
                <span className="relative z-10 flex items-center gap-4">
                  Load More News
                  <svg className="w-5 h-5 transform transition-transform duration-500 group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
              </button>
            </div>
          )}
        </main>
      </div>
      <div className="pb-24"></div>
    </div>
  );
}
