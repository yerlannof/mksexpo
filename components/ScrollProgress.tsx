'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  
  // Use a spring animation for smoother progress bar movement
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
    restDelta: 0.001
  })

  useEffect(() => {
    // Show the progress bar only after a small scroll to avoid showing it at the very top
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Background track */}
      <div className="absolute inset-0 bg-white/10" />
      
      {/* Progress bar with gradient */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #6DA1F2 0%, #305FA6 50%, #1C417A 100%)',
          boxShadow: '0 0 10px rgba(109, 161, 242, 0.5), 0 0 20px rgba(109, 161, 242, 0.3)'
        }}
      />
      
      {/* Glow effect at the end of the progress bar */}
      <motion.div
        className="absolute top-0 bottom-0 w-8 blur-xl"
        style={{
          scaleX,
          right: 0,
          background: 'linear-gradient(90deg, transparent 0%, #6DA1F2 100%)',
          transformOrigin: 'left'
        }}
      />
    </motion.div>
  )
}