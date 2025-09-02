'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { useToast } from '@/hooks/useToast';
import Image from 'next/image';

export default function Registration() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    phone: '',
    email: '',
    educationLevel: '',
    programs: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Validation Error', 'Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await toast.promise(
        new Promise((resolve) => setTimeout(resolve, 2000)),
        {
          loading: 'Submitting your registration...',
          success: 'Registration submitted successfully!',
          error: 'Failed to submit registration. Please try again.',
        }
      );
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        birthDate: '',
        phone: '',
        email: '',
        educationLevel: '',
        programs: [],
      });
      
      // Show additional info toast
      setTimeout(() => {
        toast.info('What\'s next?', 'We\'ll contact you within 24 hours with event details.');
      }, 500);
      
    } catch (error) {
      // Error is already handled by toast.promise
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (program: string) => {
    setFormData((prev) => ({
      ...prev,
      programs: prev.programs.includes(program)
        ? prev.programs.filter((p) => p !== program)
        : [...prev.programs, program],
    }));
  };

  return (
    <section className="section-padding relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full filter blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">
              {t('registration.title')} <span className="text-white">{t('registration.title.highlight')}</span>
            </h2>
            <p className="text-lg sm:text-xl text-white/80">
              {t('registration.subtitle')}
            </p>
          </motion.div>

          {/* Registration Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-white/90 mb-2">
                  {t('registration.firstName')} *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all"
                  placeholder={t('registration.firstName.placeholder')}
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-300">{errors.firstName}</p>}
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-white/90 mb-2">
                  {t('registration.lastName')} *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all"
                  placeholder={t('registration.lastName.placeholder')}
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-300">{errors.lastName}</p>}
              </div>

              {/* Birth Date */}
              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-white/90 mb-2">
                  {t('registration.birthDate')} *
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  required
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all [color-scheme:dark]"
                />
                {errors.birthDate && <p className="mt-1 text-sm text-red-300">{errors.birthDate}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-2">
                  {t('registration.phone')} *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all"
                  placeholder={t('registration.phone.placeholder')}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-300">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                  {t('registration.email')} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all"
                  placeholder={t('registration.email.placeholder')}
                />
                {errors.email && <p className="mt-1 text-sm text-red-300">{errors.email}</p>}
              </div>

              {/* Education Level */}
              <div>
                <label htmlFor="educationLevel" className="block text-sm font-medium text-white/90 mb-2">
                  {t('registration.educationLevel')}
                </label>
                <select
                  id="educationLevel"
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all [&>option]:bg-gray-900 [&>option]:text-white"
                >
                  <option value="">{t('registration.educationLevel.placeholder')}</option>
                  <option value="middle">{t('registration.educationLevel.middle')}</option>
                  <option value="high">{t('registration.educationLevel.high')}</option>
                  <option value="prep">{t('registration.educationLevel.prep')}</option>
                  <option value="bachelor">{t('registration.educationLevel.bachelor')}</option>
                  <option value="master">{t('registration.educationLevel.master')}</option>
                  <option value="other">{t('registration.educationLevel.other')}</option>
                </select>
              </div>
            </div>

            {/* Programs */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-4">
                {t('registration.programs')}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3">
                {[
                  { key: 'ib', label: t('registration.programs.ib') },
                  { key: 'gcse', label: t('registration.programs.gcse') },
                  { key: 'ap', label: t('registration.programs.ap') },
                  { key: 'local', label: t('registration.programs.local') },
                  { key: 'summer', label: t('registration.programs.summer') },
                  { key: 'language', label: t('registration.programs.language') },
                ].map((program) => (
                  <label key={program.key} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.programs.includes(program.key)}
                      onChange={() => handleCheckboxChange(program.key)}
                      className="w-5 h-5 rounded backdrop-blur-sm bg-white/10 border-2 border-white/30 text-blue-600 focus:ring-2 focus:ring-white/30 focus:ring-offset-0 transition-all checked:bg-gradient-to-br checked:from-blue-500 checked:to-purple-500 checked:border-transparent"
                    />
                    <span className="text-white/80 group-hover:text-white transition-colors">{program.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Agreement */}
            <div className="backdrop-blur-sm bg-white/5 border border-white/10 p-4 rounded-xl">
              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  className="w-5 h-5 rounded backdrop-blur-sm bg-white/10 border-2 border-white/30 text-blue-600 focus:ring-2 focus:ring-white/30 focus:ring-offset-0 transition-all checked:bg-gradient-to-br checked:from-blue-500 checked:to-purple-500 checked:border-transparent mt-1"
                />
                <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                  {t('registration.agreement')}
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <AnimatedButton
                type="submit"
                variant="primary"
                size="lg"
                loading={isSubmitting}
                className="w-full sm:w-auto"
              >
                {t('registration.submit')}
              </AnimatedButton>
            </div>
          </motion.form>

          {/* Photo Section - Consultation moments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/gallery/photo_2025-09-02_03-39-24 (2).jpg"
                  alt={language === 'ru' ? 'Индивидуальная консультация' : 'Individual consultation'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium">
                    {language === 'ru' ? 'Индивидуальные консультации с представителями школ' : 'Individual consultations with school representatives'}
                  </p>
                </div>
              </div>
              
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/gallery/photo_2025-09-02_03-39-25 (4).jpg"
                  alt={language === 'ru' ? 'Консультация родителей' : 'Parent consultation'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium">
                    {language === 'ru' ? 'Профессиональная помощь в выборе школы' : 'Professional help in choosing a school'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}