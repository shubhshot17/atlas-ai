import { appEnv } from './config/env';
import './App.css';

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

/**
 * Temporary AtlasAI welcome page.
 *
 * Intentionally simple: static content and no routing, data fetching, or
 * interactive UI. It will be replaced by the real trip dashboards as those
 * features are built.
 */
function App() {
  const buildLabel = appEnv.isDevelopment
    ? 'Local development'
    : `${appEnv.mode} build`;

  return (
    <main className="app">
      <header className="app__header">
        <p className="app__eyebrow">{appEnv.name}</p>
        <h1 className="app__title">Your World. Intelligently Explored.</h1>
        <p className="app__lead">
          {appEnv.name} is a travel planning companion that helps you discover destinations,
          build itineraries day by day, and keep your trip budget in view.
        </p>
        <p className="app__badge">
          <span className="app__badge-dot" aria-hidden="true" />
          Coming soon · {buildLabel}
        </p>
      </header>

      <section className="app__panel" aria-labelledby="highlights-heading">
        <h2 id="highlights-heading" className="app__panel-title">
          What you will be able to do
        </h2>
        <ul className="app__highlights">
          {HIGHLIGHTS.map((highlight) => (
            <li key={highlight.title} className="app__highlight">
              <h3 className="app__highlight-title">{highlight.title}</h3>
              <p className="app__highlight-text">{highlight.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <footer className="app__footer">
        <p>
          This page is a temporary placeholder. Trip planning features will arrive in future
          releases.
        </p>
      </footer>
    </main>
  );
}

export default App;
