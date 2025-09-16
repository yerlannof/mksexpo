import crypto from 'crypto';

// Интерфейсы для типизации
interface UserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  externalId?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
  fbc?: string; // Facebook click ID
  fbp?: string; // Facebook pixel ID
}

interface FacebookEvent {
  event_name: string;
  event_time: number;
  event_source_url?: string;
  event_id?: string;
  action_source: string;
  custom_data?: Record<string, unknown>;
}

// Хеширование персональных данных (требование Facebook)
function hashData(data: string): string {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
}

// Форматирование телефона (удаление всего кроме цифр)
function formatPhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

// Подготовка данных пользователя
function prepareUserData(userData: UserData): Record<string, unknown> {
  const prepared: Record<string, unknown> = {};
  
  if (userData.email) {
    prepared.em = hashData(userData.email);
  }
  
  if (userData.phone) {
    prepared.ph = hashData(formatPhone(userData.phone));
  }
  
  if (userData.firstName) {
    prepared.fn = hashData(userData.firstName);
  }
  
  if (userData.lastName) {
    prepared.ln = hashData(userData.lastName);
  }
  
  if (userData.city) {
    prepared.ct = hashData(userData.city);
  }
  
  if (userData.state) {
    prepared.st = hashData(userData.state);
  }
  
  if (userData.country) {
    prepared.country = hashData(userData.country);
  }
  
  if (userData.zipCode) {
    prepared.zp = hashData(userData.zipCode);
  }
  
  if (userData.externalId) {
    prepared.external_id = hashData(userData.externalId);
  }
  
  // Эти данные не хешируются
  if (userData.clientIpAddress) {
    prepared.client_ip_address = userData.clientIpAddress;
  }
  
  if (userData.clientUserAgent) {
    prepared.client_user_agent = userData.clientUserAgent;
  }
  
  if (userData.fbc) {
    prepared.fbc = userData.fbc;
  }
  
  if (userData.fbp) {
    prepared.fbp = userData.fbp;
  }
  
  return prepared;
}

// Основная функция отправки события
export async function sendFacebookConversionEvent(
  event: FacebookEvent,
  userData?: UserData
): Promise<unknown> {
  // Проверяем наличие необходимых переменных окружения
  const pixelId = process.env.FACEBOOK_PIXEL_ID || '1444111270140281';
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
  
  if (!accessToken) {
    throw new Error('FACEBOOK_ACCESS_TOKEN is not set in environment variables');
  }
  
  // Подготавливаем данные события
  const eventData = {
    data: [{
      event_name: event.event_name,
      event_time: event.event_time || Math.floor(Date.now() / 1000),
      event_source_url: event.event_source_url || process.env.NEXT_PUBLIC_BASE_URL,
      event_id: event.event_id || crypto.randomUUID(),
      action_source: event.action_source || 'website',
      user_data: userData ? prepareUserData(userData) : {},
      custom_data: event.custom_data || {}
    }]
  };
  
  // URL для Facebook Conversions API
  const url = `https://graph.facebook.com/v18.0/${pixelId}/events`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: eventData.data,
        access_token: accessToken,
      }),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(`Facebook API error: ${JSON.stringify(result)}`);
    }
    
    return result;
  } catch (error) {
    console.error('Error sending event to Facebook:', error);
    throw error;
  }
}

// Функция для генерации event_id для дедупликации
export function generateEventId(eventName: string, userId?: string): string {
  const timestamp = Date.now();
  const data = `${eventName}-${userId || 'anonymous'}-${timestamp}`;
  return crypto.createHash('sha256').update(data).digest('hex');
}

// Хелпер для отправки стандартных событий
export const FacebookEvents = {
  // Просмотр страницы
  async pageView(url: string, userData?: UserData) {
    return sendFacebookConversionEvent({
      event_name: 'PageView',
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: url,
      action_source: 'website'
    }, userData);
  },
  
  // Регистрация на событие
  async completeRegistration(userData?: UserData, customData?: Record<string, unknown>) {
    return sendFacebookConversionEvent({
      event_name: 'CompleteRegistration',
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      custom_data: customData
    }, userData);
  },
  
  // Лид (заполнение формы)
  async lead(userData?: UserData, customData?: Record<string, unknown>) {
    return sendFacebookConversionEvent({
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      custom_data: customData
    }, userData);
  },
  
  // Кастомное событие
  async custom(eventName: string, userData?: UserData, customData?: Record<string, unknown>) {
    return sendFacebookConversionEvent({
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      custom_data: customData
    }, userData);
  }
};