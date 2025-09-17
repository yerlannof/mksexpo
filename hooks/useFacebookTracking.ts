'use client';

import { useCallback } from 'react';

interface FacebookEventData {
  event_name: string;
  event_time?: number;
  event_source_url?: string;
  action_source?: string;
  custom_data?: Record<string, any>;
}

interface UserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  country?: string;
}

export function useFacebookTracking() {
  const sendEvent = useCallback(async (
    eventData: FacebookEventData,
    userData?: UserData
  ) => {
    try {
      // Отправляем событие в Facebook Pixel (клиентская сторона)
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', eventData.event_name, eventData.custom_data);
      }

      // Отправляем событие через Conversions API (серверная сторона)
      const response = await fetch('/api/fb-events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: {
            ...eventData,
            event_time: eventData.event_time || Math.floor(Date.now() / 1000),
            event_source_url: eventData.event_source_url || window.location.href,
            action_source: eventData.action_source || 'website',
          },
          userData: userData || {}
        })
      });

      if (!response.ok) {
        console.error('Failed to send Facebook event');
      }
    } catch (error) {
      console.error('Error sending Facebook event:', error);
    }
  }, []);

  // Предопределенные события
  const trackLead = useCallback((customData?: Record<string, any>) => {
    sendEvent({
      event_name: 'Lead',
      custom_data: customData
    });
  }, [sendEvent]);

  const trackCompleteRegistration = useCallback((
    city?: string,
    eventId?: string,
    customData?: Record<string, any>
  ) => {
    sendEvent({
      event_name: 'CompleteRegistration',
      custom_data: {
        city,
        event_id: eventId,
        ...customData
      }
    });
  }, [sendEvent]);

  const trackViewContent = useCallback((
    contentName?: string,
    contentType?: string,
    customData?: Record<string, any>
  ) => {
    sendEvent({
      event_name: 'ViewContent',
      custom_data: {
        content_name: contentName,
        content_type: contentType,
        ...customData
      }
    });
  }, [sendEvent]);

  const trackInitiateCheckout = useCallback((
    city?: string,
    eventId?: string,
    customData?: Record<string, any>
  ) => {
    sendEvent({
      event_name: 'InitiateCheckout',
      custom_data: {
        city,
        event_id: eventId,
        ...customData
      }
    });
  }, [sendEvent]);

  return {
    sendEvent,
    trackLead,
    trackCompleteRegistration,
    trackViewContent,
    trackInitiateCheckout
  };
}

// Типы для window.fbq
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}