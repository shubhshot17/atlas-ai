import { Link } from 'react-router-dom';
import { LogoLockup } from '@/components/brand';
import { appEnv } from '@/config/env';
import { paths } from '@/router/paths';

/** Product destinations. Every entry points at a real, existing route. */
const EXPLORE_LINKS = [
  { to: paths.home, label: 'Home' },
  { to: paths.explore, label: 'Explore destinations' },
  { to: paths.planTrip, label: 'Plan a trip' },
  { to: paths.dashboard, label: 'Dashboard' },
] as const;

/**
 * Account actions. Only routes that the app actually serves belong here —
 * no placeholder marketing or social links.
 */
const ACCOUNT_LINKS = [
  { to: paths.login, label: 'Log in' },
  { to: paths.register, label: 'Create an account' },
] as const;

const columnHeadingClass =
  'font-display text-xs font-semibold tracking-widest text-[var(--atlas-text)] uppercase';

const columnLinkClass =
  'rounded-panel text-sm text-[var(--atlas-muted)] transition-colors duration-150 ' +
  'hover:text-[var(--atlas-text)] ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-horizon-600';

/**
 * Site-wide footer, rendering at the bottom of every page.
 *
 * Layout is one column on mobile and brand + two link columns on wider
 * screens. It contains only links that resolve to real routes — no social
 * media or other outbound profiles, because the project has none yet.
 */
export function Footer() {
  return (
    <footer className="border-t border-[var(--atlas-border)] bg-[var(--atlas-bg)]">
      <div className="mx-auto w-full max-w-5xl px-gutter py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Link
              to={paths.home}
              className="inline-flex rounded-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-horizon-600"
              aria-label="AtlasAI home"
            >
              <LogoLockup size={26} title="" />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-[var(--atlas-muted)]">
              Your World. Intelligently Explored.
            </p>
            <p className="mt-2 max-w-xs text-sm text-[var(--atlas-muted)]">
              A travel planning companion for discovering destinations and building itineraries day
              by day.
            </p>
          </div>

          <nav aria-label="Footer explore">
            <h2 className={columnHeadingClass}>Explore</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={columnLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer account">
            <h2 className={columnHeadingClass}>Account</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {ACCOUNT_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={columnLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-[var(--atlas-border)] pt-6 text-sm text-[var(--atlas-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {appEnv.name}. All rights reserved.
          </p>
          <p>Built with care for travelers.</p>
        </div>
      </div>
    </footer>
  );
}
