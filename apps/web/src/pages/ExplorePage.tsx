import { useSearchParams } from 'react-router-dom';
import { EmptyState, Input } from '@/components/ui';
import { PageShell } from '@/components/layout/PageShell';

/**
 * Placeholder destination catalogue. Search is wired to the `q` query param so
 * the URL shape stays stable once real results are fetched.
 */
export function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const updateQuery = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set('q', value);
    } else {
      next.delete('q');
    }
    setSearchParams(next, { replace: true });
  };

  return (
    <PageShell
      eyebrow="Discover"
      title="Explore destinations"
      description="Search the destination catalogue by city, region, or country."
    >
      <div className="max-w-md">
        <Input
          label="Search destinations"
          type="search"
          placeholder="Where to next?"
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
        />
      </div>

      <div className="mt-8">
        <EmptyState
          icon="🗺️"
          title={query ? `No results for “${query}”` : 'Destination catalogue coming soon'}
          description="The destination catalogue and its search endpoint are not available yet."
        />
      </div>
    </PageShell>
  );
}
