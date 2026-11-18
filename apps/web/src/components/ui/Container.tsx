import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Page-width wrapper shared by every page section and by the header/footer.
 *
 * One max width at all breakpoints, deliberately: an earlier version capped
 * sections at `max-w-3xl` (768px) between 768px and 1023px while the header
 * and footer stayed at `max-w-5xl` (1024px), so section content sat inset from
 * the nav logo by the gutter width and the page looked ragged at tablet
 * landscape. The gutter stays on every breakpoint too, so a centred container
 * and a full-bleed header align at the same left edge.
 */
export function Container({ className, children, ...rest }: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full max-w-5xl px-gutter', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
