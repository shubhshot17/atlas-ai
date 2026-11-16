import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Button, EmptyState } from '@/components/ui';
import { PageShell } from '@/components/layout/PageShell';
import { appEnv } from '@/config/env';
import { paths } from '@/router/paths';

function useErrorDetails() {
  const error = useRouteError();
  return isRouteErrorResponse(error) ? error.status : undefined;
}

/** Shown for any URL that does not match a route. */
export function NotFoundPage() {
  const status = useErrorDetails();

  return (
    <PageShell
      eyebrow={status !== undefined ? `Error ${status}` : '404'}
      title="Page not found"
      description="The page you are looking for does not exist or has moved."
    >
      <EmptyState
        icon="🧭"
        title="This trail ends here"
        description="Check the address, or head back to somewhere on the map."
        action={
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link to={paths.home}>
              <Button>Back to home</Button>
            </Link>
            <Link to={paths.explore}>
              <Button variant="secondary">Explore destinations</Button>
            </Link>
          </div>
        }
      />
    </PageShell>
  );
}

/**
 * Last-resort error boundary for unexpected render errors in the route tree.
 * Route-level 404s are handled by `NotFoundPage`.
 */
export function RouteErrorPage() {
  const error = useRouteError();
  const isResponse = isRouteErrorResponse(error);

  return (
    <PageShell
      eyebrow="Something went wrong"
      title={isResponse ? `${error.status} ${error.statusText}` : 'Unexpected error'}
      description={
        isResponse
          ? error.data
          : 'An unexpected error stopped this page from loading. Reloading usually helps.'
      }
    >
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => window.location.reload()}>Reload the page</Button>
        <Link to={paths.home}>
          <Button variant="secondary">Back to home</Button>
        </Link>
      </div>

      {appEnv.isDevelopment && !isResponse && error instanceof Error && (
        <pre className="mt-6 overflow-x-auto rounded-panel border border-[var(--atlas-border)] bg-[var(--atlas-surface)] p-card text-xs">
          {error.stack ?? error.message}
        </pre>
      )}
    </PageShell>
  );
}
