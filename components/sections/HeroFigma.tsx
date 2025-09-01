'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroFigma() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen" />;

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background with gradient - already applied via body */}
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
            >
              Зачислитесь
              <br />
              в лучшие учебные
              <br />
              заведения мира!
            </motion.h1>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="btn-primary"
            >
              Оставить заявку
            </motion.button>

            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12"
            >
              <div>
                <h3 className="text-4xl font-bold text-white">25</h3>
                <p className="text-white/80 text-sm mt-1">лет мы работаем на рынке образования Казахстана</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-white">10,000</h3>
                <p className="text-white/80 text-sm mt-1">студентов мы отправили на обучение за рубежом</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-white">1,800</h3>
                <p className="text-white/80 text-sm mt-1">зарубежных учебных заведений наши партнеры</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-white">41</h3>
                <p className="text-white/80 text-sm mt-1">страна мира, куда мы можем подобрать учебу</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[600px]">
              {/* Placeholder for student image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-light/20 to-primary-dark/20 rounded-3xl" />
              <div className="absolute bottom-0 right-0 w-full h-full flex items-end justify-center">
                <div className="text-center text-white pb-8">
                  <p className="text-6xl mb-2">👩‍🎓</p>
                  <p className="text-lg">Студентка с книгами</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center text-white/60"
        >
          <div className="w-6 h-6 border-2 border-white/60 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white/60 rounded-full" />
          </div>
          <div className="w-0.5 h-8 bg-white/60 mt-2" />
        </motion.div>
      </div>

      {/* Contact Info */}
      <div className="absolute bottom-10 right-10 text-white text-right">
        <div className="flex items-center gap-2 justify-end mb-2">
          <span className="text-2xl">📞</span>
          <span className="text-xl font-semibold">+7 (727) 2-668-543</span>
        </div>
      </div>
    </section>
  );
}