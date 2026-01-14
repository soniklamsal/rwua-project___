'use client';

import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

// GraphQL query to fetch WordPress posts
const GET_POSTS = gql`
  query GetPosts {
    posts(first: 50) {
      nodes {
        id
        title
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
          }
        }
      }
    }
  }
`;

export default function GalleryComponent() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedImage, setSelectedImage] = useState<any>(null);

    // Fetch WordPress posts
    const { loading, error, data } = useQuery(GET_POSTS, {
        errorPolicy: 'all',
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true
    });

    // Transform WordPress data
    const galleryImages = React.useMemo(() => {
        if (!data?.posts?.nodes) return [];

        return data.posts.nodes.map((post: any) => {
            // Clean HTML entities from title
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
                src: post.featuredImage?.node?.sourceUrl || '',
                alt: cleanText(post.title),
                title: cleanText(post.title),
                category: post.categories?.nodes?.[0]?.name || 'General',
                slug: post.slug
            };
        }).filter((img: any) => img.src); // Only include posts with images
    }, [data]);

    // Get unique categories for filter buttons
    const categories = React.useMemo(() => {
        const categorySet = new Set<string>(galleryImages.map((img: any) => img.category as string));
        const uniqueCategories: string[] = ['All', ...Array.from(categorySet)];
        return uniqueCategories;
    }, [galleryImages]);

    const filteredImages = selectedCategory === 'All'
        ? galleryImages
        : galleryImages.filter((img: any) => img.category === selectedCategory);

    // Function to open modal and block background scroll
    const openModal = (image: any) => {
        setSelectedImage(image);
        if (typeof window !== 'undefined') {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${window.scrollY}px`;
            document.body.style.width = '100%';
        }
    };

    // Function to close modal and restore background scroll
    const closeModal = () => {
        if (typeof window !== 'undefined') {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.overflow = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
        setSelectedImage(null);
    };

    // Loading state
    if (loading) {
        return (
            <div className="bg-white min-h-screen">
                <section className="py-24 bg-gray-50">
                    <div className="container mx-auto px-8 md:px-16 lg:px-24">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4" style={{ borderBottomColor: '#0100FA' }}></div>
                            <p className="text-gray-600">Loading gallery...</p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="bg-white min-h-screen">
                <section className="py-24 bg-gray-50">
                    <div className="container mx-auto px-8 md:px-16 lg:px-24">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Gallery</h2>
                            <p className="text-red-700 mb-4">{error.message}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-8 md:px-16 lg:px-24">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="w-12 h-[2px]" style={{ backgroundColor: '#FA0105' }}></div>
                            <span className="font-bold uppercase tracking-[0.3em] text-xs" style={{ color: '#FA0105' }}>
                                Our Impact
                            </span>
                            <div className="w-12 h-[2px]" style={{ backgroundColor: '#FA0105' }}></div>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6" style={{ color: '#0100FA' }}>
                            Gallery of <span className="italic font-serif" style={{ color: '#FA0105' }}>Change</span>
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                            Witness the transformative journey of rural communities through our comprehensive programs and initiatives.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg ${selectedCategory === category
                                    ? 'text-white'
                                    : 'bg-white text-black'
                                    }`}
                                style={{
                                    backgroundColor: selectedCategory === category ? '#0100FA' : 'white'
                                }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredImages.map((image: any) => (
                            <div
                                key={image.id}
                                className="group cursor-pointer"
                                onClick={() => openModal(image)}
                            >
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2" style={{ backgroundColor: '#f9f9fa', color: 'black' }}>
                                            {image.category}
                                        </span>
                                        <h3 className="text-lg font-bold">{image.title}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modal for Selected Image */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999] p-4"
                        onClick={closeModal}
                    >
                        <div className="relative max-w-[90vw] max-h-[90vh]">
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className="max-w-full max-h-full object-contain rounded-lg"
                            />
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}