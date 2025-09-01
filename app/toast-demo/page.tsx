'use client';

import React from 'react';
import { useToast } from '@/hooks/useToast';
import { CheckCircle, XCircle, AlertTriangle, Info, Loader2 } from 'lucide-react';

export default function ToastDemoPage() {
  const { toast } = useToast();

  const handleSuccessToast = () => {
    toast.success('Success!', 'Your operation was completed successfully.');
  };

  const handleErrorToast = () => {
    toast.error('Error occurred', 'Something went wrong. Please try again.');
  };

  const handleWarningToast = () => {
    toast.warning('Warning', 'Please review your input before proceeding.');
  };

  const handleInfoToast = () => {
    toast.info('Information', 'Here\'s some helpful information for you.');
  };

  const handleCustomDuration = () => {
    toast.show({
      title: 'Custom Duration',
      description: 'This toast will stay for 10 seconds',
      variant: 'info',
      duration: 10000,
    });
  };

  const handleNoDismiss = () => {
    toast.show({
      title: 'Manual Dismiss Only',
      description: 'This toast won\'t auto-dismiss. Click the X to close.',
      variant: 'warning',
      duration: 0,
    });
  };

  const handleMultipleToasts = () => {
    toast.success('First toast', 'This is the first notification');
    setTimeout(() => {
      toast.info('Second toast', 'This is the second notification');
    }, 500);
    setTimeout(() => {
      toast.warning('Third toast', 'This is the third notification');
    }, 1000);
  };

  const handlePromiseToast = async () => {
    // Simulate an async operation
    const fakeApiCall = () => new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve('Data loaded successfully!');
        } else {
          reject(new Error('Failed to load data'));
        }
      }, 2000);
    });

    try {
      await toast.promise(fakeApiCall(), {
        loading: 'Loading data...',
        success: (data) => data,
        error: (err) => err.message,
      });
    } catch (error) {
      // Error is already handled by toast.promise
    }
  };

  const handleDismissAll = () => {
    toast.dismissAll();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Toast Notification System Demo
        </h1>
        
        <div className="space-y-8">
          {/* Basic Variants */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Basic Variants
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={handleSuccessToast}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                <CheckCircle className="h-4 w-4" />
                Success
              </button>
              <button
                onClick={handleErrorToast}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                <XCircle className="h-4 w-4" />
                Error
              </button>
              <button
                onClick={handleWarningToast}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
              >
                <AlertTriangle className="h-4 w-4" />
                Warning
              </button>
              <button
                onClick={handleInfoToast}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Info className="h-4 w-4" />
                Info
              </button>
            </div>
          </section>

          {/* Advanced Features */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Advanced Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleCustomDuration}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
              >
                Custom Duration (10s)
              </button>
              <button
                onClick={handleNoDismiss}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
              >
                Manual Dismiss Only
              </button>
              <button
                onClick={handleMultipleToasts}
                className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
              >
                Multiple Toasts
              </button>
              <button
                onClick={handlePromiseToast}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors"
              >
                <Loader2 className="h-4 w-4" />
                Async Operation (50/50 chance)
              </button>
            </div>
          </section>

          {/* Control */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Control
            </h2>
            <button
              onClick={handleDismissAll}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Dismiss All Toasts
            </button>
          </section>

          {/* Features List */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Features
            </h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Multiple variants: success, error, warning, info</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Glassmorphic design with backdrop blur</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Auto-dismiss with customizable duration</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Manual dismiss with close button</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Smooth slide-in animations from top-right</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Stack multiple toasts with proper spacing</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Progress bar showing time remaining</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Promise-based toasts for async operations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>TypeScript support with full type safety</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Accessible with ARIA live regions</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}