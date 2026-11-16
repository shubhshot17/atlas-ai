import { Link, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardTitle, EmptyState } from '@/components/ui';
import { PageShell } from '@/components/layout/PageShell';
import { DESTINATION_PARAM, paths } from '@/router/paths';

/**
 * Placeholder destination detail page. Reads the `:destinationId` route param
 * so the URL contract is fixed before the catalogue API is available.
 */
export function DestinationDetailsPage() {
  // `DESTINATION_PARAM` is a literal type, so the param comes back typed.
  const params = useParams();
  const destinationId = params[DESTINATION_PARAM];

  return (
    <PageShell
      eyebrow="Destination"
      title={destinationId ? `Destination ${destinationId}` : 'Destination'}
      description="Overview, points of interest, and budget guidance for this destination."
      action={
        <Link to={paths.explore}>
          <Button variant="secondary" size="sm">
            Back to explore
          </Button>
        </Link>
      }
    >
      {destinationId ? (
        <div className="grid gap-4 md:grid-cols-3">
          {['Overview', 'Points of interest', 'Best time to visit'].map((section) => (
            <Card key={section}>
              <CardTitle>{section}</CardTitle>
              <CardBody className="mt-1.5">Not available yet.</CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Destination not specified"
          description="Open a destination from the Explore page to see its details."
          action={
            <Link to={paths.explore}>
              <Button>Explore destinations</Button>
            </Link>
          }
        />
      )}
    </PageShell>
  );
}
