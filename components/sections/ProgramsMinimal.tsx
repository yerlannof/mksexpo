'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronRight } from 'lucide-react';

const programsData = {
  ru: [
    {
      category: 'Британские программы',
      programs: ['GCSE', 'IGCSE', 'A-Level'],
      accent: 'text-blue-400'
    },
    {
      category: 'Американские программы',
      programs: ['High School Program', 'Advanced Placement'],
      accent: 'text-indigo-400'
    },
    {
      category: 'Международные программы',
      programs: ['IB PYP', 'IB MYP', 'IB DP'],
      accent: 'text-purple-400'
    },
    {
      category: 'Языковые экзамены',
      programs: ['SAT', 'IELTS', 'TOEFL'],
      accent: 'text-teal-400'
    },
    {
      category: 'Подготовка к университету',
      programs: ['Foundation Programs', 'Pre-university GAP Program'],
      accent: 'text-amber-400'
    }
  ],
  en: [
    {
      category: 'British Programs',
      programs: ['GCSE', 'IGCSE', 'A-Level'],
      accent: 'text-blue-400'
    },
    {
      category: 'American Programs',
      programs: ['High School Program', 'Advanced Placement'],
      accent: 'text-indigo-400'
    },
    {
      category: 'International Programs',
      programs: ['IB PYP', 'IB MYP', 'IB DP'],
      accent: 'text-purple-400'
    },
    {
      category: 'Language Exams',
      programs: ['SAT', 'IELTS', 'TOEFL'],
      accent: 'text-teal-400'
    },
    {
      category: 'University Preparation',
      programs: ['Foundation Programs', 'Pre-university GAP Program'],
      accent: 'text-amber-400'
    }
  ]
};

export default function ProgramsMinimal() {
  const { language } = useLanguage();

  return (
    <section className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              {language === 'ru' 
                ? 'Образовательные программы'
                : 'Educational Programs'}
            </h2>
            <p className="text-white/80 text-lg sm:text-xl">
              {language === 'ru' 
                ? 'Международные стандарты образования'
                : 'International Education Standards'}
            </p>
          </div>
          
          {/* Programs List */}
          <div className="space-y-1">
            {programsData[language].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="flex items-center justify-between py-6 px-4 sm:px-8 rounded-lg hover:bg-white/5 transition-colors duration-300 cursor-pointer">
                  <div className="flex-1">
                    <h3 className={`text-lg sm:text-xl font-semibold mb-2 ${item.accent} group-hover:text-white transition-colors`}>
                      {item.category}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {item.programs.map((program, pIndex) => (
                        <span 
                          key={pIndex}
                          className="text-white/70 text-sm sm:text-base bg-white/10 px-3 py-1 rounded-full"
                        >
                          {program}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
                </div>
                {index < programsData[language].length - 1 && (
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}