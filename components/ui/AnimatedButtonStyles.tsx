'use client';

import { useEffect } from 'react';

export const AnimatedButtonStyles = () => {
  useEffect(() => {
    const styleId = 'animated-button-styles';
    
    // Check if styles already exist
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      @keyframes gradient-shift {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      @keyframes pulse-glow {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.8;
        }
      }

      .animate-pulse-glow {
        animation: pulse-glow 2s ease-in-out infinite;
      }
    `;
    
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return null;
};

export default AnimatedButtonStyles;