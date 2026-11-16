import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';

/**
 * Application root.
 *
 * All page structure lives in the route table (`src/router/routes.tsx`); this
 * component only mounts the data router created in `src/router/index.ts`.
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;
