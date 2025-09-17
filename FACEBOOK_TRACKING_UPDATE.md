# Facebook Tracking Update - Инструкция

## ✅ Что было сделано

### 1. Создан хук для отслеживания событий Facebook
- **Файл**: `/hooks/useFacebookTracking.ts`
- Отправляет события одновременно через Facebook Pixel (клиент) и Conversions API (сервер)
- Безопасно обрабатывает ошибки

### 2. Добавлено отслеживание событий:

#### **Lead** - Клик на кнопку "Записаться"
- Срабатывает при любом клике на кнопки регистрации
- Файл: `/contexts/CityModalContext.tsx`

#### **ViewContent** - Выбор города
- Срабатывает когда пользователь выбирает город
- Файл: `/components/CitySelectionModal.tsx`

#### **InitiateCheckout** - Открытие формы Timepad
- Срабатывает при открытии виджета регистрации
- Файл: `/components/CitySelectionModal.tsx`

#### **CompleteRegistration** - Завершение регистрации
- Слушает сообщения от Timepad виджета
- Файл: `/components/TimepadRegistrationModal.tsx`

## 🔧 Обновление токена на Vercel

1. Зайдите в настройки проекта на Vercel
2. Settings → Environment Variables
3. Найдите `FACEBOOK_ACCESS_TOKEN`
4. Обновите значение на новый токен
5. Нажмите Save
6. Передеплой произойдет автоматически

## ✨ Что теперь отслеживается

1. **Клик на "Записаться"** → Lead
2. **Выбор города** → ViewContent
3. **Открытие формы** → InitiateCheckout
4. **Успешная регистрация** → CompleteRegistration

## 🚀 Преимущества

- **Двойное отслеживание**: Pixel + Conversions API
- **Безопасно**: Не ломает существующую логику
- **Умно**: Отслеживает все важные действия
- **Надежно**: Обработка ошибок включена

## ⚠️ Важно

- Виджет Timepad работает в iframe, поэтому отслеживание CompleteRegistration зависит от того, отправляет ли Timepad postMessage события
- Если CompleteRegistration не работает, можно настроить webhook в Timepad

## 📊 Проверка в Facebook

1. Откройте Facebook Events Manager
2. Выберите ваш пиксель (1444111270140281)
3. Перейдите в Test Events
4. Проверьте, что события приходят

Сайт полностью работоспособен, вся функциональность сохранена!