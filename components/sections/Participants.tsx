'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Все школы в едином списке с информацией о стране
const schools = [
  { 
    name: 'Vertex School', 
    country: 'AE', 
    countryName: 'ОАЭ', 
    countryNameEn: 'UAE', 
    initials: 'VS',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop' // Modern Dubai educational institution building
  },
  { 
    name: 'Concord College', 
    country: 'GB', 
    countryName: 'Великобритания', 
    countryNameEn: 'United Kingdom', 
    initials: 'CC',
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&h=300&fit=crop' // British historic college building with traditional architecture
  },
  { 
    name: 'Cascadia College', 
    country: 'US', 
    countryName: 'США', 
    countryNameEn: 'USA', 
    initials: 'CC',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop' // American college campus building
  },
  { 
    name: 'St. Clares Oxford', 
    country: 'GB', 
    countryName: 'Великобритания', 
    countryNameEn: 'United Kingdom', 
    initials: 'SC',
    image: 'https://images.unsplash.com/photo-1574958269340-fa927503f3dd?w=400&h=300&fit=crop' // Oxford university building architecture
  },
  { 
    name: 'MPW College', 
    country: 'GB', 
    countryName: 'Великобритания', 
    countryNameEn: 'United Kingdom', 
    initials: 'MPW',
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop' // Modern London academic building
  },
];

// Цвета для инициалов школ по странам
const schoolColors: Record<string, string> = {
  GB: 'from-blue-500 to-blue-600',
  US: 'from-indigo-500 to-indigo-600',
  AE: 'from-amber-500 to-amber-600',
};

export default function Participants() {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Количество видимых школ в зависимости от размера экрана
  const [visibleCount, setVisibleCount] = useState(3);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
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
    }, 3000);
    
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
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 space-y-2"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
            {t('participants.title')} <span className="text-white/80">{t('participants.title.highlight')}</span>
          </h2>
        </motion.div>

        {/* Minimalist School Slider */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all"
            aria-label="Previous school"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all"
            aria-label="Next school"
          >
            <ChevronRight className="w-6 h-6 text-white" />
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
                      {/* School Image */}
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={school.image}
                          alt={school.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          quality={85}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      
                      <div className="p-4">
                        <div className="flex flex-col items-center text-center space-y-2">
                          {/* School Name */}
                          <h3 className="text-lg font-semibold text-white">
                            {school.name}
                          </h3>
                          
                          {/* Country Name */}
                          <p className="text-sm text-white/70">
                            {language === 'ru' ? school.countryName : school.countryNameEn}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
          
          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-8">
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

        {/* Photo Section - Representatives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/gallery/photo_2025-09-02_03-39-26 (3).jpg"
                alt={language === 'ru' ? 'Общение с представителями школ' : 'Meeting with school representatives'}
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
                alt={language === 'ru' ? 'Выступление представителей' : 'Representatives presentation'}
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

        {/* Organizer Section - Minimalist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="inline-flex flex-col items-center gap-2 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
            <p className="text-sm text-white/60 uppercase tracking-wider">{t('participants.organizer')}</p>
            <h4 className="font-display font-bold text-lg text-white">M&K Study Centre</h4>
            <p className="text-white/70 text-sm">{t('participants.organizer.desc')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}