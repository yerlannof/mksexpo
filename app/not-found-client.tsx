'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFoundClient() {
  const { t, language } = useLanguage()

  const content = {
    en: {
      title: '404',
      subtitle: 'Page Not Found',
      description: 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
      homeButton: 'Back to Home',
      backButton: 'Go Back',
      searchButton: 'Search',
      suggestions: 'You might want to check out:',
      links: [
        { text: 'Exhibition Info', href: '#exhibition' },
        { text: 'School Catalog', href: '#schools' },
        { text: 'Contact Us', href: '#footer' }
      ]
    },
    ru: {
      title: '404',
      subtitle: 'Страница не найдена',
      description: 'Страница, которую вы ищете, могла быть удалена, переименована или временно недоступна.',
      homeButton: 'На главную',
      backButton: 'Назад',
      searchButton: 'Поиск',
      suggestions: 'Возможно, вас заинтересует:',
      links: [
        { text: 'О выставке', href: '#exhibition' },
        { text: 'Каталог школ', href: '#schools' },
        { text: 'Контакты', href: '#footer' }
      ]
    }
  }

  const currentContent = content[language]

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900" />
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Number */}
          <h1 className="text-9xl md:text-[12rem] font-bold text-white/10 select-none">
            {currentContent.title}
          </h1>
          
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-8 mb-4">
            {currentContent.subtitle}
          </h2>
          
          {/* Description */}
          <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
            {currentContent.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5" />
              {currentContent.homeButton}
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
              {currentContent.backButton}
            </button>
          </div>

          {/* Suggestions */}
          <div className="backdrop-blur-md bg-white/5 rounded-2xl p-8 border border-white/10">
            <p className="text-white/80 mb-6">{currentContent.suggestions}</p>
            <div className="grid md:grid-cols-3 gap-4">
              {currentContent.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
                >
                  <span className="text-white/90">{link.text}</span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}