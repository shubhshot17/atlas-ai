import { Link } from 'react-router-dom';
import { Button, EmptyState } from '@/components/ui';
import { PageShell } from '@/components/layout/PageShell';
import { paths } from '@/router/paths';

/**
 * Placeholder trip dashboard. Requires authentication once auth exists; for now
 * it renders the signed-out empty state.
 */
export function DashboardPage() {
  return (
    <PageShell
      eyebrow="Your trips"
      title="Dashboard"
      description="Your upcoming trips, itineraries, and budgets in one place."
    >
      <EmptyState
        icon="✈️"
        title="No trips yet"
        description="When you create a trip it will show up here with its itinerary and budget."
        action={
          <Link to={paths.planTrip}>
            <Button>Create your first trip</Button>
          </Link>
        }
      />
    </PageShell>
  );
}
