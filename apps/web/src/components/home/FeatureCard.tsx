import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from '@/components/ui';

export interface FeatureCardProps {
  /** Icon element, typically from `@/components/ui/icons`. Decorative. */
  icon: ReactNode;
  title: string;
  description: ReactNode;
  /** Optional short status, e.g. "Coming soon". */
  status?: string;
  /** Optional secondary line under the description (e.g. detail chips). */
  footer?: ReactNode;
  className?: string;
}

/**
 * One capability tile for the homepage "what's included" grid.
 *
 * Presentation only — it holds no data, no links, and no claims beyond the
 * copy passed in. Callers own the wording so a feature can be described as
 * available or planned in exactly one place.
 */
export function FeatureCard({ icon, title, description, status, footer, className }: FeatureCardProps) {
  return (
    <Card className={cn('flex h-full flex-col', className)}>
      <CardHeader className="mb-4 flex items-start justify-between gap-3">
        <span
          aria-hidden="true"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-panel bg-[var(--atlas-bg)] text-[var(--atlas-accent-strong)]"
        >
          {icon}
        </span>
        {status !== undefined && (
          <span className="rounded-badge border border-[var(--atlas-border)] px-2.5 py-0.5 text-xs font-medium whitespace-nowrap text-[var(--atlas-muted)]">
            {status}
          </span>
        )}
      </CardHeader>

      <CardTitle>{title}</CardTitle>

      <CardBody className="mt-1.5 flex-1">{description}</CardBody>

      {footer !== undefined && <CardFooter className="mt-4">{footer}</CardFooter>}
    </Card>
  );
}
