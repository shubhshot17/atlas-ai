import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Page-width wrapper: horizontal gutter on small screens, max width + centering
 * from `md` upward.
 */
export function Container({ className, children, ...rest }: ContainerProps) {
  return (
    <div
      className={cn('w-full px-gutter md:mx-auto md:max-w-3xl lg:max-w-5xl', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
