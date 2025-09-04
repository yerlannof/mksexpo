'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCityModal } from '@/contexts/CityModalContext';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { schoolsData, placeholderImage } from '@/data/schoolsData';
import AnimatedButton from '@/components/ui/AnimatedButton';

// Используем импортированные данные школ
const schools = schoolsData;

// Цвета для инициалов школ по странам
const schoolColors: Record<string, string> = {
  GB: 'from-blue-500 to-blue-600',
  US: 'from-indigo-500 to-indigo-600',
  AE: 'from-amber-500 to-amber-600',
  IT: 'from-green-500 to-green-600',
  CZ: 'from-red-500 to-red-600',
  CH: 'from-purple-500 to-purple-600',
  ES: 'from-orange-500 to-orange-600',
};

export default function Participants() {
  const { t, language } = useLanguage();
  const { openCityModal } = useCityModal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Количество видимых школ в зависимости от размера экрана
  const [visibleCount, setVisibleCount] = useState(typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3);
  
  useEffect(() => {
    const handleResize = () => {
      // Показываем 1 школу на мобильных и 3 на десктопе
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else {
        setVisibleCount(3);
      }
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
    <section id="participants" className="py-6 sm:py-8 lg:py-10">
      {/* Registration Button and Organizer */}
      <div className="container mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          {/* Registration Button */}
          <AnimatedButton
            variant="danger"
            size="xl"
            onClick={openCityModal}
            className="w-auto text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
          >
            {t('hero.cta.apply')}
          </AnimatedButton>
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
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-white">
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
                    className={`flex-1 min-w-0 ${visibleCount === 1 ? 'w-full' : visibleCount === 2 ? 'w-1/2' : 'w-1/3'}`}
                  >
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.07] transition-all duration-300 h-full">
                      {/* School Image - Full width */}
                      <div className={`relative w-full ${visibleCount === 3 ? 'h-40 md:h-48' : visibleCount === 2 ? 'h-48 md:h-56' : 'h-56 md:h-64'}`}>
                          <Image
                            src={school.image || placeholderImage}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            quality={85}
                            onError={(e) => {
                              e.currentTarget.src = placeholderImage;
                            }}
                          />
                      </div>
                      
                      {/* School Info */}
                      <div className={`${visibleCount === 3 ? 'p-3' : visibleCount === 2 ? 'p-4' : 'p-5'}`}>
                          {/* School Name */}
                          <h3 className={`font-semibold text-white mb-1 ${visibleCount === 3 ? 'text-base md:text-lg' : visibleCount === 2 ? 'text-lg md:text-xl' : 'text-lg md:text-2xl'}`}>
                            {school.name}
                          </h3>
                          
                          {/* Country Name */}
                          <p className={`text-white/70 mb-2 ${visibleCount === 3 ? 'text-xs' : visibleCount === 2 ? 'text-sm' : 'text-base'}`}>
                            {language === 'ru' ? school.countryName : school.countryNameEn}
                          </p>
                          
                          {/* School Description */}
                          {school.description && (
                            <p className={`text-white/80 mt-3 ${visibleCount === 3 ? 'text-xs leading-relaxed' : visibleCount === 2 ? 'text-xs leading-relaxed' : 'text-sm leading-normal md:leading-relaxed'}`}>
                              {language === 'ru' ? school.description.ru : school.description.en}
                            </p>
                          )}
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
      </div>
    </section>
  );
}