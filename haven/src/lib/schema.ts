const BASE_URL = 'https://haven.big-bad-coding.netlify.app';

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'HealthAndBeautyBusiness'],
  name: 'Haven Therapeutic Massage',
  description:
    'Professional therapeutic massage in the Capital Region NY. Jane Smith LMT, licensed since 2000.',
  url: BASE_URL,
  telephone: '+15185550174',
  priceRange: '$$',
  image: `${BASE_URL}/opengraph-image.png`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Albany',
    addressRegion: 'NY',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 42.6526,
    longitude: -73.7562,
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Albany',
      containedInPlace: { '@type': 'State', name: 'New York' },
    },
    {
      '@type': 'City',
      name: 'Clifton Park',
      containedInPlace: { '@type': 'State', name: 'New York' },
    },
    {
      '@type': 'City',
      name: 'Saratoga Springs',
      containedInPlace: { '@type': 'State', name: 'New York' },
    },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '15:00',
    },
  ],
  sameAs: [
    'https://facebook.com/havenmassageny',
    'https://instagram.com/havenmassageny',
    'https://linkedin.com/in/janesmith-lmt',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Massage Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Swedish Massage',
          description: 'Relaxing full-body massage. 60 or 90 minutes.',
        },
        price: '95',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Deep Tissue Massage',
          description: 'Targets deeper muscle layers. 60 or 90 minutes.',
        },
        price: '110',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Hot Stone Massage',
          description: 'Heated stone therapy. 90 minutes.',
        },
        price: '145',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Prenatal Massage',
          description: 'Safe therapeutic massage for pregnancy. 60 minutes.',
        },
        price: '105',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Couples Massage',
          description: 'Massage for two. 60 or 90 minutes.',
        },
        price: '190',
        priceCurrency: 'USD',
      },
    ],
  },
} as const;

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jane Smith',
  jobTitle: 'Licensed Massage Therapist',
  description:
    'Jane Smith has been a licensed massage therapist in the Capital Region NY since 2000.',
  worksFor: { '@type': 'LocalBusiness', name: 'Haven Therapeutic Massage' },
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    name: 'Licensed Massage Therapist (LMT)',
    credentialCategory: 'license',
  },
} as const;
