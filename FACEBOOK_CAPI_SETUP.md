# Настройка Facebook Conversions API

## ✅ Что уже готово:
1. Серверная структура создана
2. API эндпоинт готов
3. Вспомогательные функции написаны

## 📝 Что нужно сделать:

### 1. Добавить переменные в Vercel:

1. Зайдите в [Vercel Dashboard](https://vercel.com/dashboard)
2. Выберите проект `private-schools-expo`
3. Settings → Environment Variables
4. Добавьте:

```
FACEBOOK_ACCESS_TOKEN=EAANLYTQnyhIBPUfOrseyuHIhpg5A4FeoUrO12IQp7TGbYVdp0mzaoPVCq3uVgtDHnQNSidpZAGrJQUsZCUdJSYA9CbgWeBtZAp2AZBF68oUkrgMfiYLiOUdT0OHKTRNDFZCFZBJRJZAeshm45ZAcDZBwKVHJeSbVx8sdynI813HOyWDdzVtNhZAgq1NYjqtyjiPjZCdyAZDZD
FACEBOOK_PIXEL_ID=1444111270140281
```

### 2. Проверка работы API:

После деплоя можно проверить:
```
https://mks-expo.vercel.app/api/fb-events
```

Должен вернуть:
```json
{
  "status": "Facebook Conversions API endpoint is ready",
  "timestamp": "2025-01-29T..."
}
```

### 3. Интеграция с формами (когда будете готовы):

В компоненте с формой регистрации добавить вызов API:
```typescript
import { handleFormSubmit } from '@/lib/facebook-conversions-example';

// При отправке формы
await handleFormSubmit(formData);
```

## ⚠️ Важно:

1. **Токен истекает** - обновляйте каждые 60 дней
2. **Не комитьте токен** - используйте только Vercel env
3. **Тестируйте** через Facebook Events Manager

## 📊 Проверка в Facebook:

1. Facebook Business Manager → Events Manager
2. Выберите ваш Pixel (1444111270140281)
3. Вкладка "Test events" → Server events

---

**Статус:** Готово к использованию после добавления переменных в Vercel!