'use client';

import { LanguageProvider } from "@/contexts/LanguageContext";
import { ToastProvider } from "@/contexts/ToastContext";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedButtonStyles from "@/components/ui/AnimatedButtonStyles";
import { BackgroundPattern } from "@/components/BackgroundPattern";
import { LanguageTransition } from "@/components/LanguageTransition";
import HeaderSimple from "@/components/layout/HeaderSimple";
import Footer from "@/components/layout/Footer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ToastProvider>
        <BackgroundPattern />
        <LanguageTransition />
        <AnimatedButtonStyles />
        <ScrollProgress />
        <HeaderSimple />
        <main className="relative">
          {children}
        </main>
        <Footer />
      </ToastProvider>
    </LanguageProvider>
  );
}