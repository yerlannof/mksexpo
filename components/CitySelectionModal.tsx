'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import TimepadRegistrationModal from './TimepadRegistrationModal';
import { fbEvents } from '@/components/FacebookPixel';

interface CitySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const cities = {
  ru: [
    {
      date: '1 октября',
      city: 'Актау',
      time: '15:00-19:00',
      venue: 'Renaissance by Sulo',
      eventId: '3562617'
    },
    {
      date: '2 октября',
      city: 'Атырау',
      time: '15:00-19:00',
      venue: 'Renaissance by Crystall',
      eventId: '3562622'
    },
    {
      date: '4 октября',
      city: 'Астана',
      time: '13:00-17:00',
      venue: 'Hilton Astana Hotel, EXPO',
      eventId: '3562405' // Actual Timepad event ID for Astana
    },
    {
      date: '5 октября',
      city: 'Алматы',
      time: '13:00-17:00',
      venue: 'Rixos Almaty Hotel',
      eventId: '3562434' // Actual Timepad event ID for Almaty
    }
  ],
  en: [
    {
      date: 'October 1',
      city: 'Aktau',
      time: '15:00-19:00',
      venue: 'Renaissance by Sulo',
      eventId: '3562617'
    },
    {
      date: 'October 2',
      city: 'Atyrau',
      time: '15:00-19:00',
      venue: 'Renaissance by Crystall',
      eventId: '3562622'
    },
    {
      date: 'October 4',
      city: 'Astana',
      time: '13:00-17:00',
      venue: 'Hilton Astana Hotel, EXPO',
      eventId: '3562405' // Actual Timepad event ID for Astana
    },
    {
      date: 'October 5',
      city: 'Almaty',
      time: '13:00-17:00',
      venue: 'Rixos Almaty Hotel',
      eventId: '3562434' // Actual Timepad event ID for Almaty
    }
  ]
};

export default function CitySelectionModal({ isOpen, onClose }: CitySelectionModalProps) {
  const { language } = useLanguage();
  const cityList = cities[language];
  
  const [selectedCity, setSelectedCity] = useState<{ city: string; eventId: string } | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const handleCityClick = (city: string, eventId: string) => {
    // Track city selection event for Facebook
    fbEvents.trackCitySelected(city);
    
    setSelectedCity({ city, eventId });
    setIsRegistrationOpen(true);
  };

  const handleCloseRegistration = () => {
    setIsRegistrationOpen(false);
    setSelectedCity(null);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            onClick={onClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-[#1C417A] to-[#305FA6] rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {language === 'ru' ? 'Выберите город для регистрации' : 'Choose a city for registration'}
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              
              {/* Cities List */}
              <div className="space-y-3">
                {cityList.map((city, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleCityClick(city.city, city.eventId)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="block w-full p-4 sm:p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl group text-left"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-baseline gap-3 mb-1 sm:mb-2">
                          <span className="text-lg sm:text-xl font-bold text-white">{city.date} – {city.city}</span>
                        </div>
                        <p className="text-sm sm:text-base text-white/80">
                          {city.time}, {city.venue}
                        </p>
                      </div>
                      <div className="flex items-center text-white/60 group-hover:text-white transition-colors">
                        <span className="text-sm mr-2">{language === 'ru' ? 'Регистрация' : 'Register'}</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
              
              {/* Footer Note */}
              <p className="text-white/60 text-sm text-center mt-6">
                {language === 'ru' 
                  ? 'Нажмите на город, чтобы перейти к форме регистрации' 
                  : 'Click on a city to proceed to the registration form'}
              </p>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    
    {/* Registration Modal */}
    {selectedCity && (
      <TimepadRegistrationModal
        isOpen={isRegistrationOpen}
        onClose={handleCloseRegistration}
        city={selectedCity.city}
        eventId={selectedCity.eventId}
      />
    )}
    </>
  );
}