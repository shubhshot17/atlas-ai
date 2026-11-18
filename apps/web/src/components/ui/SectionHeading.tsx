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
      {/*
        `items-end` (not `center`) so a right-hand action lines up with the
        title's baseline area whether the description below is present or not.
      */}
      {/*
        Below `md` the row stacks: a title and a right-hand action shrink to
        share one line on a phone only by squeezing the title into three lines
        while the button floats off to the right of the last one. `flex-col`
        keeps them in reading order, and `md:flex-row md:items-end md:flex-wrap`
        restores the single aligned row once there is width for it.
      */}
      <div className="flex flex-col items-start gap-3 md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-x-3 md:gap-y-2">
        {/*
          One size per heading role, whatever the tag: section titles (`h1`,
          `h2`, `h3`) are all 18px → 20px, and the eyebrow carries the small
          type. Previously the same visual role rendered at 12px in the footer
          and 20–24px in the page sections.
        */}
        <Tag
          className="font-display text-lg font-semibold text-[var(--atlas-text)] md:text-xl"
          {...rest}
        >
          {title}
        </Tag>
        {action !== undefined && <div className="flex items-center gap-2">{action}</div>}
      </div>
      {description !== undefined && (
        <p className="mt-2 max-w-prose text-pretty text-sm text-[var(--atlas-muted)]">{description}</p>
      )}
    </div>
  );
}
