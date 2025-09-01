'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date('2025-10-04T12:00:00');

    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToNextSection = () => {
    const element = document.getElementById('participants');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container relative">
        <div className="min-h-screen flex items-center pt-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-secondary/10 to-secondary/20 rounded-full backdrop-blur-sm"
              >
                <span className="text-secondary font-medium">Образование мирового уровня</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-tight tracking-tight"
              >
                Выставка
                <span className="gradient-text"> Частные школы </span>
                за рубежом
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4 text-lg text-neutral-700"
              >
                <div className="space-y-2">
                  <p className="font-medium text-xl">
                    <span className="text-primary">Астана</span>, 4 октября 2025, 12:00–16:00
                  </p>
                  <p className="flex items-center gap-2 text-base">
                    <MapPin className="w-5 h-5 text-primary" />
                    Отель «Rixos President Astana»
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-xl">
                    <span className="text-primary">Алматы</span>, 5 октября 2025, 12:00–16:00
                  </p>
                  <p className="flex items-center gap-2 text-base">
                    <MapPin className="w-5 h-5 text-primary" />
                    Отель «Rixos Almaty», пр-т Сейфуллина, 506/99
                  </p>
                </div>
              </motion.div>

              {/* Countdown Timer */}
              {mounted && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-4 gap-4 max-w-md"
                >
                  {[
                    { value: timeLeft.days, label: 'Дней' },
                    { value: timeLeft.hours, label: 'Часов' },
                    { value: timeLeft.minutes, label: 'Минут' },
                    { value: timeLeft.seconds, label: 'Секунд' },
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-white rounded-xl shadow-xl p-4 border border-primary-100">
                        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                          {item.value.toString().padStart(2, '0')}
                        </div>
                        <div className="text-xs text-neutral-600 font-medium">{item.label}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a href="#registration" className="btn-primary text-center group">
                  <span>Зарегистрироваться бесплатно</span>
                  <Calendar className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#participants" className="btn-outline text-center group">
                  <span>Список участников</span>
                  <Users className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                </a>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-8 pt-4"
              >
                <div>
                  <p className="text-3xl font-bold text-primary">50+</p>
                  <p className="text-sm text-neutral-600">Школ-участников</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">20</p>
                  <p className="text-sm text-neutral-600">Стран мира</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">500+</p>
                  <p className="text-sm text-neutral-600">Посетителей</p>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Image/Illustration */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop" 
                  alt="Students" 
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
              
              {/* Floating elements */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white rounded-lg shadow-xl p-4"
              >
                <p className="text-2xl font-bold text-primary">27</p>
                <p className="text-sm text-neutral-600">лет опыта</p>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                className="absolute -bottom-8 -left-8 bg-white rounded-lg shadow-xl p-4"
              >
                <p className="text-2xl font-bold text-secondary">11,256</p>
                <p className="text-sm text-neutral-600">успешных студентов</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToNextSection}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-neutral-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}