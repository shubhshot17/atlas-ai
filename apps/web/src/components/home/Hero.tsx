import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container } from '@/components/ui';
import { appEnv } from '@/config/env';
import { paths } from '@/router/paths';

const inputClass =
  'h-12 w-full rounded-panel border border-[var(--atlas-border)] bg-[var(--atlas-bg)] px-4 text-base ' +
  'text-[var(--atlas-text)] placeholder:text-[var(--atlas-muted)] ' +
  'hover:border-atlas-ocean-400 focus:outline-2 focus:outline-offset-0 focus:outline-atlas-horizon-500';

/**
 * Homepage hero: headline, one-paragraph value explanation, a destination
 * search that hands off to the Explore page, and the primary "Plan my trip"
 * call to action.
 *
 * Kept deliberately sparse — no background imagery or decorative layers — so
 * the search field and CTA carry the page.
 */
export function Hero() {
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();

  // The catalogue lives on Explore and already reads `?q=`, so the hero search
  // hands its term over as a real navigation target rather than a no-op.
  const search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = destination.trim();
    navigate(query ? `${paths.explore}?q=${encodeURIComponent(query)}` : paths.explore);
  };

  return (
    <section aria-labelledby="hero-heading" className="border-b border-[var(--atlas-border)]">
      <Container className="pt-16 pb-14 md:pt-24 md:pb-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-widest text-[var(--atlas-accent)] uppercase">
            {appEnv.name}
          </p>

          {/*
            `leading-[1.15]` (1.1 from `md`) plus `pb-[0.12em]`: the fallback
            display face paints taller than its line box, so at 1.1 the 60px
            headline's content box was 132px while the ink needed ~139px and the
            "g" / "y" descenders sat on the boundary. The padding gives that ink
            room; `text-balance` splits the 6ch longest word ("Intelligently")
            onto its own line, so no line can overflow the gutter at 320px.
          */}
          <h1
            id="hero-heading"
            className="mt-3 pb-[0.12em] font-display text-4xl leading-[1.15] font-semibold tracking-tight text-balance md:text-5xl md:leading-[1.1] lg:text-6xl"
          >
            Your World. Intelligently Explored.
          </h1>

          <p className="mt-5 max-w-xl text-base text-pretty text-[var(--atlas-muted)] md:text-lg">
            {appEnv.name} is being built to turn a destination and a few dates into a practical
            itinerary — places worth seeing, a day-by-day plan, and a budget you can actually
            keep.
          </p>
        </div>

        <form onSubmit={search} role="search" className="mt-8 max-w-xl">
          <label htmlFor="hero-destination" className="sr-only">
            Search destinations
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              id="hero-destination"
              type="search"
              autoComplete="off"
              placeholder="Where do you want to go?"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              className={inputClass}
            />
            <Button type="submit" size="lg" className="h-12 shrink-0">
              Search
            </Button>
          </div>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
          <Link to={paths.planTrip} className="inline-flex rounded-panel">
            <Button size="lg">Plan my trip</Button>
          </Link>
          <Link
            to={paths.explore}
            className="rounded-panel text-sm font-medium text-[var(--atlas-muted)] underline-offset-4 hover:text-[var(--atlas-text)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atlas-horizon-600"
          >
            Browse destinations
          </Link>
        </div>
      </Container>
    </section>
  );
}
