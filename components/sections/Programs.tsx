'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const programsData = {
  ru: [
    {
      title: 'британские программы:',
      items: ['GCSE, IGCSE, A-Level']
    },
    {
      title: 'американские программы:',
      items: ['American High School Program, Advanced Placement']
    },
    {
      title: 'международные программы:',
      items: ['IB Primary Years Programme (PYP), IB Middle Years Programme (MYP), IB Diploma Programme (DP)']
    },
    {
      title: 'подготовка к языковым и вступительным экзаменам:',
      items: ['SAT, IELTS, TOEFL']
    },
    {
      title: 'подготовка к поступлению в университет:',
      items: ['Foundation Programs, Pre-university GAP Program и другие']
    }
  ],
  en: [
    {
      title: 'British programs:',
      items: ['GCSE, IGCSE, A-Level']
    },
    {
      title: 'American programs:',
      items: ['American High School Program, Advanced Placement']
    },
    {
      title: 'International programs:',
      items: ['IB Primary Years Programme (PYP), IB Middle Years Programme (MYP), IB Diploma Programme (DP)']
    },
    {
      title: 'Language and entrance exam preparation:',
      items: ['SAT, IELTS, TOEFL']
    },
    {
      title: 'University preparation:',
      items: ['Foundation Programs, Pre-university GAP Program and others']
    }
  ]
};

export default function Programs() {
  const { language } = useLanguage();

  return (
    <section className="py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          {/* Minimalist Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10">
            <h3 className="text-2xl font-semibold text-white mb-8">
              {language === 'ru' ? 'Программы обучения в частных школах:' : 'Private School Programs:'}
            </h3>
            
            {/* Programs List */}
            <div className="space-y-3">
              {programsData[language].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full flex-shrink-0 mt-2" />
                  <div>
                    <span className="text-white/90 text-sm">
                      {category.title} {category.items.join(', ')}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}