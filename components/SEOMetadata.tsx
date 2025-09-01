import { useLanguage } from '@/contexts/LanguageContext'

interface SEOMetadataProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export function SEOMetadata({ title, description, image, url }: SEOMetadataProps) {
  const { t, language } = useLanguage()
  
  const metadata = {
    en: {
      defaultTitle: 'Central Asia Education Expo 2025 | International Schools Exhibition',
      defaultDescription: 'Join the premier international schools exhibition in Central Asia. Discover top educational institutions, meet representatives, and explore opportunities for your child\'s future.',
      keywords: 'international schools, education expo, Central Asia, Kazakhstan, private schools, education fair, school exhibition',
    },
    ru: {
      defaultTitle: 'Central Asia Education Expo 2025 | Выставка международных школ',
      defaultDescription: 'Присоединяйтесь к главной выставке международных школ в Центральной Азии. Откройте для себя лучшие учебные заведения, встретьтесь с представителями и изучите возможности для будущего вашего ребенка.',
      keywords: 'международные школы, образовательная выставка, Центральная Азия, Казахстан, частные школы, образовательная ярмарка',
    }
  }

  const currentMetadata = metadata[language]
  const finalTitle = title || currentMetadata.defaultTitle
  const finalDescription = description || currentMetadata.defaultDescription
  const finalImage = image || '/og-image.jpg'
  const finalUrl = url || 'https://caee.kz'

  // Return structured data for the event
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": finalTitle,
    "description": finalDescription,
    "image": finalImage,
    "startDate": "2025-03-15T10:00:00+06:00",
    "endDate": "2025-03-16T18:00:00+06:00",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": "Rixos President Hotel Astana",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kunayev St 7",
        "addressLocality": "Astana",
        "addressCountry": "KZ"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Central Asia Education Expo",
      "url": "https://caee.kz"
    }
  }

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: currentMetadata.keywords,
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      images: [finalImage],
      url: finalUrl,
      type: 'website',
      locale: language === 'ru' ? 'ru_RU' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [finalImage],
    },
    structuredData: JSON.stringify(structuredData),
  }
}