'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, Phone, Mail, MapPin, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

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
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex items-center gap-3">
              <Image
                src="/mkslogo.png"
                alt="M&K Study Centre"
                width={180}
                height={72}
                className="h-16 w-auto"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="#opportunities" className="text-neutral-700 hover:text-primary transition-colors font-medium">
              Возможности
            </Link>
            <Link href="#programs" className="text-neutral-700 hover:text-primary transition-colors font-medium">
              Программы
            </Link>
            <Link href="#participants" className="text-neutral-700 hover:text-primary transition-colors font-medium">
              Участники
            </Link>
            <Link href="#steps" className="text-neutral-700 hover:text-primary transition-colors font-medium">
              Как участвовать
            </Link>
            <Link href="#registration" className="text-neutral-700 hover:text-primary transition-colors font-medium">
              Регистрация
            </Link>
            <Link href="#faq" className="text-neutral-700 hover:text-primary transition-colors font-medium">
              FAQ
            </Link>
          </div>

          {/* Language Switcher & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
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
            <Link href="#registration" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all hover:shadow-lg flex items-center gap-2">
              <span>Оставить заявку</span>
            </Link>
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
              <Link href="#opportunities" className="text-neutral-700 hover:text-primary transition-colors">
                Возможности
              </Link>
              <Link href="#programs" className="text-neutral-700 hover:text-primary transition-colors">
                Программы
              </Link>
              <Link href="#participants" className="text-neutral-700 hover:text-primary transition-colors">
                Участники
              </Link>
              <Link href="#steps" className="text-neutral-700 hover:text-primary transition-colors">
                Как участвовать
              </Link>
              <Link href="#registration" className="text-neutral-700 hover:text-primary transition-colors">
                Регистрация
              </Link>
              <Link href="#faq" className="text-neutral-700 hover:text-primary transition-colors">
                FAQ
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