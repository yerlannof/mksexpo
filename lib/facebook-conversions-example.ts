// Пример использования Facebook Conversions API
// ВАЖНО: Этот код показывает как использовать API, но не меняет работу сайта!

import { FacebookEvents, generateEventId } from './facebook-conversions';

// Пример 1: Отправка события регистрации при заполнении формы
export async function handleFormSubmit(formData: any) {
  try {
    // Генерируем уникальный ID для дедупликации с Pixel
    const eventId = generateEventId('CompleteRegistration', formData.email);
    
    // Отправляем событие на сервер Facebook
    await FacebookEvents.completeRegistration({
      email: formData.email,
      phone: formData.phone,
      firstName: formData.firstName,
      lastName: formData.lastName,
      city: formData.city,
      country: 'KZ'
    }, {
      // Дополнительные данные о событии
      event: 'education_expo_registration',
      location: formData.eventLocation // 'Астана' или 'Алматы'
    });
    
    // ВАЖНО: Также отправляем через Pixel для дедупликации
    // fbq('track', 'CompleteRegistration', {}, { eventID: eventId });
    
  } catch (error) {
    console.error('Conversions API error:', error);
    // Не блокируем работу сайта при ошибке
  }
}

// Пример 2: Отправка события просмотра страницы
export async function trackPageView(url: string) {
  try {
    await FacebookEvents.pageView(url);
  } catch (error) {
    console.error('Page view tracking error:', error);
  }
}

// Пример 3: Использование через API endpoint
export async function sendEventViaAPI(eventData: any) {
  try {
    const response = await fetch('/api/fb-events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: {
          event_name: eventData.eventName,
          event_time: Math.floor(Date.now() / 1000),
          custom_data: eventData.customData
        },
        userData: eventData.userData
      })
    });
    
    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
  }
}