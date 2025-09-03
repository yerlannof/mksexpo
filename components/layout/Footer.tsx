'use client';

import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  
  const smoothScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    const element = document.getElementById(targetId);
    if (element) {
      const headerHeight = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Image
              src="/mks-white-logo-new.png"
              alt=""
              width={150}
              height={60}
              className="h-12 w-auto"
            />
            {t('footer.about.desc') && (
              <p className="text-neutral-400">
                {t('footer.about.desc')}
              </p>
            )}
            <div className="flex gap-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('footer.contact')}</h4>
            <div className="space-y-2">
              <a href="tel:+77012345678" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <span>+7 (701) 234-56-78</span>
              </a>
              <a href="mailto:info@mkeducation.kz" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@mkeducation.kz</span>
              </a>
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('footer.address')}</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-neutral-400">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">{t('hero.date.almaty')}</p>
                  <p className="text-sm">{t('footer.address.almaty')}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-neutral-400">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">{t('hero.date.astana')}</p>
                  <p className="text-sm">{t('footer.address.astana')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="#participants" 
                  onClick={(e) => smoothScrollTo(e, 'participants')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {t('nav.participants')}
                </Link>
              </li>
              <li>
                <Link 
                  href="#registration" 
                  onClick={(e) => smoothScrollTo(e, 'registration')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {t('nav.registration')}
                </Link>
              </li>
              <li>
                <Link 
                  href="#faq" 
                  onClick={(e) => smoothScrollTo(e, 'faq')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {t('nav.faq')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400">
          <p>&copy; 2025 {t('footer.rights')}.</p>
        </div>
      </div>
    </footer>
  );
}