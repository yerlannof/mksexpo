'use client';

import { useState } from 'react';

export default function TestFacebookAPI() {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const sendTestEvent = async () => {
    setLoading(true);
    setStatus('Отправка тестового события...');

    try {
      const response = await fetch('/api/fb-events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: {
            event_name: 'TestEvent',
            event_time: Math.floor(Date.now() / 1000),
            action_source: 'website',
            event_source_url: window.location.href,
            custom_data: {
              test: true,
              timestamp: new Date().toISOString()
            }
          },
          userData: {
            email: 'test@example.com',
            phone: '+77771234567',
            firstName: 'Test',
            lastName: 'User',
            city: 'Almaty',
            country: 'KZ'
          }
        })
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('✅ Событие отправлено успешно! Проверьте Facebook Events Manager');
        console.log('Результат:', result);
      } else {
        setStatus('❌ Ошибка: ' + (result.error || 'Неизвестная ошибка'));
      }
    } catch (error) {
      setStatus('❌ Ошибка сети: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const sendRegistrationEvent = async () => {
    setLoading(true);
    setStatus('Отправка события регистрации...');

    try {
      const response = await fetch('/api/fb-events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: {
            event_name: 'CompleteRegistration',
            event_time: Math.floor(Date.now() / 1000),
            action_source: 'website',
            event_source_url: window.location.href,
            custom_data: {
              event_location: 'Алматы',
              registration_type: 'test'
            }
          },
          userData: {
            email: 'real.test@gmail.com',
            phone: '+77011234567',
            firstName: 'Иван',
            lastName: 'Тестов',
            city: 'Almaty',
            country: 'KZ'
          }
        })
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('✅ Событие регистрации отправлено! Проверьте Facebook Events Manager');
        console.log('Результат:', result);
      } else {
        setStatus('❌ Ошибка: ' + (result.error || 'Неизвестная ошибка'));
      }
    } catch (error) {
      setStatus('❌ Ошибка сети: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Тест Facebook Conversions API
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-semibold mb-4">
            Отправка тестовых событий
          </h2>
          
          <p className="text-gray-600 mb-6">
            Нажмите кнопку ниже, чтобы отправить тестовое событие в Facebook.
            После отправки проверьте Events Manager в Facebook.
          </p>

          <div className="space-y-4">
            <button
              onClick={sendTestEvent}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Отправка...' : 'Отправить тестовое событие'}
            </button>

            <button
              onClick={sendRegistrationEvent}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Отправка...' : 'Отправить событие регистрации'}
            </button>
          </div>

          {status && (
            <div className="mt-6 p-4 rounded-lg bg-gray-100">
              <p className="text-sm font-mono">{status}</p>
            </div>
          )}

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="font-semibold mb-2">Информация о настройке:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Pixel ID: 1444111270140281</li>
              <li>• API Endpoint: /api/fb-events</li>
              <li>• Тестовые данные хешируются перед отправкой</li>
              <li>• События отправляются на сервер Facebook</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="text-blue-600 hover:underline"
          >
            ← Вернуться на главную
          </a>
        </div>
      </div>
    </div>
  );
}