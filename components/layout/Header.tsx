'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, Phone, Mail, MapPin, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const smoothScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    // Close mobile menu if open
    setIsMenuOpen(false);
    
    // Find the target element
    const element = document.getElementById(targetId);
    if (element) {
      // Calculate the header height to offset the scroll
      const headerHeight = 120; // Adjusted for your header (top bar + main nav)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      // Perform smooth scroll
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      {/* Top bar */}
      <div className="bg-primary-50 border-b border-primary-100">
        <div className="container">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+77012991144" className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors">
                <Phone className="w-4 h-4" />
                <span>+7 (701) 299-11-44</span>
              </a>
              <a href="tel:+77012991155" className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors">
                <Phone className="w-4 h-4" />
                <span>+7 (701) 299-11-55</span>
              </a>
              <a href="mailto:info@mkstudy.kz" className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@mkstudy.kz</span>
              </a>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <MapPin className="w-4 h-4" />
              <span>Алматы, ул. Манаса 34А, офис 403</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main navigation */}
      <div className="container">
        <nav className="flex items-center justify-between h-28">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex items-center gap-3">
              <Image
                src="/mks-white-logo-new.png"
                alt="M&K Study Centre"
                width={250}
                height={100}
                className="h-24 w-auto"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-20">
            <Link 
              href="#opportunities" 
              onClick={(e) => smoothScrollTo(e, 'opportunities')}
              className="text-neutral-700 hover:text-primary transition-colors font-medium"
            >
              {t('nav.opportunities') || 'Возможности'}
            </Link>
            <Link 
              href="#programs" 
              onClick={(e) => smoothScrollTo(e, 'programs')}
              className="text-neutral-700 hover:text-primary transition-colors font-medium"
            >
              {t('nav.programs') || 'Программы'}
            </Link>
            <Link 
              href="#participants" 
              onClick={(e) => smoothScrollTo(e, 'participants')}
              className="text-neutral-700 hover:text-primary transition-colors font-medium"
            >
              {t('nav.participants')}
            </Link>
            <Link 
              href="#faq" 
              onClick={(e) => smoothScrollTo(e, 'faq')}
              className="text-neutral-700 hover:text-primary transition-colors font-medium"
            >
              {t('nav.faq')}
            </Link>
          </div>

          {/* Language Switcher */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
              className="flex items-center gap-2 text-neutral-600 hover:text-primary transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === 'ru' ? 'RU' : 'EN'}
              </span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="#opportunities" 
                onClick={(e) => smoothScrollTo(e, 'opportunities')}
                className="text-neutral-700 hover:text-primary transition-colors"
              >
                {t('nav.opportunities') || 'Возможности'}
              </Link>
              <Link 
                href="#programs" 
                onClick={(e) => smoothScrollTo(e, 'programs')}
                className="text-neutral-700 hover:text-primary transition-colors"
              >
                {t('nav.programs') || 'Программы'}
              </Link>
              <Link 
                href="#participants" 
                onClick={(e) => smoothScrollTo(e, 'participants')}
                className="text-neutral-700 hover:text-primary transition-colors"
              >
                {t('nav.participants')}
              </Link>
              <Link 
                href="#faq" 
                onClick={(e) => smoothScrollTo(e, 'faq')}
                className="text-neutral-700 hover:text-primary transition-colors"
              >
                {t('nav.faq')}
              </Link>
              <button
                onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
                className="text-sm font-medium text-neutral-600 hover:text-primary transition-colors text-left"
              >
                {language === 'ru' ? 'Switch to English' : 'Переключить на русский'}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}