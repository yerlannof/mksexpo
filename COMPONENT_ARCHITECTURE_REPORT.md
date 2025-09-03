# Отчет по архитектуре компонентов Private Schools Expo

## Обзор проекта

**Название**: M&K Education Expo - Выставка частных школ за рубежом  
**Технологический стек**:
- Next.js 15.5.2 (React 19.1.0)
- TypeScript
- Tailwind CSS 3.4.17
- Framer Motion 12.23.12
- Lucide React (иконки)

## 1. Структура компонентов

### 1.1 Основные компоненты секций (`/components/sections/`)

**Назначение**: Реализация основных разделов landing page выставки

**Компоненты**:
- `Hero.tsx` / `HeroNew.tsx` / `HeroFigma.tsx` - Главный экран с таймером обратного отсчета
- `Participants.tsx` - Список школ-участников
- `Programs.tsx` / `ProgramsMinimal.tsx` - Программы обучения
- `Opportunities.tsx` - Возможности для посетителей
- `Timeline.tsx` - Программа мероприятия
- `Steps.tsx` - 6 шагов к поступлению
- `WhyVisit.tsx` - Почему стоит посетить выставку
- `Testimonials.tsx` - Отзывы клиентов
- `Registration.tsx` - Форма регистрации
- `Statistics.tsx` - Статистика
- `FAQ.tsx` - Часто задаваемые вопросы

**Особенности**:
- Все секции используют анимации при скролле (Framer Motion)
- Поддержка мультиязычности через контекст
- Адаптивный дизайн для мобильных устройств

### 1.2 UI компоненты (`/components/ui/`)

**Назначение**: Переиспользуемые элементы интерфейса

**Компоненты**:
- `GlassCard.tsx` - Карточка с эффектом glassmorphism (3 варианта: default, gradient, glow)
- `AnimatedButton.tsx` - Анимированная кнопка с hover эффектами
- `Toast.tsx` - Уведомления (success, error, warning, info)
- `LazyImage.tsx` - Ленивая загрузка изображений
- `PageLoader.tsx` - Индикатор загрузки страницы
- `SectionDivider.tsx` - Разделители между секциями
- `SkeletonLoader.tsx` - Скелетон для загрузки
- `TriangleDecoration.tsx` - Декоративные элементы
- `YouTubeSlider.tsx` - Слайдер видео

**Библиотеки и паттерны**:
- Framer Motion для анимаций
- Tailwind CSS для стилизации
- Компонентный подход с TypeScript типизацией

### 1.3 Layout компоненты (`/components/layout/`)

**Назначение**: Структурные компоненты страницы

**Компоненты**:
- `Header.tsx` - Основной хедер с навигацией
- `HeaderSimple.tsx` - Упрощенная версия хедера
- `Footer.tsx` - Футер с контактами и ссылками
- `MobileDrawer.tsx` - Мобильное меню

**Особенности**:
- Фиксированный хедер с прозрачностью
- Smooth scroll навигация
- Адаптивное мобильное меню

### 1.4 Контексты (`/contexts/`)

**Назначение**: Глобальное управление состоянием

**Контексты**:

1. **LanguageContext.tsx**
   - Управление языками (ru/en)
   - Система переводов
   - Анимированная смена языка
   - Hook: `useLanguage()`

2. **ToastContext.tsx**
   - Управление уведомлениями
   - Автоматическое закрытие
   - Поддержка promise-based уведомлений
   - Hook через `useToast()`

### 1.5 Хуки (`/hooks/`)

**Назначение**: Переиспользуемая логика

**Хуки**:

1. **useToast.ts**
   - Удобный API для показа уведомлений
   - Методы: success, error, warning, info
   - Promise-based уведомления для async операций

2. **useSmoothScroll.ts**
   - Плавная прокрутка к элементам
   - Учет высоты хедера
   - Обработчик клика по якорям

### 1.6 Утилиты (`/lib/`)

**Назначение**: Вспомогательные функции и конфигурации

**Файлы**:

