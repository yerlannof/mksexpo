'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

interface PerformanceWrapperProps {
  children: React.ReactNode
  threshold?: number
}

export function PerformanceWrapper({ children, threshold = 0.1 }: PerformanceWrapperProps) {
  const [isInView, setIsInView] = useState(false)
  const [elementRef, setElementRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!elementRef) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      { threshold }
    )

    observer.observe(elementRef)

    return () => {
      observer.disconnect()
    }
  }, [elementRef, threshold])

  return (
    <div ref={setElementRef}>
      {isInView ? children : <div style={{ minHeight: '100px' }} />}
    </div>
  )
}

// Lazy load heavy components
export const LazyParticipants = dynamic(
  () => import('@/components/sections/Participants'),
  {
    loading: () => (
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="animate-pulse text-blue-300">Loading...</div>
      </div>
    ),
    ssr: false,
  }
)

export const LazyTestimonials = dynamic(
  () => import('@/components/sections/Testimonials'),
  {
    loading: () => (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-pulse text-blue-300">Loading...</div>
      </div>
    ),
    ssr: false,
  }
)

// Performance monitoring hook
export function usePerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Monitor performance
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime)
        }
      })
    })

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (e) {
      // PerformanceObserver may not be supported
    }

    return () => {
      observer.disconnect()
    }
  }, [])
}