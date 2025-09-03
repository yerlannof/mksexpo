export interface School {
  name: string;
  country: string;
  countryName: string;
  countryNameEn: string;
  initials: string;
  image: string;
  description: {
    ru: string;
    en: string;
  };
}

export const schoolsData: School[] = [
  { 
    name: 'Vertex School', 
    country: 'AE', 
    countryName: 'ОАЭ', 
    countryNameEn: 'UAE', 
    initials: 'VS',
    image: '/schools/Vertex-School.jpg',
    description: {
      ru: 'Современная международная школа в Дубае, предлагающая британскую программу обучения с IGCSE и A-level. Школа известна индивидуальным подходом к каждому ученику, современными технологиями в обучении и мультикультурной средой. Выпускники поступают в ведущие университеты Великобритании, США и других стран.',
      en: 'Modern international school in Dubai offering British curriculum with IGCSE and A-level programs. The school is known for its personalized approach to each student, modern teaching technologies and multicultural environment. Graduates gain admission to leading universities in the UK, USA and other countries.'
    }
  },
  { 
    name: 'Concord College', 
    country: 'GB', 
    countryName: 'Великобритания', 
    countryNameEn: 'United Kingdom', 
    initials: 'CC',
    image: '/schools/Concord-College.jpg',
    description: {
      ru: 'Престижная селективная международная школа для учащихся 13–18 лет, где более 80% оценок на A-level — A* или A, и около 55% GCSE/IGCSE — максимально возможные баллы. Выпускники регулярно поступают в лучшие университеты — Oxford, Cambridge, Imperial College, UCL, LSE и другие топовые вузы Великобритании и мира.',
      en: 'Prestigious selective international school for students aged 13-18, where over 80% of A-level grades are A* or A, and about 55% of GCSE/IGCSE are top marks. Graduates regularly gain admission to the best universities - Oxford, Cambridge, Imperial College, UCL, LSE and other top universities in the UK and worldwide.'
    }
  },
  { 
    name: 'Cascadia College', 
    country: 'US', 
    countryName: 'США', 
    countryNameEn: 'USA', 
    initials: 'CC',
    image: '/schools/Cascadia-College.jpg',
    description: {
      ru: 'Один из лучших общественных колледжей штата Вашингтон, расположенный на кампусе с University of Washington Bothell. 89% студентов переводятся в университеты, а выпускники зарабатывают в среднем на $16 000 больше, чем выпускники других колледжей штата. Малые группы и доступ к ресурсам UW делают обучение максимально эффективным.',
      en: 'One of the best public colleges in Washington State, located on campus with University of Washington Bothell. 89% of students transfer to universities, and graduates earn on average $16,000 more than graduates of other state colleges. Small groups and access to UW resources make learning highly effective.'
    }
  },
  { 
    name: 'Mander Portman Woodward (MPW)', 
    country: 'GB', 
    countryName: 'Великобритания', 
    countryNameEn: 'United Kingdom', 
    initials: 'MPW',
    image: '/schools/Mander-Portman-Woodward-MPW.jpg',
    description: {
      ru: 'Престижные колледжи в Лондоне, Кембридже и Бирмингеме с максимальной гибкостью обучения. Специализация на подготовке к A-level, GCSE и поступлении в университет. 92% студентов получают A*-B на A-level. Индивидуальные учебные планы и занятия в мини-группах до 8 человек.',
      en: 'Prestigious colleges in London, Cambridge and Birmingham with maximum flexibility of study. Specialization in A-level, GCSE preparation and university admission. 92% of students receive A*-B at A-level. Individual study plans and classes in mini-groups of up to 8 people.'
    }
  },
  { 
    name: "St. Clare's Oxford", 
    country: 'GB', 
    countryName: 'Великобритания', 
    countryNameEn: 'United Kingdom', 
    initials: 'SCO',
    image: "/schools/St-Clares-Oxford.jpg",
    description: {
      ru: 'Международный колледж в Оксфорде, один из пионеров программы IB в Европе с 1977 года. В среднем студенты IB получают 36 баллов (мировой средний — 30), а выпускники поступают в Russell Group, Ivy League и другие ведущие университеты. Небольшие классы (макс. 12 человек) и акцент на критическое мышление.',
      en: 'International college in Oxford, one of the pioneers of the IB program in Europe since 1977. On average, IB students receive 36 points (world average - 30), and graduates enter Russell Group, Ivy League and other leading universities. Small classes (max. 12 people) and emphasis on critical thinking.'
    }
  },
];

// Временные изображения для разработки
export const placeholderImage = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop';