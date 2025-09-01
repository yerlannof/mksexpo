'use client';

import { motion } from 'framer-motion';
import CountdownTimer from '../CountdownTimer';
import { CalendarDays, MapPin, Clock, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection, { AnimatedChild } from '../AnimatedSection';

export default function Statistics() {
  const { t } = useLanguage();
  
  const exhibitions = [
    {
      cityKey: 'hero.date.astana',
      date: new Date('2025-10-04T10:00:00'),
      dateKey: 'timeline.date.astana',
      venueKey: 'timeline.venue.astana',
      icon: MapPin,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      cityKey: 'hero.date.almaty',
      date: new Date('2025-10-05T10:00:00'),
      dateKey: 'timeline.date.almaty',
      venueKey: 'timeline.venue.almaty',
      icon: MapPin,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
  ];
  return (
    <section id="statistics" className="section-padding relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10">
        <AnimatedSection animation="fadeUp" className="text-center mb-12 sm:mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">
            {t('stats.title')}
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
            {t('stats.subtitle')}
          </p>
        </AnimatedSection>

        {/* Countdown Timer */}
        <AnimatedSection animation="scaleUp" delay={0.2} className="mb-12 sm:mb-16">
          <CountdownTimer 
            targetDate={exhibitions[0].date} 
            label={t('stats.countdown.astana')}
          />
        </AnimatedSection>

        {/* Exhibition Cards */}
        <AnimatedSection animation="fadeUp" staggerChildren={0.15} delay={0.3} className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
          {exhibitions.map((exhibition, index) => {
            const Icon = exhibition.icon;
            return (
              <AnimatedChild key={index}>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:-translate-y-1">
                  {/* Icon with gradient background */}
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto relative overflow-hidden"
                    style={{ background: exhibition.gradient }}
                  >
                    <div className="absolute inset-0 bg-white/20"></div>
                    <Icon className="relative z-10 w-10 h-10 text-white" />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{t(exhibition.cityKey)}</h3>
                    <div className="flex items-center justify-center gap-2 text-white/80 mb-2">
                      <CalendarDays className="w-4 sm:w-5 h-4 sm:h-5" />
                      <span className="text-base sm:text-lg">{t(exhibition.dateKey)}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-white/70">
                      <MapPin className="w-4 sm:w-5 h-4 sm:h-5" />
                      <span className="text-sm sm:text-base">{t(exhibition.venueKey)}</span>
                    </div>
                  </div>
                </div>
              </AnimatedChild>
            );
          })}
        </AnimatedSection>

        {/* Event Stats */}
        <AnimatedSection animation="fadeUp" staggerChildren={0.1} delay={0.5} className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { icon: Users, value: '50+', labelKey: 'stats.schools', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
            { icon: CalendarDays, value: '2', labelKey: 'stats.days', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
            { icon: Clock, value: '11:00-18:00', labelKey: 'stats.time', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
            { icon: MapPin, value: '2', labelKey: 'stats.cities', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <AnimatedChild key={index}>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 h-full border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:-translate-y-1">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto relative overflow-hidden"
                    style={{ background: stat.gradient }}
                  >
                    <div className="absolute inset-0 bg-white/20"></div>
                    <Icon className="relative z-10 w-8 h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                    <p className="text-white/70 mt-1 text-xs sm:text-sm">{t(stat.labelKey)}</p>
                  </div>
                </div>
              </AnimatedChild>
            );
          })}
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={0.7} className="mt-12 sm:mt-16">
          <div className="relative bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center border border-white/20">
            <p className="text-base sm:text-lg text-white/90 font-medium">
              С 1998 года мы провели{' '}
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                32 крупнейших выставки
              </span>{' '}
              &quot;Образование за рубежом&quot;
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}