'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, Globe, FileText, Calculator, CheckCircle, GraduationCap } from 'lucide-react';
import Image from 'next/image';

const steps = [
  {
    number: 1,
    icon: Search,
    titleKey: 'steps.1.title',
    descKey: 'steps.1.desc',
    color: 'from-blue-500 to-blue-600',
  },
  {
    number: 2,
    icon: Globe,
    titleKey: 'steps.2.title',
    descKey: 'steps.2.desc',
    color: 'from-purple-500 to-purple-600',
  },
  {
    number: 3,
    icon: FileText,
    titleKey: 'steps.3.title',
    descKey: 'steps.3.desc',
    color: 'from-pink-500 to-pink-600',
  },
  {
    number: 4,
    icon: Calculator,
    titleKey: 'steps.4.title',
    descKey: 'steps.4.desc',
    color: 'from-orange-500 to-orange-600',
  },
  {
    number: 5,
    icon: CheckCircle,
    titleKey: 'steps.5.title',
    descKey: 'steps.5.desc',
    color: 'from-green-500 to-green-600',
  },
  {
    number: 6,
    icon: GraduationCap,
    titleKey: 'steps.6.title',
    descKey: 'steps.6.desc',
    color: 'from-indigo-500 to-indigo-600',
  },
];

export default function Steps() {
  const { t, language } = useLanguage();

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
            {t('steps.title')} <span className="text-white/90">{t('steps.title.highlight')}</span>
          </h2>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            {t('steps.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-300 h-full">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white font-bold text-lg">{step.number}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-white mb-1">
                        {t(step.titleKey)}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed">
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