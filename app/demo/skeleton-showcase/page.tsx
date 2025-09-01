'use client';

import React, { useState } from 'react';
import SkeletonLoader, {
  TextSkeleton,
  TitleSkeleton,
  CardSkeleton,
  ImageSkeleton,
  ButtonSkeleton,
  AvatarSkeleton,
  InputSkeleton,
} from '@/components/ui/SkeletonLoader';
import HeroSkeleton from '@/components/skeletons/HeroSkeleton';
import StatisticsSkeleton from '@/components/skeletons/StatisticsSkeleton';
import SectionSkeleton from '@/components/skeletons/SectionSkeleton';
import { motion } from 'framer-motion';

export default function SkeletonShowcase() {
  const [animation, setAnimation] = useState<'shimmer' | 'pulse' | 'wave'>('shimmer');

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-light py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Skeleton Loading Showcase
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Examples of all skeleton loading states in the application
          </p>
          
          {/* Animation selector */}
          <div className="flex justify-center gap-4 mb-8">
            {(['shimmer', 'pulse', 'wave'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setAnimation(type)}
                className={`px-6 py-2 rounded-lg transition-all ${
                  animation === type
                    ? 'bg-white text-primary'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Basic Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Basic Components</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Text Skeleton</h3>
              <TextSkeleton animation={animation} />
              <TextSkeleton animation={animation} className="mt-2 w-3/4" delay={100} />
              <TextSkeleton animation={animation} className="mt-2 w-1/2" delay={200} />
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Title Skeleton</h3>
              <TitleSkeleton animation={animation} />
              <TitleSkeleton animation={animation} className="mt-4 h-6" delay={100} />
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Button Skeleton</h3>
              <div className="flex gap-4">
                <ButtonSkeleton animation={animation} />
                <ButtonSkeleton animation={animation} className="w-24" delay={100} />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Avatar Skeleton</h3>
              <div className="flex gap-4">
                <AvatarSkeleton animation={animation} />
                <AvatarSkeleton animation={animation} className="w-16 h-16" delay={100} />
                <AvatarSkeleton animation={animation} className="w-20 h-20" delay={200} />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Input Skeleton</h3>
              <InputSkeleton animation={animation} />
              <InputSkeleton animation={animation} className="mt-4" delay={100} />
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Image Skeleton</h3>
              <ImageSkeleton animation={animation} className="h-32 rounded-lg" />
            </div>
          </div>
        </section>

        {/* Card Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Card Examples</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardSkeleton animation={animation} />
            <CardSkeleton animation={animation} className="h-72" delay={100} />
            <CardSkeleton animation={animation} className="h-96" delay={200} />
          </div>
        </section>

        {/* Multiple Items */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Multiple Items</h2>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Text Lines</h3>
            <TextSkeleton animation={animation} count={5} />
          </div>
        </section>

        {/* Section Skeletons */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Section Skeletons</h2>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Hero Section</h3>
              <div className="rounded-2xl overflow-hidden">
                <HeroSkeleton />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Statistics Section</h3>
              <div className="rounded-2xl overflow-hidden">
                <StatisticsSkeleton />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Cards Section</h3>
              <SectionSkeleton variant="cards" cardCount={3} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">List Section</h3>
              <SectionSkeleton variant="list" cardCount={3} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Content Section</h3>
              <SectionSkeleton variant="content" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Testimonials Section</h3>
              <SectionSkeleton variant="testimonials" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">FAQ Section</h3>
              <SectionSkeleton variant="faq" />
            </div>
          </div>
        </section>

        {/* Live Demo */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Live Demo - Toggle Loading</h2>
          <LiveDemo animation={animation} />
        </section>
      </div>
    </div>
  );
}

// Live demo component
function LiveDemo({ animation }: { animation: 'shimmer' | 'pulse' | 'wave' }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Content Loading Demo</h3>
        <button
          onClick={() => setLoading(!loading)}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all"
        >
          {loading ? 'Show Content' : 'Show Skeleton'}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {loading ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <AvatarSkeleton animation={animation} />
              <div className="flex-1">
                <TitleSkeleton animation={animation} className="h-6 w-48 mb-2" />
                <TextSkeleton animation={animation} className="w-32" />
              </div>
            </div>
            <TextSkeleton animation={animation} count={3} />
            <div className="flex gap-4 mt-6">
              <ButtonSkeleton animation={animation} />
              <ButtonSkeleton animation={animation} className="w-32" />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
              <div>
                <h4 className="text-lg font-semibold text-white">John Doe</h4>
                <p className="text-sm text-white/70">Product Designer</p>
              </div>
            </div>
            <p className="text-white/90">
              This is actual content that appears after loading. The skeleton provides a smooth
              transition and maintains the layout structure while data is being fetched.
            </p>
            <div className="flex gap-4 mt-6">
              <button className="px-6 py-2 bg-white text-primary rounded-lg">Primary</button>
              <button className="px-6 py-2 bg-white/20 text-white rounded-lg">Secondary</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}