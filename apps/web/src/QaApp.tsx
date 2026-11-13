/**
 * Temporary QA harness for the UI primitives. Rendered only through the QA
 * entry (`qa.html` + `main-qa.tsx`, run via `npm run dev:qa`), so the real app
 * and production builds are unaffected.
 */
import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  EmptyState,
  Input,
  LoadingSpinner,
  SectionHeading,
} from '@/components/ui';
import { appEnv } from '@/config/env';

export function App() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();

  const submit = () => {
    if (!email.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }
    setError(undefined);
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1500);
  };

  return (
    <Container className="py-section">
      <SectionHeading
        as="h1"
        eyebrow={appEnv.name}
        title="AtlasAI UI components"
        description="Temporary QA harness for the shared primitives. Not shipped in production builds."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap items-center gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button size="sm" loading={loading}>
                Save
              </Button>
              <Button size="lg" disabled>
                Disabled
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap items-center gap-3">
              <Badge>Planned</Badge>
              <Badge variant="accent" withDot>
                In progress
              </Badge>
              <Badge variant="warning">Draft</Badge>
              <Badge variant="danger">Cancelled</Badge>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              error={error}
              hint="Used for trip invitations."
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input label="Search" hideLabel placeholder="Where to next?" />
            <Button onClick={submit} loading={loading}>
              Submit
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Loading</CardTitle>
          </CardHeader>
          <CardBody className="flex items-center gap-4">
            <LoadingSpinner />
            <LoadingSpinner size={16} label="Loading trips" />
            <LoadingSpinner size={32} />
          </CardBody>
        </Card>
      </div>

      <div className="mt-6">
        <SectionHeading title="Empty state" />
        <EmptyState
          icon="🗺️"
          title="No trips yet"
          description="When you create a trip it will show up here with its itinerary and budget."
          action={<Button variant="secondary">Create your first trip</Button>}
        />
      </div>
    </Container>
  );
}

export default App;
