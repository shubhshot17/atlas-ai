import { Link } from 'react-router-dom';
import { Button, Card, CardBody, EmptyState, Input } from '@/components/ui';
import { PageShell } from '@/components/layout/PageShell';
import { paths } from '@/router/paths';

/**
 * Placeholder registration form. Inert until authentication is wired up.
 */
export function RegisterPage() {
  return (
    <PageShell
      eyebrow="Account"
      title="Create an account"
      description="Sign up to save destinations, plan trips, and share them with your travel companions."
      className="max-w-xl"
    >
      <Card>
        <CardBody>
          <form className="flex flex-col gap-4">
            <Input label="Name" autoComplete="name" placeholder="Your name" />
            <Input label="Email" type="email" autoComplete="email" placeholder="you@example.com" />
            <Input
              label="Password"
              type="password"
              autoComplete="new-password"
              hint="At least 8 characters."
            />
            <Button type="button" fullWidth disabled>
              Create account
            </Button>
          </form>

          <p className="mt-4 text-xs">
            Already have an account?{' '}
            <Link to={paths.login} className="font-medium text-[var(--atlas-accent)] underline">
              Log in
            </Link>
            .
          </p>
        </CardBody>
      </Card>

      <div className="mt-6">
        <EmptyState
          title="Registration coming soon"
          description="Accounts are still being built."
        />
      </div>
    </PageShell>
  );
}
