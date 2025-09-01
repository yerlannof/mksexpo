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

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-primary">
              <div>
                <h2 className="text-lg font-bold text-white">M&K Study Centre</h2>
                <p className="text-sm text-white/80">
                  {language === 'ru' ? 'Образование за рубежом' : 'Education Abroad'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col h-full">
              {/* Navigation */}
              <nav className="flex-1 p-4">
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium text-gray-900">{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Language Switcher */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    {language === 'ru' ? 'Язык / Language' : 'Language / Язык'}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setLanguage('ru')}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                        language === 'ru'
                          ? 'bg-primary text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Русский
                    </button>
                    <button
                      onClick={() => setLanguage('en')}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                        language === 'en'
                          ? 'bg-primary text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-700 mb-3">{t('footer.contact')}</p>
                  <div className="space-y-2">
                    <a
                      href="tel:+77012345678"
                      className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">+7 (701) 234-56-78</span>
                    </a>
                    <a
                      href="mailto:info@mkeducation.kz"
                      className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">info@mkeducation.kz</span>
                    </a>
                  </div>
                </div>
              </nav>

              {/* Footer CTA */}
              <div className="p-4 border-t bg-gray-50">
                <Link
                  href="#registration"
                  onClick={onClose}
                  className="block w-full py-3 px-6 text-center rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
                >
                  {t('nav.registration')}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}