/**
 * AtlasAI shared UI primitives.
 *
 * Modular, dependency-free building blocks styled with the design tokens in
 * `src/index.css`. Import from this barrel: `import { Button } from '@/components/ui';`
 */
export { cn, type ClassValue } from '@/lib/cn';

export { Button, type ButtonProps } from './Button';
export { Input, type InputProps } from './Input';
export {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  type CardProps,
} from './Card';
export { Badge, type BadgeProps } from './Badge';
export { Container, type ContainerProps } from './Container';
export { SectionHeading, type SectionHeadingProps } from './SectionHeading';
export { LoadingSpinner, type LoadingSpinnerProps } from './LoadingSpinner';
export { EmptyState, type EmptyStateProps } from './EmptyState';
