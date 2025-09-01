'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';

type AnimationType = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scaleUp' | 'blur' | 'none';

interface OptimizedAnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
  disabled?: boolean;
}

const animationVariants: Record<AnimationType, Variants> = {
  none: {
    hidden: {},
    visible: {}
  },
  fadeUp: {
    hidden: { opacity: 0, y: 16 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  },
  fadeDown: {
    hidden: { opacity: 0, y: -16 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  },
  fadeLeft: {
    hidden: { opacity: 0, x: 16 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  },
  fadeRight: {
    hidden: { opacity: 0, x: -16 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  },
  blur: {
    hidden: { 
      opacity: 0, 
      filter: 'blur(4px)'
    },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }
};

// Throttle animations to prevent too many at once
let activeAnimations = 0;
const MAX_CONCURRENT_ANIMATIONS = 3;
const animationQueue: (() => void)[] = [];

const processQueue = () => {
  if (activeAnimations < MAX_CONCURRENT_ANIMATIONS && animationQueue.length > 0) {
    const nextAnimation = animationQueue.shift();
    if (nextAnimation) {
      activeAnimations++;
      nextAnimation();
    }
  }
};

export default function OptimizedAnimatedSection({
  children,
  animation = 'fadeUp',
  delay = 0,
  className = '',
  disabled = false
}: OptimizedAnimatedSectionProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (disabled || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            const animate = () => {
              setTimeout(() => {
                setShouldAnimate(true);
                setTimeout(() => {
                  activeAnimations--;
                  processQueue();
                }, 500); // Animation duration + buffer
              }, delay * 1000);
            };

            if (activeAnimations < MAX_CONCURRENT_ANIMATIONS) {
              activeAnimations++;
              animate();
            } else {
              animationQueue.push(animate);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-50px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay, disabled]);

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  const selectedVariant = animationVariants[animation];

  return (
    <motion.div
      ref={elementRef}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      variants={selectedVariant}
      className={className}
    >
      {children}
    </motion.div>
  );
}