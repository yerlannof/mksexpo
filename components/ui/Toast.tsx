'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { ToastVariant } from '@/contexts/ToastContext';

interface ToastProps {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration?: number;
  index: number;
  onDismiss: () => void;
}

const variantStyles: Record<ToastVariant, {
  icon: React.ElementType;
  iconColor: string;
  progressColor: string;
}> = {
  success: {
    icon: CheckCircle,
    iconColor: 'text-green-500',
    progressColor: 'bg-green-500',
  },
  error: {
    icon: XCircle,
    iconColor: 'text-red-500',
    progressColor: 'bg-red-500',
  },
  warning: {
    icon: AlertTriangle,
    iconColor: 'text-yellow-500',
    progressColor: 'bg-yellow-500',
  },
  info: {
    icon: Info,
    iconColor: 'text-blue-500',
    progressColor: 'bg-blue-500',
  },
};

const Toast: React.FC<ToastProps> = ({
  id,
  title,
  description,
  variant,
  duration = 5000,
  index,
  onDismiss,
}) => {
  const [progress, setProgress] = useState(100);
  const { icon: Icon, iconColor, progressColor } = variantStyles[variant];

  useEffect(() => {
    if (duration <= 0) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        x: 0, 
        scale: 1,
        y: index * 10 
      }}
      exit={{ 
        opacity: 0, 
        x: 100, 
        scale: 0.95,
        transition: { duration: 0.2 }
      }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 300
      }}
      className="relative w-96 max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg shadow-xl"
    >
      {/* Glassmorphic background */}
      <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md" />
      
      {/* Content */}
      <div className="relative flex items-start gap-3 p-4">
        <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {description}
            </p>
          )}
        </div>
        
        <button
          onClick={onDismiss}
          className="flex-shrink-0 rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      
      {/* Progress bar */}
      {duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
          <motion.div
            className={`h-full ${progressColor}`}
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default Toast;