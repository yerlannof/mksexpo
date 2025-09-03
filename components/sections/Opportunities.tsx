'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

export default function Opportunities() {
  const { language } = useLanguage();

  return (
    <section className="pt-2 sm:pt-4 lg:pt-8 pb-10 sm:pb-12 lg:pb-16 relative z-10">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto lg:mx-0">
          {/* Image Column - Left on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 flex-1 flex justify-center items-start w-full max-w-lg lg:max-w-3xl xl:max-w-4xl scale-110 lg:scale-[2.2] xl:scale-[2.4] origin-top"
          >
            <div className="relative w-full">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl max-w-lg mx-auto">
                <Image
                src="/gallery/photo_2025-09-02_23-13-02.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
              />
              </div>
            </div>
          </motion.div>

          {/* Text Column - Right on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-left order-1 lg:order-2 px-4 sm:px-0"
          >
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-white mb-8 mt-8 lg:mt-0">
              {language === 'ru' 
                ? 'На выставке у вас будет возможность:'
                : 'At the exhibition you will have the opportunity to:'}
            </h3>
            
            <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-3"
            >
              <span className="text-white text-xl">•</span>
              <p className="text-white/90 text-sm md:text-base lg:text-lg">
                {language === 'ru'
                  ? 'Встретиться лично с представителями лучших частных школ мира'
                  : 'Meet personally with representatives of the best private schools in the world'}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-start gap-3"
            >
              <span className="text-white text-xl">•</span>
              <p className="text-white/90 text-sm md:text-base lg:text-lg">
                {language === 'ru'
                  ? 'Узнать все о поступлении, программах и стипендиях напрямую'
                  : 'Learn everything about admission, programs and scholarships directly'}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex items-start gap-3"
            >
              <span className="text-white text-xl">•</span>
              <p className="text-white/90 text-sm md:text-base lg:text-lg">
                {language === 'ru'
                  ? 'Подобрать школу, которая максимально соответствует интересам и целям вашего ребенка'
                  : 'Choose a school that best matches your child\'s interests and goals'}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-start gap-3"
            >
              <span className="text-white text-xl">•</span>
              <p className="text-white/90 text-sm md:text-base lg:text-lg">
                {language === 'ru'
                  ? 'Узнать о жизни на кампусе и условиях проживания: питание, безопасность, инфраструктура'
                  : 'Learn about campus life and living conditions: meals, safety, infrastructure'}
              </p>
            </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}