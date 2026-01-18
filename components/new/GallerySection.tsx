'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Download, X, Maximize2 } from 'lucide-react';
import { executeQuery } from '@/lib/wordpress/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: string;
}

const fallbackImages: GalleryImage[] = [
  { id: 1, src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800', alt: 'Women empowerment workshop', title: 'Community Workshop', category: 'Education' },
  { id: 2, src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800', alt: 'Rural development project', title: 'Rural Development', category: 'Infrastructure' },
];

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
  const [galleryData, setGalleryData] = useState<GalleryImage[]>(fallbackImages);
  
  const sectionRef = useRef<HTMLDivElement>(null);

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
        console.error('WordPress fetch failed:', error);
      }
    };
    fetchGalleryData();
  }, []);

  const filteredImages = selectedCategory === 'All' 
    ? galleryData.slice(0, 6) 
    : galleryData.filter(img => img.category === selectedCategory).slice(0, 6);

  // FIXED: Added strict null checks inside callbacks
  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex === null) return;
    setCurrentIndex((prev) => (prev !== null ? (prev + 1) % filteredImages.length : null));
  }, [filteredImages.length, currentIndex]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex === null) return;
    setCurrentIndex((prev) => (prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null));
  }, [filteredImages.length, currentIndex]);

  const selectedImage = currentIndex !== null ? filteredImages[currentIndex] : null;

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-center gap-2 mb-12">
          {['All', ...Array.from(new Set(galleryData.map(i => i.category)))].map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setCurrentIndex(null); }}
              className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                selectedCategory === cat ? 'bg-core-blue text-white' : 'bg-white text-black-400 border border-black-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, idx) => (
            <div 
              key={image.id} 
              className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer bg-white"
              onClick={() => setCurrentIndex(idx)}
            >
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 text-white">
                <p className="text-[10px] font-bold uppercase tracking-widest text-red-500">{image.category}</p>
                <h3 className="text-lg font-bold">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col overflow-hidden" onClick={() => setCurrentIndex(null)}>
          <div className="w-full h-20 flex justify-between items-center px-6 md:px-12 shrink-0 bg-black/50 z-50" onClick={e => e.stopPropagation()}>
            <div className="text-white">
               <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1">{selectedImage.category}</p>
               <h4 className="text-lg font-bold truncate max-w-[250px] md:max-w-md">{selectedImage.title}</h4>
            </div>
            <button onClick={() => setCurrentIndex(null)} className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-red-600 text-white rounded-full transition-all">
              <X size={24} />
            </button>
          </div>

          <div className="relative flex-grow flex items-center justify-center p-4 md:p-12 overflow-hidden">
            <button onClick={handlePrev} className="hidden md:flex absolute left-8 z-30 w-16 h-16 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all">
              <ChevronLeft size={32} />
            </button>

            <div className="w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                key={selectedImage.src}
                className="max-w-full max-h-full object-contain shadow-2xl animate-in fade-in zoom-in-95 duration-300"
              />
            </div>

            <button onClick={handleNext} className="hidden md:flex absolute right-8 z-30 w-16 h-16 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all">
              <ChevronRight size={32} />
            </button>
          </div>

          <div className="w-full h-24 flex items-center justify-center shrink-0 z-50 bg-black/50" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-6 bg-white/5 px-8 py-3 rounded-full border border-white/10 backdrop-blur-md">
              <button onClick={handlePrev} className="md:hidden text-white/60 hover:text-white"><ChevronLeft size={24} /></button>
              <a href={selectedImage.src} download className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <Download size={20} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Download</span>
              </a>
              <div className="h-4 w-px bg-white/10" />
              {/* FIXED: Added fallback for currentIndex during rendering */}
              <div className="text-white/40 font-mono text-xs tracking-widest">
                {String((currentIndex ?? 0) + 1).padStart(2, '0')} / {String(filteredImages.length).padStart(2, '0')}
              </div>
              <button onClick={handleNext} className="md:hidden text-white/60 hover:text-white"><ChevronRight size={24} /></button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
