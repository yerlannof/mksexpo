'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import PageLoader from '@/components/ui/PageLoader';
import HeroSkeleton from '@/components/skeletons/HeroSkeleton';
import SectionSkeleton from '@/components/skeletons/SectionSkeleton';
import SectionDivider from '@/components/ui/SectionDivider';

// Dynamically import sections with loading states
const HeroNew = dynamic(() => import('@/components/sections/HeroNew'), {
  loading: () => <HeroSkeleton />,
});

const Opportunities = dynamic(() => import('@/components/sections/Opportunities'), {
  loading: () => <SectionSkeleton variant="content" />,
});

const Timeline = dynamic(() => import('@/components/sections/Timeline'), {
  loading: () => <SectionSkeleton variant="list" cardCount={4} />,
});

const Participants = dynamic(() => import('@/components/sections/Participants'), {
  loading: () => <SectionSkeleton variant="cards" cardCount={6} />,
});

const Programs = dynamic(() => import('@/components/sections/Programs'), {
  loading: () => <SectionSkeleton variant="cards" cardCount={5} />,
});

const Registration = dynamic(() => import('@/components/sections/Registration'), {
  loading: () => <SectionSkeleton variant="content" />,
});

const FAQ = dynamic(() => import('@/components/sections/FAQ'), {
  loading: () => <SectionSkeleton variant="faq" />,
});

const Contact = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <SectionSkeleton variant="content" />,
});

const PhotoGallery = dynamic(() => import('@/components/sections/PhotoGallery'), {
  loading: () => <SectionSkeleton variant="content" />,
});

const YouTubeSection = dynamic(() => import('@/components/sections/YouTubeSection'), {
  loading: () => <SectionSkeleton variant="content" />,
});

interface SectionState {
  id: string;
  isLoaded: boolean;
  isVisible: boolean;
  component: React.ComponentType;
  skeleton: React.ReactElement;
}

export default function HomePageWrapper() {
  const [pageLoading, setPageLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [sections, setSections] = useState<SectionState[]>([
    { id: 'hero', isLoaded: false, isVisible: true, component: HeroNew, skeleton: <HeroSkeleton /> },
    { id: 'opportunities', isLoaded: false, isVisible: false, component: Opportunities, skeleton: <SectionSkeleton variant="content" /> },
    { id: 'programs', isLoaded: false, isVisible: false, component: Programs, skeleton: <SectionSkeleton variant="cards" cardCount={5} /> },
    { id: 'participants', isLoaded: false, isVisible: false, component: Participants, skeleton: <SectionSkeleton variant="cards" cardCount={6} /> },
    { id: 'faq', isLoaded: false, isVisible: false, component: FAQ, skeleton: <SectionSkeleton variant="faq" /> },
    { id: 'youtube', isLoaded: false, isVisible: false, component: YouTubeSection, skeleton: <SectionSkeleton variant="content" /> },
    { id: 'registration', isLoaded: false, isVisible: false, component: Registration, skeleton: <SectionSkeleton variant="content" /> },
  ]);

  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initial page load simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
      
      if (isMobile) {
        // On mobile, load all sections immediately for smoother experience
        setSections(prev => prev.map(section => ({ 
          ...section, 
          isLoaded: true, 
          isVisible: true 
        })));
      } else {
        // On desktop, load hero section immediately
        setSections(prev => prev.map(section => 
          section.id === 'hero' ? { ...section, isLoaded: true } : section
        ));
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [isMobile]);

  // Intersection Observer for lazy loading sections (disabled on mobile)
  useEffect(() => {
    if (isMobile) return; // Skip observer on mobile for better performance
    
    const observerOptions = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section-id');
          if (sectionId) {
            setSections(prev => prev.map(section => 
              section.id === sectionId 
                ? { ...section, isVisible: true } 
                : section
            ));

            // Simulate loading delay for demonstration
            setTimeout(() => {
              setSections(prev => prev.map(section => 
                section.id === sectionId 
                  ? { ...section, isLoaded: true } 
                  : section
              ));
            }, 800);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all section refs
    Object.entries(sectionRefs.current).forEach(([id, ref]) => {
      if (ref) {
        ref.setAttribute('data-section-id', id);
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [pageLoading, isMobile]);

  return (
    <>
      {/* Initial page loader */}
      <PageLoader isLoading={pageLoading} variant="logo" />

      {/* Page content */}
      <AnimatePresence mode="wait">
        {!pageLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {sections.map((section, index) => {
              const Component = section.component;
              
              // Определяем вариант разделителя для каждой секции
              const dividerVariants = ['gradient', 'wave', 'ornament', 'gradient'];
              const dividerVariant = dividerVariants[index % dividerVariants.length];
              
              return (
                <React.Fragment key={section.id}>
                  <div 
                    id={section.id}
                    ref={el => {
                      if (el) {
                        sectionRefs.current[section.id] = el;
                      }
                    }}
                    className="relative"
                  >
                    <AnimatePresence mode="wait">
                      {!section.isLoaded && section.isVisible ? (
                        <motion.div
                          key={`${section.id}-skeleton`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {section.skeleton}
                        </motion.div>
                      ) : section.isLoaded ? (
                        <motion.div
                          key={`${section.id}-content`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Component />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                  {/* Добавляем разделитель после каждой секции, кроме последней */}
                  {index < sections.length - 1 && section.isLoaded && (
                    <SectionDivider variant={dividerVariant as any} />
                  )}
                </React.Fragment>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}