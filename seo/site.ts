/** Production site URL — update if your live domain differs */
export const SITE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://themfcoachweb.com';

export const BUSINESS = {
  name: 'The MF Coach',
  email: 'themfcoach1@gmail.com',
  /** Public business line — E.164 format (e.g. +17035551234). Must match Google Business Profile. */
  telephone: '',
  /** Google LocalBusiness price tier ($ = inexpensive, $$$$ = very expensive) */
  priceRange: '$$',
  instagram: 'https://www.instagram.com/the_mf_coach/',
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
