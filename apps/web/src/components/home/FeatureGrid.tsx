import { cn } from '@/lib/cn';
import {
  BudgetIcon,
  DiscoveryIcon,
  ItineraryIcon,
  RecommendationsIcon,
  RouteIcon,
} from '@/components/ui/icons';
import { FeatureCard, type FeatureCardProps } from './FeatureCard';

type Feature = Pick<FeatureCardProps, 'title' | 'description' | 'status'> & {
  icon: FeatureCardProps['icon'];
};

/**
 * Capabilities the product is designed around.
 *
 * IMPORTANT: none of these are backed by the API yet. Each card is labelled
 * "Coming soon" and worded as something the planner *will* do, never as a
 * shipped feature. When a backend lands, flip that card's `status` and rewrite
 * its copy in the same change.
 */
const FEATURES: Feature[] = [
  {
    icon: <ItineraryIcon size={20} />,
    title: 'AI itineraries',
    description:
      'Turn a destination and a date range into a day-by-day plan, with each stop placed in a sensible order.',
    status: 'Coming soon',
  },
  {
    icon: <BudgetIcon size={20} />,
    title: 'Smart budget planning',
    description:
      'Track planned spend as you build the trip, so you can see what a plan costs before you commit to it.',
    status: 'Coming soon',
  },
  {
    icon: <DiscoveryIcon size={20} />,
    title: 'Destination discovery',
    description:
      'Search a destination catalogue by city, region, or country and keep the places worth a closer look.',
    status: 'Coming soon',
  },
  {
    icon: <RouteIcon size={20} />,
    title: 'Route optimization',
    description:
      'Order the stops of a day to cut backtracking, so a full itinerary fits into the time you actually have.',
    status: 'Coming soon',
  },
  {
    icon: <RecommendationsIcon size={20} />,
    title: 'Personalized recommendations',
    description:
      'Suggestions shaped by your travel preferences, not a generic list of the usual landmarks.',
    status: 'Coming soon',
  },
];

export interface FeatureGridProps {
  /** Heading id for the section this grid labels. */
  labelledBy?: string;
  className?: string;
}

/**
 * Responsive grid of `FeatureCard`s: one column on phones, two on tablets,
 * three from `lg` upward. The last card spans the remaining space on a
 * two-column layout so the row never ends in a lone half-width tile.
 */
export function FeatureGrid({ labelledBy, className }: FeatureGridProps) {
  return (
    <ul
      aria-labelledby={labelledBy}
      className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}
    >
      {FEATURES.map((feature, index) => (
        <li
          key={feature.title}
          // With 5 items in a 2-column layout the last sits alone; let it span both.
          className={cn(index === FEATURES.length - 1 && 'sm:col-span-2 lg:col-span-1')}
        >
          <FeatureCard {...feature} />
        </li>
      ))}
    </ul>
  );
}
