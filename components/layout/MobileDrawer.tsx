'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  X, 
  Users, 
  ClipboardList, 
  HelpCircle, 
  Globe, 
  Facebook, 
  Instagram, 
  Linkedin,
  Phone,
  Mail,
  ChevronRight
} from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const { language, setLanguage, t } = useLanguage();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Handle focus trap
  useEffect(() => {
    if (isOpen) {
      // Store the previously focused element
      const previouslyFocused = document.activeElement as HTMLElement;
      
      // Focus the drawer
      drawerRef.current?.focus();
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore body scroll
        document.body.style.overflow = '';
        // Restore focus
        previouslyFocused?.focus();
      };
    }
  }, [isOpen]);

  // Handle swipe to close
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // If dragged right more than 100px, close the drawer
    if (info.offset.x > 100) {
      onClose();
    }
  };

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

  const socialLinks = [
    {
      href: 'https://facebook.com/mkeducation',
      icon: Facebook,
      label: 'Facebook',
    },
    {
      href: 'https://instagram.com/mkeducation',
      icon: Instagram,
      label: 'Instagram',
    },
    {
      href: 'https://linkedin.com/company/mkeducation',
      icon: Linkedin,
      label: 'LinkedIn',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            tabIndex={-1}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="fixed right-0 top-0 h-full w-[85%] max-w-sm bg-gradient-to-b from-primary/95 to-primary backdrop-blur-md z-50 md:hidden overflow-hidden"
          >
            {/* Glass morphism overlay */}
            <div className="absolute inset-0 bg-white/5" />
            
            {/* Content */}
            <div className="relative h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <Image
                    src="/mkslogo.png"
                    alt="M&K Study Centre"
                    width={40}
                    height={40}
                    className="h-10 w-auto"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-white">M&K Study Centre</h2>
                    <p className="text-xs text-white/70">
                      {language === 'ru' ? 'Образование за рубежом' : 'Education Abroad'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto px-6 py-4">
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                            <item.icon className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-white font-medium">{item.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-white/70 transition-colors" />
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Language Switcher */}
                <div className="mt-6 p-4 rounded-xl bg-white/5">
                  <p className="text-sm text-white/70 mb-3">
                    {language === 'ru' ? 'Язык / Language' : 'Language / Язык'}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setLanguage('ru')}
                      className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 ${
                        language === 'ru'
                          ? 'bg-white/20 text-white font-medium'
                          : 'bg-white/5 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      Русский
                    </button>
                    <button
                      onClick={() => setLanguage('en')}
                      className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 ${
                        language === 'en'
                          ? 'bg-white/20 text-white font-medium'
                          : 'bg-white/5 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-6 p-4 rounded-xl bg-white/5">
                  <p className="text-sm text-white/70 mb-3">{t('footer.contact')}</p>
                  <div className="space-y-2">
                    <a
                      href="tel:+77012345678"
                      className="flex items-center gap-3 text-white/90 hover:text-white transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">+7 (701) 234-56-78</span>
                    </a>
                    <a
                      href="mailto:info@mkeducation.kz"
                      className="flex items-center gap-3 text-white/90 hover:text-white transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">info@mkeducation.kz</span>
                    </a>
                  </div>
                </div>
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-white/10">
                {/* Social Media */}
                <div className="flex items-center justify-center gap-4 mb-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-white" />
                    </a>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  href="#registration"
                  onClick={onClose}
                  className="block w-full py-3 px-6 text-center rounded-xl bg-white text-primary font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg"
                >
                  {t('nav.registration')}
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}