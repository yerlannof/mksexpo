'use client';

import { LanguageProvider } from "@/contexts/LanguageContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { CityModalProvider } from "@/contexts/CityModalContext";
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
        <CityModalProvider>
          <BackgroundPattern />
          <LanguageTransition />
          <AnimatedButtonStyles />
          <ScrollProgress />
          <HeaderSimple />
          <main className="relative">
            {children}
          </main>
          <Footer />
        </CityModalProvider>
      </ToastProvider>
    </LanguageProvider>
  );
}