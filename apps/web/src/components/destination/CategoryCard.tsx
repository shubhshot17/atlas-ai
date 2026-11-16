import { useState } from 'react';
import { cn } from '@/lib/cn';

export interface CategoryCardData {
  id: string;
  label: string;
  description: string;
  destinationCount: number;
  image: {
    src: string;
    alt: string;
  };
}

export interface CategoryCardProps {
  category: CategoryCardData;
  /** Largest card in the grid: taller media and larger type. */
  featured?: boolean;
  /** Show the "Sample" marker. Defaults to false so real data can reuse the card. */
  sample?: boolean;
  className?: string;
}

/**
 * One travel-inspiration tile: photo, category label, count, and a short line.
 *
 * Presentation only. It is a plain article, not a link, because no category
 * detail route exists yet — a card that looks clickable but goes nowhere is
 * worse than one that reads as content. When filtering ships, wrap the label
 * in a `Link` and add hover affordance here, once.
 */
export function CategoryCard({ category, featured = false, sample = false, className }: CategoryCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col justify-end overflow-hidden rounded-panel',
        'border border-[var(--atlas-border)] bg-[var(--atlas-surface)]',
        featured ? 'min-h-64' : 'min-h-48',
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[var(--atlas-bg)]">
        {imageFailed ? (
          <div className="flex h-full w-full items-center justify-center text-xs text-[var(--atlas-muted)]">
            Image unavailable
          </div>
        ) : (
          <img
            src={category.image.src}
            alt={category.image.alt}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      {/*
        Legibility scrim: darkens the lower half so white text clears 4.5:1 even
        over pale skies and sand. The stop is low and strong rather than a
        gentle fade, because most of these photos are bright at the top.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to top, rgba(11,18,32,0.96) 0%, rgba(11,18,32,0.88) 38%, rgba(11,18,32,0.35) 72%, rgba(11,18,32,0) 100%)',
        }}
      />

      {sample && (
        <span className="absolute top-3 right-3 rounded-badge bg-black/45 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
          Sample
        </span>
      )}

      <div className="relative p-card">
        <span className="text-xs font-medium text-atlas-horizon-200">
          {category.destinationCount} destinations
        </span>
        <h3
          className={cn(
            'mt-0.5 font-display font-semibold text-white',
            featured ? 'text-2xl md:text-3xl' : 'text-xl',
          )}
        >
          {category.label}
        </h3>
        <p className={cn('mt-1 text-sm text-balance text-atlas-ocean-100', featured ? 'max-w-md' : 'line-clamp-2')}>
          {category.description}
        </p>
      </div>
    </article>
  );
}
