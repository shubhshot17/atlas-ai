/**
 * Merge conditional class names, skipping falsy values.
 *
 * A tiny stand-in for `clsx`/`tailwind-merge` — enough for this codebase, with
 * zero dependencies. If conflict resolution between Tailwind classes is ever
 * needed, swap the implementation for `twMerge(...)` without changing callers.
 */
export type ClassValue = string | number | boolean | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}
