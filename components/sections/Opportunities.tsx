'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

export default function Opportunities() {
  const { language } = useLanguage();

  return (
    <section className="section-padding">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/gallery/photo_2025-09-02_23-10-04.jpg"
              alt={language === 'ru' ? 'Консультация с представителями школ' : 'Consultation with school representatives'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
            />
          </motion.div>

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-8">
              {language === 'ru' 
                ? 'Только здесь у вас будет возможность:'
                : 'Only here you will have the opportunity to:'}
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
              <p className="text-white/90 text-lg">
                {language === 'ru'
                  ? 'Встретиться лично с представителями лучших частных школ мира.'
                  : 'Meet personally with representatives of the best private schools in the world.'}
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
              <p className="text-white/90 text-lg">
                {language === 'ru'
                  ? 'Узнать все о поступлении, программах и стипендиях напрямую.'
                  : 'Learn everything about admission, programs and scholarships directly.'}
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
              <p className="text-white/90 text-lg">
                {language === 'ru'
                  ? 'Подобрать школу, которая максимально соответствует интересам и целям вашего ребенка.'
                  : 'Choose a school that best matches your child\'s interests and goals.'}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
  );
}