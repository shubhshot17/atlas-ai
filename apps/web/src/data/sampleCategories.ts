/**
 * SAMPLE DATA — not a real taxonomy.
 *
 * Travel-inspiration categories used to preview the discovery UI. These are
 * hand-written, not fetched, and no destination has actually been classified
 * into them yet. `isSample: true` marks every record and the homepage section
 * says so in the UI.
 *
 * IMAGES: every photo below was opened and reviewed before its alt text was
 * written — the alt describes the frame, not the category name. If you swap an
 * image, look at it before editing the alt text.
 *
 * When real categories and counts exist, delete this file and feed the section
 * from the API instead.
 */

export interface InspirationCategory {
  /** Stable id, used for React keys and future filtering links. */
  id: string;
  /** Display label, e.g. "Weekend Getaways". */
  label: string;
  /** Short, category-specific line — not a restatement of the label. */
  description: string;
  /**
   * Number of destinations to be published under this category. Counts are
   * indicative only while the catalogue is empty; the UI words them as such.
   */
  destinationCount: number;
  image: {
    src: string;
    alt: string;
  };
  isSample: true;
}

export const sampleCategories: InspirationCategory[] = [
  {
    id: 'cat_adventure',
    label: 'Adventure',
    description: 'Multi-day treks, river crossings, and trips that need a real pack.',
    destinationCount: 24,
    image: {
      src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=70',
      alt: 'Two hikers with heavy packs walking a grassy trail below snow-capped peaks.',
    },
    isSample: true,
  },
  {
    id: 'cat_beaches',
    label: 'Beaches',
    description: 'Warm water, quiet coves, and easy coastal days.',
    destinationCount: 31,
    image: {
      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=70',
      alt: 'Sun setting over calm turquoise water, with gentle waves reaching a pale sand beach.',
    },
    isSample: true,
  },
  {
    id: 'cat_mountains',
    label: 'Mountains',
    description: 'Alpine trails and hut-to-hut routes above the treeline.',
    destinationCount: 18,
    image: {
      src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=70',
      alt: 'Snow-covered peaks beyond a forested valley and a wide river plain under scattered cloud.',
    },
    isSample: true,
  },
  {
    id: 'cat_culture',
    label: 'Culture',
    description: 'Old quarters, museums, and food worth planning around.',
    destinationCount: 27,
    image: {
      src: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=70',
      alt: 'Ornate stone bridge with gilded lamp posts and statues over a river at dusk.',
    },
    isSample: true,
  },
  {
    id: 'cat_weekend',
    label: 'Weekend Getaways',
    description: 'Short escapes that fit around a Friday and a Monday.',
    destinationCount: 15,
    image: {
      src: 'https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=900&q=70',
      alt: 'Turquoise alpine lake below steep, partly snow-covered mountains and pine forest.',
    },
    isSample: true,
  },
];
