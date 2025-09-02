'use client';

import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant?: 'gradient' | 'dots' | 'wave' | 'none';
  className?: string;
}

export default function SectionDivider({ variant = 'gradient', className = '' }: SectionDividerProps) {
  if (variant === 'none') return null;

  const dividerVariants = {
    gradient: (
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    ),
    dots: (
      <div className="flex justify-center items-center space-x-2 py-8">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 bg-white/30 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            viewport={{ once: true }}
          />
        ))}
      </div>
    ),
    wave: (
      <div className="relative h-16 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-full text-white/10"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            fill="currentColor"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
          />
        </svg>
      </div>
    )
  };

  return (
    <div className={`relative ${className}`}>
      {dividerVariants[variant]}
    </div>
  );
}