import { Link } from 'react-router-dom';
import { Badge, Button, Card, CardBody, CardTitle } from '@/components/ui';
import { PageShell } from '@/components/layout/PageShell';
import { appEnv } from '@/config/env';
import { paths } from '@/router/paths';

const HIGHLIGHTS = [
  {
    title: 'Discover',
    description: 'Explore destinations and points of interest around the world.',
  },
  {
    title: 'Plan',
    description: 'Build day-by-day itineraries with a budget you can keep track of.',
  },
  {
    title: 'Explore together',
    description: 'Share a trip with the people you are travelling with.',
  },
];

export function HomePage() {
  const buildLabel = appEnv.isDevelopment ? 'Local development' : `${appEnv.mode} build`;

  return (
    <PageShell
      eyebrow={appEnv.name}
      title="Your World. Intelligently Explored."
      description={
        <>
          {appEnv.name} is a travel planning companion that helps you discover destinations, build
          itineraries day by day, and keep your trip budget in view.
        </>
      }
      action={
        <>
          <Link to={paths.explore}>
            <Button>Start exploring</Button>
          </Link>
          <Link to={paths.planTrip}>
            <Button variant="secondary">Plan a trip</Button>
          </Link>
        </>
      }
    >
      <div className="mb-8">
        <Badge variant="accent" withDot>
          Coming soon · {buildLabel}
        </Badge>
      </div>

      <section aria-labelledby="highlights-heading">
        <h2 id="highlights-heading" className="mb-4 font-display text-xl font-semibold">
          What you will be able to do
        </h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {HIGHLIGHTS.map((highlight) => (
            <li key={highlight.title}>
              <Card className="h-full">
                <CardTitle>{highlight.title}</CardTitle>
                <CardBody className="mt-1.5">{highlight.description}</CardBody>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
