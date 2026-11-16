import type { RouteObject } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { DestinationDetailsPage } from '@/pages/DestinationDetailsPage';
import { ExplorePage } from '@/pages/ExplorePage';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { NotFoundPage, RouteErrorPage } from '@/pages/NotFoundPage';
import { PlanTripPage } from '@/pages/PlanTripPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { paths } from './paths';

/**
 * The application route table.
 *
 * Every page renders inside `RootLayout`, so the header, navigation, and footer
 * are shared and never remount between pages. Route paths come from
 * `./paths` rather than string literals.
 */
export const routes: RouteObject[] = [
  {
    path: paths.home,
    Component: RootLayout,
    // Catches render/navigation errors anywhere below; the `*` route below
    // handles plain 404s with the friendlier NotFoundPage.
    ErrorBoundary: RouteErrorPage,
    children: [
      { index: true, Component: HomePage },
      { path: paths.explore, Component: ExplorePage },
      { path: paths.destinationPattern, Component: DestinationDetailsPage },
      { path: paths.planTrip, Component: PlanTripPage },
      { path: paths.login, Component: LoginPage },
      { path: paths.register, Component: RegisterPage },
      { path: paths.dashboard, Component: DashboardPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
];
