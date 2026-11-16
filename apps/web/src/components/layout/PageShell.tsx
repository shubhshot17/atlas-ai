import type { ReactNode } from 'react';
import { Container, SectionHeading, cn } from '@/components/ui';

export interface PageShellProps {
  /** Page title; rendered as the single `h1` of the page unless `as` overrides it. */
  title: ReactNode;
  /**
   * Heading tag for the title. Defaults to `h1`; use `h2` on a page whose main
   * heading lives elsewhere (e.g. a hero section above this block).
   */
  as?: 'h1' | 'h2';
  /** Small label above the title. */
  eyebrow?: string;
  description?: ReactNode;
  /** Right-aligned actions next to the title (buttons, links). */
  action?: ReactNode;
  /** Page body. */
  children?: ReactNode;
  className?: string;
}

/**
 * Standard padding and heading block for a routed page. Keeps every page's
 * vertical rhythm and document outline consistent.
 */
export function PageShell({
  title,
  as = 'h1',
  eyebrow,
  description,
  action,
  children,
  className,
}: PageShellProps) {
  return (
    <Container className={cn('py-section', className)}>
      <SectionHeading as={as} eyebrow={eyebrow} title={title} description={description} action={action} />
      {children}
    </Container>
  );
}
