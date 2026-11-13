import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. */
  variant?: ButtonVariant;
  /** Control size; defaults to `md`. */
  size?: ButtonSize;
  /** Show a spinner and block interaction while an async action is running. */
  loading?: boolean;
  /** Optional leading content (icon), hidden from screen readers. */
  leading?: ReactNode;
  /** Full-width button, useful in stacked forms. */
  fullWidth?: boolean;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-atlas-horizon-600 text-white shadow-sm hover:bg-atlas-horizon-500 ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-horizon-600',
  secondary:
    'bg-transparent text-[var(--atlas-text)] border border-[var(--atlas-border)] ' +
    'hover:bg-[var(--atlas-surface)] ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-horizon-600',
  ghost:
    'bg-transparent text-[var(--atlas-muted)] hover:bg-[var(--atlas-surface)] hover:text-[var(--atlas-text)] ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-horizon-600',
  danger:
    'bg-atlas-sunset-600 text-white hover:bg-atlas-sunset-500 ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-sunset-600',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  leading,
  fullWidth = false,
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      // Announce in-flight state without visually duplicated text.
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex items-center justify-center rounded-panel font-medium select-none',
        'transition-colors duration-150',
        'disabled:opacity-50 disabled:pointer-events-none',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {leading !== undefined && <span aria-hidden="true">{leading}</span>}
      {children}
    </button>
  );
}
