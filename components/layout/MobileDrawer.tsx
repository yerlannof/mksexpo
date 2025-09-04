'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCityModal } from '@/contexts/CityModalContext';
import { X, Users, HelpCircle, Phone, Mail, Globe, Calendar, BookOpen } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const { language, setLanguage, t } = useLanguage();
  const { openCityModal } = useCityModal();

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
      label: language === 'ru' ? 'Участники' : 'Participants',
      icon: Users 
    },
    { 
      href: '#programs', 
      label: language === 'ru' ? 'Программы' : 'Programs',
      icon: BookOpen 
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
            className="fixed inset-0 bg-black/70"
            onClick={onClose}
          />
          
          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-xl z-[61] flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#1C417A] px-6 py-5 text-white flex-shrink-0 shadow-lg">
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
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <li key={index}>
                        <a 
                          href={item.href} 
                          onClick={(e) => {
                            e.preventDefault();
                            const element = document.querySelector(item.href);
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                            onClose();
                          }} 
                          className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors group block"
                        >
                          <Icon className="w-6 h-6 text-[#1C417A] group-hover:text-[#305FA6] transition-colors flex-shrink-0" />
                          <span className="font-medium text-gray-900 text-lg">
                            {item.label}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
                
                {/* Registration Button */}
                <div className="mt-4">
                  <AnimatedButton
                    variant="danger"
                    size="xl"
                    onClick={() => {
                      openCityModal();
                      onClose();
                    }}
                    className="w-full text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
                    leftIcon={<Calendar className="w-6 h-6" />}
                  >
                    {t('hero.cta.apply')}
                  </AnimatedButton>
                </div>
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
                        ? 'bg-[#1C417A] text-white shadow-md' 
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1C417A] hover:text-[#1C417A]'
                    }`}
                  >
                    Русский
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
                      language === 'en' 
                        ? 'bg-[#1C417A] text-white shadow-md' 
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1C417A] hover:text-[#1C417A]'
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
                    href="tel:+77272588583" 
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Phone className="w-5 h-5 text-[#1C417A]" />
                    <span className="text-gray-700 font-medium">8-727-2588-583</span>
                  </a>
                  <a href="https://wa.me/77771110808" className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-[#1C417A]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span className="text-gray-700 font-medium">+7-777-111-08-08</span>
                  </a>
                  <a 
                    href="mailto:info@mks.kz" 
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Mail className="w-5 h-5 text-[#1C417A]" />
                    <span className="text-gray-700 font-medium">info@mks.kz</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}