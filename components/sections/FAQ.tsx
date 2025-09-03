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
      ru: 'Сколько стоит участие?',
      en: 'How much does it cost to participate?'
    },
    answer: {
      ru: 'Посещение выставки для всех гостей бесплатное. Всё, что нужно — пройти онлайн-регистрацию, чтобы получить доступ ко всем мероприятиям и списку участников.',
      en: 'Exhibition attendance is free for all guests. All you need is to complete online registration to get access to all events and list of participants.'
    },
  },
  {
    question: {
      ru: 'Что я узнаю на выставке?',
      en: 'What will I learn at the exhibition?'
    },
    answer: {
      ru: 'Вы познакомитесь с ведущими частными школами разных стран, узнаете о программах обучения, условиях поступления, стоимости и возможностях получения скидок. Кроме того, сможете лично задать вопросы представителям школ и получить рекомендации именно для вашей ситуации.',
      en: 'You will meet leading private schools from different countries, learn about study programs, admission requirements, costs and scholarship opportunities. You will also be able to ask questions directly to school representatives and get recommendations for your specific situation.'
    },
  },
  {
    question: {
      ru: 'На каком языке будет общение?',
      en: 'What language will be used for communication?'
    },
    answer: {
      ru: 'Основное общение проходит на английском и языке страны, которую представляет школа. Для вашего удобства будут работать переводчики, поэтому вы сможете спокойно обсуждать все вопросы даже без знания иностранных языков.',
      en: 'Main communication is in English and the language of the country the school represents. Interpreters will be available for your convenience, so you can discuss all questions comfortably even without knowledge of foreign languages.'
    },
  },
  {
    question: {
      ru: 'Можно ли получить скидку или стипендию?',
      en: 'Is it possible to get a discount or scholarship?'
    },
    answer: {
      ru: 'Да, многие школы предлагают частичные скидки и гранты для студентов. Полные стипендии встречаются реже, но о доступных вариантах можно будет узнать непосредственно у представителей школ. Также они расскажут, какие условия нужно выполнить, чтобы претендовать на финансовую поддержку.',
      en: 'Yes, many schools offer partial discounts and grants for students. Full scholarships are less common, but you can learn about available options directly from school representatives. They will also explain what conditions need to be met to qualify for financial support.'
    },
  },
  {
    question: {
      ru: 'Где найти список участников?',
      en: 'Where can I find the list of participants?'
    },
    answer: {
      ru: 'Полный список школ-участников с кратким описанием каждой из них вы получите на этапе онлайн-регистрации. Это поможет заранее составить план и выделить те школы, которые интересуют вас больше всего.',
      en: 'You will receive a complete list of participating schools with brief descriptions during online registration. This will help you plan ahead and identify schools that interest you most.'
    },
  },
  {
    question: {
      ru: 'Обязательно приходить к открытию?',
      en: 'Is it mandatory to come to the opening?'
    },
    answer: {
      ru: 'Нет, строгого времени прихода нет — вы можете прийти в любое удобное время в течение дня. Но мы рекомендуем заранее посмотреть расписание презентаций, чтобы не пропустить выступления и встречи, которые важны именно для вас.',
      en: 'No, there is no strict arrival time - you can come at any convenient time during the day. However, we recommend checking the presentation schedule in advance to not miss the talks and meetings that are important to you.'
    },
  },
  {
    question: {
      ru: 'Можно ли прийти с семьей или друзьями?',
      en: 'Can I come with family or friends?'
    },
    answer: {
      ru: 'Конечно, выставку можно посещать вместе с близкими. Если вы приходите не с членами семьи, то вашим друзьям или знакомым также нужно будет зарегистрироваться. Это сделает посещение удобным для всех.',
      en: 'Of course, you can visit the exhibition with loved ones. If you are not coming with family members, your friends or acquaintances will also need to register. This will make the visit convenient for everyone.'
    },
  },
  {
    question: {
      ru: 'С какого возраста принимают в школы?',
      en: 'From what age do schools accept students?'
    },
    answer: {
      ru: 'Большинство школ принимают детей начиная примерно с 11–12 лет и до окончания средней школы. Но требования могут отличаться, поэтому лучше уточнять детали у представителей конкретной школы на выставке.',
      en: 'Most schools accept children starting from about 11-12 years old until the end of high school. However, requirements may vary, so it is better to clarify details with representatives of specific schools at the exhibition.'
    },
  },
  {
    question: {
      ru: 'Будут ли личные консультации?',
      en: 'Will there be personal consultations?'
    },
    answer: {
      ru: 'Да, у вас будет возможность индивидуально пообщаться с представителями школ. Они ответят на ваши вопросы, помогут оценить перспективы и дадут практические рекомендации по поступлению.',
      en: 'Yes, you will have the opportunity to communicate individually with school representatives. They will answer your questions, help assess prospects and give practical recommendations for admission.'
    },
  },
  {
    question: {
      ru: 'Сколько времени стоит запланировать на выставку?',
      en: 'How much time should I plan for the exhibition?'
    },
    answer: {
      ru: 'В среднем достаточно 1–2 часов, чтобы пройтись по стендам и пообщаться с представителями. Но если вы хотите подробно посетить презентации и воспользоваться возможностью для личных консультаций, лучше выделить половину дня.',
      en: 'On average, 1-2 hours is enough to visit the stands and talk with representatives. But if you want to attend presentations in detail and take advantage of personal consultations, it is better to allocate half a day.'
    },
  },
  {
    question: {
      ru: 'Нужно ли знать английский для участия?',
      en: 'Do I need to know English to participate?'
    },
    answer: {
      ru: 'Нет, знание английского не обязательно. На выставке будут работать переводчики, которые помогут вам в общении с представителями школ, поэтому все вопросы вы сможете задать без языковых барьеров.',
      en: 'No, knowledge of English is not required. Interpreters will be working at the exhibition to help you communicate with school representatives, so you can ask all questions without language barriers.'
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
            <h2 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-white">
              {t('faq.title')} <span className="text-white">{t('faq.title.highlight')}</span>
            </h2>
            <p className="text-sm sm:text-base text-white/80">
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
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between group"
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
                  <div className="px-4 sm:px-6 pb-3 sm:pb-4 text-sm sm:text-base text-white/70">
                    {faq.answer[language]}
                  </div>
                </div>
                </GlassCard>
              </AnimatedChild>
            ))}
          </AnimatedSection>

          {/* Contact Section - Minimalist Style */}
          <AnimatedSection animation="fadeUp" delay={0.5} className="mt-12 sm:mt-16">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-lg sm:text-xl font-display font-bold mb-3 text-white">
                {language === 'ru' ? 'Остались вопросы?' : 'Still have questions?'}
              </h3>
              <p className="text-white/70 mb-8 text-sm sm:text-base">
                {language === 'ru' 
                  ? 'Свяжитесь с нами, и мы с радостью ответим на все ваши вопросы'
                  : 'Contact us and we will be happy to answer all your questions'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="https://wa.me/77771110808"
                  className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-all duration-300 text-white"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span className="text-sm font-medium">+7 777 111 08 08</span>
                </a>
                <a 
                  href="tel:+77272588583"
                  className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-all duration-300 text-white"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">+7 (727) 258-85-83</span>
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}