'use client';

import React from 'react';
import SkeletonLoader, { TitleSkeleton, TextSkeleton, ButtonSkeleton } from '@/components/ui/SkeletonLoader';

export default function HeroSkeleton() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background skeleton */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light opacity-20" />
      
      <div className="container relative z-10 text-center space-y-8 py-20">
        {/* Title skeleton */}
        <div className="max-w-4xl mx-auto space-y-4">
          <TitleSkeleton className="h-12 w-3/4 mx-auto" />
          <TitleSkeleton className="h-10 w-2/3 mx-auto" delay={100} />
        </div>
        
        {/* Subtitle skeleton */}
        <div className="max-w-2xl mx-auto space-y-3">
          <TextSkeleton className="h-5 w-full" delay={200} />
          <TextSkeleton className="h-5 w-5/6 mx-auto" delay={300} />
        </div>
        
        {/* Date cards skeleton */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mt-12">
          <SkeletonLoader variant="card" className="h-48" animation="pulse" delay={400} />
          <SkeletonLoader variant="card" className="h-48" animation="pulse" delay={500} />
        </div>
        
        {/* CTA buttons skeleton */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <ButtonSkeleton className="w-48 h-14" delay={600} />
          <ButtonSkeleton className="w-48 h-14" delay={700} />
        </div>
      </div>
    </section>
  );
}