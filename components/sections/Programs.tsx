'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Sparkles,      // For British - more modern than Flag
  Zap,           // For American - dynamic and modern
  Network,       // For International - interconnected world
  Languages,     // For Language Exams - specific language icon
  TrendingUp     // For University Prep - growth/progress
} from 'lucide-react';

const programsData = {
  ru: [
    {
      title: 'Британские программы',
      subtitle: 'GCSE, IGCSE, A-Level',
      description: 'Классическое британское образование с международным признанием',
      icon: Sparkles,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Американские программы',
      subtitle: 'High School Program, AP',
      description: 'Гибкая система образования с широким выбором предметов',
      icon: Zap,
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Международные программы',
      subtitle: 'IB PYP, MYP, DP',
      description: 'Всестороннее развитие и международная перспектива',
      icon: Network,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Языковые экзамены',
      subtitle: 'SAT, IELTS, TOEFL',
      description: 'Подготовка к международным языковым сертификатам',
      icon: Languages,
      color: 'from-teal-500 to-teal-600'
    },
    {
      title: 'Подготовка к университету',
      subtitle: 'Foundation, GAP Programs',
      description: 'Программы для успешного поступления в топовые вузы',
      icon: TrendingUp,
      color: 'from-amber-500 to-amber-600'
    }
  ],
  en: [
    {
      title: 'British Programs',
      subtitle: 'GCSE, IGCSE, A-Level',
      description: 'Classic British education with international recognition',
      icon: Sparkles,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'American Programs',
      subtitle: 'High School Program, AP',
      description: 'Flexible education system with wide subject choice',
      icon: Zap,
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'International Programs',
      subtitle: 'IB PYP, MYP, DP',
      description: 'Holistic development and international perspective',
      icon: Network,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Language Exams',
      subtitle: 'SAT, IELTS, TOEFL',
      description: 'Preparation for international language certificates',
      icon: Languages,
      color: 'from-teal-500 to-teal-600'
    },
    {
      title: 'University Preparation',
      subtitle: 'Foundation, GAP Programs',
      description: 'Programs for successful admission to top universities',
      icon: TrendingUp,
      color: 'from-amber-500 to-amber-600'
    }
  ]
};

export default function Programs() {
  const { language } = useLanguage();

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header - Title removed, keeping description */}
          <div className="text-center mb-8">
            <p className="text-white/80 text-base sm:text-lg max-w-3xl mx-auto">
              {language === 'ru' 
                ? 'Выберите подходящую программу обучения для вашего ребенка из широкого спектра международных образовательных систем'
                : 'Choose the right educational program for your child from a wide range of international education systems'}
            </p>
          </div>
          
          {/* Programs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {programsData[language].map((program, index) => {
              const Icon = program.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="h-full glass-card p-4 sm:p-5">
                    {/* Icon Container */}
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${program.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-white font-semibold text-base mb-1">
                      {program.title}
                    </h3>
                    <p className="text-white/90 text-xs font-medium mb-2">
                      {program.subtitle}
                    </p>
                    <p className="text-white/70 text-xs leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-white/80 text-sm sm:text-base">
              {language === 'ru' 
                ? 'Представители школ расскажут о каждой программе подробно на выставке'
                : 'School representatives will provide detailed information about each program at the exhibition'}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}