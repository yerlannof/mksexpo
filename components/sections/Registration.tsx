'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCityModal } from '@/contexts/CityModalContext';

export default function Registration() {
  const { t, language } = useLanguage();
  const { openCityModal } = useCityModal();

  return (
    <section id="registration" className="section-padding relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 space-y-2"
          >
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-white flex flex-col sm:flex-row items-center justify-center gap-3">
              <span className="inline-flex items-center gap-3">
                {language === 'ru' ? (
                  <>
                    <button 
                      onClick={openCityModal}
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                    >
                      Зарегистрируйтесь
                    </button>
                    <span>на выставку бесплатно</span>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={openCityModal}
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                    >
                      Register
                    </button>
                    <span>for the exhibition for free</span>
                  </>
                )}
              </span>
            </h2>
          </motion.div>

          {/* Organizer Info Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl sm:rounded-3xl p-8 md:p-12 text-center"
          >
            <h3 className="text-sm uppercase tracking-wider text-white/60 mb-3">
              {language === 'ru' ? 'ОРГАНИЗАТОР ВЫСТАВКИ' : 'EXHIBITION ORGANIZER'}
            </h3>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              M&K Study Centre
            </h2>
            <p className="text-lg text-white/80">
              {language === 'ru' ? '27 лет успешной работы в образовании' : '27 years of successful work in education'}
            </p>
          </motion.div>

          {/* Questions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
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
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>+7 777 111 08 08</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}