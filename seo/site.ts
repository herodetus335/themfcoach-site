/** Production site URL — update if your live domain differs */
export const SITE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://themfcoachweb.com';

export const BUSINESS = {
  name: 'The MF Coach',
  email: 'themfcoach1@gmail.com',
  /** Public business line — E.164 format. Must match Google Business Profile. */
  telephone: '+17038651675',
  /**
   * Per session, per person (solo + duo): ~$48 (on-site duo, 6-mo) up to $110 (mobile solo PAYG).
   * Google also accepts $–$$$$ symbols; $$ is a rough tier if a symbol is required.
   */
  priceRange: '$48–$110 per session per person',
  instagram: 'https://www.instagram.com/the_mf_coach/',
  googleMaps: 'https://maps.app.goo.gl/gx63s4nMPmkZfAYa6',
  address: {
    streetAddress: '44675 Cape Ct STE 185',
    addressLocality: 'Ashburn',
    addressRegion: 'VA',
    postalCode: '20147',
    addressCountry: 'US',
  },
  geo: {
    latitude: 39.0438,
    longitude: -77.4874,
  },
} as const;

/** Cities and counties served for mobile / in-home training */
export const MOBILE_SERVICE_AREAS = [
  { name: 'Ashburn', type: 'City' as const },
  { name: 'Fairfax', type: 'City' as const },
  { name: 'Leesburg', type: 'City' as const },
  { name: 'Sterling', type: 'City' as const },
  { name: 'Herndon', type: 'City' as const },
  { name: 'Reston', type: 'City' as const },
  { name: 'Loudoun County', type: 'AdministrativeArea' as const },
  { name: 'Fairfax County', type: 'AdministrativeArea' as const },
] as const;
