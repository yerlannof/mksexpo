'use client'

import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

interface FloatingShape {
  id: string
  type: 'circle' | 'triangle' | 'hexagon'
  size: number
  initialX: number
  initialY: number
  color: string
  floatSpeed: number
  parallaxSpeed: number
}

const FloatingElements: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Smooth spring physics for mouse movement
  const springConfig = { damping: 25, stiffness: 150 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  useEffect(() => {
    setMounted(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX - innerWidth / 2) / innerWidth
      const y = (clientY - innerHeight / 2) / innerHeight
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Define floating shapes with different properties
  const shapes: FloatingShape[] = [
    {
      id: 'circle-1',
      type: 'circle',
      size: 120,
      initialX: 10,
      initialY: 20,
      color: 'from-blue-400/20 to-purple-400/20',
      floatSpeed: 20,
      parallaxSpeed: 0.1
    },
    {
      id: 'triangle-1',
      type: 'triangle',
      size: 80,
      initialX: 85,
      initialY: 15,
      color: 'from-green-400/20 to-blue-400/20',
      floatSpeed: 25,
      parallaxSpeed: 0.15
    },
    {
      id: 'hexagon-1',
      type: 'hexagon',
      size: 100,
      initialX: 70,
      initialY: 70,
      color: 'from-purple-400/20 to-pink-400/20',
      floatSpeed: 30,
      parallaxSpeed: 0.2
    },
    {
      id: 'circle-2',
      type: 'circle',
      size: 60,
      initialX: 25,
      initialY: 60,
      color: 'from-yellow-400/20 to-orange-400/20',
      floatSpeed: 22,
      parallaxSpeed: 0.12
    },
    {
      id: 'triangle-2',
      type: 'triangle',
      size: 90,
      initialX: 15,
      initialY: 80,
      color: 'from-red-400/20 to-purple-400/20',
      floatSpeed: 28,
      parallaxSpeed: 0.18
    },
    {
      id: 'hexagon-2',
      type: 'hexagon',
      size: 70,
      initialX: 90,
      initialY: 50,
      color: 'from-indigo-400/20 to-blue-400/20',
      floatSpeed: 24,
      parallaxSpeed: 0.14
    }
  ]

  const renderShape = (type: string, size: number) => {
    switch (type) {
      case 'circle':
        return (
          <div
            className="w-full h-full rounded-full"
            style={{ width: size, height: size }}
          />
        )
      case 'triangle':
        return (
          <div
            className="w-0 h-0"
            style={{
              borderLeft: `${size/2}px solid transparent`,
              borderRight: `${size/2}px solid transparent`,
              borderBottom: `${size}px solid currentColor`
            }}
          />
        )
      case 'hexagon':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            className="fill-current"
          >
            <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" />
          </svg>
        )
      default:
        return null
    }
  }

  // Create individual transforms for each shape's parallax speed
  const transform1X = useTransform(mouseXSpring, [-1, 1], [-10, 10])
  const transform1Y = useTransform(mouseYSpring, [-1, 1], [-10, 10])
  
  const transform2X = useTransform(mouseXSpring, [-1, 1], [-15, 15])
  const transform2Y = useTransform(mouseYSpring, [-1, 1], [-15, 15])
  
  const transform3X = useTransform(mouseXSpring, [-1, 1], [-20, 20])
  const transform3Y = useTransform(mouseYSpring, [-1, 1], [-20, 20])
  
  const transform4X = useTransform(mouseXSpring, [-1, 1], [-12, 12])
  const transform4Y = useTransform(mouseYSpring, [-1, 1], [-12, 12])
  
  const transform5X = useTransform(mouseXSpring, [-1, 1], [-18, 18])
  const transform5Y = useTransform(mouseYSpring, [-1, 1], [-18, 18])
  
  const transform6X = useTransform(mouseXSpring, [-1, 1], [-14, 14])
  const transform6Y = useTransform(mouseYSpring, [-1, 1], [-14, 14])
  
  // Map transforms to shapes
  const shapeTransforms = [
    { x: transform1X, y: transform1Y },
    { x: transform2X, y: transform2Y },
    { x: transform3X, y: transform3Y },
    { x: transform4X, y: transform4Y },
    { x: transform5X, y: transform5Y },
    { x: transform6X, y: transform6Y }
  ]

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {shapes.map((shape, index) => {
        const transforms = shapeTransforms[index]

        return (
          <motion.div
            key={shape.id}
            className={`absolute bg-gradient-to-br ${shape.color} backdrop-blur-sm`}
            style={{
              left: `${shape.initialX}%`,
              top: `${shape.initialY}%`,
              x: transforms.x,
              y: transforms.y,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: shape.type === 'triangle' ? [0, 180, 360] : [0, 360],
            }}
            transition={{
              duration: shape.floatSpeed,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div 
              className="relative"
              style={{
                filter: 'blur(0.5px)',
                opacity: 0.6,
              }}
            >
              {/* Glassmorphic overlay */}
              <div className="absolute inset-0 bg-white/10 rounded-full backdrop-blur-md" />
              
              {/* Inner glow effect */}
              <div className="absolute inset-0 bg-gradient-radial from-white/20 to-transparent" />
              
              {/* Shape */}
              <div className={`${shape.type === 'circle' ? 'rounded-full' : ''}`}>
                {renderShape(shape.type, shape.size)}
              </div>
              
              {/* Soft shadow */}
              <div 
                className="absolute inset-0 -z-10"
                style={{
                  background: `radial-gradient(circle, rgba(0,0,0,0.1) 0%, transparent 70%)`,
                  transform: 'scale(1.2) translateY(10px)',
                  filter: 'blur(15px)',
                }}
              />
            </div>
          </motion.div>
        )
      })}

      {/* Additional ambient particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Gradient orbs for additional depth */}
      <motion.div
        className="absolute w-96 h-96 -top-48 -left-48"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-96 h-96 -bottom-48 -right-48"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

export default FloatingElements