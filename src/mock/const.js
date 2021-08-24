export const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

export const CITIES = [
  'Amsterdam',
  'Chamonix',
  'Geneva',
  'Bern',
  'Milan',
];

export const OFFERS = [
  {
    type: 'taxi',
    offers: [
      {
        name: 'event-offer-radio',
        title: 'Choose the radio station',
        price: 60,
      }, {
        name: 'event-offer-comfort',
        title: 'Upgrade to comfort class',
        price: 50,
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        name: 'event-offer-comfort',
        title: 'Upgrade to comfort class',
        price: 50,
      }, {
        name: 'event-offer-luggage',
        title: 'Add luggage',
        price: 50,
      },
    ],
  },
  {
    type: 'train',
    offers: [
      {
        name: 'event-offer-business',
        title: 'Upgrade to a business class',
        price: 120,
      }, {
        name: 'event-offer-radio',
        title: 'Choose the radio station',
        price: 60,
      }, {
        name: 'event-offer-meal',
        title: 'Choose meal',
        price: 180,
      }, {
        name: 'event-offer-comfort',
        title: 'Upgrade to comfort class',
        price: 50,
      }, {
        name: 'event-offer-luggage',
        title: 'Add luggage',
        price: 50,
      },
    ],
  },
  {
    type: 'ship',
    offers: [
      {
        name: 'event-offer-business',
        title: 'Upgrade to a business class',
        price: 120,
      }, {
        name: 'event-offer-radio',
        title: 'Choose the radio station',
        price: 60,
      }, {
        name: 'event-offer-meal',
        title: 'Choose meal',
        price: 180,
      }, {
        name: 'event-offer-comfort',
        title: 'Upgrade to comfort class',
        price: 50,
      }, {
        name: 'event-offer-luggage',
        title: 'Add luggage',
        price: 50,
      },
    ],
  },
  {
    type: 'drive',
    offers: [
      {
        name: 'event-offer-radio',
        title: 'Choose the radio station',
        price: 60,
      },
    ],
  },
  {
    type: 'flight',
    offers: [
      {
        name: 'event-offer-business',
        title: 'Upgrade to a business class',
        price: 120,
      }, {
        name: 'event-offer-meal',
        title: 'Choose meal',
        price: 180,
      }, {
        name: 'event-offer-comfort',
        title: 'Upgrade to comfort class',
        price: 50,
      }, {
        name: 'event-offer-luggage',
        title: 'Add luggage',
        price: 50,
      },
    ],
  },
  {
    type: 'check-in',
    offers: [
      {
        name: 'event-offer-business',
        title: 'Upgrade to a business class',
        price: 120,
      }, {
        name: 'event-offer-comfort',
        title: 'Upgrade to comfort class',
        price: 50,
      }, {
        name: 'event-offer-luggage',
        title: 'Add luggage',
        price: 50,
      },
    ],
  },
  {
    type: 'sightseeing',
    offers: [
    ],
  },
  {
    type: 'restaurant',
    offers: [
    ],
  },
];

export const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

export const DESCRIPTIONS_MIN_COUNT = 1;

export const DESCRIPTIONS_MAX_COUNT = 5;

export const PICTURES_MAX_COUNT = 5;

export const MINUTES_FROM_MAX_GAP = 90 * 24 * 60;

export const MINUTES_TO_MAX_GAP = 2 * 24 * 60;
