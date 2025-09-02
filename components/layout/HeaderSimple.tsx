'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, Menu } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import MobileDrawer from './MobileDrawer';

export default function HeaderSimple() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="fixed top-0 w-full bg-primary z-50 shadow-md">
      <div className="container">
        <nav className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/mkslogo.png"
              alt="M&K Study Centre"
              width={50}
              height={50}
              className="h-8 sm:h-10 md:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#participants" className="text-white/90 hover:text-white transition-colors">
              {t('nav.participants')}
            </Link>
            <Link href="#timeline" className="text-white/90 hover:text-white transition-colors">
              {t('nav.timeline')}
            </Link>
            <Link href="#whyvisit" className="text-white/90 hover:text-white transition-colors">
              {t('nav.whyvisit')}
            </Link>
            <Link href="#testimonials" className="text-white/90 hover:text-white transition-colors">
              {t('nav.testimonials')}
            </Link>
            <Link href="#faq" className="text-white/90 hover:text-white transition-colors">
              {t('nav.faq')}
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
              className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'ru' ? 'RU' : 'EN'}</span>
            </button>
            <AnimatedButton
              variant="secondary"
              size="sm"
              href="#registration"
              className="text-xs px-3 py-2"
            >
              {t('nav.registration')}
            </AnimatedButton>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'ru' ? 'RU' : 'EN'}</span>
            </button>
            <AnimatedButton
              variant="secondary"
              size="md"
              href="#registration"
            >
              {t('nav.registration')}
            </AnimatedButton>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <MobileDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </header>
  );
}