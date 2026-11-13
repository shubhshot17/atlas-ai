import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional illustration or icon slot above the title. */
  icon?: ReactNode;
  title: string;
  description?: ReactNode;
  /** Call to action, typically a Button. */
  action?: ReactNode;
}

/**
 * Placeholder for a list or section with nothing to show yet. Renders as a
 * labelled region so screen readers can jump to it.
 */
export function EmptyState({ icon, title, description, action, className, ...rest }: EmptyStateProps) {
  return (
    <div
      role="region"
      aria-label={title}
      className={cn(
        'flex flex-col items-center justify-center rounded-panel border border-dashed',
        'border-[var(--atlas-border)] bg-[var(--atlas-surface)] px-6 py-12 text-center',
        className,
      )}
      {...rest}
    >
      {icon !== undefined && (
        <div aria-hidden="true" className="mb-4 text-[var(--atlas-muted)]">
          {icon}
        </div>
      )}
      <h3 className="font-display text-lg font-semibold text-[var(--atlas-text)]">{title}</h3>
      {description !== undefined && (
        <div className="mt-1.5 max-w-prose text-sm text-[var(--atlas-muted)]">{description}</div>
      )}
      {action !== undefined && <div className="mt-5">{action}</div>}
    </div>
  );
}
