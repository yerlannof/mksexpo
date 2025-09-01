# Toast Notification System - Quick Usage Guide

## Basic Usage

```tsx
import { useToast } from '@/hooks/useToast';

function MyComponent() {
  const { toast } = useToast();

  // Success
  toast.success('Success!', 'Operation completed');

  // Error
  toast.error('Error!', 'Something went wrong');

  // Warning
  toast.warning('Warning!', 'Check your input');

  // Info
  toast.info('Info', 'Here is some information');
}
```

## Promise-based (for async operations)

```tsx
const result = await toast.promise(
  fetch('/api/data'),
  {
    loading: 'Loading...',
    success: 'Data loaded!',
    error: 'Failed to load',
  }
);
```

## Demo

Visit http://localhost:3000/toast-demo to see all features.

## Files

- `/contexts/ToastContext.tsx` - Context provider
- `/components/ui/Toast.tsx` - Toast component
- `/hooks/useToast.ts` - React hook
- `/app/toast-demo/page.tsx` - Demo page