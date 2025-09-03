'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, MessageCircle } from 'lucide-react';

export default function Contact() {
  const { language } = useLanguage();

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#1C417A]">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-white mb-4">
            {language === 'ru' ? 'Остались вопросы?' : 'Have questions?'}
          </h2>
          
          <p className="text-base sm:text-lg text-white/80 mb-10">
            {language === 'ru' 
              ? 'Напишите нам в WhatsApp - мы с радостью ответим вам'
              : 'Write to us on WhatsApp - we will be happy to answer you'}
          </p>
          
          <div className="flex justify-center">
            <motion.a
              href="https://wa.me/77771110808"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all text-white font-medium"
            >
              <MessageCircle className="w-5 h-5" />
              <span>+7 777 111 08 08</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}