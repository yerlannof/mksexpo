# Toast Notification System

A modern, accessible toast notification system built with React, TypeScript, and Framer Motion.

## Features

- ✅ Multiple variants: success, error, warning, info
- ✅ Glassmorphic design with backdrop blur
- ✅ Auto-dismiss with customizable duration
- ✅ Manual dismiss with close button
- ✅ Smooth slide-in animations from top-right
- ✅ Stack multiple toasts with proper spacing
- ✅ Progress bar showing time remaining
- ✅ Promise-based toasts for async operations
- ✅ TypeScript support with full type safety
- ✅ Accessible with ARIA live regions

## Installation

The toast system is already integrated into the app. The `ToastProvider` is wrapped around the app in `app/layout.tsx`.

## Basic Usage

```tsx
import { useToast } from '@/hooks/useToast';

function MyComponent() {
  const { toast } = useToast();

  // Success toast
  toast.success('Success!', 'Operation completed successfully');

  // Error toast
  toast.error('Error!', 'Something went wrong');

  // Warning toast
  toast.warning('Warning!', 'Please check your input');

  // Info toast
  toast.info('Info', 'Here is some information');
}
```

## Advanced Usage

### Custom Duration

```tsx
toast.show({
  title: 'Custom Toast',
  description: 'This toast will stay for 10 seconds',
  variant: 'info',
  duration: 10000, // milliseconds
});
```

### Manual Dismiss Only

```tsx
toast.show({
  title: 'Manual Dismiss',
  description: 'Click the X to close this toast',
  variant: 'warning',
  duration: 0, // Won't auto-dismiss
});
```

### Promise-based Toasts

Perfect for async operations like API calls:

```tsx
const { toast } = useToast();

try {
  const result = await toast.promise(
    fetch('/api/data').then(res => res.json()),
    {
      loading: 'Loading data...',
      success: (data) => `Loaded ${data.length} items`,
      error: (err) => `Error: ${err.message}`,
    }
  );
} catch (error) {
  // Error is already handled by toast.promise
}
```

### Dismiss Toasts

```tsx
const { toast } = useToast();

// Dismiss a specific toast
const toastId = toast.info('This is a toast');
toast.dismiss(toastId);

// Dismiss all toasts
toast.dismissAll();
```

## API Reference

### useToast Hook

```tsx
const { toast, toasts } = useToast();
```

#### Methods

- `toast.success(title: string, description?: string, options?: Partial<ShowToastOptions>)`
- `toast.error(title: string, description?: string, options?: Partial<ShowToastOptions>)`
- `toast.warning(title: string, description?: string, options?: Partial<ShowToastOptions>)`
- `toast.info(title: string, description?: string, options?: Partial<ShowToastOptions>)`
- `toast.show(options: ShowToastOptions)`
- `toast.promise<T>(promise: Promise<T>, messages: { loading, success, error })`
- `toast.dismiss(id: string)`
- `toast.dismissAll()`

### ShowToastOptions

```tsx
interface ShowToastOptions {
  title: string;
  description?: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
  duration?: number; // milliseconds, 0 for manual dismiss only
  onDismiss?: () => void;
}
```

## Demo

Visit `/toast-demo` to see all features in action.

## Styling

The toast system uses Tailwind CSS with glassmorphic effects. The toasts appear in the top-right corner and stack vertically with smooth animations.

To customize the appearance, you can modify the styles in `/components/ui/Toast.tsx`.