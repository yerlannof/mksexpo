'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Галерея изображений с выставки
const galleryImages = [
  { src: '/gallery/photo_2025-09-02_03-39-24.jpg', alt: 'Консультация с представителями школ' },
  { src: '/gallery/photo_2025-09-02_03-39-24 (2).jpg', alt: 'Индивидуальная консультация' },
  { src: '/gallery/photo_2025-09-02_03-39-25.jpg', alt: 'Презентация программ' },
  { src: '/gallery/photo_2025-09-02_03-39-25 (4).jpg', alt: 'Консультация родителей' },
  { src: '/gallery/photo_2025-09-02_03-39-26.jpg', alt: 'Презентация программ' },
  { src: '/gallery/photo_2025-09-02_03-39-26 (3).jpg', alt: 'Общение с представителями' },
  { src: '/gallery/photo_2025-09-02_03-39-26 (4).jpg', alt: 'Атмосфера мероприятия' },
  { src: '/gallery/photo_2025-09-02_03-39-27.jpg', alt: 'Выступление представителей' },
  { src: '/gallery/photo_2025-09-02_03-39-27 (2).jpg', alt: 'Консультационная зона' },
];

export default function Gallery() {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrevImage = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImage !== null && selectedImage < galleryImages.length - 1) {
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
          className="text-center mb-8 space-y-3"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
            {language === 'ru' ? 'Фотографии' : 'Photos'}{' '}
            <span className="text-white/80">{language === 'ru' ? 'с выставки' : 'from Exhibition'}</span>
          </h2>
        </motion.div>

        {/* Compact Gallery Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="aspect-square relative group cursor-pointer overflow-hidden rounded-lg"
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                loading="lazy"
                quality={60}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

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
                className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-lg transition-colors z-50"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </button>
              
              {selectedImage > 0 && (
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
              
              {selectedImage < galleryImages.length - 1 && (
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-5xl max-h-[90vh] w-full h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  quality={85}
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg text-sm">
                  {selectedImage + 1} / {galleryImages.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}