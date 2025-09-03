'use client';

import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
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
    <footer className="bg-[#1C417A] text-white">
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
              <a href="https://www.facebook.com/mkstudy" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/mkstudy.kz/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('footer.contact')}</h4>
            <div className="space-y-2">
              <a href="tel:+77272588583" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <span>8-727-2588-583</span>
              </a>
              <a href="https://wa.me/77771110808" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>+7-777-111-08-08</span>
              </a>
              <a href="mailto:info@mks.kz" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                <span>info@mks.kz</span>
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