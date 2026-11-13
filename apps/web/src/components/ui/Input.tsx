import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Accessible label — always rendered, visually hidden only if `hideLabel` is set. */
  label: string;
  /** Hide the label visually while keeping it for screen readers. */
  hideLabel?: boolean;
  /** Helper text shown under the field. */
  hint?: string;
  /** Error message; sets `aria-invalid` and wires up `aria-describedby`. */
  error?: string;
  /** Optional trailing content (icon, unit). Hidden from screen readers. */
  trailing?: ReactNode;
  id?: string;
}

const baseClasses =
  'block w-full rounded-panel border bg-transparent px-3 py-2 text-sm ' +
  'text-[var(--atlas-text)] placeholder:text-[var(--atlas-muted)] ' +
  'border-[var(--atlas-border)] hover:border-atlas-ocean-400 ' +
  'focus:outline-2 focus:outline-offset-0 focus:outline-atlas-horizon-500 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed';

export function Input({
  label,
  hideLabel = false,
  hint,
  error,
  trailing,
  className,
  id,
  ...rest
}: InputProps) {
  // Deterministic unique ids keep label/description/error wiring correct even
  // when the same field is rendered multiple times on one page.
  const autoId = useId();
  const inputId = id ?? `input-${autoId}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={inputId}
        className={cn(
          'text-sm font-medium text-[var(--atlas-text)]',
          hideLabel && 'sr-only',
        )}
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(baseClasses, error ? 'border-atlas-sunset-500' : null, trailing ? 'pr-10' : null)}
          {...rest}
        />
        {trailing !== undefined && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[var(--atlas-muted)]"
          >
            {trailing}
          </span>
        )}
      </div>

      {hint !== undefined && (
        <p id={hintId} className="text-xs text-[var(--atlas-muted)]">
          {hint}
        </p>
      )}
      {error !== undefined && (
        <p id={errorId} role="alert" className="text-xs text-atlas-sunset-500">
          {error}
        </p>
      )}
    </div>
  );
}
