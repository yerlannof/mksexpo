'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function PhotoGallery() {
  return (
    <section className="py-6 sm:py-8 lg:py-10">
      <div className="container">
        {/* Photo Section - Aesthetic Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4"
        >
          <div className="relative">
            {/* Decorative background element */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl transform rotate-1" />
            
            {/* Photos Container - Side by side */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10">
              {/* First Photo */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative aspect-[5/4] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <Image
                    src="/gallery/photo_2025-09-02_23-15-47.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    quality={90}
                  />
                </div>
              </motion.div>
              
              {/* Second Photo */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative aspect-[5/4] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <Image
                    src="/gallery/семинары.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                  />
                  {/* Decorative frame */}
                  <div className="absolute inset-0 border-4 border-white/20 rounded-2xl" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}