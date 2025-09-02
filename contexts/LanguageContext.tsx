'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isChanging: boolean;
}

const translations = {
  ru: {
    // Header
    'nav.opportunities': 'Возможности',
    'nav.programs': 'Программы',
    'nav.participants': 'Участники',
    'nav.timeline': 'Программа',
    'nav.steps': 'Как участвовать',
    'nav.whyvisit': 'Почему мы',
    'nav.testimonials': 'Отзывы',
    'nav.registration': 'Регистрация',
    'nav.faq': 'FAQ',
    
    // Hero
    'hero.badge': 'Путь к успешному будущему',
    'hero.title': 'Выставка',
    'hero.subtitle': 'Частные школы',
    'hero.subtitle2': '',
    'hero.title.main': 'Выставка\n«Частные школы\nза рубежом»',
    'hero.subtitle.main': '– ваш шанс сделать правильный выбор для будущего ребенка.',
    'hero.dates': 'Астана – 04 октября, 13:00-17:00, Hilton Astana Hotel (EXPO)\nАлматы – 05 октября, 13:00-17:00, Rixos Almaty Hotel',
    'hero.subtitle.desc': '',
    'hero.cta.apply': 'Зарегистрироваться',
    'hero.date.astana': 'Астана',
    'hero.date.almaty': 'Алматы',
    'hero.countdown.days': 'Дней',
    'hero.countdown.hours': 'Часов',
    'hero.countdown.minutes': 'Минут',
    'hero.countdown.seconds': 'Секунд',
    'hero.cta.register': 'Зарегистрироваться бесплатно',
    'hero.cta.participants': 'Список участников',
    'hero.stats.schools': 'Частных школ',
    'hero.stats.countries': 'Стран',
    'hero.stats.visitors': 'Консультаций',
    'hero.years': 'лет опыта',
    'hero.students': 'успешных студентов',
    'hero.stats.years': 'лет опыта',
    'hero.stats.students': 'студентов обучили',
    'hero.stats.partners': 'школ-партнеров',
    'hero.stats.countries.count': 'стран',
    'hero.programs.title': 'Программы обучения в частных школах:',
    'hero.programs.british': 'Британская система (GCSE, A-Level)',
    'hero.programs.american': 'Американская система (High School, AP)',
    'hero.programs.ib': 'International Baccalaureate (IB)',
    'hero.programs.boarding': 'Школы-пансионы',
    'hero.programs.day': 'Дневные школы',
    'hero.programs.foundation': 'Подготовительные программы',
    
    
    // Timeline
    'timeline.title': 'Программа',
    'timeline.title.highlight': 'мероприятия',
    'timeline.subtitle': 'Простой и эффективный формат встреч',
    'timeline.schedule.registration': 'Регистрация и приветствие',
    'timeline.schedule.registration.desc': 'Получите бейдж и программу выставки',
    'timeline.schedule.meetings': 'Встречи с представителями школ',
    'timeline.schedule.meetings.desc': 'Персональные консультации с каждой школой',
    'timeline.schedule.consultations': 'Индивидуальные консультации',
    'timeline.schedule.consultations.desc': 'Помощь в выборе подходящей программы обучения',
    'timeline.schedule.specialoffers': 'Специальные предложения',
    'timeline.schedule.specialoffers.desc': 'Эксклюзивные условия для участников выставки',
    
    // Participants
    'participants.title': 'Школы',
    'participants.title.highlight': 'участники',
    'participants.subtitle': 'Встретьтесь с представителями ведущих частных школ',
    
    // Steps
    'steps.title': '6 шагов',
    'steps.title.highlight': 'к поступлению',
    'steps.subtitle': 'Простой путь к образованию в частной школе за рубежом',
    'steps.1.title': 'Рассмотрите дневные школы и пансионы',
    'steps.1.desc': 'Совместное и раздельное обучение, городские и загородные кампусы',
    'steps.2.title': 'Подберите языковые курсы или летний лагерь',
    'steps.2.desc': 'Языковые курсы или летний лагерь за рубежом',
    'steps.3.title': 'Узнайте о требованиях к обучающимся',
    'steps.3.desc': 'Требования к обучающимся и процессе поступления',
    'steps.4.title': 'Уточните стоимость обучения',
    'steps.4.desc': 'Стоимость обучения и условия проживания',
    'steps.5.title': 'Разберитесь, как подготовить документы',
    'steps.5.desc': 'Подготовить необходимые документы и оформить визу',
    'steps.6.title': 'Пройдите бесплатное тестирование',
    'steps.6.desc': 'Бесплатное тестирование по английскому языку',
    
    // Registration
    'registration.title': 'Бесплатная',
    'registration.title.highlight': 'регистрация',
    'registration.subtitle': 'Забронируйте место на выставке',
    'registration.firstName': 'Имя',
    'registration.firstName.placeholder': 'Введите ваше имя',
    'registration.lastName': 'Фамилия',
    'registration.lastName.placeholder': 'Введите вашу фамилию',
    'registration.birthDate': 'Дата рождения',
    'registration.phone': 'Телефон',
    'registration.phone.placeholder': '+7 (___) ___-__-__',
    'registration.email': 'E-mail',
    'registration.email.placeholder': 'your@email.com',
    'registration.educationLevel': 'Уровень образования',
    'registration.educationLevel.placeholder': 'Выберите уровень',
    'registration.educationLevel.middle': 'Средняя школа',
    'registration.educationLevel.high': 'Старшая школа',
    'registration.educationLevel.prep': 'Подготовительная программа',
    'registration.educationLevel.bachelor': 'Бакалавриат',
    'registration.educationLevel.master': 'Магистратура',
    'registration.educationLevel.other': 'Другое',
    'registration.programs': 'Интересующие программы обучения',
    'registration.programs.ib': 'International Baccalaureate (IB)',
    'registration.programs.gcse': 'GCSE and A-level',
    'registration.programs.ap': 'Advanced Placement (USA)',
    'registration.programs.local': 'Местные программы',
    'registration.programs.summer': 'Летние программы',
    'registration.programs.language': 'Языковые курсы',
    'registration.agreement': 'Я ознакомился(-ась) и принимаю Пользовательское соглашение и Политику конфиденциальности, включая обработку персональных данных и фото/видеосъемку на мероприятии.',
    'registration.submit': 'Зарегистрироваться',
    'registration.name': 'Ваше имя',
    'registration.city': 'Выберите город',
    'registration.city.astana': 'Астана - 4 октября',
    'registration.city.almaty': 'Алматы - 5 октября',
    'registration.child.age': 'Возраст ребёнка',
    'registration.child.class': 'Текущий класс',
    'registration.countries': 'Интересующие страны',
    'registration.countries.uk': 'Великобритания',
    'registration.countries.usa': 'США',
    'registration.countries.canada': 'Канада',
    'registration.countries.europe': 'Европа',
    'registration.countries.asia': 'Азия',
    'registration.budget': 'Планируемый бюджет в год',
    'registration.questions': 'Ваши вопросы (необязательно)',
    'registration.privacy': 'Нажимая кнопку, вы соглашаетесь с',
    'registration.privacy.link': 'политикой конфиденциальности',
    'registration.benefits': 'После регистрации вы получите:',
    'registration.benefit1': 'Подтверждение регистрации',
    'registration.benefit2': 'Программу выставки',
    'registration.benefit3': 'Список школ-участников',
    'registration.benefit4': 'Время вашей консультации',
    
    // FAQ
    'faq.title': 'Часто задаваемые',
    'faq.title.highlight': 'вопросы',
    'faq.subtitle': 'Ответы на популярные вопросы о выставке',
    
    // Footer
    'footer.about': 'О компании',
    'footer.about.desc': 'M&K Education — ведущий образовательный центр в Казахстане с 27-летним опытом работы',
    'footer.quickLinks': 'Быстрые ссылки',
    'footer.contact': 'Контакты',
    'footer.phone': 'Телефон',
    'footer.email': 'Email',
    'footer.address': 'Адрес',
    'footer.address.almaty': 'Алматы, ул. Богенбай батыра 132',
    'footer.address.astana': 'Астана, ул. Сыганак 18/1',
    'footer.social': 'Социальные сети',
    'footer.rights': 'Все права защищены',
    'timeline.date.almaty': '5 октября 2025',
    'timeline.venue.astana': 'Отель «Rixos President Astana»',
    'timeline.venue.almaty': 'Отель «Rixos Almaty»',
    
    // Participants
    'participants.organizer': 'Организатор выставки',
    'participants.organizer.desc': '27 лет успешной работы в образовании',
    
    // Testimonials Names
    'testimonials.name1': 'Айгерим Касымова',
    'testimonials.role1': 'Мама ученика Harrow School',
    'testimonials.text1': 'Благодаря выставке M&K мы нашли идеальную школу для нашего сына. Личное общение с представителями помогло развеять все сомнения.',
    'testimonials.name2': 'Данияр Ахметов',
    'testimonials.role2': 'Отец выпускницы Eton College',
    'testimonials.text2': 'M&K Education сопровождали нас на всех этапах поступления. Профессиональная команда, которой можно доверять.',
    'testimonials.name3': 'Сауле Нурланова',
    'testimonials.role3': 'Мама студента Westminster School',
    'testimonials.text3': 'На выставке получили не только информацию о школах, но и помощь с грантом. Сын получил стипендию 30%!',
    'testimonials.cta.text': 'Присоединяйтесь к тысячам счастливых семей, которые нашли идеальное образование для своих детей',
    'testimonials.cta.button': 'Начать путь к успеху',
  },
  en: {
    // Header
    'nav.opportunities': 'Opportunities',
    'nav.programs': 'Programs',
    'nav.participants': 'Participants',
    'nav.timeline': 'Program',
    'nav.steps': 'How to Participate',
    'nav.whyvisit': 'Why Visit',
    'nav.testimonials': 'Testimonials',
    'nav.registration': 'Registration',
    'nav.faq': 'FAQ',
    
    // Hero
    'hero.badge': 'World-class education',
    'hero.title': 'Exhibition',
    'hero.subtitle': 'Private Schools',
    'hero.subtitle2': 'Abroad',
    'hero.title.main': 'Exhibition\n«Private Schools\nAbroad»',
    'hero.subtitle.main': '– your chance to make the right choice for your child\'s future.',
    'hero.subtitle.desc': 'Meet representatives from leading private schools worldwide and choose the best future for your child',
    'hero.cta.apply': 'Register',
    'hero.date.astana': 'Astana',
    'hero.date.almaty': 'Almaty',
    'hero.countdown.days': 'Days',
    'hero.countdown.hours': 'Hours',
    'hero.countdown.minutes': 'Minutes',
    'hero.countdown.seconds': 'Seconds',
    'hero.dates': 'Astana – October 4, 13:00-17:00, Hilton Astana Hotel (EXPO)\nAlmaty – October 5, 13:00-17:00, Rixos Almaty Hotel',
    'hero.cta.register': 'Register for free',
    'hero.cta.participants': 'List of participants',
    'hero.programs.title': 'Programs Available',
    'hero.programs.british': 'British Program (A-Levels)',
    'hero.programs.american': 'American Program (AP)',
    'hero.programs.ib': 'International Baccalaureate (IB)',
    'hero.programs.boarding': 'Boarding Schools',
    'hero.programs.day': 'Day Schools',
    'hero.programs.foundation': 'Foundation Programs',
    'hero.stats.schools': 'Participating schools',
    'hero.stats.countries': 'Countries',
    'hero.stats.visitors': 'Visitors',
    'hero.years': 'years of experience',
    'hero.students': 'successful students',
    'hero.stats.years': 'years in business',
    'hero.stats.students': 'students placed',
    'hero.stats.partners': 'partner schools',
    'hero.stats.countries.count': 'countries available',
    
    // Statistics
    'stats.title': 'Exhibition dates',
    'stats.subtitle': "Don't miss the main educational event of the year! Time until exhibition:",
    'stats.countdown.astana': 'Until exhibition in Astana',
    'stats.schools': 'Private schools',
    'stats.days': 'Exhibition days',
    'stats.time': 'Working hours',
    'stats.cities': 'Cities',
    
    // Why Visit
    'why.title': 'Why you should',
    'why.title.highlight': 'visit the exhibition',
    'why.subtitle': 'A unique opportunity to choose the best school for your child in one day',
    'why.meetings.title': 'Meetings with representatives',
    'why.meetings.desc': 'Personal communication with admissions committees of top schools',
    'why.countries.title': '20+ countries',
    'why.countries.desc': 'Schools from UK, USA, Canada, Europe and Asia',
    'why.scholarships.title': 'Exclusive scholarships',
    'why.scholarships.desc': 'Grants up to 50% of tuition for exhibition participants',
    'why.consultations.title': 'Expert consultations',
    'why.consultations.desc': '27 years of experience in international education at your service',
    'why.documents.title': 'Document assessment',
    'why.documents.desc': 'On-site readiness check for admission',
    'why.offers.title': 'Special offers',
    'why.offers.desc': 'Discounts on preparation and visa support for visitors',
    'why.cta.title': "Don't miss the opportunity!",
    'why.cta.desc': 'Places are limited. Register now to guarantee participation',
    
    // Timeline
    'timeline.title': 'Event',
    'timeline.title.highlight': 'program',
    'timeline.subtitle': 'An eventful day that will change your child\'s future',
    
    // Participants
    'participants.title': 'Exhibition',
    'participants.title.highlight': 'participants',
    'participants.subtitle': "The world's best private schools in one place",
    
    // Testimonials
    'testimonials.title': 'Parent',
    'testimonials.title.highlight': 'testimonials',
    'testimonials.subtitle': 'Success stories from our clients',
    
    // Registration
    'registration.title': 'Free',
    'registration.title.highlight': 'registration',
    'registration.subtitle': 'Register now and get a personal consultation',
    'registration.firstName': 'First Name',
    'registration.firstName.placeholder': 'Enter your first name',
    'registration.lastName': 'Last Name',
    'registration.lastName.placeholder': 'Enter your last name',
    'registration.birthDate': 'Date of Birth',
    'registration.phone': 'Phone',
    'registration.phone.placeholder': '+7 (___) ___-__-__',
    'registration.email': 'E-mail',
    'registration.email.placeholder': 'your@email.com',
    'registration.educationLevel': 'Education Level',
    'registration.educationLevel.placeholder': 'Select level',
    'registration.educationLevel.middle': 'Middle School',
    'registration.educationLevel.high': 'High School',
    'registration.educationLevel.prep': 'Preparatory Program',
    'registration.educationLevel.bachelor': 'Bachelor',
    'registration.educationLevel.master': 'Master',
    'registration.educationLevel.other': 'Other',
    'registration.programs': 'Programs of Interest',
    'registration.programs.ib': 'International Baccalaureate (IB)',
    'registration.programs.gcse': 'GCSE and A-level',
    'registration.programs.ap': 'Advanced Placement (USA)',
    'registration.programs.local': 'Local Programs',
    'registration.programs.summer': 'Summer Programs',
    'registration.programs.language': 'Language Courses',
    'registration.agreement': 'I have read and accept the User Agreement and Privacy Policy, including the processing of personal data and photo/video recording at the event.',
    'registration.submit': 'Register',
    'registration.name': 'Your name',
    'registration.city': 'Select city',
    'registration.city.astana': 'Astana - October 4',
    'registration.city.almaty': 'Almaty - October 5',
    'registration.child.age': "Child's age",
    'registration.child.class': 'Current grade',
    'registration.countries': 'Countries of interest',
    'registration.countries.uk': 'United Kingdom',
    'registration.countries.usa': 'USA',
    'registration.countries.canada': 'Canada',
    'registration.countries.europe': 'Europe',
    'registration.countries.asia': 'Asia',
    'registration.budget': 'Annual budget',
    'registration.questions': 'Your questions (optional)',
    'registration.privacy': 'By clicking the button, you agree to the',
    'registration.privacy.link': 'privacy policy',
    'registration.benefits': 'What you will receive after registration:',
    'registration.benefit1': 'Personal invitation with program',
    'registration.benefit2': 'Priority meetings with schools',
    'registration.benefit3': 'Exclusive school materials',
    'registration.benefit4': 'Special offers from M&K',
    
    // FAQ
    'faq.title': 'Frequently asked',
    'faq.title.highlight': 'questions',
    'faq.subtitle': 'Answers to popular questions about the exhibition',
    
    // Footer
    'footer.about': 'About Us',
    'footer.about.desc': 'M&K Education — leading educational center in Kazakhstan with 27 years of experience',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.phone': 'Phone',
    'footer.email': 'Email',
    'footer.address': 'Address',
    'footer.address.almaty': 'Almaty, 132 Bogenbay Batyr St.',
    'footer.address.astana': 'Astana, 18/1 Syganak St.',
    'footer.social': 'Social Media',
    'footer.rights': 'All rights reserved',
    
    // Timeline Schedule
    'timeline.schedule.registration': 'Participant Registration',
    'timeline.schedule.registration.desc': 'Badge collection and information materials',
    'timeline.schedule.opening': 'Exhibition Opening',
    'timeline.schedule.opening.desc': 'Welcome speech from M&K Education and partners',
    'timeline.schedule.exhibition': 'Exhibition Hours',
    'timeline.schedule.exhibition.desc': 'Communication with school representatives, consultations',
    'timeline.schedule.coffee': 'Coffee Break',
    'timeline.schedule.coffee.desc': 'Informal communication, networking',
    'timeline.schedule.meetings': 'School Representative Meetings',
    'timeline.schedule.meetings.desc': 'Personal consultations with each school',
    'timeline.schedule.consultations': 'Individual Consultations',
    'timeline.schedule.consultations.desc': 'Help choosing the right study program',
    'timeline.schedule.specialoffers': 'Special Offers',
    'timeline.schedule.specialoffers.desc': 'Exclusive conditions for exhibition participants',
    'timeline.schedule.presentations': 'School Presentations',
    'timeline.schedule.presentations.desc': 'Presentations by top educational institutions',
    'timeline.schedule.prizes': 'Prize Draw',
    'timeline.schedule.prizes.desc': 'Valuable gifts and discounts for participants',
    'timeline.location.astana': 'Astana',
    'timeline.location.almaty': 'Almaty',
    'timeline.date.astana': 'October 4, 2025',
    'timeline.date.almaty': 'October 5, 2025',
    'timeline.venue.astana': 'Rixos President Astana Hotel',
    'timeline.venue.almaty': 'Rixos Almaty Hotel',
    
    // Participants
    'participants.organizer': 'Exhibition Organizer',
    'participants.organizer.desc': '27 years of successful work in education',
    
    // Testimonials Names
    'testimonials.name1': 'Aigerim Kassymova',
    'testimonials.role1': 'Mother of Harrow School student',
    'testimonials.text1': 'Thanks to the M&K exhibition, we found the perfect school for our son. Personal communication with representatives helped dispel all doubts.',
    'testimonials.name2': 'Daniyar Akhmetov',
    'testimonials.role2': 'Father of Eton College graduate',
    'testimonials.text2': 'M&K Education accompanied us at all stages of admission. A professional team you can trust.',
    'testimonials.name3': 'Saule Nurlanova',
    'testimonials.role3': 'Mother of Westminster School student',
    'testimonials.text3': 'At the exhibition, we received not only information about schools, but also help with a grant. My son received a 30% scholarship!',
    'testimonials.cta.text': 'Join thousands of happy families who have found the perfect education for their children',
    'testimonials.cta.button': 'Start your journey to success',
    
    // Steps
    'steps.title': '6 steps',
    'steps.title.highlight': 'to admission',
    'steps.subtitle': 'Simple path to private school education abroad',
    'steps.1.title': 'Consider day schools and boarding schools',
    'steps.1.desc': 'Co-educational and single-sex education, city and country campuses',
    'steps.2.title': 'Choose language courses or summer camps',
    'steps.2.desc': 'Language courses or summer camps abroad',
    'steps.3.title': 'Learn about student requirements',
    'steps.3.desc': 'Student requirements and admission process',
    'steps.4.title': 'Check tuition costs',
    'steps.4.desc': 'From $20,000 to $80,000 per year depending on school',
    'steps.5.title': 'Find out about scholarships',
    'steps.5.desc': 'Scholarship opportunities and financial aid',
    'steps.6.title': 'Apply and prepare',
    'steps.6.desc': 'Document preparation and visa support',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ru');
  const [isChanging, setIsChanging] = useState(false);

  const handleSetLanguage = (lang: Language) => {
    if (lang === language) return;
    
    setIsChanging(true);
    // Add a small delay for smooth transition
    setTimeout(() => {
      setLanguage(lang);
      setIsChanging(false);
    }, 300);
  };

  const t = (key: string): string => {
    return (translations[language] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: handleSetLanguage, 
      t,
      isChanging 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}