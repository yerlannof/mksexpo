'use client';

import React from 'react';
import SkeletonLoader, { TitleSkeleton, TextSkeleton, CardSkeleton, ImageSkeleton } from '@/components/ui/SkeletonLoader';

interface SectionSkeletonProps {
  variant?: 'cards' | 'list' | 'content' | 'testimonials' | 'faq';
  cardCount?: number;
}

export default function SectionSkeleton({ variant = 'cards', cardCount = 3 }: SectionSkeletonProps) {
  return (
    <section className="section-padding px-4 sm:px-6 lg:px-8">
      <div className="container">
        {/* Header skeleton */}
        <div className="text-center mb-12 space-y-4">
          <TitleSkeleton className="h-10 w-96 mx-auto" />
          <TextSkeleton className="h-6 w-2/3 mx-auto" delay={100} />
        </div>

        {/* Content based on variant */}
        {variant === 'cards' && (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: cardCount }).map((_, index) => (
              <CardSkeleton 
                key={index} 
                className="h-80" 
                delay={200 + index * 100} 
              />
            ))}
          </div>
        )}

        {variant === 'list' && (
          <div className="max-w-3xl mx-auto space-y-6">
            {Array.from({ length: cardCount }).map((_, index) => (
              <div key={index} className="flex gap-6 items-start">
                <SkeletonLoader 
                  variant="avatar" 
                  className="w-16 h-16 flex-shrink-0" 
                  delay={200 + index * 100} 
                />
                <div className="flex-1 space-y-3">
                  <TitleSkeleton className="h-6 w-3/4" delay={250 + index * 100} />
                  <TextSkeleton count={2} delay={300 + index * 100} />
                </div>
              </div>
            ))}
          </div>
        )}

        {variant === 'content' && (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <TitleSkeleton className="h-8" delay={200} />
              <TextSkeleton count={3} delay={300} />
              <div className="flex gap-4">
                <SkeletonLoader variant="button" delay={400} />
                <SkeletonLoader variant="button" delay={500} />
              </div>
            </div>
            <ImageSkeleton className="h-96 rounded-2xl" delay={600} />
          </div>
        )}

        {variant === 'testimonials' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <SkeletonLoader 
                    variant="avatar" 
                    className="w-12 h-12" 
                    delay={200 + index * 100} 
                  />
                  <div className="flex-1 space-y-2">
                    <TextSkeleton className="h-4 w-3/4" delay={250 + index * 100} />
                    <TextSkeleton className="h-3 w-1/2" delay={300 + index * 100} />
                  </div>
                </div>
                <TextSkeleton count={3} delay={350 + index * 100} />
              </div>
            ))}
          </div>
        )}

        {variant === 'faq' && (
          <div className="max-w-3xl mx-auto space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonLoader 
                key={index}
                variant="card" 
                className="h-20" 
                animation="shimmer" 
                delay={200 + index * 100} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}