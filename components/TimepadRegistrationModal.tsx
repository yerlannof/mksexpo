'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TimepadRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  city: string;
  eventId: string;
}

export default function TimepadRegistrationModal({ 
  isOpen, 
  onClose, 
  city,
  eventId 
}: TimepadRegistrationModalProps) {
  const { language } = useLanguage();
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && widgetContainerRef.current) {
      // Clear previous widget
      widgetContainerRef.current.innerHTML = '';
      
      // Create and append the script element
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.charset = 'UTF-8';
      script.src = 'https://timepad.ru/js/tpwf/loader/min/loader.js';
      script.setAttribute('data-timepad-customized', '49248');
      // Дополнительные параметры кастомизации (если поддерживаются)
      script.setAttribute('data-timepad-theme', 'light');
      script.setAttribute('data-timepad-primary-color', '#1C417A');
      script.setAttribute('data-timepad-button-color', '#dc2626');
      script.setAttribute('data-twf2s-event--id', eventId);
      script.setAttribute('data-timepad-widget-v2', 'event_register');
      
      widgetContainerRef.current.appendChild(script);
    }
  }, [isOpen, eventId]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-[60] px-4 py-8"
            onClick={onClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-xl font-bold text-gray-900">
                  {language === 'ru' 
                    ? `Регистрация на выставку - ${city}` 
                    : `Exhibition Registration - ${city}`}
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              
              {/* Widget Container */}
              <div 
                ref={widgetContainerRef}
                className="flex-1 overflow-y-auto p-6 timepad-widget-container"
              />
              
              {/* Custom styles for Timepad widget */}
              <style jsx global>{`
                /* Стилизация контейнера виджета */
                .timepad-widget-container {
                  font-family: 'Inter', sans-serif !important;
                }
                
                /* Стилизация iframe виджета */
                .timepad-widget-container iframe {
                  border-radius: 12px !important;
                  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
                }
                
                /* Попытка стилизации внутри iframe (может не работать из-за CORS) */
                .tp-widget-form {
                  background: #f8f9fa !important;
                }
                
                /* Кнопки */
                .tp-widget-form .tp-button {
                  background-color: #dc2626 !important;
                  border-radius: 8px !important;
                  padding: 12px 24px !important;
                  font-weight: 600 !important;
                  transition: all 0.3s !important;
                }
                
                .tp-widget-form .tp-button:hover {
                  background-color: #b91c1c !important;
                  transform: translateY(-2px) !important;
                  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3) !important;
                }
                
                /* Поля ввода */
                .tp-widget-form input[type="text"],
                .tp-widget-form input[type="email"],
                .tp-widget-form input[type="tel"],
                .tp-widget-form textarea {
                  border: 2px solid #e5e7eb !important;
                  border-radius: 8px !important;
                  padding: 10px 16px !important;
                  transition: border-color 0.3s !important;
                }
                
                .tp-widget-form input:focus,
                .tp-widget-form textarea:focus {
                  border-color: #1C417A !important;
                  outline: none !important;
                }
                
                /* Лейблы */
                .tp-widget-form label {
                  color: #374151 !important;
                  font-weight: 500 !important;
                  margin-bottom: 6px !important;
                }
                
                /* Заголовки */
                .tp-widget-form h2,
                .tp-widget-form h3 {
                  color: #1C417A !important;
                  font-weight: 700 !important;
                }
                
                /* Чекбоксы */
                .tp-widget-form input[type="checkbox"] {
                  width: 20px !important;
                  height: 20px !important;
                  border-radius: 4px !important;
                }
                
                /* Ошибки */
                .tp-widget-form .error {
                  color: #dc2626 !important;
                  font-size: 14px !important;
                }
                
                /* Loader */
                .tp-widget-form .loader {
                  border-color: #1C417A !important;
                }
              `}</style>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}