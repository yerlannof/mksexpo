'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function Testimonials() {
  const { t } = useLanguage();
  
  const testimonials = [
    {
      id: 1,
      nameKey: 'testimonials.name1',
      roleKey: 'testimonials.role1',
      textKey: 'testimonials.text1',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      id: 2,
      nameKey: 'testimonials.name2',
      roleKey: 'testimonials.role2',
      textKey: 'testimonials.text2',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
      gradient: 'from-blue-600 to-cyan-600',
    },
    {
      id: 3,
      nameKey: 'testimonials.name3',
      roleKey: 'testimonials.role3',
      textKey: 'testimonials.text3',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
      gradient: 'from-green-600 to-teal-600',
    },
  ];
  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full filter blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white">
            {t('testimonials.title')} <span className="text-white">{t('testimonials.title.highlight')}</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 h-full relative hover:bg-white/15 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:border-white/30">
                {/* Quote icon */}
                <div className={`absolute top-6 right-6 w-12 h-12 rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity`}>
                  <span className="text-white text-3xl font-serif">&ldquo;</span>
                </div>
                
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
                      <span className="text-white text-xs">⭐</span>
                    </div>
                  ))}
                </div>

                {/* Text */}
                <p className="text-white/90 mb-8 relative z-10 text-lg leading-relaxed">
                  &ldquo;{t(testimonial.textKey)}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/20">
                    <Image
                      src={testimonial.image}
                      alt={t(testimonial.nameKey)}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{t(testimonial.nameKey)}</h4>
                    <p className="text-sm text-white/60">{t(testimonial.roleKey)}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-white/80 mb-6">
            {t('testimonials.cta.text')}
          </p>
          <AnimatedButton
            variant="glow"
            size="lg"
            href="#registration"
            rightIcon={<span>→</span>}
          >
            {t('testimonials.cta.button')}
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  );
}