import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

/** Everything from the native heading attributes except `title`, which this component redefines as slot content. */
type HeadingAttributes = Omit<HTMLAttributes<HTMLHeadingElement>, 'title'>;

export interface SectionHeadingProps extends HeadingAttributes {
  /** Rendered tag; keep document outline correct (`h1` once per page). */
  as?: HeadingLevel;
  /** Small text above the title, e.g. a category label. */
  eyebrow?: string;
  /** Optional action slot (link, Button) aligned to the right. */
  action?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
}

export function SectionHeading({
  as: Tag = 'h2',
  eyebrow,
  action,
  title,
  description,
  className,
  ...rest
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-6', className)}>
      {eyebrow !== undefined && (
        <p className="mb-1 text-xs font-semibold tracking-widest text-[var(--atlas-accent)] uppercase">
          {eyebrow}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tag
          className={cn(
            'font-display font-semibold text-[var(--atlas-text)]',
            Tag === 'h1' ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl',
          )}
          {...rest}
        >
          {title}
        </Tag>
        {action !== undefined && <div className="flex items-center gap-2">{action}</div>}
      </div>
      {description !== undefined && (
        <p className="mt-2 max-w-prose text-sm text-[var(--atlas-muted)]">{description}</p>
      )}
    </div>
  );
}
