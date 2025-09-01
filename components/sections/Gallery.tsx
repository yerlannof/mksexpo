'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Галерея изображений - здесь можно будет добавить реальные фотографии
const galleryImages = [
  {
    src: '/hero-photo-main.jpg',
    alt: 'Консультация с представителями школ',
    category: 'consultation',
  },
  // Временные placeholder изображения - замените на реальные фотографии с выставки
  {
    src: '/hero-photo-main.jpg',
    alt: 'Презентация школ',
    category: 'presentation',
  },
  {
    src: '/hero-photo-main.jpg',
    alt: 'Общение с родителями',
    category: 'consultation',
  },
  {
    src: '/hero-photo-main.jpg',
    alt: 'Стенд школы',
    category: 'stands',
  },
  {
    src: '/hero-photo-main.jpg',
    alt: 'Индивидуальная консультация',
    category: 'consultation',
  },
  {
    src: '/hero-photo-main.jpg',
    alt: 'Атмосфера выставки',
    category: 'atmosphere',
  },
];

const categories = [
  { id: 'all', nameRu: 'Все', nameEn: 'All' },
  { id: 'consultation', nameRu: 'Консультации', nameEn: 'Consultations' },
  { id: 'presentation', nameRu: 'Презентации', nameEn: 'Presentations' },
  { id: 'stands', nameRu: 'Стенды', nameEn: 'Stands' },
  { id: 'atmosphere', nameRu: 'Атмосфера', nameEn: 'Atmosphere' },
];

export default function Gallery() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const handlePrevImage = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImage !== null && selectedImage < filteredImages.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  return (
    <section id="gallery" className="section-padding">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 space-y-3"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
            {language === 'ru' ? 'Фотографии' : 'Photos'}{' '}
            <span className="text-white/80">{language === 'ru' ? 'с выставки' : 'from Exhibition'}</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {language === 'ru' 
              ? 'Атмосфера наших мероприятий и встречи с представителями школ' 
              : 'The atmosphere of our events and meetings with school representatives'}
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-white text-primary'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {language === 'ru' ? category.nameRu : category.nameEn}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={`${image.src}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="aspect-[4/3] relative group cursor-pointer overflow-hidden rounded-xl"
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </button>
              
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                disabled={selectedImage === 0}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                disabled={selectedImage === filteredImages.length - 1}
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-5xl max-h-[90vh] w-full h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={filteredImages[selectedImage].src}
                  alt={filteredImages[selectedImage].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}