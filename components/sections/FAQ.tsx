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
      ru: 'Сколько стоит посещение выставки?',
      en: 'How much does it cost to visit the exhibition?'
    },
    answer: {
      ru: 'Регистрация и вход на выставку бесплатные для посетителей.',
      en: 'Registration and admission to the exhibition are free for visitors.'
    },
  },
  {
    question: {
      ru: 'Что я узнаю на выставке?',
      en: 'What will I learn at the exhibition?'
    },
    answer: {
      ru: 'Вы сможете узнать об образовательных организациях разных стран, их программах и правилах приема. Любые вопросы можно будет задать лично представителям.',
      en: 'You will learn about educational institutions from different countries, their programs and admission requirements. You can ask representatives any questions in person.'
    },
  },
  {
    question: {
      ru: 'На каком языке будет проходить мероприятие?',
      en: 'What language will the event be held in?'
    },
    answer: {
      ru: 'Представители зарубежных образовательных организаций общаются с посетителями с помощью переводчиков. Большинство из них владеют английским и языком представляемой страны.',
      en: 'Representatives of foreign educational institutions communicate with visitors through interpreters. Most of them speak English and the language of the country they represent.'
    },
  },
  {
    question: {
      ru: 'Смогу ли я получить стипендию?',
      en: 'Can I get a scholarship?'
    },
    answer: {
      ru: 'Большинство университетов ведут обучение на платной основе, но некоторые из них предоставляют скидки на обучение. Стипендии с полным покрытием стоимости обучения встречаются редко.',
      en: 'Most universities charge tuition fees, but some offer discounts. Full scholarships covering the entire cost of education are rare.'
    },
  },
  {
    question: {
      ru: 'Где я могу найти информацию об участниках?',
      en: 'Where can I find information about participants?'
    },
    answer: {
      ru: 'Список участвующих образовательных организаций с основной информацией о них доступен на этой странице в разделе "Список участников".',
      en: 'The list of participating educational institutions with basic information about them is available on this page in the "List of Participants" section.'
    },
  },
  {
    question: {
      ru: 'Нужно ли мне прийти к началу выставки?',
      en: 'Do I need to arrive at the beginning of the exhibition?'
    },
    answer: {
      ru: 'Вы можете прийти в любое удобное для вас время — общение с представителями образовательных организаций идет в течение всей выставки.',
      en: 'You can come at any time convenient for you — communication with representatives of educational institutions takes place throughout the exhibition.'
    },
  },
  {
    question: {
      ru: 'Могу ли я прийти на выставку с кем-то?',
      en: 'Can I come to the exhibition with someone?'
    },
    answer: {
      ru: 'Да, но если это не члены вашей семьи, гостю также необходимо пройти регистрацию.',
      en: 'Yes, but if they are not members of your family, the guest also needs to register.'
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