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
    <header className="fixed top-0 w-full bg-primary/95 backdrop-blur-md z-50 shadow-lg">
      <div className="container">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <Image
              src="/mkslogo.png"
              alt="M&K Study Centre"
              width={50}
              height={50}
              className="h-10 sm:h-12 w-auto"
              priority
            />
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-white">M&K Study Centre</h1>
              <p className="text-xs text-white/80">{language === 'ru' ? 'Образование за рубежом' : 'Education Abroad'}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#participants" className="text-white/90 hover:text-white transition-colors">
              {t('nav.participants')}
            </Link>
            <Link href="#registration" className="text-white/90 hover:text-white transition-colors">
              {t('nav.registration')}
            </Link>
            <Link href="#faq" className="text-white/90 hover:text-white transition-colors">
              {t('nav.faq')}
            </Link>
          </div>

          {/* Language Switcher & CTA */}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        </nav>

        {/* Mobile Drawer */}
        <MobileDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </header>
  );
}