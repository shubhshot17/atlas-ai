import type { SVGProps } from 'react';

/**
 * AtlasAI icon set: one consistent family drawn on a 24×24 grid with 1.75px
 * strokes, round caps and joins, and no fills. Geometric rather than pictorial,
 * so they sit well next to the wireframe logo mark.
 *
 * Icons are decorative by default (`aria-hidden`); the surrounding text is the
 * accessible label. Pass a `title` when an icon is the only content.
 */
export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'title'> {
  /** Rendered square size in px. */
  size?: number;
  /** Accessible name; omit for decorative icons. */
  title?: string;
}

function Icon({ size = 24, title, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/** AI itinerary: a document with a day-by-day list and a spark. */
export function ItineraryIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x={3.5} y={3.5} width={14} height={17} rx={2.5} />
      <path d="M7 8h7M7 12h7M7 16h4" />
      <path d="M19.5 5.5v4M17.5 7.5h4" />
    </Icon>
  );
}

/** Smart budget planning: a spend line drawn inside a rule-based grid. */
export function BudgetIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x={3} y={4} width={18} height={16} rx={2.5} />
      <path d="M3 9.5h18" />
      <path d="M7 16.5l3-2.5 2.5 1.75L17 11" />
      <circle cx={17} cy={11} r={1} />
    </Icon>
  );
}

/** Destination discovery: a compass needle inside a circle. */
export function DiscoveryIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx={12} cy={12} r={8.5} />
      <path d="M15 9l-1.75 4.25L9 15l1.75-4.25z" />
    </Icon>
  );
}

/** Route optimization: a winding path between two waypoints. */
export function RouteIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx={5.5} cy={18.5} r={2} />
      <circle cx={18.5} cy={5.5} r={2} />
      <path d="M7.5 18.5h6a3 3 0 0 0 0-6h-3a3 3 0 0 1 0-6h6" />
    </Icon>
  );
}

/** Personalized recommendations: a three-row sliders control. */
export function RecommendationsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7h9M17 7h3M4 12h3M11 12h9M4 17h9M17 17h3" />
      <circle cx={15} cy={7} r={2} />
      <circle cx={9} cy={12} r={2} />
      <circle cx={15} cy={17} r={2} />
    </Icon>
  );
}
