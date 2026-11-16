/**
 * Application router.
 *
 * Import `router` in the entry point and `paths` anywhere a link is built.
 */
import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';

export { paths } from './paths';
export { routes } from './routes';

export const router = createBrowserRouter(routes);
