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
    <>
      <section className="py-16 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <p className="text-gray-700 text-lg mb-12 max-w-4xl">
              {language === 'ru' 
                ? 'Присоединяйтесь к крупнейшей выставке частных школ в Алматы, чтобы выбрать подходящую школу и программу обучения:'
                : 'Join the largest private school exhibition in Almaty to choose the right school and educational program:'}
            </p>
            
            {/* Programs Grid */}
            <div className="grid md:grid-cols-5 gap-8">
              {programsData[language].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-left"
                >
                  <p className="text-gray-900 text-base leading-relaxed">
                    • <span className="font-medium">{category.title}</span><br/>
                    <span className="text-gray-700">{category.items.join(', ')}</span>
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50/50 to-secondary-50/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
              {language === 'ru' 
                ? 'Только здесь у вас будет возможность:'
                : 'Only here you will have the opportunity to:'}
            </h3>
            
            <div className="space-y-4 text-left max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <span className="text-primary text-xl">•</span>
                <p className="text-gray-700 text-lg">
                  {language === 'ru'
                    ? 'Встретиться лично с представителями лучших частных школ мира.'
                    : 'Meet personally with representatives of the best private schools in the world.'}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <span className="text-primary text-xl">•</span>
                <p className="text-gray-700 text-lg">
                  {language === 'ru'
                    ? 'Узнать все о поступлении, программах и стипендиях напрямую.'
                    : 'Learn everything about admission, programs and scholarships directly.'}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <span className="text-primary text-xl">•</span>
                <p className="text-gray-700 text-lg">
                  {language === 'ru'
                    ? 'Подобрать школу, которая максимально соответствует интересам и целям вашего ребенка.'
                    : 'Choose a school that best matches your child\'s interests and goals.'}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}