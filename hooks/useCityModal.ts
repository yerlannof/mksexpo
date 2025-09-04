'use client';

import { useState, useCallback } from 'react';

export function useCityModal() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Re-enable body scroll
    document.body.style.overflow = 'unset';
  }, []);

  return {
    isOpen,
    open,
    close
  };
}