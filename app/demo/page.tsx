import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const demos = [
  {
    title: 'Skeleton Loading Showcase',
    description: 'Explore all skeleton loading states and animations used throughout the application',
    href: '/demo/skeleton-showcase',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Lazy Loading Images',
    description: 'See how images load progressively with skeleton states and smooth transitions',
    href: '/demo/lazy-loading',
    gradient: 'from-blue-500 to-cyan-500',
  },
];

export default function DemoIndex() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-primary-light py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Loading Demos</h1>
          <p className="text-xl text-white/80">
            Interactive demonstrations of the loading states and lazy loading system
          </p>
        </div>

        <div className="grid gap-6">
          {demos.map((demo) => (
            <Link
              key={demo.href}
              href={demo.href}
              className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">{demo.title}</h2>
                  <p className="text-white/70">{demo.description}</p>
                </div>
                <div className="ml-8">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${demo.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <ArrowRight className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}