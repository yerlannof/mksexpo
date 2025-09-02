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
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full filter blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            {t('steps.title')} <span className="text-white/90">{t('steps.title.highlight')}</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t('steps.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:transform hover:scale-[1.02] h-full">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <span className="text-white font-bold text-xl">{step.number}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {t(step.titleKey)}
                      </h3>
                      <p className="text-white/70 text-sm">
                        {t(step.descKey)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Photo Break - After Step 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="my-16 max-w-4xl mx-auto"
        >
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
            <Image
              src="/gallery/photo_2025-09-02_03-39-24.jpg"
              alt={language === 'ru' ? 'Консультация с представителями школ' : 'Consultation with school representatives'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white text-lg font-medium">
                {language === 'ru' ? 'Прямое общение с представителями школ' : 'Direct communication with school representatives'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Additional Photo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-white">
              {language === 'ru' ? 'Профессиональная поддержка' : 'Professional Support'}
            </h3>
            <p className="text-white/70">
              {language === 'ru' ? 'Наши эксперты помогут вам на каждом этапе поступления в частную школу за рубежом.' : 'Our experts will help you at every stage of admission to a private school abroad.'}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/gallery/photo_2025-09-02_03-39-25.jpg"
              alt={language === 'ru' ? 'Презентация программ' : 'Program presentation'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}