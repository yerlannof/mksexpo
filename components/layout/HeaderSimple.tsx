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
    <header className="fixed top-0 w-full bg-[#1C417A] z-50 shadow-md">
      <div className="w-full px-4 sm:px-6 max-w-7xl mx-auto">
        <nav className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/mks-white-logo-new.png"
              alt=""
              width={120}
              height={50}
              className="h-10 sm:h-12 md:h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12 lg:space-x-16">
            <a href="#participants" className="text-white/90 hover:text-white transition-colors">
              {language === 'ru' ? 'Участники' : 'Participants'}
            </a>
            <a href="#programs" className="text-white/90 hover:text-white transition-colors">
              {language === 'ru' ? 'Программы' : 'Programs'}
            </a>
            <a href="#faq" className="text-white/90 hover:text-white transition-colors">
              FAQ
            </a>
          </div>

          {/* Mobile Controls - High contrast and visibility */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
              className="relative flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-[#1C417A] bg-white rounded-lg"
              style={{ 
                boxShadow: '0 0 0 2px rgba(255,255,255,0.3), 0 4px 12px rgba(0,0,0,0.3)',
                minWidth: '60px'
              }}
            >
              <Globe className="w-4 h-4 flex-shrink-0" />
              <span>{language === 'ru' ? 'RU' : 'EN'}</span>
            </button>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="relative p-3 rounded-lg bg-white text-[#1C417A]"
              style={{ 
                boxShadow: '0 0 0 2px rgba(255,255,255,0.3), 0 4px 12px rgba(0,0,0,0.3)' 
              }}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" strokeWidth={3} />
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
          </div>
        </nav>

        {/* Mobile Drawer */}
        <MobileDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </header>
  );
}