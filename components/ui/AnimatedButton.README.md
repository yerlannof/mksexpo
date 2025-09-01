# AnimatedButton Component

A modern, fully-featured button component with advanced animations and effects using Framer Motion.

## Features

- **Multiple Variants**: primary, secondary, ghost, and glow
- **Size Options**: sm, md, lg, xl
- **Animation Effects**:
  - Magnetic cursor effect (button follows cursor)
  - Ripple effect on click
  - Gradient shift animation
  - Scale animations on hover/tap
  - Glow pulse for CTA buttons
- **Icon Support**: Left and right icon slots
- **Loading State**: Built-in loading spinner
- **Accessibility**: Full ARIA support and keyboard navigation
- **TypeScript**: Full type safety

## Installation

Make sure you have the required dependencies:

```bash
npm install framer-motion clsx tailwind-merge
```

## Usage

### Basic Example

```tsx
import AnimatedButton from '@/components/ui/AnimatedButton';

function MyComponent() {
  return (
    <AnimatedButton variant="primary" size="md">
      Click Me
    </AnimatedButton>
  );
}
```

### With Icons

```tsx
<AnimatedButton
  variant="secondary"
  leftIcon={<ChevronLeft className="w-5 h-5" />}
  rightIcon={<ChevronRight className="w-5 h-5" />}
>
  Navigate
</AnimatedButton>
```

### Loading State

```tsx
const [loading, setLoading] = useState(false);

<AnimatedButton
  variant="primary"
  loading={loading}
  onClick={() => setLoading(true)}
>
  {loading ? 'Processing...' : 'Submit'}
</AnimatedButton>
```

### All Variants

```tsx
<AnimatedButton variant="primary">Primary</AnimatedButton>
<AnimatedButton variant="secondary">Secondary</AnimatedButton>
<AnimatedButton variant="ghost">Ghost</AnimatedButton>
<AnimatedButton variant="glow">Glow</AnimatedButton>
```

### All Sizes

```tsx
<AnimatedButton size="sm">Small</AnimatedButton>
<AnimatedButton size="md">Medium</AnimatedButton>
<AnimatedButton size="lg">Large</AnimatedButton>
<AnimatedButton size="xl">Extra Large</AnimatedButton>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'primary' \| 'secondary' \| 'ghost' \| 'glow'` | `'primary'` | Button style variant |
| size | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Button size |
| leftIcon | `ReactNode` | - | Icon to display on the left |
| rightIcon | `ReactNode` | - | Icon to display on the right |
| loading | `boolean` | `false` | Shows loading spinner and disables button |
| disabled | `boolean` | `false` | Disables the button |
| children | `ReactNode` | - | Button content |
| ...props | `ButtonHTMLAttributes` | - | All native button props |

## Styling

The component uses Tailwind CSS for styling. Make sure to include the AnimatedButtonStyles component in your layout to inject the required CSS animations:

```tsx
import AnimatedButtonStyles from '@/components/ui/AnimatedButtonStyles';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AnimatedButtonStyles />
        {children}
      </body>
    </html>
  );
}
```

## Customization

You can customize the button by:

1. **Using className prop**: Add additional Tailwind classes
   ```tsx
   <AnimatedButton className="w-full mt-4">Full Width</AnimatedButton>
   ```

2. **Extending variants**: Modify the `variantClasses` object in the component

3. **Adjusting animations**: Modify the spring config and animation values

## Accessibility

The component includes:
- Proper ARIA attributes (`aria-busy`, `aria-disabled`)
- Focus management with visible focus rings
- Keyboard navigation support
- Semantic HTML button element
- Disabled state management