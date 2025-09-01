'use client';

import React, { useState } from 'react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import AnimatedButtonStyles from '@/components/ui/AnimatedButtonStyles';

export default function AnimatedButtonDemo() {
  const [loading, setLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});

  const handleClick = (buttonId: string) => {
    setLoadingStates(prev => ({ ...prev, [buttonId]: true }));
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [buttonId]: false }));
    }, 3000);
  };

  return (
    <>
      <AnimatedButtonStyles />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Animated Button Component
          </h1>

          {/* Variants Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Button Variants
            </h2>
            <div className="flex flex-wrap gap-4">
              <AnimatedButton variant="primary">
                Primary Button
              </AnimatedButton>
              
              <AnimatedButton variant="secondary">
                Secondary Button
              </AnimatedButton>
              
              <AnimatedButton variant="ghost">
                Ghost Button
              </AnimatedButton>
              
              <AnimatedButton variant="glow">
                Glow Button
              </AnimatedButton>
            </div>
          </section>

          {/* Sizes Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Button Sizes
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <AnimatedButton variant="primary" size="sm">
                Small Button
              </AnimatedButton>
              <AnimatedButton variant="primary" size="md">
                Medium Button
              </AnimatedButton>
              <AnimatedButton variant="primary" size="lg">
                Large Button
              </AnimatedButton>
              <AnimatedButton variant="primary" size="xl">
                Extra Large
              </AnimatedButton>
            </div>
          </section>

          {/* Icons Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Buttons with Icons
            </h2>
            <div className="flex flex-wrap gap-4">
              <AnimatedButton
                variant="primary"
                leftIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              >
                Lightning Fast
              </AnimatedButton>

              <AnimatedButton
                variant="secondary"
                rightIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                }
              >
                Continue
              </AnimatedButton>

              <AnimatedButton
                variant="glow"
                leftIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                }
                rightIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                }
              >
                Magic Button
              </AnimatedButton>
            </div>
          </section>

          {/* States Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Button States
            </h2>
            <div className="flex flex-wrap gap-4">
              <AnimatedButton
                variant="primary"
                loading={loadingStates['loading1']}
                onClick={() => handleClick('loading1')}
              >
                {loadingStates['loading1'] ? 'Processing...' : 'Click to Load'}
              </AnimatedButton>

              <AnimatedButton
                variant="secondary"
                loading={loadingStates['loading2']}
                onClick={() => handleClick('loading2')}
              >
                {loadingStates['loading2'] ? 'Saving...' : 'Save Changes'}
              </AnimatedButton>

              <AnimatedButton variant="primary" disabled>
                Disabled Button
              </AnimatedButton>

              <AnimatedButton variant="ghost" disabled>
                Disabled Ghost
              </AnimatedButton>
            </div>
          </section>

          {/* Interactive Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Interactive Examples
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  Call to Action
                </h3>
                <AnimatedButton
                  variant="glow"
                  size="lg"
                  rightIcon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  }
                  className="w-full"
                >
                  Get Started Now
                </AnimatedButton>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  Form Actions
                </h3>
                <div className="flex gap-4">
                  <AnimatedButton
                    variant="primary"
                    loading={loadingStates['submit']}
                    onClick={() => handleClick('submit')}
                  >
                    Submit Form
                  </AnimatedButton>
                  <AnimatedButton variant="ghost">
                    Cancel
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </section>

          {/* Accessibility Info */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Accessibility Features
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>✓ Full keyboard navigation support</li>
                <li>✓ Proper ARIA attributes (aria-busy, aria-disabled)</li>
                <li>✓ Focus indicators with ring styles</li>
                <li>✓ Disabled state prevents all interactions</li>
                <li>✓ Loading state announces to screen readers</li>
                <li>✓ Semantic HTML button element</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}