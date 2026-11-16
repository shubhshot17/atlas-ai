/**
 * SAMPLE DATA — not a real catalogue.
 *
 * These destinations exist only to exercise the `DestinationCard` UI while the
 * destination API is being built. They are hand-written, not fetched, and are
 * not authored or verified by an editorial team. `isSample: true` marks every
 * record, and the homepage section that renders them says so in the UI.
 *
 * IMAGES: each `image.alt` describes the photo as reviewed in this file's
 * gallery check — do not rewrite alt text from the destination name without
 * looking at the image again. Every photo below was visually confirmed to show
 * the city it is filed under. Swap all of this for optimized, self-hosted
 * images before launch; if an image URL dies, the card shows a neutral
 * placeholder rather than a broken-image icon.
 *
 * When the real catalogue lands, delete this file and feed the cards from the
 * API instead (see docs/api-design.md).
 */

export interface Destination {
  /** Stable id; doubles as the destination detail route param until the API exists. */
  id: string;
  name: string;
  country: string;
  /** One or two sentences, kept short so cards stay even-height. */
  description: string;
  /** Image URL plus alt text describing the scene actually photographed. */
  image: {
    src: string;
    alt: string;
  };
  /** True for every record in this file. */
  isSample: true;
}

/** Placeholder imagery: remote Unsplash photos, so no binaries enter the repo. */
export const sampleDestinations: Destination[] = [
  {
    id: 'dst_kyoto',
    name: 'Kyoto',
    country: 'Japan',
    description:
      'Temple gardens, wooden machiya streets, and a slow food scene along the Kamo river.',
    image: {
      src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=70',
      alt: 'A path lined with vermilion torii gates climbing a wooded hillside.',
    },
    isSample: true,
  },
  {
    id: 'dst_prague',
    name: 'Prague',
    country: 'Czechia',
    description:
      'A river city of bridges and red rooftops, with a castle district that rewards walking.',
    image: {
      src: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=800&q=70',
      alt: 'Charles Bridge crowded with pedestrians, spanning the Vltava river toward the castle.',
    },
    isSample: true,
  },
  {
    id: 'dst_capetown',
    name: 'Cape Town',
    country: 'South Africa',
    description:
      'Table Mountain trails, a working harbour, and the cold Atlantic beaches of the Cape peninsula.',
    image: {
      src: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=800&q=70',
      alt: 'Table Mountain rising behind the Cape Town shoreline at sunset.',
    },
    isSample: true,
  },
  {
    id: 'dst_tokyo',
    name: 'Tokyo',
    country: 'Japan',
    description:
      'Dense neighbourhoods of neon and transit, where a twelve-stop day is entirely normal.',
    image: {
      src: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=70',
      alt: 'A busy neon-lit shopping street in Tokyo at dusk, with pedestrians and lit signage.',
    },
    isSample: true,
  },
];
