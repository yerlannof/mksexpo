'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

interface CountdownTimerProps {
  targetDate: Date
  label: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer({ targetDate, label }: CountdownTimerProps) {
  const { t } = useLanguage()
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0')
  }

  const timeUnits = [
    { value: timeLeft.days, labelKey: 'hero.countdown.days' },
    { value: timeLeft.hours, labelKey: 'hero.countdown.hours' },
    { value: timeLeft.minutes, labelKey: 'hero.countdown.minutes' },
    { value: timeLeft.seconds, labelKey: 'hero.countdown.seconds' }
  ]

  return (
    <div className="text-center">
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">{label}</h3>
      <div className="flex gap-2 sm:gap-3 md:gap-4 justify-center flex-wrap">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.labelKey}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 p-2 sm:p-3 md:p-4 min-w-[70px] sm:min-w-[85px] md:min-w-[100px] hover:bg-white/15 transition-all duration-300">
              <motion.div
                key={unit.value}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
              >
                {formatNumber(unit.value)}
              </motion.div>
              <div className="text-xs sm:text-sm text-white/60 mt-0.5 sm:mt-1">{t(unit.labelKey)}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}