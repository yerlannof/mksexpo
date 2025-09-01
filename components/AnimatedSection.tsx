'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

type AnimationType = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scaleUp' | 'blur';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  once?: boolean;
  viewportMargin?: string;
  className?: string;
  amount?: number | 'some' | 'all';
}

const animationVariants: Record<AnimationType, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 20, transform: 'translateZ(0)' },
    visible: { 
      opacity: 1, 
      y: 0,
      transform: 'translateZ(0)',
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  },
  fadeDown: {
    hidden: { opacity: 0, y: -20, transform: 'translateZ(0)' },
    visible: { 
      opacity: 1, 
      y: 0,
      transform: 'translateZ(0)',
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  },
  fadeLeft: {
    hidden: { opacity: 0, x: 20, transform: 'translateZ(0)' },
    visible: { 
      opacity: 1, 
      x: 0,
      transform: 'translateZ(0)',
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  },
  fadeRight: {
    hidden: { opacity: 0, x: -20, transform: 'translateZ(0)' },
    visible: { 
      opacity: 1, 
      x: 0,
      transform: 'translateZ(0)',
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.95, transform: 'translateZ(0)' },
    visible: { 
      opacity: 1, 
      scale: 1,
      transform: 'translateZ(0)',
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  },
  blur: {
    hidden: { 
      opacity: 0, 
      filter: 'blur(5px)',
      transform: 'translateZ(0)'
    },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)',
      transform: 'translateZ(0)',
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }
};

export default function AnimatedSection({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 0.4,
  staggerChildren = 0,
  once = true,
  viewportMargin = '-50px',
  className = '',
  amount = 0.1
}: AnimatedSectionProps) {
  const selectedVariant = animationVariants[animation];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once, 
        margin: viewportMargin,
        amount 
      }}
      variants={selectedVariant}
      custom={{ delay, duration, staggerChildren }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

// Export child component for staggered animations
export function AnimatedChild({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10, transform: 'translateZ(0)' },
        visible: { 
          opacity: 1, 
          y: 0,
          transform: 'translateZ(0)',
          transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1]
          }
        }
      }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

// Export preset animations for common use cases
export const AnimationPresets = {
  hero: {
    animation: 'fadeUp' as AnimationType,
    duration: 0.6,
    delay: 0.1
  },
  card: {
    animation: 'scaleUp' as AnimationType,
    duration: 0.4,
    once: true
  },
  text: {
    animation: 'fadeUp' as AnimationType,
    duration: 0.3,
    staggerChildren: 0.05
  },
  image: {
    animation: 'blur' as AnimationType,
    duration: 0.8,
    once: true
  },
  slideIn: {
    animation: 'fadeLeft' as AnimationType,
    duration: 0.5,
    viewportMargin: '-25px'
  }
};