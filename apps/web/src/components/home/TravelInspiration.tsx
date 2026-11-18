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
 * - `lg`: four columns — Adventure fills a 2×2 block on the left, the three
 *   remaining tiles stack down the right column pair (1 + 1 + 2 rows), so the
 *   grid is exactly filled with no orphaned tile or gap.
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

      {/**
       * 5 tiles in 4 columns. Adventure takes a 2×2 block; the other four take
       * one column each and pack into the bounding box beside and below it:
       *
       *   lg layout (rows × cols)
       *   ┌───────────┬─────┬─────┐
       *   │ Adventure │  B  │  M  │
       *   │  (2 × 2)  ├─────┴─────┤
       *   │           │  Culture  │
       *   ├───────────┴───────────┤
       *   │   Weekend getaways    │
       *   └───────────────────────┘
       *
       * Auto-placement order: Adventure (2 cols × 2 rows) fills cols 1–2 of
       * rows 1–2; Beaches and Mountains fill row 1 cols 3–4; Culture (2 cols)
       * fills row 2 cols 3–4; Weekend Getaways spans all 4 columns in row 3.
       * Every row is exactly 4 columns wide. Weekend must be `lg:col-span-4`
       * (not 2): at 2 it lands in cols 1–2 of row 3 and leaves cols 3–4 empty.
       */}
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
                    ? 'sm:col-span-1 lg:col-span-1'
                    : index === 3
                      ? 'sm:col-span-2 lg:col-span-2'
                      : 'sm:col-span-2 lg:col-span-4'
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
