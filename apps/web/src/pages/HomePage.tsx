import { Card, CardBody, CardTitle } from '@/components/ui';
import { Hero } from '@/components/home/Hero';
import { PageShell } from '@/components/layout/PageShell';

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
  return (
    <>
      <Hero />

      {/* The hero owns the page's single `h1`, so this section starts at h2. */}
      <PageShell
        as="h2"
        eyebrow="How it works"
        title="What you can do"
        description="Three steps, from an idea to a trip you can book."
      >
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
      </PageShell>
    </>
  );
}
