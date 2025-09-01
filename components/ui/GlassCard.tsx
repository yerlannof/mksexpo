'use client';

import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type GlassCardVariant = 'default' | 'gradient' | 'glow';
type PaddingSize = 'sm' | 'md' | 'lg' | 'xl';

interface GlassCardProps extends MotionProps {
  variant?: GlassCardVariant;
  hoverable?: boolean;
  clickable?: boolean;
  padding?: PaddingSize;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  role?: string;
  tabIndex?: number;
  'aria-label'?: string;
}

const paddingClasses: Record<PaddingSize, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

const variantClasses: Record<GlassCardVariant, string> = {
  default: `
    bg-white/10 dark:bg-gray-800/10
    backdrop-blur-md
    border border-white/20 dark:border-gray-700/20
    shadow-lg
  `,
  gradient: `
    bg-gradient-to-br from-white/10 to-white/5
    dark:from-gray-800/10 dark:to-gray-900/5
    backdrop-blur-md
    border border-transparent
    relative
    before:absolute before:inset-0
    before:rounded-2xl
    before:p-[1px]
    before:bg-gradient-to-br
    before:from-purple-500/50 before:via-pink-500/50 before:to-orange-500/50
    before:-z-10
    shadow-lg
  `,
  glow: `
    bg-white/10 dark:bg-gray-800/10
    backdrop-blur-md
    border border-white/20 dark:border-gray-700/20
    shadow-lg
    shadow-purple-500/10 dark:shadow-purple-400/10
  `,
};

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      variant = 'default',
      hoverable = true,
      clickable = false,
      padding = 'md',
      className,
      children,
      onClick,
      role,
      tabIndex,
      'aria-label': ariaLabel,
      ...motionProps
    },
    ref
  ) => {
    const isInteractive = clickable || !!onClick;
    
    const baseClasses = cn(
      'rounded-2xl',
      'transition-all duration-300',
      paddingClasses[padding],
      variantClasses[variant],
      {
        'cursor-pointer': isInteractive,
        'hover:scale-[1.02]': hoverable && !isInteractive,
        'hover:shadow-xl': hoverable,
        'hover:border-white/30 dark:hover:border-gray-600/30': hoverable && variant === 'default',
        'hover:shadow-purple-500/20 dark:hover:shadow-purple-400/20': hoverable && variant === 'glow',
        'active:scale-[0.98]': isInteractive,
      },
      className
    );

    const hoverAnimation = hoverable
      ? {
          scale: 1.02,
          transition: {
            type: 'spring' as const,
            stiffness: 300,
            damping: 20,
          },
        }
      : {};

    const tapAnimation = isInteractive
      ? {
          scale: 0.98,
          transition: {
            type: 'spring' as const,
            stiffness: 400,
            damping: 25,
          },
        }
      : {};

    return (
      <motion.div
        ref={ref}
        className={baseClasses}
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        onClick={onClick}
        role={role || (isInteractive ? 'button' : undefined)}
        tabIndex={tabIndex ?? (isInteractive ? 0 : undefined)}
        aria-label={ariaLabel}
        onKeyDown={(e) => {
          if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
          }
        }}
        {...motionProps}
      >
        {/* Additional glow effect for glow variant */}
        {variant === 'glow' && hoverable && (
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 blur-xl bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-orange-500/30"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ zIndex: -1 }}
          />
        )}
        
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;