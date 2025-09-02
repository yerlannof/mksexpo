'use client';

import React, { useRef, useState, MouseEvent, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Types
export interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glow' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  children: React.ReactNode;
  href?: string;
}

interface RippleProps {
  x: number;
  y: number;
}

// Loading Spinner Component
const LoadingSpinner: React.FC<{ size: string }> = ({ size }) => {
  const spinnerSize = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  }[size];

  return (
    <motion.div
      className={cn('border-2 border-white/30 border-t-white rounded-full', spinnerSize)}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );
};

// Ripple Effect Component
const Ripple: React.FC<RippleProps> = ({ x, y }) => {
  return (
    <motion.span
      className="absolute inline-block rounded-full bg-white/30"
      style={{ left: x, top: y }}
      initial={{ width: 0, height: 0, opacity: 1 }}
      animate={{ width: 300, height: 300, opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    />
  );
};

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  children,
  className,
  onClick,
  href,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const [ripples, setRipples] = useState<RippleProps[]>([]);
  
  // Get the current ref based on whether it's a link or button
  const currentRef = href ? anchorRef : buttonRef;
  
  // Magnetic cursor effect values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring animations for smooth magnetic effect
  const springConfig = { damping: 25, stiffness: 300 };
  const buttonX = useSpring(useTransform(mouseX, (value) => value * 0.2), springConfig);
  const buttonY = useSpring(useTransform(mouseY, (value) => value * 0.2), springConfig);

  // Handle mouse move for magnetic effect
  const handleMouseMove = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled || loading) return;
    
    const rect = currentRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Handle click with ripple effect
  const handleClick = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled || loading) return;

    const rect = currentRef.current?.getBoundingClientRect();
    if (!rect) return;

    const rippleX = e.clientX - rect.left - 150;
    const rippleY = e.clientY - rect.top - 150;

    setRipples([...ripples, { x: rippleX, y: rippleY }]);
    
    // Handle smooth scrolling for anchor links
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    if (onClick) {
      onClick(e as React.MouseEvent<HTMLButtonElement>);
    }
  };

  // Clean up ripples
  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples([]);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5',
    xl: 'px-8 py-4 text-xl gap-3',
  };

  // Base classes
  const baseClasses = cn(
    'relative inline-flex items-center justify-center font-medium rounded-lg',
    'transition-all duration-300 overflow-hidden',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    href ? 'cursor-pointer' : '',
    sizeClasses[size]
  );

  // Variant classes
  const variantClasses = {
    primary: cn(
      'bg-gradient-to-r from-red-600 to-red-700',
      'hover:from-red-700 hover:to-red-800',
      'text-white shadow-lg hover:shadow-xl',
      'focus:ring-red-500',
      'before:absolute before:inset-0',
      'before:bg-gradient-to-r before:from-red-400 before:to-red-500',
      'before:opacity-0 hover:before:opacity-20',
      'before:transition-opacity before:duration-300'
    ),
    secondary: cn(
      'bg-transparent border-2',
      'border-transparent bg-gradient-to-r from-red-600 to-red-700',
      'bg-clip-padding relative',
      'before:absolute before:inset-0 before:-z-10',
      'before:bg-white dark:before:bg-gray-900',
      'before:rounded-lg before:m-[2px]',
      'text-gray-900 dark:text-white',
      'hover:text-white dark:hover:text-white',
      'hover:before:opacity-0 hover:shadow-lg',
      'focus:ring-red-500',
      'transition-all duration-300'
    ),
    ghost: cn(
      'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
      'text-gray-700 dark:text-gray-300',
      'hover:text-gray-900 dark:hover:text-white',
      'focus:ring-gray-500'
    ),
    glow: cn(
      'bg-gradient-to-r from-red-600 to-red-700',
      'text-white shadow-lg',
      'hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]',
      'focus:ring-red-500',
      'animate-pulse-glow'
    ),
    danger: cn(
      'bg-gradient-to-r from-red-600 to-red-700',
      'hover:from-red-700 hover:to-red-800',
      'text-white shadow-lg hover:shadow-xl',
      'focus:ring-red-500',
      'before:absolute before:inset-0',
      'before:bg-gradient-to-r before:from-red-400 before:to-red-500',
      'before:opacity-0 hover:before:opacity-20',
      'before:transition-opacity before:duration-300'
    ),
  };

  // Gradient shift animation for primary, glow and danger variants
  const gradientAnimation = (variant === 'primary' || variant === 'glow' || variant === 'danger') ? {
    backgroundSize: '200% 200%',
    animation: 'gradient-shift 3s ease infinite',
  } : {};

  if (href) {
    return (
      <motion.a
        href={href}
        ref={anchorRef}
        className={cn(baseClasses, variantClasses[variant], className)}
        style={{ x: buttonX, y: buttonY, ...gradientAnimation }}
        whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        aria-busy={loading}
        aria-disabled={disabled || loading}
      >
        {/* Ripple effects */}
        <AnimatePresence>
          {ripples.map((ripple, index) => (
            <Ripple key={index} x={ripple.x} y={ripple.y} />
          ))}
        </AnimatePresence>

        {/* Glow effect for glow variant */}
        {variant === 'glow' && (
          <motion.div
            className="absolute inset-0 -z-10 blur-xl"
            style={{
              background: 'linear-gradient(to right, #dc2626, #b91c1c)',
              opacity: 0.5,
            }}
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* Button content */}
        <span className="relative z-10 flex items-center gap-2">
          {loading ? (
            <LoadingSpinner size={size} />
          ) : (
            <>
              {leftIcon && <span className="inline-flex">{leftIcon}</span>}
              {children}
              {rightIcon && <span className="inline-flex">{rightIcon}</span>}
            </>
          )}
        </span>
      </motion.a>
    );
  }

  // Extract non-conflicting props
  const { 
    onDrag, 
    onDragStart, 
    onDragEnd,
    onAnimationStart,
    onAnimationEnd,
    onAnimationIteration,
    ...safeProps 
  } = props;
  
  return (
    <motion.button
      ref={buttonRef}
      disabled={disabled || loading}
      {...safeProps}
      className={cn(baseClasses, variantClasses[variant], className)}
      style={{ x: buttonX, y: buttonY, ...gradientAnimation }}
      whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      aria-busy={loading}
      aria-disabled={disabled || loading}
    >
      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map((ripple, index) => (
          <Ripple key={index} x={ripple.x} y={ripple.y} />
        ))}
      </AnimatePresence>

      {/* Glow effect for glow variant */}
      {variant === 'glow' && (
        <motion.div
          className="absolute inset-0 -z-10 blur-xl"
          style={{
            background: 'linear-gradient(to right, #dc2626, #b91c1c)',
            opacity: 0.5,
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2">
        {loading ? (
          <LoadingSpinner size={size} />
        ) : (
          <>
            {leftIcon && <span className="inline-flex">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="inline-flex">{rightIcon}</span>}
          </>
        )}
      </span>
    </motion.button>
  );
};

// Add required CSS for animations
export const animatedButtonStyles = `
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

// Example usage component
export const AnimatedButtonExample: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-wrap gap-4">
        <AnimatedButton variant="primary" size="md">
          Primary Button
        </AnimatedButton>
        
        <AnimatedButton variant="secondary" size="md">
          Secondary Button
        </AnimatedButton>
        
        <AnimatedButton variant="ghost" size="md">
          Ghost Button
        </AnimatedButton>
        
        <AnimatedButton variant="glow" size="md">
          Glow Button
        </AnimatedButton>
      </div>

      <div className="flex flex-wrap gap-4">
        <AnimatedButton
          variant="primary"
          size="lg"
          leftIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        >
          With Left Icon
        </AnimatedButton>

        <AnimatedButton
          variant="secondary"
          size="lg"
          rightIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          }
        >
          With Right Icon
        </AnimatedButton>
      </div>

      <div className="flex flex-wrap gap-4">
        <AnimatedButton variant="primary" size="sm">Small</AnimatedButton>
        <AnimatedButton variant="primary" size="md">Medium</AnimatedButton>
        <AnimatedButton variant="primary" size="lg">Large</AnimatedButton>
        <AnimatedButton variant="primary" size="xl">Extra Large</AnimatedButton>
      </div>

      <div className="flex flex-wrap gap-4">
        <AnimatedButton
          variant="glow"
          size="lg"
          loading={loading}
          onClick={handleClick}
        >
          {loading ? 'Processing...' : 'Click to Load'}
        </AnimatedButton>

        <AnimatedButton variant="primary" size="lg" disabled>
          Disabled Button
        </AnimatedButton>
      </div>
    </div>
  );
};

export default AnimatedButton;