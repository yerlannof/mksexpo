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
              transition={{ delay: 0.15, duration: 0.8 }}
              className="text-xl sm:text-2xl text-white font-semibold mb-4"
            >
              {t('hero.dates')}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg sm:text-xl text-white/90 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {t('hero.subtitle.desc')}
            </motion.p>

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
                src="/hero-photo-main.jpg"
                alt="Консультация по поступлению в частные школы"
                width={800}
                height={1000}
                className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                priority
                quality={85}
                unoptimized
              />
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