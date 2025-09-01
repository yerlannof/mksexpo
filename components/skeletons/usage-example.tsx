'use client';

import React, { useState, useEffect } from 'react';
import { 
  HeroSkeleton,
  CardSkeleton,
  TimelineSkeleton,
  FAQSkeleton,
  ContentSectionSkeleton
} from '@/components/skeletons';
import PageLoader, { usePageLoader } from '@/components/ui/PageLoader';
import SkeletonLoader from '@/components/ui/SkeletonLoader';

// Example: Using PageLoader with progress
export const PageLoaderExample = () => {
  const { isLoading, progress, startLoading, updateProgress, stopLoading } = usePageLoader();

  const simulateLoading = async () => {
    startLoading();
    
    // Simulate progress updates
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      updateProgress(i);
    }
    
    stopLoading();
  };

  return (
    <div>
      <button onClick={simulateLoading}>Start Loading</button>
      <PageLoader 
        isLoading={isLoading} 
        progress={progress} 
        variant="progress" 
      />
    </div>
  );
};

// Example: Data fetching with skeleton
interface ExampleData {
  title: string;
  content: string;
}

export const DataFetchingExample = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ExampleData | null>(null);

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setData({ title: 'Example Data', content: 'This is fetched data' });
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <ContentSectionSkeleton />;
  }

  return <div>{/* Your actual content */}</div>;
};

// Example: Image loading with skeleton
export const ImageLoadingExample = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative">
      {!imageLoaded && (
        <SkeletonLoader 
          variant="image" 
          width="100%" 
          height={400} 
          rounded="xl" 
        />
      )}
      <img
        src="/your-image.jpg"
        alt="Example"
        onLoad={() => setImageLoaded(true)}
        className={`transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

// Example: List loading with staggered animation
export const ListLoadingExample = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setItems([/* your items */]);
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} style={{ animationDelay: `${index * 100}ms` }}>
            <CardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  return <div>{/* Your actual list */}</div>;
};

// Example: Custom skeleton composition
export const CustomSkeletonExample = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="space-y-6">
      {isLoading ? (
        <>
          {/* Header skeleton */}
          <div className="flex items-center justify-between">
            <SkeletonLoader variant="title" width={200} />
            <SkeletonLoader variant="button" />
          </div>
          
          {/* Content skeleton */}
          <div className="grid grid-cols-2 gap-4">
            <SkeletonLoader variant="card" height={200} />
            <div className="space-y-4">
              <SkeletonLoader variant="text" count={3} />
              <SkeletonLoader variant="button" width="100%" />
            </div>
          </div>
        </>
      ) : (
        <div>{/* Your actual content */}</div>
      )}
    </div>
  );
};

// Example: Page transition with loader
export const PageTransitionExample = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePageChange = () => {
    setIsTransitioning(true);
    
    // Simulate page transition
    setTimeout(() => {
      setIsTransitioning(false);
      // Navigate to new page
    }, 1000);
  };

  return (
    <>
      <PageLoader 
        isLoading={isTransitioning} 
        variant="logo" 
        fullScreen={true} 
      />
      <button onClick={handlePageChange}>Change Page</button>
    </>
  );
};

// Example: Form submission with loader
export const FormSubmissionExample = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="relative"
      >
        {isSubmitting ? (
          <>
            <span className="opacity-0">Submit</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <PageLoader 
                isLoading={true} 
                variant="spinner" 
                fullScreen={false}
                className="bg-transparent"
              />
            </div>
          </>
        ) : (
          'Submit'
        )}
      </button>
    </form>
  );
};