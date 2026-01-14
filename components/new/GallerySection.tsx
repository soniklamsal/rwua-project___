'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
    alt: 'Women empowerment workshop',
    title: 'Community Workshop',
    category: 'Education'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800',
    alt: 'Rural development project',
    title: 'Rural Development',
    category: 'Infrastructure'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
    alt: 'Healthcare initiative',
    title: 'Healthcare Program',
    category: 'Health'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    alt: 'Agricultural training',
    title: 'Agricultural Training',
    category: 'Agriculture'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800',
    alt: 'Skills development',
    title: 'Skills Development',
    category: 'Education'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=800',
    alt: 'Community meeting',
    title: 'Community Meeting',
    category: 'Community'
  }
];

const categories = ['All', 'Education', 'Health', 'Infrastructure', 'Agriculture', 'Community'];

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-orange-500"></div>
            <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-xs">
              Our Impact
            </span>
            <div className="w-12 h-[2px] bg-orange-500"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-purple-700 leading-tight mb-6">
            Gallery of <span className="text-orange-500 italic font-serif">Change</span>
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
              className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-purple-700 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-purple-100 hover:text-purple-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-3 py-1 bg-orange-500 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                    {image.category}
                  </span>
                  <h3 className="text-lg font-bold">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Gallery Button */}
        <div className="text-center mt-16">
          <a
            href="/gallery"
            className="inline-flex items-center gap-3 bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105"
          >
            <span>View Full Gallery</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Modal for Selected Image */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative aspect-[4/3]">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <span className="inline-block px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                {selectedImage.category}
              </span>
              <h3 className="text-2xl font-bold text-purple-700 mb-2">{selectedImage.title}</h3>
              <p className="text-gray-600">Click outside to close</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};