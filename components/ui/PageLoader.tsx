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
      className="flex flex-col items-center space-y-6"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* MKS Logo */}
      <div className="relative">
        <motion.div
          className="h-24 w-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center p-4"
          animate={{
            boxShadow: [
              '0 0 20px rgba(255,255,255,0.1)',
              '0 0 40px rgba(255,255,255,0.2)',
              '0 0 20px rgba(255,255,255,0.1)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Image
            src="/mkslogo.png"
            alt="M&K Education Logo"
            width={64}
            height={64}
            className="w-full h-full object-contain"
          />
        </motion.div>
        
        {/* Rotating border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, white 60deg, transparent 120deg)',
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
      
      {/* Loading text with dots animation */}
      <div className="flex items-center space-x-1">
        <span className="text-white text-lg">Loading</span>
        <motion.span
          className="flex space-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="text-white text-lg"
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            >
              .
            </motion.span>
          ))}
        </motion.span>
      </div>
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
          {/* Background pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-[10%] opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,white_0%,transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,white_0%,transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,white_0%,transparent_50%)]" />
            </div>
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