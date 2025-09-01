'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SkeletonLoader, { 
  TextSkeleton, 
  TitleSkeleton, 
  ImageSkeleton,
  ButtonSkeleton,
  AvatarSkeleton 
} from '@/components/ui/SkeletonLoader';
import GlassCard from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';

// Hero Section Skeleton
export const HeroSkeleton: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-8">
      {/* Background gradient skeleton */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/20 via-primary/20 to-primary-light/20 animate-pulse" />
      
      <div className="relative z-10 w-full max-w-6xl">
        <motion.div 
          className="text-center space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo skeleton */}
          <div className="flex justify-center mb-8">
            <SkeletonLoader variant="image" width={200} height={80} rounded="xl" />
          </div>
          
          {/* Title skeleton */}
          <div className="space-y-4">
            <TitleSkeleton width="80%" height={60} className="mx-auto" />
            <TitleSkeleton width="60%" height={40} className="mx-auto" />
          </div>
          
          {/* Description skeleton */}
          <div className="max-w-2xl mx-auto space-y-3">
            <TextSkeleton count={3} />
          </div>
          
          {/* CTA buttons skeleton */}
          <div className="flex justify-center gap-4 mt-8">
            <ButtonSkeleton width={160} height={56} />
            <ButtonSkeleton width={160} height={56} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Card Skeleton (for participants/schools)
export const CardSkeleton: React.FC<{ variant?: 'participant' | 'testimonial' }> = ({ 
  variant = 'participant' 
}) => {
  return (
    <GlassCard variant="default" className="h-full">
      <div className="space-y-4">
        {/* Image skeleton */}
        <ImageSkeleton height={200} rounded="lg" />
        
        {/* Content */}
        <div className="space-y-3">
          {/* Title */}
          <TitleSkeleton width="70%" />
          
          {/* Description */}
          <TextSkeleton count={3} />
          
          {variant === 'participant' && (
            <>
              {/* Stats */}
              <div className="flex gap-4 pt-4">
                <SkeletonLoader width={80} height={24} rounded="md" />
                <SkeletonLoader width={80} height={24} rounded="md" />
              </div>
              
              {/* Button */}
              <ButtonSkeleton width="100%" className="mt-4" />
            </>
          )}
          
          {variant === 'testimonial' && (
            <>
              {/* Author info */}
              <div className="flex items-center gap-3 pt-4">
                <AvatarSkeleton />
                <div className="flex-1 space-y-2">
                  <TextSkeleton width="60%" />
                  <TextSkeleton width="40%" height={14} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

// Timeline Skeleton
export const TimelineSkeleton: React.FC = () => {
  return (
    <div className="space-y-8">
      {[...Array(4)].map((_, index) => (
        <motion.div
          key={index}
          className="flex gap-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {/* Timeline dot and line */}
          <div className="flex flex-col items-center">
            <SkeletonLoader
              variant="avatar"
              width={16}
              height={16}
              rounded="full"
              className="mb-2"
            />
            {index < 3 && (
              <div className="w-0.5 h-full bg-white/10 dark:bg-gray-800/10" />
            )}
          </div>
          
          {/* Timeline content */}
          <GlassCard variant="default" className="flex-1">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <TitleSkeleton width="50%" height={24} />
                <TextSkeleton width={100} height={20} />
              </div>
              <TextSkeleton count={2} />
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
};

// FAQ Skeleton
export const FAQSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <GlassCard variant="default" padding="md">
            <div className="flex items-center justify-between">
              <TitleSkeleton width="70%" height={24} />
              <SkeletonLoader width={24} height={24} rounded="md" />
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
};

// Stats Skeleton
export const StatsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[...Array(4)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <GlassCard variant="gradient" className="text-center">
            <div className="space-y-3">
              <SkeletonLoader 
                variant="title" 
                width={80} 
                height={40} 
                className="mx-auto"
              />
              <TextSkeleton width="60%" className="mx-auto" />
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
};

// Gallery Skeleton
export const GallerySkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <ImageSkeleton height={250} rounded="xl" />
        </motion.div>
      ))}
    </div>
  );
};

// Form Skeleton
export const FormSkeleton: React.FC = () => {
  return (
    <GlassCard variant="gradient" padding="lg">
      <div className="space-y-6">
        {/* Form title */}
        <TitleSkeleton width="50%" height={32} />
        
        {/* Form fields */}
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="space-y-2">
              <TextSkeleton width={120} height={16} />
              <SkeletonLoader variant="input" height={48} />
            </div>
          ))}
        </div>
        
        {/* Submit button */}
        <ButtonSkeleton width="100%" height={56} className="mt-6" />
      </div>
    </GlassCard>
  );
};

// Table Skeleton
export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({ 
  rows = 5, 
  columns = 4 
}) => {
  return (
    <div className="overflow-hidden rounded-xl">
      <table className="w-full">
        {/* Header */}
        <thead className="bg-white/5 dark:bg-gray-800/5">
          <tr>
            {[...Array(columns)].map((_, index) => (
              <th key={index} className="p-4">
                <SkeletonLoader width="80%" height={20} />
              </th>
            ))}
          </tr>
        </thead>
        
        {/* Body */}
        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr 
              key={rowIndex} 
              className="border-t border-white/10 dark:border-gray-700/10"
            >
              {[...Array(columns)].map((_, colIndex) => (
                <td key={colIndex} className="p-4">
                  <SkeletonLoader 
                    width={colIndex === 0 ? "60%" : "80%"} 
                    height={16} 
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Navigation Skeleton
export const NavigationSkeleton: React.FC = () => {
  return (
    <nav className="flex items-center justify-between p-6">
      {/* Logo */}
      <SkeletonLoader variant="image" width={120} height={40} rounded="lg" />
      
      {/* Navigation items */}
      <div className="hidden md:flex items-center gap-8">
        {[...Array(5)].map((_, index) => (
          <TextSkeleton key={index} width={80} />
        ))}
      </div>
      
      {/* CTA button */}
      <ButtonSkeleton width={120} />
    </nav>
  );
};

// Content Section Skeleton
export const ContentSectionSkeleton: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Section header */}
      <div className="text-center space-y-4">
        <TitleSkeleton width="60%" height={48} className="mx-auto" />
        <div className="max-w-2xl mx-auto">
          <TextSkeleton count={2} />
        </div>
      </div>
      
      {/* Content grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {[...Array(3)].map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

// Pricing Card Skeleton
export const PricingCardSkeleton: React.FC = () => {
  return (
    <GlassCard variant="gradient" className="h-full">
      <div className="space-y-6 text-center">
        {/* Plan name */}
        <TitleSkeleton width="60%" className="mx-auto" />
        
        {/* Price */}
        <div className="space-y-2">
          <SkeletonLoader width={120} height={48} className="mx-auto" />
          <TextSkeleton width="40%" className="mx-auto" />
        </div>
        
        {/* Features */}
        <div className="space-y-3 py-6">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <SkeletonLoader width={20} height={20} rounded="full" />
              <TextSkeleton width="80%" />
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <ButtonSkeleton width="100%" height={48} />
      </div>
    </GlassCard>
  );
};

// Export all skeletons
export default {
  HeroSkeleton,
  CardSkeleton,
  TimelineSkeleton,
  FAQSkeleton,
  StatsSkeleton,
  GallerySkeleton,
  FormSkeleton,
  TableSkeleton,
  NavigationSkeleton,
  ContentSectionSkeleton,
  PricingCardSkeleton,
};