'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { executeQuery } from '@/lib/wordpress/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. Interface Definition
interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: string;
}

// 2. Fallback Data (Fixes the ReferenceError)
const galleryImages: GalleryImage[] = [
  { id: 1, src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800', alt: 'Women empowerment workshop', title: 'Community Workshop', category: 'Education' },
  { id: 2, src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800', alt: 'Rural development project', title: 'Rural Development', category: 'Infrastructure' },
  { id: 3, src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800', alt: 'Healthcare initiative', title: 'Healthcare Program', category: 'Health' },
  { id: 4, src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800', alt: 'Agricultural training', title: 'Agricultural Training', category: 'Agriculture' },
  { id: 5, src: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800', alt: 'Skills development', title: 'Skills Development', category: 'Education' },
  { id: 6, src: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=800', alt: 'Community meeting', title: 'Community Meeting', category: 'Community' },
];

// 3. WordPress Query
const GET_GALLERY_DATA = `
  query GetGalleryData {
    galleryItems {
      nodes {
        id
        title
        galleryFields {
          galleryItems {
            title
            category
            image {
              node {
                sourceUrl
                mediaItemUrl
                altText
              }
            }
          }
        }
      }
    }
  }
`;

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [galleryData, setGalleryData] = useState<GalleryImage[]>(galleryImages);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Fetch WordPress Data
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const wpData = await executeQuery(GET_GALLERY_DATA);
        if (wpData?.galleryItems?.nodes?.[0]?.galleryFields?.galleryItems) {
          const wpGalleryItems = wpData.galleryItems.nodes[0].galleryFields.galleryItems
            .filter((item: any) => item?.image?.node?.sourceUrl || item?.image?.node?.mediaItemUrl)
            .map((item: any, index: number) => ({
              id: index + 1,
              src: item.image.node.sourceUrl || item.image.node.mediaItemUrl,
              alt: item.image.node.altText || item.title || 'Gallery image',
              title: item.title || `Gallery Item ${index + 1}`,
              category: Array.isArray(item.category) ? item.category[0] : (item.category || 'Community')
            }));
          setGalleryData(wpGalleryItems);
        }
      } catch (error) {
        console.error('WordPress Gallery fetch failed, using fallback data:', error);
      }
    };
    fetchGalleryData();
  }, []);

  // GSAP: Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-item", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [galleryData]);

  // GSAP: Category Filter "Pop" Animation
  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(".gallery-item", 
        { scale: 0.95, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: "back.out(1.2)" }
      );
    }
  }, [selectedCategory]);

  const filteredImages =
    selectedCategory === 'All' 
      ? galleryData.slice(0, 6) 
      : galleryData.filter((img: GalleryImage) => img.category === selectedCategory).slice(0, 6);

  const uniqueCategories = galleryData
    .map((item: GalleryImage) => item.category)
    .filter((category): category is string => typeof category === 'string' && category.length > 0)
    .map((category: string) => category.trim())
    .filter((category: string, index: number, array: string[]) => array.indexOf(category) === index);
  
  const dynamicCategories = ['All', ...uniqueCategories];
  const selectedImage = currentIndex !== null ? filteredImages[currentIndex] : null;

  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop() || 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNext = () => {
    if (currentIndex !== null) setCurrentIndex((currentIndex + 1) % filteredImages.length);
  };

  const handlePrev = () => {
    if (currentIndex !== null)
      setCurrentIndex((currentIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {dynamicCategories.map((category, index) => (
            <button
              key={`category-${index}-${category}`}
              onClick={() => { setSelectedCategory(category); setCurrentIndex(null); }}
              className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-impact-red text-white shadow-xl scale-105'
                  : 'bg-white text-gray-400 hover:text-impact-red hover:bg-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image: GalleryImage, idx: number) => (
            <div 
              key={image.id} 
              className="gallery-item group cursor-pointer" 
              onClick={() => setCurrentIndex(idx)}
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md group-hover:shadow-2xl transition-all duration-500">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                   <p className="text-white/70 text-[10px] uppercase tracking-widest font-bold mb-1">{image.category}</p>
                   <h3 className="text-white text-xl font-bold">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={() => setCurrentIndex(null)}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />

            {/* Controls */}
            <div className="absolute bottom-10 flex items-center gap-8 bg-white/10 backdrop-blur-md rounded-full px-8 py-4 border border-white/10">
              <button onClick={handlePrev} className="text-white hover:text-impact-red transition-colors"><ChevronLeft size={32} /></button>
              <button onClick={() => handleDownload(selectedImage.src)} className="text-white hover:text-impact-red transition-colors"><Download size={28} /></button>
              <button onClick={handleNext} className="text-white hover:text-impact-red transition-colors"><ChevronRight size={32} /></button>
            </div>

            <button
              onClick={() => setCurrentIndex(null)}
              className="absolute top-8 right-8 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-impact-red transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}