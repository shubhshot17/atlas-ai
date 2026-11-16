import { useEffect } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { Footer } from '@/components/layout/Footer';
import { NavBar } from '@/components/layout/NavBar';

/**
 * Shared chrome for every page: skip link, header with primary navigation,
 * the routed page in `main`, and the site footer.
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

      <NavBar />

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <ScrollRestoration />
    </div>
  );
}
