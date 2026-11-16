import { CategoryCard } from '@/components/destination/CategoryCard';
import { Badge, SectionHeading } from '@/components/ui';
import { sampleCategories } from '@/data/sampleCategories';

export interface TravelInspirationProps {
  as?: 'h2' | 'h3';
  className?: string;
}

/**
 * Homepage travel-inspiration strip: five browsing categories in a bento grid.
 *
 * Layout (a bento grid):
 * - phone: one column, all tiles stacked;
 * - `sm`: two columns, Adventure spanning both;
 * - `lg`: four columns — Adventure fills a 2×2 block with Beaches and
 *   Mountains stacked beside it, then a row of two 2-wide tiles below.
 *
 * The equal card heights come from the grid rows, not from `h-full` on
 * wrappers: each `li` is a grid item and stretches by default. Cards are
 * content only — there is no category route yet, so nothing here pretends to
 * be clickable.
 */
export function TravelInspiration({ as = 'h2', className }: TravelInspirationProps) {
  return (
    <section aria-labelledby="inspiration-heading" className={className}>
      <SectionHeading
        as={as}
        id="inspiration-heading"
        eyebrow="Travel inspiration"
        title="Find a trip by the kind of place it is"
        description="Adventure, coastlines, mountains, old cities, or something short and close by."
        action={
          <Badge variant="neutral" withDot>
            Sample categories
          </Badge>
        }
      />

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {sampleCategories.map((category, index) => {
          // First tile is the hero of the grid: full width on small screens,
          // half width on large ones.
          const featured = index === 0;
          return (
            <li
              key={category.id}
              className={
                featured
                  ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2'
                  : index === 1 || index === 2
                    ? 'lg:col-span-1'
                    : 'lg:col-span-2'
              }
            >
              <CategoryCard category={category} featured={featured} sample={category.isSample} />
            </li>
          );
        })}
      </ul>

      <p className="mt-3 text-xs text-[var(--atlas-muted)]">
        Sample categories and counts, shown to preview the browsing experience. Browsing by
        category is not available yet.
      </p>
    </section>
  );
}
