'use client';

import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import { Home } from 'lucide-react';
import TopSearch from './TopSearch';

// GraphQL query to fetch WordPress posts
const GET_POSTS = gql`
  query GetPosts {
    posts(first: 20, where: { 
      orderby: { field: DATE, order: DESC },
      status: PUBLISH
    }) {
      nodes {
        id
        title
        excerpt
        date
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

interface CategoryNewsPageProps {
    categorySlug: string;
    categoryName: string;
    pageTitle: string;
    pageDescription: string;
    breadcrumbTitle: string;
}

export default function CategoryNewsPageSimple({
    categorySlug,
    categoryName,
    pageTitle,
    pageDescription,
    breadcrumbTitle
}: CategoryNewsPageProps) {
    const [searchQuery, setSearchQuery] = React.useState('');

    // Fetch posts from WordPress using Apollo Client
    const { loading, error, data } = useQuery(GET_POSTS, {
        errorPolicy: 'all',
    });

    // Transform WordPress posts and filter by category OR show recent posts
    const newsArticles = React.useMemo(() => {
        if (!data?.posts?.nodes) {
            return [];
        }

        // Special handling for "recent-news" - show 6 most recent posts by date
        if (categorySlug === 'recent-news') {
            return data.posts.nodes
                .slice(0, 6) // Take only first 6 posts (already sorted by date DESC in query)
                .map((post: any) => ({
                    id: post.slug,
                    title: post.title,
                    excerpt: post.excerpt?.replace(/<[^>]*>/g, '') || '',
                    date: post.date,
                    slug: post.slug,
                    image: post.featuredImage?.node?.sourceUrl || '',
                    category: post.categories?.nodes?.[0]?.name || 'News'
                }));
        }

        // For other categories, filter by category
        return data.posts.nodes
            .filter((post: any) => {
                // Check if post has the matching category
                const postCategories = post.categories?.nodes || [];
                return postCategories.some((cat: any) =>
                    cat.slug === categorySlug || cat.name === categoryName
                );
            })
            .map((post: any) => ({
                id: post.slug,
                title: post.title,
                excerpt: post.excerpt?.replace(/<[^>]*>/g, '') || '',
                date: post.date,
                slug: post.slug,
                image: post.featuredImage?.node?.sourceUrl || '',
                category: post.categories?.nodes?.[0]?.name || 'News'
            }));
    }, [data, categorySlug, categoryName]);

    // Filter news based on search query - same as NewsPress
    const filteredNews = React.useMemo(() => {
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

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <div className="max-w-screen-lg mx-auto px-4 pt-32">
                    <div className="animate-pulse">
                        <div className="h-8 bg-stone-200 rounded w-64 mb-8"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100">
                                    <div className="h-32 bg-stone-200 rounded-t-lg"></div>
                                    <div className="p-4">
                                        <div className="h-4 bg-stone-200 rounded w-3/4 mb-2"></div>
                                        <div className="h-3 bg-stone-200 rounded w-full mb-2"></div>
                                        <div className="h-3 bg-stone-200 rounded w-2/3"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-white">
                <div className="max-w-screen-lg mx-auto px-4 pt-32">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading News</h2>
                        <p className="text-gray-600 mb-8">There was an error loading news from WordPress via Faust.js.</p>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
                            <p className="text-red-700 text-sm">{error.message || 'Unknown error occurred'}</p>
                            <details className="mt-2 text-xs text-red-600">
                                <summary className="cursor-pointer">Debug Info</summary>
                                <div className="mt-2 text-left">
                                    <p><strong>WordPress URL:</strong> {process.env.NEXT_PUBLIC_WORDPRESS_URL}</p>
                                    <p><strong>GraphQL Endpoint:</strong> {process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql</p>
                                    <p><strong>Using:</strong> Faust.js + Apollo Client</p>
                                </div>
                            </details>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/wp-status" className="inline-flex items-center text-[#0100FA] hover:text-white text-sm font-medium transition-all duration-300 hover:bg-[#0100FA] px-3 py-1.5 rounded-full border border-[#0100FA]/20 hover:border-[#0100FA] group hover:shadow-md cursor-pointer">
                                <span>Check WordPress Status</span>
                            </Link>
                            <button
                                onClick={() => window.location.reload()}
                                className="inline-flex items-center text-[#0100FA] hover:text-white text-sm font-medium transition-all duration-300 hover:bg-[#0100FA] px-3 py-1.5 rounded-full border border-[#0100FA]/20 hover:border-[#0100FA] group hover:shadow-md cursor-pointer"
                            >
                                <span>Retry</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
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
                            <Link href="/news" className="hover:text-purple-800">
                                News & Press
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-gray-600 font-medium">{breadcrumbTitle}</span>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <div className="max-w-screen-lg mx-auto px-4">
                {/* Page Header */}
                <div className="text-center py-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">{pageTitle}</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {pageDescription}
                    </p>
                </div>

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

                    {/* No posts message */}
                    {!loading && filteredNews.length === 0 && !searchQuery && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No articles found in "{categoryName}" category</p>
                            <p className="text-gray-400 text-sm mt-2">Please check back later for updates or ensure posts are assigned to this category in WordPress</p>
                        </div>
                    )}

                    {/* News Grid - Show ALL posts */}
                    {filteredNews.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredNews.map((news: any) => (
                                <div key={news.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group border border-gray-100">
                                    <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
                                        {news.image ? (
                                            <img
                                                src={news.image}
                                                alt={news.title}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <p className="text-white text-sm">No image</p>
                                            </div>
                                        )}
                                        <div className="absolute top-2 left-2">
                                            <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-xs font-medium">
                                                {news.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <h3 className="text-base font-bold text-gray-800 line-clamp-2 mb-2">
                                            {news.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                                            {news.excerpt.length > 80 ? news.excerpt.substring(0, 80) + '...' : news.excerpt}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center text-xs text-gray-500">
                                                <span>{news.date ? new Date(news.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recent'}</span>
                                            </div>
                                            <Link
                                                href={`/post/${encodeURIComponent(news.slug)}`}
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
                    )}
                </main>
            </div>

            <div className="pb-24"></div>
        </div>
    );
}