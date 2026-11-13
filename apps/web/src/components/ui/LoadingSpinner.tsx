import { cn } from '@/lib/cn';

export interface LoadingSpinnerProps {
  /** Pixel size of the spinner; defaults to 24. */
  size?: number;
  /** Accessible label for the loading state, e.g. "Loading trips". */
  label?: string;
  className?: string;
}

/**
 * Announces loading politely (role="status"), and falls back to a simple text
 * label when `prefers-reduced-motion` disables the animation.
 */
export function LoadingSpinner({ size = 24, label = 'Loading', className }: LoadingSpinnerProps) {
  return (
    <span role="status" className={cn('inline-flex items-center gap-2', className)}>
      <svg
        aria-hidden="true"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="animate-spin motion-reduce:hidden"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" className="opacity-25" />
        <path
          d="M21 12a9 9 0 0 0-9-9"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-[var(--atlas-accent)]"
        />
      </svg>
      <span className="sr-only motion-reduce:not-sr-only">{label}</span>
    </span>
  );
}
