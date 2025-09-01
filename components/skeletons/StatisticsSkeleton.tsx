'use client';

import React from 'react';
import SkeletonLoader, { TitleSkeleton, TextSkeleton, CardSkeleton } from '@/components/ui/SkeletonLoader';

export default function StatisticsSkeleton() {
  return (
    <section className="section-padding relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="container relative z-10">
        {/* Header skeleton */}
        <div className="text-center mb-12 sm:mb-16 space-y-4">
          <TitleSkeleton className="h-12 w-96 mx-auto" />
          <TextSkeleton className="h-6 w-2/3 mx-auto" delay={100} />
        </div>

        {/* Countdown timer skeleton */}
        <div className="mb-12 sm:mb-16">
          <SkeletonLoader 
            variant="card" 
            className="h-32 max-w-2xl mx-auto" 
            animation="pulse" 
            delay={200} 
          />
        </div>

        {/* Exhibition cards skeleton */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
          <CardSkeleton className="h-64" delay={300} />
          <CardSkeleton className="h-64" delay={400} />
        </div>

        {/* Event stats skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[0, 1, 2, 3].map((index) => (
            <SkeletonLoader 
              key={index}
              variant="card" 
              className="h-40" 
              animation="shimmer" 
              delay={500 + index * 100} 
            />
          ))}
        </div>

        {/* Bottom banner skeleton */}
        <div className="mt-12 sm:mt-16">
          <SkeletonLoader 
            variant="card" 
            className="h-24" 
            animation="pulse" 
            delay={900} 
          />
        </div>
      </div>
    </section>
  );
}