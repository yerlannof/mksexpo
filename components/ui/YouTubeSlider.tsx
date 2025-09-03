'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Video {
  id: string;
  title: string;
}

const videos: Video[] = [
  {
    id: 'qngtZfvDEms',
    title: 'Частные школы за рубежом'
  },
  {
    id: 'znYznMBTaO8',
    title: 'M&K Education - Образование за рубежом'
  },
  {
    id: '-zB9wz0943M',
    title: 'M&K Study Centre - Наши услуги'
  }
];

export default function YouTubeSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Video Container */}
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <iframe
              src={`https://www.youtube.com/embed/${videos[currentIndex].id}?rel=0&modestbranding=1`}
              title={videos[currentIndex].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        aria-label="Previous video"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
        aria-label="Next video"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Video Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8 bg-white' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to video ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
}