'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, Mail, Phone } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedSection, { AnimatedChild } from '@/components/AnimatedSection';
import AnimatedButton from '@/components/ui/AnimatedButton';

interface FAQItem {
  question: {
    ru: string;
    en: string;
  };
  answer: {
    ru: string;
    en: string;
  };
}

const faqs: FAQItem[] = [
  {
    question: {
      ru: 'Какие частные школы будут представлены на выставке?',
      en: 'Which private schools will be represented at the exhibition?'
    },
    answer: {
      ru: 'На выставке будут представлены ведущие частные школы из Великобритании, США, Швейцарии, Канады и Германии. Среди них Harrow School, Wellington College, Phillips Academy, Le Rosey и другие престижные учебные заведения.',
      en: 'The exhibition will feature leading private schools from UK, USA, Switzerland, Canada and Germany. Including Harrow School, Wellington College, Phillips Academy, Le Rosey and other prestigious institutions.'
    },
  },
  {
    question: {
      ru: 'Какие программы обучения предлагают частные школы?',
      en: 'What educational programs do private schools offer?'
    },
    answer: {
      ru: 'Частные школы предлагают различные программы: британская система (GCSE, A-Level), американская система (High School, AP), программа International Baccalaureate (IB), а также национальные программы с углубленным изучением языков.',
      en: 'Private schools offer various programs: British system (GCSE, A-Level), American system (High School, AP), International Baccalaureate (IB), as well as national programs with intensive language study.'
    },
  },
  {
    question: {
      ru: 'Чем отличается обучение в частной школе от государственной?',
      en: 'What is the difference between private and public school education?'
    },
    answer: {
      ru: 'Частные школы предлагают небольшие классы (8-12 учеников), индивидуальный подход, широкий выбор предметов и внеклассных активностей, современное оснащение, подготовку к поступлению в топовые университеты мира.',
      en: 'Private schools offer small classes (8-12 students), individual approach, wide choice of subjects and extracurricular activities, modern facilities, preparation for admission to top world universities.'
    },
  },
  {
    question: {
      ru: 'Какая стоимость обучения в частных школах?',
      en: 'What is the cost of private school education?'
    },
    answer: {
      ru: 'Стоимость обучения варьируется от 20,000 до 80,000 долларов в год в зависимости от страны, типа школы (дневная или пансион) и программы. Многие школы предлагают стипендии для талантливых учеников.',
      en: 'Tuition fees range from $20,000 to $80,000 per year depending on country, school type (day or boarding) and program. Many schools offer scholarships for talented students.'
    },
  },
  {
    question: {
      ru: 'С какого возраста можно поступить в частную школу?',
      en: 'From what age can you enroll in a private school?'
    },
    answer: {
      ru: 'Большинство частных школ принимают учеников с 11-13 лет, но есть школы с начальными классами от 7 лет. Оптимальный возраст для поступления в школу-пансион — 13-14 лет.',
      en: 'Most private schools accept students from 11-13 years old, but there are schools with primary classes from 7 years old. The optimal age for boarding school admission is 13-14 years.'
    },
  },
  {
    question: {
      ru: 'Какие требования для поступления в частные школы?',
      en: 'What are the admission requirements for private schools?'
    },
    answer: {
      ru: 'Основные требования: хорошая успеваемость, знание английского языка (IELTS/TOEFL), мотивационное письмо, рекомендации от учителей. Некоторые школы проводят вступительные экзамены и интервью.',
      en: 'Main requirements: good academic performance, English proficiency (IELTS/TOEFL), motivation letter, teacher recommendations. Some schools conduct entrance exams and interviews.'
    },
  },
  {
    question: {
      ru: 'Нужна ли предварительная регистрация на выставку?',
      en: 'Is pre-registration required for the exhibition?'
    },
    answer: {
      ru: 'Да, регистрация обязательна. Это позволит нам подготовить для вас персональную программу встреч со школами, соответствующими вашим критериям.',
      en: 'Yes, registration is mandatory. This will allow us to prepare a personalized meeting program with schools that match your criteria.'
    },
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { language, t } = useLanguage();

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-padding relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <AnimatedSection animation="fadeUp" className="text-center mb-12 sm:mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">
              {t('faq.title')} <span className="text-white">{t('faq.title.highlight')}</span>
            </h2>
            <p className="text-base sm:text-lg text-white/80">
              {t('faq.subtitle')}
            </p>
          </AnimatedSection>

          {/* FAQ Accordion */}
          <AnimatedSection animation="fadeUp" staggerChildren={0.1} className="space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedChild key={index}>
                <GlassCard
                  variant="default"
                  padding="sm"
                  hoverable
                  className="overflow-hidden"
                >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-6 text-left flex items-center justify-between group"
                >
                  <span className="font-semibold text-base sm:text-lg pr-4 text-white group-hover:text-white/90 transition-colors">
                    {faq.question[language]}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 text-white/60 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 text-sm sm:text-base text-white/70">
                    {faq.answer[language]}
                  </div>
                </div>
                </GlassCard>
              </AnimatedChild>
            ))}
          </AnimatedSection>

          {/* Contact Section */}
          <AnimatedSection animation="fadeUp" delay={0.5} className="mt-12 sm:mt-16 text-center">
            <GlassCard variant="gradient" padding="xl">
              <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4 text-white">
                {language === 'ru' ? 'Остались вопросы?' : 'Still have questions?'}
              </h3>
              <p className="text-white/80 mb-6 sm:mb-8 text-base sm:text-lg">
                {language === 'ru' 
                  ? 'Свяжитесь с нами, и мы с радостью ответим на все ваши вопросы'
                  : 'Contact us and we will be happy to answer all your questions'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton
                  variant="secondary"
                  size="lg"
                  href="mailto:info@mkeducation.kz"
                  leftIcon={<Mail className="w-5 h-5" />}
                  className="w-full sm:w-auto"
                >
                  info@mkeducation.kz
                </AnimatedButton>
                <AnimatedButton
                  variant="primary"
                  size="lg"
                  href="tel:+77272588583"
                  leftIcon={<Phone className="w-5 h-5" />}
                  className="w-full sm:w-auto"
                >
                  +7 (727) 258-85-83
                </AnimatedButton>
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}