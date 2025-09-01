'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, Users, ClipboardList, HelpCircle, Phone, Mail, Globe, Calendar, Star, MessageSquare } from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const { language, setLanguage, t } = useLanguage();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuItems = [
    { 
      href: '#participants', 
      label: language === 'ru' ? 'Список участников' : 'Participants', 
      icon: Users 
    },
    { 
      href: '#timeline', 
      label: language === 'ru' ? 'Программа' : 'Program', 
      icon: Calendar 
    },
    { 
      href: '#whyvisit', 
      label: language === 'ru' ? 'Почему мы' : 'Why Visit', 
      icon: Star 
    },
    { 
      href: '#testimonials', 
      label: language === 'ru' ? 'Отзывы' : 'Testimonials', 
      icon: MessageSquare 
    },
    { 
      href: '#registration', 
      label: language === 'ru' ? 'Регистрация' : 'Registration', 
      icon: ClipboardList 
    },
    { 
      href: '#faq', 
      label: 'FAQ', 
      icon: HelpCircle 
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop/Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-[61] flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary px-6 py-5 text-white flex-shrink-0 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">M&K Study Centre</h2>
                  <p className="text-sm text-white/90 mt-1">
                    {language === 'ru' ? 'Образование за рубежом' : 'Education Abroad'}
                  </p>
                </div>
                <button 
                  onClick={onClose} 
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Navigation */}
              <nav className="p-4">
                <ul className="space-y-2">
                  {/* Hardcoded menu items for reliability */}
                  <li>
                    <Link href="#participants" onClick={onClose} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors group">
                      <Users className="w-6 h-6 text-primary group-hover:text-primary-light transition-colors" />
                      <span className="font-medium text-gray-900 text-lg">
                        {language === 'ru' ? 'Список участников' : 'Participants'}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#timeline" onClick={onClose} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors group">
                      <Calendar className="w-6 h-6 text-primary group-hover:text-primary-light transition-colors" />
                      <span className="font-medium text-gray-900 text-lg">
                        {language === 'ru' ? 'Программа' : 'Program'}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#whyvisit" onClick={onClose} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors group">
                      <Star className="w-6 h-6 text-primary group-hover:text-primary-light transition-colors" />
                      <span className="font-medium text-gray-900 text-lg">
                        {language === 'ru' ? 'Почему мы' : 'Why Visit'}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#testimonials" onClick={onClose} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors group">
                      <MessageSquare className="w-6 h-6 text-primary group-hover:text-primary-light transition-colors" />
                      <span className="font-medium text-gray-900 text-lg">
                        {language === 'ru' ? 'Отзывы' : 'Testimonials'}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#registration" onClick={onClose} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors group">
                      <ClipboardList className="w-6 h-6 text-primary group-hover:text-primary-light transition-colors" />
                      <span className="font-medium text-gray-900 text-lg">
                        {language === 'ru' ? 'Регистрация' : 'Registration'}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#faq" onClick={onClose} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors group">
                      <HelpCircle className="w-6 h-6 text-primary group-hover:text-primary-light transition-colors" />
                      <span className="font-medium text-gray-900 text-lg">FAQ</span>
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Language Switcher */}
              <div className="mx-4 mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-gray-600" />
                  <p className="text-sm font-semibold text-gray-700">
                    {language === 'ru' ? 'Выберите язык' : 'Choose language'}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setLanguage('ru')}
                    className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
                      language === 'ru' 
                        ? 'bg-primary text-white shadow-md' 
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
                    }`}
                  >
                    Русский
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
                      language === 'en' 
                        ? 'bg-primary text-white shadow-md' 
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mx-4 mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-4 px-2">
                  {language === 'ru' ? 'Контакты' : 'Contact Info'}
                </p>
                <div className="space-y-3">
                  <a 
                    href="tel:+77012345678" 
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="text-gray-700 font-medium">+7 (701) 234-56-78</span>
                  </a>
                  <a 
                    href="mailto:info@mkeducation.kz" 
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-gray-700 font-medium">info@mkeducation.kz</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Fixed Footer */}
            <div className="flex-shrink-0 p-4 border-t border-gray-100 bg-gray-50/50">
              <Link
                href="#registration"
                onClick={onClose}
                className="block w-full py-4 px-6 text-center bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-lg"
              >
                {t('nav.registration')}
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}