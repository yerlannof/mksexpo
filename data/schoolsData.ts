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
    name: 'Mander Portman Woodward', 
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
    name: 'North Broward Preparatory School (Fort Lauderdale, Florida)',
    country: 'US',
    countryName: 'США',
    countryNameEn: 'USA',
    initials: 'NBPS',
    image: '/schools/North Broward Preparatory School.jpg',
    description: {
      ru: 'Элитная международная школа-пансион во Флориде, часть сети Nord Anglia Education. Предлагает IB и AP программы с исключительными результатами — 86 поступлений в топ-50 университетов США в 2022 году. Школа известна персонализированным обучением, глобальным партнерством и подготовкой студентов к поступлению в Лигу Плюща.',
      en: 'Elite international boarding school in Florida, part of Nord Anglia Education network. Offers IB and AP programs with exceptional results — 86 acceptances to top 50 US universities in 2022. The school is known for personalized learning, global partnerships and preparing students for Ivy League admissions.'
    }
  },
  {
    name: 'Windermere Preparatory School (Orlando, Florida)',
    country: 'US',
    countryName: 'США',
    countryNameEn: 'USA',
    initials: 'WPS',
    image: '/schools/Windermere Preparatory School.jpg',
    description: {
      ru: 'Международная школа-пансион в Орландо, предлагающая программу IB с дошкольного возраста до 12 класса. Школа известна академической строгостью и является частью престижной сети Nord Anglia Education. 77% принятых абитуриентов, выпускники поступают в ведущие университеты мира, включая Russell Group и Ivy League.',
      en: 'International boarding school in Orlando offering IB program from pre-K through grade 12. The school is known for academic rigor and is part of the prestigious Nord Anglia Education network. 77% acceptance rate, graduates gain admission to leading universities worldwide, including Russell Group and Ivy League institutions.'
    }
  },
  {
    name: 'The Village School (Houston, Texas)',
    country: 'US',
    countryName: 'США',
    countryNameEn: 'USA',
    initials: 'TVS',
    image: '/schools/The Village School.jpg',
    description: {
      ru: 'Престижная международная школа в Хьюстоне с полным циклом IB и средним баллом SAT 1340. Входит в топ-20% частных школ Техаса с 100% выпускников, поступающих в университеты. Школа предлагает STEAM-ориентированное образование и является фидерной школой для университетов Лиги Плюща.',
      en: 'Prestigious international school in Houston with full IB continuum and average SAT score of 1340. Ranks in top 20% of Texas private schools with 100% university admission rate. The school offers STEAM-focused education and is a feeder school for Ivy League universities.'
    }
  },
  {
    name: 'Swiss International School Dubai',
    country: 'AE',
    countryName: 'ОАЭ',
    countryNameEn: 'UAE',
    initials: 'SISD',
    image: '/schools/Swiss International School Dubai.jpg',
    description: {
      ru: 'Единственная швейцарская школа-пансион в Дубае, входящая в топ-100 частных школ мира. Средний балл IB составляет 33 (при мировом среднем 30), 95% сдают экзамены, 40% получают билингвальный диплом. Выпускники получают в среднем 4 предложения от ведущих университетов мира.',
      en: 'The only Swiss boarding school in Dubai, ranked among top 100 private schools globally. Average IB score of 33 (world average 30), 95% pass rate, 40% achieve bilingual diploma. Graduates receive an average of 4 offers from leading universities worldwide.'
    }
  },
  {
    name: 'Collège Champittet (Lausanne)',
    country: 'CH',
    countryName: 'Швейцария',
    countryNameEn: 'Switzerland',
    initials: 'CC',
    image: '/schools/College Champittet.jpg',
    description: {
      ru: 'Престижная швейцарская школа недалеко от Лозанны с более чем 120-летней историей. Предлагает IB, швейцарскую матуру и французский бакалавриат со 100% сдачей экзаменов и средним баллом IB 35. Школа известна интенсивной программой французского языка FLE и семейной атмосферой в пансионе.',
      en: 'Prestigious Swiss school near Lausanne with over 120-year history. Offers IB, Swiss Maturité and French Baccalaureate with 100% exam pass rate and average IB score of 35. The school is known for its intensive French language FLE program and family-like boarding atmosphere.'
    }
  },
  {
    name: 'Collège du Léman (Geneva)',
    country: 'CH',
    countryName: 'Швейцария',
    countryNameEn: 'Switzerland',
    initials: 'CDL',
    image: '/schools/College du Leman.jpg',
    description: {
      ru: 'Международная школа-пансион в Женеве для учащихся 2-18 лет, расположенная между Юрскими горами и Женевским озером. Около 1900 студентов из 50+ национальностей, включая 200+ пансионеров. Школа предлагает полный спектр международных программ и известна сильной подготовкой к поступлению в лучшие университеты.',
      en: 'International boarding school in Geneva for students aged 2-18, located between Jura Mountains and Lake Geneva. Around 1900 students from 50+ nationalities, including 200+ boarders. The school offers a full range of international programs and is known for strong university preparation.'
    }
  },
  {
    name: 'Hamelin-Laie International School (Montgat)',
    country: 'ES',
    countryName: 'Испания',
    countryNameEn: 'Spain',
    initials: 'HLIS',
    image: '/schools/Hamelin Laie International School.jpg',
    description: {
      ru: 'Первая трёхъязычная международная школа в Барселоне, часть сети Nord Anglia Education. Предлагает полный цикл IB от дошкольного образования до дипломной программы. Более 50 национальностей создают по-настоящему международную среду, а выпускники демонстрируют стабильно высокие результаты на экзаменах IB.',
      en: 'First trilingual international school in Barcelona, part of Nord Anglia Education network. Offers full IB continuum from early years to diploma programme. Over 50 nationalities create a truly international environment, with graduates achieving consistently high IB exam results.'
    }
  },
  {
    name: 'H-Farm School (Vicenza)',
    country: 'IT',
    countryName: 'Италия',
    countryNameEn: 'Italy',
    initials: 'HFS',
    image: '/schools/H-Farm School.jpg',
    description: {
      ru: 'Инновационная международная школа IB в Виченце и Венеции, присоединившаяся к Nord Anglia Education. Средний балл IB 32 превышает мировой средний показатель, выпускники поступают в более 50 университетов по всему миру. Школа известна интеграцией технологий в обучение и предпринимательским подходом.',
      en: 'Innovative IB international school in Vicenza and Venice, joining Nord Anglia Education. Average IB score of 32 exceeds global average, with graduates accepted to over 50 universities worldwide. The school is known for technology integration in learning and entrepreneurial approach.'
    }
  },
  {
    name: "d'Overbroeck's (Oxford)",
    country: 'GB',
    countryName: 'Великобритания',
    countryNameEn: 'United Kingdom',
    initials: 'DOB',
    image: '/schools/dOverbroecks.jpg',
    description: {
      ru: 'Независимая школа в Оксфорде, часть Nord Anglia Education, известная исключительными результатами A-level и инновационным подходом к образованию. Школа предлагает обширную внеклассную программу и готовит студентов к поступлению в лучшие университеты, включая Оксбридж и Russell Group.',
      en: "Independent school in Oxford, part of Nord Anglia Education, known for exceptional A-level results and innovative approach to education. The school offers extensive super-curricular programme and prepares students for admission to top universities, including Oxbridge and Russell Group."
    }
  },
  {
    name: 'Oxford International College (Oxford)',
    country: 'GB',
    countryName: 'Великобритания',
    countryNameEn: 'United Kingdom',
    initials: 'OIC',
    image: '/schools/Oxford International College.jpg',
    description: {
      ru: 'Один из лучших колледжей A-level в Великобритании, стабильно входящий в топ-5 по результатам экзаменов. Более 90% учеников получают оценки A*-A, рекордное количество студентов поступает в Оксфорд и Кембридж. Колледж специализируется на подготовке к медицинским и STEM направлениям.',
      en: 'One of the best A-level colleges in the UK, consistently ranking in top 5 for exam results. Over 90% of students achieve A*-A grades, with record numbers gaining admission to Oxford and Cambridge. The college specializes in preparation for medicine and STEM fields.'
    }
  },
  {
    name: 'Oxford International College Brighton (Brighton)',
    country: 'GB',
    countryName: 'Великобритания',
    countryNameEn: 'United Kingdom',
    initials: 'OICB',
    image: '/schools/Oxford International College Brighton.jpg',
    description: {
      ru: 'Сестринская школа Oxford International College в Брайтоне, предлагающая такой же академически строгий подход. Более 70% оценок A-level составляют A*-B, 30% студентов получают три или более оценки A. 100% выпускников получают предложения от университетов Russell Group.',
      en: 'Sister school of Oxford International College in Brighton, offering the same academically rigorous approach. Over 70% of A-level grades are A*-B, with 30% of students achieving three or more A grades. 100% of graduates receive offers from Russell Group universities.'
    }
  },
];

// Временные изображения для разработки
export const placeholderImage = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop';