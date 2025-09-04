'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function BackgroundPattern() {
  const [mounted, setMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isLowEnd, setIsLowEnd] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    // Detect low-end devices
    const checkLowEnd = 
      window.innerWidth < 768 || 
      navigator.hardwareConcurrency <= 4 ||
      ('connection' in navigator && 
        (navigator as Navigator & {connection?: {effectiveType?: string}}).connection?.effectiveType === 'slow-2g') ||
      ('connection' in navigator && 
        (navigator as Navigator & {connection?: {effectiveType?: string}}).connection?.effectiveType === '2g') ||
      ('connection' in navigator && 
        (navigator as Navigator & {connection?: {effectiveType?: string}}).connection?.effectiveType === '3g')
    
    setIsLowEnd(checkLowEnd)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  if (!mounted || prefersReducedMotion || isLowEnd) {
    return (
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      
      {/* Animated gradient orbs - reduced to 2 for performance */}
      <div className="absolute inset-0">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-2xl opacity-20"
            style={{
              background: `radial-gradient(circle, ${
                ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981'][i]
              } 0%, transparent 70%)`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: i * 2,
            }}
            initial={{
              width: `${600 + i * 100}px`,
              height: `${600 + i * 100}px`,
              left: `${-10 + i * 25}%`,
              top: `${-10 + i * 25}%`,
            }}
          />
        ))}
      </div>

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #000 1px, transparent 1px),
            linear-gradient(180deg, #000 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Removed floating particles and light rays for better performance */}
    </div>
  )
}