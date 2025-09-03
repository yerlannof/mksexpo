'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { schoolsData, placeholderImage } from '@/data/schoolsData';

// Используем импортированные данные школ
const schools = schoolsData;

// Цвета для инициалов школ по странам
const schoolColors: Record<string, string> = {
  GB: 'from-blue-500 to-blue-600',
  US: 'from-indigo-500 to-indigo-600',
  AE: 'from-amber-500 to-amber-600',
  IT: 'from-green-500 to-green-600',
};

export default function Participants() {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Количество видимых школ в зависимости от размера экрана
  const [visibleCount, setVisibleCount] = useState(1);
  
  useEffect(() => {
    const handleResize = () => {
      // Всегда показываем только 1 школу
      setVisibleCount(1);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Автопрокрутка
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % schools.length);
    }, 12000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);
  
  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + schools.length) % schools.length);
  };
  
  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % schools.length);
  };
  
  // Получаем видимые школы
  const getVisibleSchools = () => {
    const result = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % schools.length;
      result.push({ ...schools[index], index });
    }
    return result;
  };
  
  return (
    <section id="participants" className="py-10 sm:py-12 lg:py-16">
      {/* Registration Button */}
      <div className="container mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <a
            href="#registration"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl hover:from-red-700 hover:to-red-800 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {language === 'ru' ? 'Зарегистрироваться на выставку' : 'Register for exhibition'}
          </a>
        </motion.div>
      </div>

      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 space-y-2"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-white">
            {t('participants.title')} <span className="text-white/80">{t('participants.title.highlight')}</span>
          </h2>
        </motion.div>

        {/* Minimalist School Slider */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-10 z-10 p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all"
            aria-label="Previous school"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-10 z-10 p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all"
            aria-label="Next school"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
          
          {/* Schools Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <AnimatePresence mode="popLayout">
                {getVisibleSchools().map((school) => (
                  <motion.div
                    key={school.index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-1 min-w-0 ${visibleCount === 1 ? 'w-full' : ''}`}
                  >
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.07] transition-all duration-300 h-full">
                      <div className="flex flex-col md:flex-row items-center p-6 gap-6">
                        {/* School Image - Horizontal format */}
                        <div className="relative w-64 h-48 md:w-80 md:h-52 flex-shrink-0 rounded-xl overflow-hidden">
                          <Image
                            src={school.image || placeholderImage}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 256px, 320px"
                            quality={85}
                            onError={(e) => {
                              e.currentTarget.src = placeholderImage;
                            }}
                          />
                        </div>
                        
                        {/* School Info */}
                        <div className="flex-1 text-center md:text-left">
                          {/* School Name */}
                          <h3 className="text-2xl font-semibold text-white mb-1">
                            {school.name}
                          </h3>
                          
                          {/* Country Name */}
                          <p className="text-base text-white/70 mb-3">
                            {language === 'ru' ? school.countryName : school.countryNameEn}
                          </p>
                          
                          {/* School Description */}
                          {school.description && (
                            <p className="text-sm leading-relaxed text-white/80">
                              {language === 'ru' ? school.description.ru : school.description.en}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
          
          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {schools.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-white' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to school ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Organizer Section - Minimalist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <div className="inline-flex flex-col items-center gap-2 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <p className="text-sm text-white/60 uppercase tracking-wider">{t('participants.organizer')}</p>
            <h4 className="font-display font-bold text-xl text-white">M&K Study Centre</h4>
            <p className="text-white/70 text-base">{language === 'ru' ? '27 лет успешной работы в образовании' : '27 years of successful work in education'}</p>
          </div>
        </motion.div>

        {/* Photo Section - Representatives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/gallery/photo_2025-09-02_23-15-47.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm font-medium">
                  {language === 'ru' ? 'Индивидуальные консультации' : 'Individual consultations'}
                </p>
              </div>
            </div>
            
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/gallery/photo_2025-09-02_03-39-27.jpg"
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm font-medium">
                  {language === 'ru' ? 'Презентации школ' : 'School presentations'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}