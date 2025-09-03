'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, Building2, FileText, DollarSign, CheckCircle2, GraduationCap } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: Search,
    titleKey: 'steps.1.title',
    descKey: 'steps.1.desc',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
  },
  {
    number: 2,
    icon: Building2,
    titleKey: 'steps.2.title',
    descKey: 'steps.2.desc',
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
  },
  {
    number: 3,
    icon: FileText,
    titleKey: 'steps.3.title',
    descKey: 'steps.3.desc',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    number: 4,
    icon: DollarSign,
    titleKey: 'steps.4.title',
    descKey: 'steps.4.desc',
    gradient: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-400',
  },
  {
    number: 5,
    icon: CheckCircle2,
    titleKey: 'steps.5.title',
    descKey: 'steps.5.desc',
    gradient: 'from-green-500/20 to-lime-500/20',
    iconColor: 'text-green-400',
  },
  {
    number: 6,
    icon: GraduationCap,
    titleKey: 'steps.6.title',
    descKey: 'steps.6.desc',
    gradient: 'from-indigo-500/20 to-blue-500/20',
    iconColor: 'text-indigo-400',
  },
];

export default function Steps() {
  const { t } = useLanguage();

  return (
    <section className="section-padding relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4">
            {t('steps.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{t('steps.title.highlight')}</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70">
            {t('steps.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative h-full">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Card content */}
                  <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 h-full">
                    {/* Step number */}
                    <div className="absolute top-6 right-6 text-6xl font-bold text-white/5 select-none">
                      {step.number}
                    </div>
                    
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className={`w-7 h-7 ${step.iconColor}`} strokeWidth={1.5} />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-white">
                        {t(step.titleKey)}
                      </h3>
                      <p className="text-white/60 leading-relaxed">
                        {t(step.descKey)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}