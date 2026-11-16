import { useEffect } from 'react';
import { Link, NavLink, Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { LogoLockup } from '@/components/brand';
import { appEnv } from '@/config/env';
import { paths } from '@/router/paths';

const NAV_LINKS = [
  { to: paths.home, label: 'Home', end: true },
  { to: paths.explore, label: 'Explore' },
  { to: paths.planTrip, label: 'Plan a trip' },
  { to: paths.dashboard, label: 'Dashboard' },
] as const;

const linkBase =
  'rounded-panel px-3 py-1.5 text-sm font-medium transition-colors duration-150 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-horizon-600';

function navLinkClass({ isActive }: { isActive: boolean }) {
  return cn(
    linkBase,
    isActive
      ? 'bg-[var(--atlas-surface)] text-[var(--atlas-text)]'
      : 'text-[var(--atlas-muted)] hover:text-[var(--atlas-text)]',
  );
}

/**
 * Shared chrome for every page: skip link, header with primary navigation,
 * the routed page in `main`, and a footer.
 *
 * This root layout is also the root of the route tree, so it survives
 * navigation and holds state and data fetching for the authenticated shell
 * once authentication exists.
 */
export function RootLayout() {
  const { pathname } = useLocation();

  // Scroll to the top on navigation (the browser only does this for full loads).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--atlas-bg)] text-[var(--atlas-text)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-panel focus:bg-[var(--atlas-surface)] focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <header className="border-b border-[var(--atlas-border)] bg-[var(--atlas-bg)]">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-gutter py-3">
          <Link
            to={paths.home}
            className="rounded-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-horizon-600"
            aria-label="AtlasAI home"
          >
            <LogoLockup size={26} title="" />
          </Link>

          <nav aria-label="Primary" className="flex flex-wrap items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} end={'end' in link ? link.end : undefined} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <NavLink to={paths.login} className={navLinkClass}>
              Log in
            </NavLink>
            <NavLink
              to={paths.register}
              className={({ isActive }) =>
                cn(
                  linkBase,
                  isActive
                    ? 'bg-atlas-horizon-600 text-white'
                    : 'bg-atlas-horizon-600 text-white hover:bg-atlas-horizon-500',
                )
              }
            >
              Sign up
            </NavLink>
          </div>
        </div>
      </header>

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-[var(--atlas-border)]">
        <div className="mx-auto w-full max-w-5xl px-gutter py-6 text-sm text-[var(--atlas-muted)]">
          <LogoLockup size={22} withTagline title="" />
          <p className="mt-3">
            &copy; {new Date().getFullYear()} {appEnv.name}.
          </p>
        </div>
      </footer>

      <ScrollRestoration />
    </div>
  );
}
