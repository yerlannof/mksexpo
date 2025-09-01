'use client';

import React, { useState } from 'react';
import SchoolCardWithImage from '@/components/SchoolCardWithImage';
import LazyImage, { GalleryImage, HeroImage } from '@/components/ui/LazyImage';
import { motion } from 'framer-motion';

const schools = [
  {
    name: 'Saint-Charles International School',
    location: 'Porrentruy, Switzerland',
    type: 'Boarding School',
    students: '250',
    established: '1897',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop',
  },
  {
    name: 'Wellington College',
    location: 'Berkshire, UK',
    type: 'Co-educational',
    students: '1,100',
    established: '1859',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop',
  },
  {
    name: 'Phillips Academy',
    location: 'Andover, USA',
    type: 'Liberal Arts',
    students: '1,150',
    established: '1778',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
  },
  {
    name: 'Ridley College',
    location: 'Ontario, Canada',
    type: 'IB World School',
    students: '650',
    established: '1889',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
  },
];

const galleryImages = [
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=400&fit=crop',
];

export default function LazyLoadingDemo() {
  const [showCards, setShowCards] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-light">
      {/* Hero Section with Lazy Loaded Image */}
      <section className="relative h-screen">
        <HeroImage
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&h=1080&fit=crop"
          alt="Education Exhibition"
          fill
          sizes="100vw"
          className="brightness-50"
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-6 px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold"
            >
              Lazy Loading Demo
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl max-w-2xl mx-auto"
            >
              Scroll down to see images load progressively with beautiful transitions
            </motion.p>
          </div>
        </div>
      </section>

      {/* School Cards Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Schools</h2>
            <p className="text-xl text-white/80 mb-8">
              Each card loads its image independently as you scroll
            </p>
            
            <button
              onClick={() => setShowCards(!showCards)}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all"
            >
              {showCards ? 'Hide Cards' : 'Show Cards'}
            </button>
          </div>

          {showCards && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
            >
              {schools.map((school, index) => (
                <SchoolCardWithImage
                  key={school.name}
                  {...school}
                  delay={index}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Image Gallery</h2>
            <p className="text-xl text-white/80">
              Gallery images with hover effects and lazy loading
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GalleryImage
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  width={400}
                  height={400}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Large Content Images */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Content Images with Loading States
          </h2>

          <div className="space-y-12">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden">
              <div className="relative h-96">
                <LazyImage
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop"
                  alt="Students collaborating"
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Collaborative Learning</h3>
                <p className="text-white/80">
                  Experience world-class education in an environment that fosters creativity,
                  critical thinking, and global citizenship.
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden">
              <div className="relative h-96">
                <LazyImage
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=600&fit=crop"
                  alt="Campus life"
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Campus Life</h3>
                <p className="text-white/80">
                  Discover vibrant campus communities that offer a perfect balance of academic
                  excellence and extracurricular activities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">How This Works</h2>
          <div className="space-y-4 text-white/80">
            <p>
              This demo showcases the LazyImage component with different loading strategies:
            </p>
            <ul className="text-left space-y-2 max-w-2xl mx-auto">
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Hero images load immediately with priority flag</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Card images load when they come into viewport</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Skeleton loaders show while images are loading</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Images fade in smoothly when loaded</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Error states are handled gracefully</span>
              </li>
            </ul>
            <p className="mt-6">
              Try scrolling slowly to see the lazy loading in action, or throttle your
              network speed in DevTools to see the skeleton loaders more clearly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}