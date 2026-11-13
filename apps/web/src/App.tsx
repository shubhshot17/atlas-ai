import { appEnv } from './config/env';
import './App.css';

function App() {
  return (
    <main className="app">
      <header className="app__header">
        <p className="app__eyebrow">{appEnv.name}</p>
        <h1 className="app__title">Your World. Intelligently Explored.</h1>
        <p className="app__lead">
          The AtlasAI web app is now set up with React, Vite, and TypeScript. Trip dashboards,
          destination discovery, and AI-assisted planning will be built here.
        </p>
      </header>

      <section className="app__panel" aria-labelledby="status-heading">
        <h2 id="status-heading" className="app__panel-title">
          Project setup
        </h2>
        <dl className="app__facts">
          <div className="app__fact">
            <dt>Environment</dt>
            <dd>{appEnv.mode}</dd>
          </div>
          <div className="app__fact">
            <dt>API base URL</dt>
            <dd>{appEnv.apiBaseUrl || '/api (proxied to the backend in development)'}</dd>
          </div>
          <div className="app__fact">
            <dt>Trip recommendations</dt>
            <dd>{appEnv.featureFlags.tripRecommendations ? 'Enabled' : 'Disabled'}</dd>
          </div>
        </dl>
        <p className="app__note">
          This client talks to the Node.js API only. It never connects to MongoDB directly.
        </p>
      </section>
    </main>
  );
}

export default App;
