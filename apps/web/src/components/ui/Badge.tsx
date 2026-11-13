import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type BadgeVariant = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** Render a small leading dot, useful for status indicators. */
  withDot?: boolean;
  children: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-atlas-ocean-100 text-atlas-ocean-800',
  accent: 'bg-atlas-horizon-100 text-atlas-horizon-800',
  success: 'bg-atlas-horizon-100 text-atlas-horizon-800',
  warning: 'bg-atlas-sand-200 text-atlas-sand-800',
  danger: 'bg-atlas-sunset-100 text-atlas-sunset-800',
};

const dotClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-atlas-ocean-500',
  accent: 'bg-atlas-horizon-500',
  success: 'bg-atlas-horizon-500',
  warning: 'bg-atlas-sand-500',
  danger: 'bg-atlas-sunset-500',
};

export function Badge({
  variant = 'neutral',
  withDot = false,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-badge px-2.5 py-0.5',
        'text-xs font-medium whitespace-nowrap',
        variantClasses[variant],
        className,
      )}
      {...rest}
    >
      {withDot && <span aria-hidden="true" className={cn('h-1.5 w-1.5 rounded-full', dotClasses[variant])} />}
      {children}
    </span>
  );
}
