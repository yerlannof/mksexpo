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
    <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center overflow-hidden pt-24 sm:pt-20 md:pt-16 lg:pt-8 px-4 sm:px-6 lg:px-8 pb-0 lg:pb-0">
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 sm:gap-12">
          {/* Left Column - Text Content */}
          <div className="flex-1 max-w-2xl text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight mb-3"
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
              className="text-base md:text-lg lg:text-xl text-white/80 mb-4"
            >
              выбирайте школу сегодня — стройте успешное завтра
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="text-sm md:text-base lg:text-lg text-white/90 mt-6 mb-8 space-y-2 text-left"
            >
              {t('hero.dates').split('\n').map((line, i) => {
                // Extract date part (e.g., "04 октября" or "October 4")
                const dateMatch = line.match(/^(\d+\s+\w+|October\s+\d+|октября\s+\d+|\d+\s+октября)/);
                if (dateMatch) {
                  const datePart = dateMatch[0];
                  const restOfLine = line.substring(datePart.length);
                  return (
                    <p key={i}>
                      <span className="font-bold">{datePart}</span>{restOfLine}
                    </p>
                  );
                }
                return <p key={i}>{line}</p>;
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-8 sm:mb-10"
            >
              <div className="flex flex-col items-start gap-6">
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
            className="flex-1 flex justify-center items-start lg:items-start w-full max-w-lg lg:max-w-3xl xl:max-w-4xl scale-110 lg:scale-[2.2] xl:scale-[2.4] lg:mt-0 origin-top"
          >
            <div className="relative w-full">
              {/* Single Image */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl max-w-lg mx-auto"
              >
                <Image
                  src="/gallery/photo_2025-09-02_23-10-04.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  quality={85}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Contact info removed - already in footer */}
    </section>
  );
}