// Global animation performance configuration

export const animationConfig = {
  // Reduce motion for users who prefer it
  respectReducedMotion: true,
  
  // Performance optimizations
  performance: {
    maxConcurrentAnimations: 3,
    defaultDuration: 0.3,
    defaultEase: [0.25, 0.1, 0.25, 1],
    viewportMargin: '-50px',
    triggerAmount: 0.1,
  },
  
  // Simplified animations for better performance
  animations: {
    fadeUp: {
      hidden: { opacity: 0, y: 16 },
      visible: { opacity: 1, y: 0 }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.96 },
      visible: { opacity: 1, scale: 1 }
    }
  }
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get animation variant based on user preference
export const getAnimationVariant = (animationType: keyof typeof animationConfig.animations) => {
  if (prefersReducedMotion()) {
    return {
      hidden: {},
      visible: {}
    };
  }
  return animationConfig.animations[animationType];
};