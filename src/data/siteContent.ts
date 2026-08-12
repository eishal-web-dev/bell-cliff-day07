export const siteContent = {
  name: 'The Bell Cliff Restaurant',
  shortName: 'Bell Cliff',
  tagline: 'Restaurant & Tea Room · Lyme Regis',
  type: 'Traditional English restaurant, café and tea room',
  description:
    'Warm hospitality, comforting British favourites and memorable meals in the heart of Lyme Regis.',
  hero: {
    label: 'Restaurant & Tea Room · Lyme Regis',
    heading: 'Traditional flavours by the Jurassic Coast',
    copy: 'Warm hospitality, comforting British favourites and memorable meals in the heart of Lyme Regis.',
    trust: '4.4 ★ · 592 Google reviews',
    buttons: {
      menu: 'Explore Our Menu',
      call: 'Call to Reserve',
      directions: 'Get Directions',
    },
  },
  address: {
    line1: '5 Broad Street',
    line2: 'Lyme Regis',
    line3: 'Dorset',
    postcode: 'DT7 3QD',
    country: 'United Kingdom',
    full: '5 Broad Street, Lyme Regis, Dorset, DT7 3QD, United Kingdom',
  },
  phone: '+44 1297 442459',
  phoneHref: 'tel:+441297442459',
  rating: {
    score: 4.4,
    count: 592,
    label: '4.4 ★ · 592 Google reviews',
  },
  priceRange: '£10–£20 per person',
  infoStrip: [
    { label: '5 Broad Street, Lyme Regis', icon: 'MapPin' },
    { label: 'Traditional English dining', icon: 'Utensils' },
    { label: 'Outdoor seating', icon: 'Sun' },
    { label: 'Vegan & children\u2019s options', icon: 'Leaf' },
  ],
  welcome: {
    heading: 'A warm welcome in the heart of Lyme Regis',
    copy: 'From a comforting breakfast to a relaxed lunch or traditional cream tea, Bell Cliff brings together familiar flavours, friendly service and the character of Lyme Regis.',
  },
  experience: {
    heading: 'A traditional English dining experience',
    copy: 'Bell Cliff is a relaxed restaurant and tea room in the centre of Lyme Regis, serving breakfast, lunch and afternoon treats throughout the day. Whether you are stopping in after a walk along the Cobb, gathering with family, or settling down to a proper Dorset cream tea, you will find familiar favourites and friendly hospitality.',
    points: [
      {
        title: 'Breakfast & brunch',
        copy: 'Hearty full English breakfasts, lighter morning plates and freshly brewed coffee to start the day.',
      },
      {
        title: 'Lunch & English favourites',
        copy: 'Fish and chips, homemade lasagne, breaded scampi and comforting classics made to order.',
      },
      {
        title: 'Afternoon tea & treats',
        copy: 'Dorset cream teas, homemade scones and generous slices of cake in a relaxed tea-room setting.',
      },
    ],
  },
  featuredIntro:
    'Menu selections and availability may change. Please call the restaurant for today\u2019s menu.',
  allergenNotice:
    'Please speak directly with the restaurant before ordering if you have an allergy or intolerance. Ingredients and preparation methods may change.',
  hoursNotice: 'Please call to confirm today\u2019s opening hours.',
  reservationNotice:
    'Thank you. This website concept cannot confirm a reservation. Please call Bell Cliff directly on +44 1297 442459.',
  reviewsNotice: 'Read Google Reviews',
  mapsQuery: 'The Bell Cliff Restaurant, 5 Broad Street, Lyme Regis, Dorset, DT7 3QD',
  mapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=The+Bell+Cliff+Restaurant,+5+Broad+Street,+Lyme+Regis,+Dorset+DT7+3QD',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=The+Bell+Cliff+Restaurant,+5+Broad+Street,+Lyme+Regis,+Dorset+DT7+3QD&output=embed',
  mapsReviewsUrl:
    'https://www.google.com/maps/search/?api=1&query=The+Bell+Cliff+Restaurant+Lyme+Regis',
  nav: [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'Our Story', path: '/our-story' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Visit', path: '/visit' },
  ],
  imageUseNote:
    'Photographs on this concept site are licensed stock imagery used as placeholders. Permission to use authentic Bell Cliff photography must be confirmed before the website is made official.',
} as const;

export type SiteContent = typeof siteContent;
