'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type SkeletonVariant = 'text' | 'title' | 'card' | 'image' | 'button' | 'avatar' | 'input';
type SkeletonAnimation = 'shimmer' | 'pulse' | 'wave';

interface SkeletonLoaderProps {
  variant?: SkeletonVariant;
  animation?: SkeletonAnimation;
  width?: string | number;
  height?: string | number;
  className?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  count?: number;
  delay?: number;
}

const variantStyles: Record<SkeletonVariant, string> = {
  text: 'h-4 w-full',
  title: 'h-8 w-3/4',
  card: 'h-64 w-full',
  image: 'h-48 w-full',
  button: 'h-12 w-32',
  avatar: 'h-12 w-12',
  input: 'h-10 w-full',
};

const roundedStyles: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
};

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'text',
  animation = 'shimmer',
  width,
  height,
  className,
  rounded = variant === 'avatar' ? 'full' : 'lg',
  count = 1,
  delay = 0,
}) => {
  const baseClasses = cn(
    'relative overflow-hidden',
    'bg-white/10 dark:bg-gray-800/10',
    'backdrop-blur-sm',
    'border border-white/10 dark:border-gray-700/10',
    variantStyles[variant],
    roundedStyles[rounded],
    className
  );

  const shimmerClasses = cn(
    'absolute inset-0',
    'bg-gradient-to-r',
    'from-transparent via-white/20 to-transparent',
    'dark:via-gray-400/20',
    '-translate-x-full',
    'animate-[shimmer_2s_ease-in-out_infinite]'
  );

  const pulseClasses = cn(
    'animate-pulse',
    'bg-gradient-to-br',
    'from-white/10 to-white/5',
    'dark:from-gray-800/10 dark:to-gray-900/5'
  );

  const waveClasses = cn(
    'bg-gradient-to-r',
    'from-white/5 via-white/10 to-white/5',
    'dark:from-gray-800/5 dark:via-gray-700/10 dark:to-gray-800/5',
    'animate-[wave_2s_ease-in-out_infinite]'
  );

  const animationClasses = {
    shimmer: '',
    pulse: pulseClasses,
    wave: waveClasses,
  };

  const style: React.CSSProperties = {
    width: width || undefined,
    height: height || undefined,
    animationDelay: `${delay}ms`,
  };

  const renderSkeleton = (index: number) => (
    <motion.div
      key={index}
      className={cn(baseClasses, animationClasses[animation])}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      {animation === 'shimmer' && (
        <div className={shimmerClasses} />
      )}
    </motion.div>
  );

  if (count > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, index) => renderSkeleton(index))}
      </div>
    );
  }

  return renderSkeleton(0);
};

// Custom keyframes need to be added to tailwind.config.ts
// Add these to the keyframes section:
// shimmer: {
//   '100%': { transform: 'translateX(100%)' }
// },
// wave: {
//   '0%, 100%': { opacity: '0.5' },
//   '50%': { opacity: '1' }
// }

export default SkeletonLoader;

// Export specific skeleton variants for convenience
export const TextSkeleton: React.FC<Omit<SkeletonLoaderProps, 'variant'>> = (props) => (
  <SkeletonLoader variant="text" {...props} />
);

export const TitleSkeleton: React.FC<Omit<SkeletonLoaderProps, 'variant'>> = (props) => (
  <SkeletonLoader variant="title" {...props} />
);

export const CardSkeleton: React.FC<Omit<SkeletonLoaderProps, 'variant'>> = (props) => (
  <SkeletonLoader variant="card" {...props} />
);

export const ImageSkeleton: React.FC<Omit<SkeletonLoaderProps, 'variant'>> = (props) => (
  <SkeletonLoader variant="image" {...props} />
);

export const ButtonSkeleton: React.FC<Omit<SkeletonLoaderProps, 'variant'>> = (props) => (
  <SkeletonLoader variant="button" {...props} />
);

export const AvatarSkeleton: React.FC<Omit<SkeletonLoaderProps, 'variant'>> = (props) => (
  <SkeletonLoader variant="avatar" {...props} />
);

export const InputSkeleton: React.FC<Omit<SkeletonLoaderProps, 'variant'>> = (props) => (
  <SkeletonLoader variant="input" {...props} />
);