# Выставка «Частные школы за рубежом» - Landing Page

Современный лендинг для образовательной выставки, созданный на основе дизайна Begin Expo с интеграцией корпоративного стиля M&K.

## 🚀 Технологии

- **Next.js 15** с App Router
- **TypeScript** для типобезопасности
- **Tailwind CSS** для стилизации
- **React Hooks** для управления состоянием

## 📦 Установка

```bash
npm install
```

## 🔧 Запуск

```bash
# Режим разработки
npm run dev

# Сборка для продакшена
npm run build
npm start
```

## 🎨 Дизайн-система

### Цвета (из Figma M&K)
- **Primary**: Deep Blue (#1E3A8A)
- **Secondary**: Amber (#F59E0B)
- **Accent**: Emerald (#10B981)

### Шрифты
- **Display**: Montserrat (заголовки)
- **Sans**: Inter (основной текст)

## 📁 Структура проекта

```
├── app/
│   ├── page.tsx         # Главная страница
│   ├── layout.tsx       # Корневой layout
│   └── globals.css      # Глобальные стили
├── components/
│   ├── layout/
│   │   └── Header.tsx   # Навигация
│   ├── sections/
│   │   ├── Hero.tsx         # Главный экран
│   │   ├── Participants.tsx # Список участников
│   │   ├── Registration.tsx # Форма регистрации
│   │   └── FAQ.tsx          # Часто задаваемые вопросы
│   └── ui/              # UI компоненты
└── public/              # Статические файлы
```

## ✨ Функционал

- ✅ Адаптивный дизайн для всех устройств
- ✅ Переключение языков (RU/EN)
- ✅ Интерактивная форма регистрации
- ✅ Аккордеон для FAQ
- ✅ Плавная прокрутка к секциям
- ✅ Анимации при скролле

## 🔄 Работа с Figma

### Получение токена API
1. Откройте Figma → Settings → Account
2. Найдите раздел Personal access tokens
3. Создайте новый токен

### Экспорт дизайнов
```javascript
// Пример использования Figma API
const FIGMA_TOKEN = 'your-token';
const FILE_KEY = 'S41cnQoS6gO95yVMGhKGaz';

fetch(`https://api.figma.com/v1/files/${FILE_KEY}`, {
  headers: { 'X-Figma-Token': FIGMA_TOKEN }
});
```

### Рекомендуемые плагины
- **Figma to Code** - экспорт компонентов
- **Design Tokens** - экспорт переменных
- **Anima** - генерация React кода

## 📝 TODO

- [ ] Добавить валидацию формы на бэкенд
- [ ] Интегрировать Google Maps
- [ ] Добавить мультиязычность через i18n
- [ ] Настроить отправку email
- [ ] Добавить аналитику
- [ ] SEO оптимизация

## 🌐 Деплой

Рекомендуется использовать Vercel:

```bash
npm i -g vercel
vercel
```

## 📞 Контакты

- Email: info@mkeducation.kz
- Телефон: +7 (701) 234-56-78

---

Создано с ❤️ для M&K Education
