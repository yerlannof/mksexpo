'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

declare global {
  interface Window {
    fbq: (track: string, event: string, params?: Record<string, unknown>) => void;
    _fbq: (track: string, event: string, params?: Record<string, unknown>) => void;
  }
}

const FB_PIXEL_ID = '1444111270140281';

export default function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views when route changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [pathname, searchParams]);

  return (
    <>
      {/* Facebook Pixel Script */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      
      {/* Facebook Pixel NoScript */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}

// Helper function to track custom events
export const trackFBEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
  }
};

// Predefined events for convenience
export const fbEvents = {
  // Track when someone clicks registration button
  trackRegistrationInitiated: () => {
    trackFBEvent('InitiateCheckout', {
      content_name: 'Exhibition Registration',
      content_category: 'Registration',
    });
  },
  
  // Track when someone selects a city
  trackCitySelected: (city: string) => {
    trackFBEvent('AddToCart', {
      content_name: `Registration - ${city}`,
      content_category: 'City Selection',
      value: 0,
      currency: 'KZT',
    });
  },
  
  // Track when registration form is viewed
  trackRegistrationViewed: (city: string) => {
    trackFBEvent('ViewContent', {
      content_name: `Registration Form - ${city}`,
      content_category: 'Registration',
    });
  },
  
  // Track successful registration (when Timepad form is submitted)
  trackRegistrationCompleted: (city: string) => {
    trackFBEvent('CompleteRegistration', {
      content_name: `Exhibition Registration - ${city}`,
      status: true,
      value: 0,
      currency: 'KZT',
    });
  },
  
  // Track contact/WhatsApp clicks
  trackContactClick: (method: string) => {
    trackFBEvent('Contact', {
      content_name: method,
      content_category: 'Contact',
    });
  },
};