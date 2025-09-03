'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface PageLoaderProps {
  isLoading: boolean;
  progress?: number;
  variant?: 'spinner' | 'progress' | 'logo';
  fullScreen?: boolean;
  blur?: boolean;
  className?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  isLoading,
  progress,
  variant = 'spinner',
  fullScreen = true,
  blur = true,
  className,
}) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      const timer = setTimeout(() => setShowLoader(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const containerClasses = cn(
    'flex items-center justify-center',
    'bg-gradient-to-br from-primary-dark via-primary to-primary-light',
    {
      'fixed inset-0 z-50': fullScreen,
      'absolute inset-0': !fullScreen,
      'backdrop-blur-xl': blur,
    },
    className
  );

  const renderSpinner = () => (
    <div className="relative">
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-white/20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Spinning ring */}
      <motion.div
        className="h-20 w-20 rounded-full border-4 border-transparent border-t-white"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Center dot */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        <div className="h-4 w-4 rounded-full bg-white" />
      </motion.div>
    </div>
  );

  const renderProgress = () => (
    <div className="w-64 space-y-4">
      {/* Progress bar container */}
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/20">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-white to-white/80"
          initial={{ width: '0%' }}
          animate={{ width: `${progress || 0}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: ['0%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      
      {/* Progress text */}
      <motion.p
        className="text-center text-sm font-medium text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {progress ? `${Math.round(progress)}% Complete` : 'Loading...'}
      </motion.p>
    </div>
  );

  const renderLogo = () => (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Modern minimal loader with logo */}
      <div className="relative">
        {/* Logo container with subtle animation */}
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Image
            src="/mks-white-logo-new.png"
            alt=""
            width={180}
            height={80}
            className="w-[180px] h-auto object-contain"
            priority
          />
        </motion.div>
        
        {/* Modern progress line below logo */}
        <div className="absolute -bottom-8 left-0 right-0">
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-white/60 via-white to-white/60"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Minimalist loading text */}
      <motion.div
        className="mt-16 flex items-baseline gap-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <span className="text-white/70 text-sm font-light tracking-wider">LOADING</span>
        <motion.div className="flex">
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="text-white/70 text-sm font-light"
              animate={{ 
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: index * 0.15,
                ease: 'easeInOut',
              }}
            >
              •
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );

  const renderContent = () => {
    switch (variant) {
      case 'progress':
        return renderProgress();
      case 'logo':
        return renderLogo();
      default:
        return renderSpinner();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {showLoader && (
        <motion.div
          className={containerClasses}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Modern gradient background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            {renderContent()}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;

// Export convenience hooks
export const usePageLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const startLoading = () => {
    setIsLoading(true);
    setProgress(0);
  };

  const updateProgress = (value: number) => {
    setProgress(Math.min(100, Math.max(0, value)));
  };

  const stopLoading = () => {
    setProgress(100);
    setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
    }, 300);
  };

  return {
    isLoading,
    progress,
    startLoading,
    updateProgress,
    stopLoading,
  };
};