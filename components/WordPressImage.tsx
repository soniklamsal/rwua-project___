'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface WordPressImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  onError?: () => void;
  onLoad?: () => void;
}

export default function WordPressImage({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  fill, 
  priority = false,
  sizes,
  onError,
  onLoad
}: WordPressImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Reset state when src changes
  useEffect(() => {
    if (src !== imgSrc) {
      console.log(`🔄 WordPress Image: Source changed for "${alt}"`);
      console.log(`📍 New src: ${src}`);
      setImgSrc(src);
      setHasError(false);
      setIsLoading(true);
    }
  }, [src, alt, imgSrc]);

  const handleError = () => {
    console.log('❌ WordPress image failed to load:', imgSrc, 'for:', alt);
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  const handleLoad = () => {
    console.log('✅ WordPress image loaded successfully:', imgSrc, 'for:', alt);
    setHasError(false);
    setIsLoading(false);
    onLoad?.();
  };

  // Don't render anything if no src or error occurred
  if (!src || hasError) {
    return null;
  }

  // Determine if image should be unoptimized (for development)
  const shouldBeUnoptimized = process.env.NODE_ENV === 'development' || 
    imgSrc.includes('localhost') || 
    imgSrc.includes('practice_wordpress');

  const imageProps = {
    src: imgSrc,
    alt,
    className: `${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`,
    onError: handleError,
    onLoad: handleLoad,
    unoptimized: shouldBeUnoptimized,
    priority,
    ...(sizes && { sizes }),
  };

  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
      />
    );
  }

  return (
    <Image
      {...imageProps}
      width={width || 800}
      height={height || 400}
    />
  );
}
