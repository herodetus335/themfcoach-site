import { BUSINESS, MOBILE_SERVICE_AREAS, SITE_URL } from './site';

const { address, geo } = BUSINESS;

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'HealthClub'],
  '@id': `${SITE_URL}/#localbusiness`,
  name: BUSINESS.name,
  description:
    'Personal trainer in Ashburn VA offering on-site Ashburn gym & fitness coaching and in-home personal training across Loudoun County. Mobile fitness coach serving Ashburn through Fairfax, including Leesburg, Sterling, Herndon, and Reston.',
  url: SITE_URL,
  email: BUSINESS.email,
  sameAs: [BUSINESS.instagram],
  image: `${SITE_URL}/assets/TheMFcoach_LogoGreen-BUuFKoKl.png`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: address.streetAddress,
    addressLocality: address.addressLocality,
    addressRegion: address.addressRegion,
    postalCode: address.postalCode,
    addressCountry: address.addressCountry,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: geo.latitude,
    longitude: geo.longitude,
  },
  areaServed: [
    {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: geo.latitude,
        longitude: geo.longitude,
      },
      geoRadius: 25000,
      description:
        'Mobile and in-home personal training from Ashburn, VA through Fairfax, VA',
    },
    ...MOBILE_SERVICE_AREAS.map((area) => ({
      '@type': area.type,
      name: area.name,
      addressRegion: 'VA',
      containedInPlace: { '@type': 'State', name: 'Virginia' },
    })),
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Personal Training Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'On-Site Gym & Fitness Coaching',
          description: 'Ashburn gym & fitness coaching at our 11,000 sq ft warehouse training facility.',
          areaServed: {
            '@type': 'City',
            name: 'Ashburn',
            addressRegion: 'VA',
          },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'In-Home & Mobile Personal Training',
          description:
            'In-home personal training Loudoun County and mobile fitness coach service from Ashburn to Fairfax.',
          areaServed: MOBILE_SERVICE_AREAS.map((area) => ({
            '@type': area.type,
            name: area.name,
            addressRegion: 'VA',
          })),
        },
      },
    ],
  },
};
