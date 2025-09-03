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
      subtitle: 'General Certificate of Secondary Education (GCSE), International GCSE (IGCSE), Advanced Level (A-Level)',
      description: 'Классическое британское образование с международным признанием',
      icon: Sparkles,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Американские программы',
      subtitle: 'High School Program, Advanced Placement (AP)',
      description: 'Современное образование по стандартам США с гибкой системой предметов и акцентом на практические навыки',
      icon: Zap,
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Международные программы',
      subtitle: 'International Baccalaureate Primary Years Programme (IB PYP), Middle Years Programme (MYP), Diploma Programme (DP)',
      description: 'Универсальная система обучения, развивающая критическое мышление, самостоятельность и глобальное видение',
      icon: Network,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Языковые экзамены',
      subtitle: 'TOEFL, PTE, IELTS, SAT, CAT',
      description: 'Подготовка к международным языковым сертификатам',
      icon: Languages,
      color: 'from-teal-500 to-teal-600'
    },
    {
      title: 'Подготовка к университету',
      subtitle: 'Foundation Programs, Pre-University GAP Program, International Foundation Year, University Pathway Programs',
      description: 'Программы для выпускников 11 классов Казахстана, которые помогают адаптироваться к системе зарубежного образования. Включают академические предметы, интенсивный английский и подготовку к поступлению в университеты по всему миру. Программы для успешного поступления в топовые вузы',
      icon: TrendingUp,
      color: 'from-amber-500 to-amber-600'
    }
  ],
  en: [
    {
      title: 'British Programs',
      subtitle: 'General Certificate of Secondary Education (GCSE), International GCSE (IGCSE), Advanced Level (A-Level)',
      description: 'Classic British education with international recognition',
      icon: Sparkles,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'American Programs',
      subtitle: 'High School Program, Advanced Placement (AP)',
      description: 'Modern education according to US standards with flexible subject system and emphasis on practical skills',
      icon: Zap,
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'International Programs',
      subtitle: 'International Baccalaureate Primary Years Programme (IB PYP), Middle Years Programme (MYP), Diploma Programme (DP)',
      description: 'Universal learning system developing critical thinking, independence and global vision',
      icon: Network,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Language Exams',
      subtitle: 'TOEFL, PTE, IELTS, SAT, CAT',
      description: 'Preparation for international language certificates',
      icon: Languages,
      color: 'from-teal-500 to-teal-600'
    },
    {
      title: 'University Preparation',
      subtitle: 'Foundation Programs, Pre-University GAP Program, International Foundation Year, University Pathway Programs',
      description: 'Programs for 11th grade graduates from Kazakhstan that help adapt to foreign education systems. Include academic subjects, intensive English and university admission preparation worldwide',
      icon: TrendingUp,
      color: 'from-amber-500 to-amber-600'
    }
  ]
};

export default function Programs() {
  const { language } = useLanguage();

  return (
    <section id="programs" className="py-10 sm:py-12 lg:py-16">
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
                ? 'Выберите подходящую программу обучения для вашего ребенка'
                : 'Choose the right educational program for your child'}
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
                  <div className="h-full glass-card p-4 hover:bg-white/[0.08] transition-all duration-300 cursor-pointer">
                    {/* Header with Icon */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${program.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-white font-semibold text-sm leading-tight">
                        {program.title}
                      </h3>
                    </div>
                    
                    {/* Subtitle - More compact */}
                    <p className="text-white/80 text-xs mb-2 font-medium">
                      {program.subtitle}
                    </p>
                    
                    {/* Description - Always visible */}
                    <p className="text-white/70 text-xs leading-snug mt-2">
                      {program.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}