'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, Users, ClipboardList, HelpCircle, Phone, Mail } from 'lucide-react';

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
      label: t('nav.participants'),
      icon: Users,
    },
    {
      href: '#registration', 
      label: t('nav.registration'),
      icon: ClipboardList,
    },
    {
      href: '#faq',
      label: t('nav.faq'),
      icon: HelpCircle,
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] md:hidden">
      {/* Black overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-75"
        onClick={onClose}
      />
      
      {/* White drawer panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="absolute right-0 top-0 h-full w-80 max-w-[80vw] bg-white"
      >
        {/* Header with logo */}
        <div className="bg-blue-600 px-4 py-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">M&K Study Centre</h2>
              <p className="text-sm opacity-90">
                {language === 'ru' ? 'Образование за рубежом' : 'Education Abroad'}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 h-full overflow-y-auto">
          {/* Navigation links */}
          <nav className="mb-6">
            <ul className="space-y-3">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-900">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Language switcher */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-3">
              {language === 'ru' ? 'Выберите язык' : 'Choose language'}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('ru')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  language === 'ru' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-600 border'
                }`}
              >
                Русский
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  language === 'en' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-600 border'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Contact info */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Контакты</p>
            <div className="space-y-2">
              <a href="tel:+77012345678" className="flex items-center gap-3 text-gray-600">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+7 (701) 234-56-78</span>
              </a>
              <a href="mailto:info@mkeducation.kz" className="flex items-center gap-3 text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@mkeducation.kz</span>
              </a>
            </div>
          </div>

          {/* Registration button */}
          <Link
            href="#registration"
            onClick={onClose}
            className="block w-full py-3 px-6 text-center bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('nav.registration')}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}