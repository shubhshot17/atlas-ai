import type { SVGProps } from 'react';
import { cn } from '@/lib/cn';

/**
 * Tone controls how the mark picks up color:
 * - `auto`  — semantic tokens (`--atlas-text` / `--atlas-accent`), follows the
 *             active color scheme. Use wherever possible.
 * - `light` — fixed light-on-dark colors, for placement on brand navy tiles.
 * - `dark`  — fixed dark-on-light colors, for print/light surfaces.
 * - `mono`  — single color (`currentColor`), for monochrome contexts.
 */
export type LogoTone = 'auto' | 'light' | 'dark' | 'mono';

export interface LogoProps extends Omit<SVGProps<SVGSVGElement>, 'viewBox'> {
  /** Rendered width & height in px; the mark is square. */
  size?: number;
  tone?: LogoTone;
  /** Accessible name. Set to '' when a visible wordmark is adjacent. */
  title?: string;
}

const TONE_COLORS: Record<Exclude<LogoTone, 'auto' | 'mono'>, { globe: string; needle: string }> = {
  light: { globe: '#eef4fb', needle: '#56d0c2' },
  dark: { globe: '#0b1220', needle: '#127d78' },
};

/**
 * AtlasAI logo mark: a tilted wireframe globe with a compass-needle route
 * leaving its centre toward the upper right and an arrowhead past the rim.
 *
 * The geometry lives in one `<g>` so tests or future variants can target it;
 * colors come from design tokens unless a fixed `tone` is requested.
 *
 * See `docs/brand.md` for the design rationale and usage rules.
 */
export function Logo({ size = 32, tone = 'auto', title = 'AtlasAI', className, ...rest }: LogoProps) {
  const globe = tone === 'mono' ? 'currentColor' : tone === 'auto' ? 'var(--atlas-text)' : TONE_COLORS[tone].globe;
  const needle =
    tone === 'mono' ? 'currentColor' : tone === 'auto' ? 'var(--atlas-accent-strong)' : TONE_COLORS[tone].needle;

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      className={cn('shrink-0', className)}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Globe: tilted axis. */}
        <g transform="rotate(-14 30 34)" stroke={globe} strokeWidth={3.5}>
          <circle cx={30} cy={34} r={18} />
          <ellipse cx={30} cy={34} rx={8} ry={18} strokeWidth={2.5} />
          <path d="M13 28h34M13 40h34" strokeWidth={2.5} />
        </g>

        {/* Navigation needle: bearing from the centre, arrowhead past the rim. */}
        <g stroke={needle} strokeWidth={3.5}>
          <path d="M30 34 51 13" />
          <path d="M43 13h8v8" />
          <circle cx={30} cy={34} r={2.75} fill={needle} strokeWidth={1.5} />
        </g>
      </g>
    </svg>
  );
}

export interface LogoLockupProps extends Omit<LogoProps, 'title'> {
  /** Show the tagline under the wordmark (larger sizes only). */
  withTagline?: boolean;
  /** Accessible name for the whole lockup; '' drops the img role. */
  title?: string;
  className?: string;
}

/**
 * Horizontal lockup: mark + wordmark (+ optional tagline). The mark is
 * aria-hidden here because the lockup carries a single accessible name.
 */
export function LogoLockup({ size = 28, withTagline = false, title, tone = 'auto', className }: LogoLockupProps) {
  const labelled = title !== '';
  const name = title ?? 'AtlasAI';

  return (
    <span
      role={labelled ? 'img' : undefined}
      aria-label={labelled ? name : undefined}
      className={cn('inline-flex items-center gap-2.5', withTagline && 'flex-col items-start gap-1', className)}
    >
      <span className="inline-flex items-center gap-2.5">
        <Logo size={size} tone={tone} title="" />
        <span
          className="font-display font-semibold tracking-tight text-[var(--atlas-text)]"
          style={{ fontSize: size * 0.62 }}
        >
          Atlas<span className="text-[var(--atlas-accent-strong)]">AI</span>
        </span>
      </span>
      {withTagline && (
        <span
          className="tracking-wide text-[var(--atlas-muted)]"
          // Scale with the lockup, but never below readable size.
          style={{ fontSize: `max(${size * 0.3}px, 0.75rem)` }}
        >
          Your World. Intelligently Explored.
        </span>
      )}
    </span>
  );
}
