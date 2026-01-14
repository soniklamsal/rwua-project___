'use client';

import Image from 'next/image';
import { useState } from 'react';

interface SafeImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    fill?: boolean;
    fallbackIndex?: number; // Add index for different fallbacks
}

export default function SafeImage({ src, alt, width, height, className, fill, fallbackIndex = 0 }: SafeImageProps) {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    const fallbackImages = [
        '/images/success1.jpg',
        '/images/success2.jpg',
        '/images/vacancy1.jpeg',
        '/images/vacancy2.jpeg',
        '/images/vacancy3.jpg',
        'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop&auto=format', // Business meeting
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop&auto=format', // Team collaboration
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=400&fit=crop&auto=format', // Office space
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop&auto=format', // Handshake
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop&auto=format', // Technology
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&auto=format', // Community
        'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=400&fit=crop&auto=format', // Professional woman
        'https://via.placeholder.com/800x400/3b82f6/ffffff?text=News+Article' // Final fallback
    ];

    const handleError = () => {
        console.error('Image failed to load:', imgSrc);

        // If this is the original WordPress image, try fallback based on index
        if (imgSrc === src && !fallbackImages.includes(src)) {
            const fallbackImage = fallbackImages[fallbackIndex % fallbackImages.length];
            setImgSrc(fallbackImage);
            return;
        }

        // Try next fallback image
        const currentIndex = fallbackImages.indexOf(imgSrc);
        const nextIndex = currentIndex + 1;

        if (nextIndex < fallbackImages.length) {
            setImgSrc(fallbackImages[nextIndex]);
        } else {
            setHasError(true);
        }
    };

    const handleLoad = () => {
        setHasError(false);
    };

    if (hasError) {
        return (
            <div
                className={`bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center ${className}`}
                style={{ width: width, height: height }}
            >
                <div className="text-white text-center p-4">
                    <svg className="w-12 h-12 mx-auto mb-2 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs opacity-70">Image not available</p>
                </div>
            </div>
        );
    }

    if (fill) {
        return (
            <Image
                src={imgSrc}
                alt={alt}
                fill
                className={className}
                onError={handleError}
                onLoad={handleLoad}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
        );
    }

    return (
        <Image
            src={imgSrc}
            alt={alt}
            width={width || 800}
            height={height || 400}
            className={className}
            onError={handleError}
            onLoad={handleLoad}
        />
    );
}