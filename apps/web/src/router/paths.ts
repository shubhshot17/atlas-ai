/**
 * Single source of truth for client-side route paths.
 *
 * Always build links and `navigate()` targets from these helpers instead of
 * hand-writing URL strings, so a path change only touches this file.
 */

/** Route parameter name for the destination detail page (`/destinations/:destinationId`). */
export const DESTINATION_PARAM = 'destinationId';

export const paths = {
  home: '/',
  explore: '/explore',
  /** React Router pattern used in the route table. */
  destinationPattern: `/destinations/:${DESTINATION_PARAM}`,
  /** Concrete link to a destination, e.g. `paths.destination('dst_456')`. */
  destination: (destinationId: string | number) => `/destinations/${destinationId}`,
  planTrip: '/plan',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
} as const;
