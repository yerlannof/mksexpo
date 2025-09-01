'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';


export default function Timeline() {
  const { t } = useLanguage();
  
  const schedule = [
    {
      time: '11:00 - 12:00',
      titleKey: 'timeline.schedule.registration',
      descKey: 'timeline.schedule.registration.desc',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      time: '12:00 - 17:00',
      titleKey: 'timeline.schedule.meetings',
      descKey: 'timeline.schedule.meetings.desc',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      time: '12:00 - 18:00',
      titleKey: 'timeline.schedule.consultations',
      descKey: 'timeline.schedule.consultations.desc',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    },
    {
      time: '17:00 - 18:00',
      titleKey: 'timeline.schedule.specialoffers',
      descKey: 'timeline.schedule.specialoffers.desc',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C5.5 4 6 4.5 6 5.5V9zm0 0h12m-12 0v10m12-10h1.5a2.5 2.5 0 0 0 0-5c-1 0-1.5.5-1.5 1.5V9zm0 0v10m-6-10v10m-3.5-7.5h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    },
  ];
  
  return (
    <section id="timeline" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-72 h-72 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            {t('timeline.title')} <span className="text-white">{t('timeline.title.highlight')}</span>
          </h2>
          <p className="text-xl text-white/80">
            {t('timeline.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-white/20"></div>

            {schedule.map((item, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex items-start mb-8 last:mb-0"
                >
                  {/* Timeline dot with gradient */}
                  <div className="absolute left-12 transform -translate-x-1/2 z-10">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                      style={{ background: item.gradient }}
                    >
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="ml-24 flex-1">
                    <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:-translate-y-1">
                      <div className="flex items-start gap-4">
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                          style={{ background: item.gradient }}
                        >
                          <div className="absolute inset-0 bg-white/20"></div>
                          <div className="relative z-10 text-white">
                            {item.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white/60">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                              <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="text-sm font-medium text-white/60">{item.time}</span>
                          </div>
                          <h3 className="text-xl font-semibold mb-2 text-white">{t(item.titleKey)}</h3>
                          <p className="text-white/70">{t(item.descKey)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Location cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 grid md:grid-cols-2 gap-8"
        >
          <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white">{t('timeline.location.astana')}</h3>
              <p className="text-white/80 mb-1 font-medium">{t('timeline.date.astana')}</p>
              <p className="text-white/60">{t('timeline.venue.astana')}</p>
            </div>
          </div>
          
          <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white">{t('timeline.location.almaty')}</h3>
              <p className="text-white/80 mb-1 font-medium">{t('timeline.date.almaty')}</p>
              <p className="text-white/60">{t('timeline.venue.almaty')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}