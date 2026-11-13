import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Render as a clickable action (adds affordance styles, keeps div semantics). */
  interactive?: boolean;
  children: React.ReactNode;
}

/**
 * Surface container. Pair with `CardHeader` / `CardTitle` / `CardBody` /
 * `CardFooter` for consistent internal spacing, or use standalone.
 */
export function Card({ interactive = false, className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-panel border border-[var(--atlas-border)] bg-[var(--atlas-surface)]',
        'p-card',
        interactive &&
        'cursor-pointer transition-colors duration-150 hover:border-atlas-ocean-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-atlas-horizon-600',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-3', className)} {...rest} />;
}

export function CardTitle({ className, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('font-display text-base font-semibold text-[var(--atlas-text)]', className)}
      {...rest}
    />
  );
}

export function CardBody({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-sm text-[var(--atlas-muted)]', className)} {...rest} />;
}

export function CardFooter({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-4 flex items-center gap-2', className)} {...rest} />;
}
