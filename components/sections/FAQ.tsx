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
          <AnimatedSection animation="fadeUp" className="text-center mb-8 space-y-2">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-white">
              {t('faq.title')} <span className="text-white/80">{t('faq.title.highlight')}</span>
            </h2>
            <p className="text-sm sm:text-base text-white/80 mt-2">
              {t('faq.subtitle')}
            </p>
          </AnimatedSection>

          {/* FAQ Accordion */}
          <AnimatedSection animation="fadeUp" staggerChildren={0.1} className="space-y-3">
            {faqs.map((faq, index) => (
              <AnimatedChild key={index}>
                <GlassCard
                  variant="default"
                  padding="sm"
                  hoverable
                  className="overflow-hidden py-0"
                >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-4 sm:px-6 py-2 text-left flex items-center justify-between group"
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
                  <div className="px-4 sm:px-6 pb-2 text-sm sm:text-base text-white/70">
                    {faq.answer[language]}
                  </div>
                </div>
                </GlassCard>
              </AnimatedChild>
            ))}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}