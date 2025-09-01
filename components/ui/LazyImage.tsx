'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageSkeleton } from './SkeletonLoader';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 75,
  fill = false,
  sizes,
  placeholder,
  blurDataURL,
  onLoad,
  onError,
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  const containerClasses = cn(
    'relative overflow-hidden',
    className
  );

  const imageClasses = cn(
    'transition-all duration-500',
    isLoading ? 'scale-110 blur-sm' : 'scale-100 blur-0'
  );

  return (
    <div ref={imageRef} className={containerClasses}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-10"
          >
            <ImageSkeleton className="w-full h-full" />
          </motion.div>
        )}
      </AnimatePresence>

      {isInView && !hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          {fill ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              quality={quality}
              className={imageClasses}
              onLoad={handleLoad}
              onError={handleError}
              placeholder={placeholder}
              blurDataURL={blurDataURL}
              priority={priority}
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              quality={quality}
              className={imageClasses}
              onLoad={handleLoad}
              onError={handleError}
              placeholder={placeholder}
              blurDataURL={blurDataURL}
              priority={priority}
            />
          )}
        </motion.div>
      )}

      {hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm"
        >
          <div className="text-center p-4">
            <svg
              className="w-12 h-12 mx-auto mb-2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm text-gray-400">Failed to load image</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Export a gallery variant with different loading behavior
export function GalleryImage(props: LazyImageProps) {
  return (
    <LazyImage
      {...props}
      className={cn(
        'aspect-square rounded-xl overflow-hidden',
        'hover:scale-105 transition-transform duration-300',
        props.className
      )}
    />
  );
}

// Export a hero variant with priority loading
export function HeroImage(props: LazyImageProps) {
  return (
    <LazyImage
      {...props}
      priority
      quality={90}
      className={cn(
        'w-full h-full object-cover',
        props.className
      )}
    />
  );
}