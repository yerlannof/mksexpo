import { useCallback } from 'react';

export const useSmoothScroll = () => {
  const scrollToElement = useCallback((elementId: string, offset: number = 120) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const handleAnchorClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string, offset?: number) => {
    e.preventDefault();
    scrollToElement(targetId, offset);
  }, [scrollToElement]);

  return { scrollToElement, handleAnchorClick };
};