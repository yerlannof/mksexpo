'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const participants = [
  {
    country: 'Великобритания',
    countryEn: 'United Kingdom',
    code: 'GB',
    schools: [
      'Harrow School',
      'Wellington College',
      'Brighton College',
      'Sevenoaks School',
    ],
  },
  {
    country: 'США',
    countryEn: 'USA',
    code: 'US',
    schools: [
      'Phillips Academy Andover',
      'Choate Rosemary Hall',
      'The Hotchkiss School',
    ],
  },
  {
    country: 'Швейцария',
    countryEn: 'Switzerland',
    code: 'CH',
    schools: [
      'Le Rosey',
      'Aiglon College',
      'Institut Montana',
    ],
  },
  {
    country: 'Канада',
    countryEn: 'Canada',
    code: 'CA',
    schools: [
      'Upper Canada College',
      'Ridley College',
    ],
  },
  {
    country: 'Германия',
    countryEn: 'Germany',
    code: 'DE',
    schools: [
      'Salem International College',
      'Berlin Brandenburg School',
    ],
  },
];

// Минималистичные цвета флагов
const flagColors: Record<string, string> = {
  GB: 'bg-blue-600',
  US: 'bg-blue-700',
  CH: 'bg-red-600',
  CA: 'bg-red-600',
  DE: 'bg-gray-800',
};

export default function Participants() {
  const { t, language } = useLanguage();
  
  return (
    <section id="participants" className="section-padding">
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
            {t('participants.title')} <span className="text-white/80">{t('participants.title.highlight')}</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t('participants.subtitle')}
          </p>
        </motion.div>

        {/* Minimalist Participants Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {participants.map((country, countryIndex) => (
            <motion.div
              key={country.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: countryIndex * 0.05 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl ${flagColors[country.code]} flex items-center justify-center text-white font-bold text-lg`}>
                  {country.code}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {language === 'ru' ? country.country : country.countryEn}
                  </h3>
                  <p className="text-sm text-white/50">{country.schools.length} {language === 'ru' ? 'школ' : 'schools'}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {country.schools.map((school, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 text-white/80 py-2"
                  >
                    <span className="text-white/40 text-sm w-5">{index + 1}</span>
                    <span className="text-sm">{school}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Organizer Section - Minimalist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col items-center gap-3 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
            <p className="text-sm text-white/60 uppercase tracking-wider">{t('participants.organizer')}</p>
            <h4 className="font-display font-bold text-xl text-white">M&K Study Centre</h4>
            <p className="text-white/70 text-sm">{t('participants.organizer.desc')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}