import { Link } from 'react-router-dom';
import { DestinationCard } from '@/components/destination/DestinationCard';
import { Button, SectionHeading } from '@/components/ui';
import { sampleDestinations } from '@/data/sampleDestinations';
import { paths } from '@/router/paths';

export interface PopularDestinationsProps {
  /** Heading level, so the section fits the page outline. */
  as?: 'h2' | 'h3';
}

/**
 * Homepage "Popular destinations" strip.
 *
 * Renders clearly-labelled sample destinations until the catalogue API exists:
 * the subheading says so, and each card carries a "Sample" marker, so nothing
 * here can be mistaken for live or verified editorial content.
 */
export function PopularDestinations({ as = 'h2' }: PopularDestinationsProps) {
  return (
    <section aria-labelledby="popular-destinations-heading">
      <SectionHeading
        as={as}
        id="popular-destinations-heading"
        eyebrow="Inspiration"
        title="Popular destinations"
        description="Sample places, shown to preview the discovery experience. The destination catalogue and its search are still being built."
        action={
          <Link to={paths.explore}>
            <Button variant="secondary" size="sm">
              Explore all
            </Button>
          </Link>
        }
      />

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sampleDestinations.map((destination) => (
          <li key={destination.id}>
            <DestinationCard destination={destination} sample={destination.isSample} />
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-[var(--atlas-muted)]">
        Sample data for interface preview only — not a curated or verified list of
        recommendations.
      </p>
    </section>
  );
}
