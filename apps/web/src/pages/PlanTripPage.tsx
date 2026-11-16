import { EmptyState } from '@/components/ui';
import { PageShell } from '@/components/layout/PageShell';

/** Placeholder trip builder. Replaced by the itinerary editor. */
export function PlanTripPage() {
  return (
    <PageShell
      eyebrow="Plan"
      title="Plan a trip"
      description="Pick a destination and dates, then build your itinerary day by day."
    >
      <EmptyState
        icon="🧭"
        title="Trip planner coming soon"
        description="The itinerary builder and budget tools are still under development."
      />
    </PageShell>
  );
}
