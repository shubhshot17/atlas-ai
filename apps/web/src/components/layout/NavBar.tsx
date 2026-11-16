import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { LogoLockup } from '@/components/brand';
import { paths } from '@/router/paths';

export const NAV_LINKS = [
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

const MENU_LINKS = [
  ...NAV_LINKS,
  { to: paths.login, label: 'Log in', end: false },
] as const;

/**
 * Responsive site header: brand lockup, primary navigation, log in, and a
 * hamburger-disclosed mobile menu below `sm`.
 *
 * Keyboard behaviour:
 * - the menu button toggles with Enter/Space natively and toggles `aria-expanded`;
 * - Escape closes the menu and returns focus to the button;
 * - Tab/Shift+Tab cycle inside the open panel, so focus cannot land behind it;
 * - on close (toggle, link click, or Escape) focus returns to the toggle button;
 * - navigating from inside the menu (link click) closes it, and the route
 *   change also closes it for links activated by other means.
 */
export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on navigation (covers programmatic navigation and link clicks that
  // do not go through this component's handlers).
  const closeMenu = (restoreFocus = false) => {
    setMenuOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  };

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu(true);
        return;
      }
      if (event.key === 'Tab') {
        // Confine focus to the panel while the menu is open.
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--atlas-border)] bg-[var(--atlas-bg)]">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-x-6 gap-y-2 px-gutter py-3">
        <Link
          to={paths.home}
          className="rounded-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-horizon-600"
          aria-label="AtlasAI home"
        >
          <LogoLockup size={26} title="" />
        </Link>

        {/* Desktop: primary links inline from `sm` up. */}
        <nav aria-label="Primary" className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={'end' in link ? link.end : undefined}
              className={navLinkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop: account actions on the right. */}
        <div className="ml-auto hidden items-center gap-1 sm:flex">
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

        {/* Mobile: hamburger below `sm`. */}
        <button
          ref={toggleRef}
          type="button"
          className={cn(
            'ml-auto inline-flex h-10 w-10 items-center justify-center rounded-panel',
            'text-[var(--atlas-text)] transition-colors duration-150 sm:hidden',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-horizon-600',
            menuOpen && 'bg-[var(--atlas-surface)]',
          )}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => (menuOpen ? closeMenu(true) : setMenuOpen(true))}
        >
          <svg
            viewBox="0 0 24 24"
            width={20}
            height={20}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            aria-hidden="true"
          >
            {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div
          ref={panelRef}
          id="mobile-menu"
          className="border-t border-[var(--atlas-border)] bg-[var(--atlas-bg)] sm:hidden"
        >
          <nav aria-label="Mobile" className="mx-auto flex w-full max-w-5xl flex-col gap-1 px-gutter py-3">
            {MENU_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={'end' in link ? link.end : undefined}
                className={({ isActive }) =>
                  cn(
                    'rounded-panel px-3 py-2 text-sm font-medium transition-colors duration-150',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-horizon-600',
                    isActive
                      ? 'bg-[var(--atlas-surface)] text-[var(--atlas-text)]'
                      : 'text-[var(--atlas-muted)] hover:text-[var(--atlas-text)]',
                  )
                }
                onClick={() => closeMenu()}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to={paths.register}
              className={({ isActive }) =>
                cn(
                  'mt-2 rounded-panel bg-atlas-horizon-600 px-3 py-2 text-center text-sm font-medium text-white',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-horizon-600',
                  isActive ? 'opacity-90' : 'hover:bg-atlas-horizon-500',
                )
              }
              onClick={() => closeMenu()}
            >
              Sign up
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
