'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function HeroNew() {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen" />;

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8">
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
          {/* Left Column - Text Content */}
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 sm:mb-8"
            >
              {t('hero.title.main').split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < 2 && <br />}
                </span>
              ))}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-12 sm:mb-16 flex justify-center lg:justify-start"
            >
              <AnimatedButton
                variant="glow"
                size="xl"
                href="#registration"
                className="w-full sm:w-auto"
              >
                {t('hero.cta.apply')}
              </AnimatedButton>
            </motion.div>
          </div>

          {/* Right Column - Student Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex-1 flex justify-center items-end w-full max-w-md lg:max-w-2xl xl:max-w-3xl"
          >
            <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
              <Image
                src="/hero-photo.jpg"
                alt={t('hero.image.alt')}
                width={800}
                height={1000}
                className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Statistics Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-2 gap-8 sm:gap-12 md:gap-16 mt-12 sm:mt-16 lg:mt-20 max-w-2xl mx-auto lg:mx-0"
        >
          <div className="text-center">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">15+</h3>
            <p className="text-white/80 text-sm sm:text-base">
              {t('hero.stats.schools')}
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">1-на-1</h3>
            <p className="text-white/80 text-sm sm:text-base">
              {t('hero.stats.visitors')}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center text-white/60"
        >
          <div className="w-8 h-8 border-2 border-white/60 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* Contact info removed - already in footer */}
    </section>
  );
}