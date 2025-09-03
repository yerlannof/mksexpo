'use client';

import React from 'react';
import LazyImage from '@/components/ui/LazyImage';
import { motion } from 'framer-motion';
import { MapPin, Users, Calendar } from 'lucide-react';

interface SchoolCardProps {
  name: string;
  location: string;
  type: string;
  students: string;
  established: string;
  imageUrl: string;
  delay?: number;
}

export default function SchoolCardWithImage({
  name,
  location,
  type,
  students,
  established,
  imageUrl,
  delay = 0,
}: SchoolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="group relative bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300"
    >
      {/* Image with lazy loading */}
      <div className="relative h-48 overflow-hidden">
        <LazyImage
          src={imageUrl}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Type badge */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full">
          <span className="text-xs font-medium text-white">{type}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-white line-clamp-2">{name}</h3>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-white/70">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-white/70">
            <Users className="w-4 h-4" />
            <span className="text-sm">{students} students</span>
          </div>
          
          <div className="flex items-center gap-2 text-white/70">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Est. {established}</span>
          </div>
        </div>

        <button className="w-full mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-200">
          Learn More
        </button>
      </div>
    </motion.div>
  );
}