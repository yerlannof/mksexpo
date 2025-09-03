'use client';

import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant?: 'gradient' | 'dots' | 'wave' | 'ornament' | 'fade' | 'none';
  className?: string;
}

export default function SectionDivider({ variant = 'gradient', className = '' }: SectionDividerProps) {
  if (variant === 'none') return null;

  const dividerVariants = {
    gradient: (
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
    ),
    dots: (
      <div className="flex justify-center items-center gap-3">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 bg-white/40 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.4, type: "spring" }}
            viewport={{ once: true }}
          />
        ))}
      </div>
    ),
    wave: (
      <div className="relative h-12 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1200 60"
        >
          <motion.path
            d="M0,30 Q300,5 600,30 T1200,30"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
          />
        </svg>
      </div>
    ),
    ornament: (
      <div className="flex items-center justify-center gap-4">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="h-px w-24 bg-gradient-to-r from-transparent to-white/20"
        />
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          whileInView={{ scale: 1, rotate: 45 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-2 h-2 bg-white/30 transform"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="h-px w-24 bg-gradient-to-l from-transparent to-white/20"
        />
      </div>
    ),
    fade: (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="h-16 bg-gradient-to-b from-white/5 via-transparent to-transparent"
      />
    )
  };

  return (
    <div className={`relative py-1 sm:py-2 lg:py-2 ${className}`}>
      {dividerVariants[variant]}
    </div>
  );
}