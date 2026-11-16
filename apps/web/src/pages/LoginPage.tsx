import { Link } from 'react-router-dom';
import { Button, Card, CardBody, EmptyState, Input } from '@/components/ui';
import { PageShell } from '@/components/layout/PageShell';
import { paths } from '@/router/paths';

/**
 * Placeholder sign-in form. The fields are inert until authentication is
 * wired up, so the form is rendered non-submitting on purpose.
 */
export function LoginPage() {
  return (
    <PageShell
      eyebrow="Account"
      title="Log in"
      description="Welcome back. Sign in to reach your trips and itineraries."
      className="max-w-xl"
    >
      <Card>
        <CardBody>
          <form className="flex flex-col gap-4">
            <Input label="Email" type="email" autoComplete="email" placeholder="you@example.com" />
            <Input label="Password" type="password" autoComplete="current-password" />
            <Button type="button" fullWidth disabled>
              Log in
            </Button>
          </form>

          <p className="mt-4 text-xs">
            Authentication is not available yet. See{' '}
            <Link to={paths.register} className="font-medium text-[var(--atlas-accent)] underline">
              create an account
            </Link>
            .
          </p>
        </CardBody>
      </Card>

      <div className="mt-6">
        <EmptyState
          title="Sign-in coming soon"
          description="Accounts are still being built. Until then the app runs in single-user mode."
        />
      </div>
    </PageShell>
  );
}
