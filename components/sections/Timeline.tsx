'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Clock, Users, MessageSquare, BookOpen, Gift, MapPin } from 'lucide-react';

export default function Timeline() {
  const { t } = useLanguage();
  
  const schedule = [
    {
      time: '11:00 - 12:00',
      titleKey: 'timeline.schedule.registration',
      descKey: 'timeline.schedule.registration.desc',
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      time: '12:00 - 17:00',
      titleKey: 'timeline.schedule.meetings',
      descKey: 'timeline.schedule.meetings.desc',
      icon: MessageSquare,
      color: 'bg-blue-500',
    },
    {
      time: '12:00 - 18:00',
      titleKey: 'timeline.schedule.consultations',
      descKey: 'timeline.schedule.consultations.desc',
      icon: BookOpen,
      color: 'bg-pink-500',
    },
    {
      time: '17:00 - 18:00',
      titleKey: 'timeline.schedule.specialoffers',
      descKey: 'timeline.schedule.specialoffers.desc',
      icon: Gift,
      color: 'bg-orange-500',
    },
  ];
  
  return (
    <section id="timeline" className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 space-y-3"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
            {t('timeline.title')} <span className="text-white/80">{t('timeline.title.highlight')}</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t('timeline.subtitle')}
          </p>
        </motion.div>

        {/* Timeline - Minimalist */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="relative">
            {/* Simple timeline line */}
            <div className="absolute left-6 top-8 bottom-8 w-px bg-white/20"></div>

            {schedule.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex items-start mb-6 last:mb-0"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-6 transform -translate-x-1/2 w-3 h-3 rounded-full ${item.color} ring-4 ring-primary/20`} />
                  
                  {/* Content */}
                  <div className="ml-16 flex-1">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl ${item.color} ${item.color}/20 flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-3.5 h-3.5 text-white/50" />
                            <span className="text-sm text-white/50">{item.time}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-1">{t(item.titleKey)}</h3>
                          <p className="text-sm text-white/70">{t(item.descKey)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Location cards - Minimalist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{t('timeline.location.astana')}</h3>
                <p className="text-white/70 text-sm mb-1">{t('timeline.date.astana')}</p>
                <p className="text-white/50 text-sm">{t('timeline.venue.astana')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-pink-500 bg-pink-500/20 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{t('timeline.location.almaty')}</h3>
                <p className="text-white/70 text-sm mb-1">{t('timeline.date.almaty')}</p>
                <p className="text-white/50 text-sm">{t('timeline.venue.almaty')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}