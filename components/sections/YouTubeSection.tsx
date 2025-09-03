'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import YouTubeSlider from '@/components/ui/YouTubeSlider';

export default function YouTubeSection() {
  const { language } = useLanguage();

  return (
    <section className="py-6 sm:py-8 lg:py-10">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-white text-center mb-8">
              {language === 'ru' 
                ? 'Посмотрите как проходят наши выставки'
                : 'See how our exhibitions take place'}
            </h3>
            <YouTubeSlider />
          </motion.div>
        </div>
      </div>
    </section>
  );
}