1. **utils.ts**
   - `cn()` - утилита для объединения классов (clsx + tailwind-merge)

2. **animationConfig.ts**
   - Глобальные настройки анимаций
   - Поддержка prefers-reduced-motion
   - Пресеты анимаций (fadeUp, fadeIn, scaleIn)

## 2. Дополнительные компоненты

### 2.1 Оптимизация производительности

- `PerformanceWrapper.tsx` - Ленивая загрузка компонентов при попадании в viewport
- `OptimizedAnimatedSection.tsx` - Оптимизированные анимации
- `AnimatedSection.tsx` - Базовый компонент для анимированных секций

### 2.2 Вспомогательные компоненты

- `BackgroundPattern.tsx` - Фоновый паттерн
- `FloatingElements.tsx` - Плавающие декоративные элементы
- `ScrollProgress.tsx` - Индикатор прогресса скролла
- `CountdownTimer.tsx` - Таймер обратного отсчета
- `SchoolCardWithImage.tsx` - Карточка школы с изображением
- `StudentIllustration.tsx` - SVG иллюстрации
- `SEOMetadata.tsx` - SEO метаданные
- `LanguageTransition.tsx` - Анимация смены языка

### 2.3 Скелетоны (`/components/skeletons/`)

- `HeroSkeleton.tsx` - Скелетон для Hero секции
- `SectionSkeleton.tsx` - Универсальный скелетон секции
- `StatisticsSkeleton.tsx` - Скелетон для статистики

## 3. Архитектурные особенности

### 3.1 Паттерны проектирования

1. **Composition Pattern**
   - Компоненты разбиты на мелкие переиспользуемые части
   - Примеры: AnimatedSection + AnimatedChild

2. **Provider Pattern**
   - Контексты для глобального состояния
   - Централизованное управление языками и уведомлениями

3. **Custom Hooks Pattern**
   - Инкапсуляция логики в хуках
   - Упрощение использования контекстов

4. **Lazy Loading Pattern**
   - Динамическая загрузка тяжелых компонентов
   - Intersection Observer для viewport detection

### 3.2 Стилизация

1. **Tailwind CSS**
   - Кастомная цветовая палитра (primary, secondary, accent)
   - Кастомные шрифты (Inter, Soyuz Grotesk)
   - Responsive дизайн с breakpoints

2. **CSS-in-JS (через className)**
   - Динамические классы через cn() утилиту
   - Условная стилизация

3. **Glassmorphism эффекты**
   - backdrop-blur
   - Полупрозрачные фоны
   - Градиентные границы

### 3.3 Анимации

1. **Framer Motion**
   - Анимации при скролле (whileInView)
   - Hover и tap эффекты
   - Stagger анимации для списков
   - Layout анимации

2. **Оптимизация**
   - will-change для производительности
   - GPU-accelerated transforms
   - Respect prefers-reduced-motion

### 3.4 Мультиязычность

- Полная поддержка ru/en
- Централизованные переводы в LanguageContext
- Анимированная смена языка
- Сохранение выбора пользователя

## 4. Взаимосвязи компонентов

```
App Layout
├── Providers
│   ├── LanguageProvider
│   ├── ToastProvider
│   └── BackgroundPattern
├── HeaderSimple
├── Main Content
│   ├── Hero Section
│   ├── Participants Section
│   ├── Programs Section
│   ├── Timeline Section
│   ├── Registration Section
│   └── Other Sections...
└── Footer
```

## 5. Best Practices

1. **TypeScript**
   - Строгая типизация всех компонентов
   - Интерфейсы для пропсов
   - Type safety для переводов

2. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Focus management

3. **Performance**
   - Code splitting
   - Lazy loading
   - Optimized images (Next.js Image)
   - Debounced animations

4. **SEO**
   - Structured metadata
   - Semantic HTML
   - Open Graph tags

## Заключение

Архитектура проекта следует современным best practices React разработки с акцентом на производительность, переиспользуемость и user experience. Компоненты хорошо структурированы, типизированы и оптимизированы для быстрой загрузки и плавной работы.