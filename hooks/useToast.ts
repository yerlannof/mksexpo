'use client';

import { useToastContext, ToastMessage, ToastVariant } from '@/contexts/ToastContext';

interface ShowToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  onDismiss?: () => void;
}

export const useToast = () => {
  const { toasts, showToast, dismissToast, dismissAll } = useToastContext();

  const toast = {
    // Convenience methods for different variants
    success: (title: string, description?: string, options?: Partial<ShowToastOptions>) => {
      return showToast({
        title,
        description,
        variant: 'success',
        ...options,
      });
    },

    error: (title: string, description?: string, options?: Partial<ShowToastOptions>) => {
      return showToast({
        title,
        description,
        variant: 'error',
        ...options,
      });
    },

    warning: (title: string, description?: string, options?: Partial<ShowToastOptions>) => {
      return showToast({
        title,
        description,
        variant: 'warning',
        ...options,
      });
    },

    info: (title: string, description?: string, options?: Partial<ShowToastOptions>) => {
      return showToast({
        title,
        description,
        variant: 'info',
        ...options,
      });
    },

    // Generic show method
    show: (options: ShowToastOptions) => {
      return showToast({
        variant: 'info',
        ...options,
      });
    },

    // Promise-based toast for async operations
    promise: async <T,>(
      promise: Promise<T>,
      messages: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((error: any) => string);
      }
    ): Promise<T> => {
      const loadingId = showToast({
        title: messages.loading,
        variant: 'info',
        duration: 0, // Don't auto-dismiss
      });

      try {
        const result = await promise;
        dismissToast(loadingId);
        
        const successMessage = typeof messages.success === 'function' 
          ? messages.success(result) 
          : messages.success;
          
        showToast({
          title: successMessage,
          variant: 'success',
        });
        
        return result;
      } catch (error) {
        dismissToast(loadingId);
        
        const errorMessage = typeof messages.error === 'function' 
          ? messages.error(error) 
          : messages.error;
          
        showToast({
          title: errorMessage,
          variant: 'error',
        });
        
        throw error;
      }
    },

    // Dismiss functions
    dismiss: dismissToast,
    dismissAll,
  };

  return {
    toasts,
    toast,
  };
};