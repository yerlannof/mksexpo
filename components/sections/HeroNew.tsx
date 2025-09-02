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
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-24 sm:pt-20 px-4 sm:px-6 lg:px-8">
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
          {/* Left Column - Text Content */}
          <div className="flex-1 max-w-2xl text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight mb-3"
            >
              {t('hero.title.main').split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < 2 && <br />}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-white/90 mb-6"
            >
              {t('hero.subtitle.main')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="text-sm sm:text-base text-white/80 mb-8 space-y-1 text-left"
            >
              {t('hero.dates').split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-12 sm:mb-16"
            >
              <div className="flex flex-col items-start gap-2">
                <AnimatedButton
                  variant="danger"
                  size="xl"
                  href="#registration"
                  className="w-auto text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
                >
                  {t('hero.cta.apply')}
                </AnimatedButton>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Student Images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex-1 flex justify-center items-center w-full max-w-md lg:max-w-2xl xl:max-w-3xl"
          >
            <div className="relative w-full">
              {/* Images Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* First Column */}
                <div>
                  {/* First Image */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <Image
                      src="/hero-photo-main.jpg"
                      alt="Консультация по поступлению в частные школы"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      priority
                      quality={85}
                    />
                  </motion.div>
                </div>
                
                {/* Second Column */}
                <div className="pt-8">
                  {/* Second Image */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <Image
                      src="/gallery/photo_2025-09-02_23-13-02.jpg"
                      alt="Выставка частных школ"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      loading="lazy"
                      quality={75}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

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