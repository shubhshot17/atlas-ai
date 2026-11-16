import { Hero } from '@/components/home/Hero';
import { FeatureGrid } from '@/components/home/FeatureGrid';
import { PageShell } from '@/components/layout/PageShell';

export function HomePage() {
  return (
    <>
      <Hero />

      {/* The hero owns the page's single `h1`, so this section starts at h2. */}
      <PageShell
        as="h2"
        id="features-heading"
        eyebrow="What's planned"
        title="Built for how trips actually come together"
        description="AtlasAI is in development. These are the capabilities it is being built around — none are available in the app yet."
      >
        <FeatureGrid labelledBy="features-heading" />
      </PageShell>
    </>
  );
}
