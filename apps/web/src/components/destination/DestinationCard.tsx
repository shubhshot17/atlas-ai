import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { paths } from '@/router/paths';

export interface DestinationCardData {
  id: string;
  name: string;
  country: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface DestinationCardProps {
  destination: DestinationCardData;
  /** Override the link target; defaults to the destination detail route. */
  to?: string;
  /** Show the "Sample" marker. Defaults to false so real data can reuse the card. */
  sample?: boolean;
  className?: string;
}

/**
 * Destination summary card: image, name, country, and short description.
 *
 * The whole card is a single link (one tab stop), with the title as the
 * accessible name. Presentation only — it imports no data, so sample and live
 * catalogues render through the same component.
 *
 * If the image fails to load, a neutral placeholder is shown instead of a
 * broken-image icon, so a dead URL never leaves a ragged card.
 */
export function DestinationCard({ destination, to, sample = false, className }: DestinationCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const href = to ?? paths.destination(destination.id);

  return (
    <Link
      to={href}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-panel border border-[var(--atlas-border)]',
        'bg-[var(--atlas-surface)] transition-colors duration-150 hover:border-atlas-ocean-400',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-horizon-600',
        className,
      )}
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-[var(--atlas-bg)]">
        {imageFailed ? (
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center text-xs text-[var(--atlas-muted)]"
          >
            Image unavailable
          </div>
        ) : (
          <img
            src={destination.image.src}
            alt={destination.image.alt}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        )}

        {sample && (
          <span className="absolute top-2 right-2 rounded-badge bg-atlas-ocean-900/80 px-2 py-0.5 text-xs font-medium text-atlas-ocean-50">
            Sample
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-card">
        <h3 className="font-display text-base font-semibold text-[var(--atlas-text)]">
          {destination.name}
        </h3>
        <p className="mt-0.5 text-xs font-medium tracking-wide text-[var(--atlas-muted)] uppercase">
          {destination.country}
        </p>
        <p className="mt-2 flex-1 text-sm text-[var(--atlas-muted)]">{destination.description}</p>
      </div>
    </Link>
  );
}
