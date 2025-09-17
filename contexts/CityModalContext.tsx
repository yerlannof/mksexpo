'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import CitySelectionModal from '@/components/CitySelectionModal';
import { useFacebookTracking } from '@/hooks/useFacebookTracking';

interface CityModalContextType {
  openCityModal: () => void;
  closeCityModal: () => void;
}

const CityModalContext = createContext<CityModalContextType>({
  openCityModal: () => {},
  closeCityModal: () => {}
});

export function CityModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { trackLead } = useFacebookTracking();

  const openCityModal = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
    
    // Отправляем событие Lead в Facebook когда пользователь кликает "Записаться"
    trackLead({
      content_name: 'Registration Button Click',
      content_category: 'Lead Generation',
      value: 1,
      currency: 'KZT'
    });
  }, [trackLead]);

  const closeCityModal = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  return (
    <CityModalContext.Provider value={{ openCityModal, closeCityModal }}>
      {children}
      <CitySelectionModal isOpen={isOpen} onClose={closeCityModal} />
    </CityModalContext.Provider>
  );
}

export function useCityModal() {
  const context = useContext(CityModalContext);
  if (!context) {
    throw new Error('useCityModal must be used within a CityModalProvider');
  }
  return context;
}