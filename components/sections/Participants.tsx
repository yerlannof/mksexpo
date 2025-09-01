'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const participants = [
  {
    country: 'Великобритания',
    code: 'GB',
    flagIcon: '🇬🇧',
    gradient: 'from-blue-600 to-red-600',
    schools: [
      { name: 'Harrow School', type: 'Boarding School' },
      { name: 'Wellington College', type: 'Co-educational' },
      { name: 'Brighton College', type: 'Day & Boarding' },
      { name: 'Sevenoaks School', type: 'IB World School' },
    ],
  },
  {
    country: 'США',
    code: 'US',
    flagIcon: '🇺🇸',
    gradient: 'from-blue-700 to-red-700',
    schools: [
      { name: 'Phillips Academy Andover', type: 'Liberal Arts' },
      { name: 'Choate Rosemary Hall', type: 'Boarding School' },
      { name: 'The Hotchkiss School', type: 'Prep School' },
    ],
  },
  {
    country: 'Швейцария',
    code: 'CH',
    flagIcon: '🇨🇭',
    gradient: 'from-red-600 to-white',
    schools: [
      { name: 'Le Rosey', type: 'International Boarding' },
      { name: 'Aiglon College', type: 'British Curriculum' },
      { name: 'Institut Montana', type: 'IB & Swiss Matura' },
    ],
  },
  {
    country: 'Канада',
    code: 'CA',
    flagIcon: '🇨🇦',
    gradient: 'from-red-600 to-white',
    schools: [
      { name: 'Upper Canada College', type: 'IB World School' },
      { name: 'Ridley College', type: 'Boarding School' },
    ],
  },
  {
    country: 'Германия',
    code: 'DE',
    flagIcon: '🇩🇪',
    gradient: 'from-black via-red-600 to-yellow-500',
    schools: [
      { name: 'Salem International College', type: 'IB Diploma' },
      { name: 'Berlin Brandenburg School', type: 'IB World School' },
    ],
  },
];

export default function Participants() {
  const { t } = useLanguage();
  
  return (
    <section id="participants" className="section-padding relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000" />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            {t('participants.title')} <span className="text-white">{t('participants.title.highlight')}</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t('participants.subtitle')}
          </p>
        </motion.div>

        {/* Participants Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {participants.map((country, countryIndex) => (
            <motion.div
              key={country.country}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: countryIndex * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:border-white/30">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${country.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <span className="text-2xl">{country.flagIcon}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-semibold text-white">{country.country}</h3>
                    <p className="text-white/60 text-sm">{country.schools.length} schools</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {country.schools.map((school, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 p-4 rounded-2xl backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center mt-0.5">
                        <span className="text-white text-sm font-semibold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{school.name}</h4>
                        <p className="text-sm text-white/60">{school.type}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Organizer Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-white/80 mb-6">{t('participants.organizer')}</p>
          <div className="inline-flex items-center gap-4 p-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl hover:bg-white/15 transition-all duration-300 hover:transform hover:scale-105">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
              <span className="text-white font-bold text-3xl">M&K</span>
            </div>
            <div className="text-left">
              <h4 className="font-display font-bold text-2xl text-white">M&K Study Centre</h4>
              <p className="text-white/80">{t('participants.organizer.desc')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}