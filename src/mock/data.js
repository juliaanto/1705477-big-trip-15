import {CITIES, DESCRIPTIONS, DESCRIPTIONS_MAX_COUNT, DESCRIPTIONS_MIN_COUNT, OFFERS, OFFERS_MAX_COUNT, OFFERS_MIN_COUNT, TYPES} from './const.js';
import {generatePictures, generateRandomElement, getRandomDate, getRandomInteger, shuffle} from './util.js';

export const generatePoint = () => ({
  type: generateRandomElement(TYPES),
  city: generateRandomElement(CITIES),
  offers: shuffle(OFFERS).slice(0, getRandomInteger(OFFERS_MIN_COUNT, OFFERS_MAX_COUNT)),
  destination: {
    description: shuffle(DESCRIPTIONS).slice(0, getRandomInteger(DESCRIPTIONS_MIN_COUNT, DESCRIPTIONS_MAX_COUNT)).join(' '),
    pictures: generatePictures(),
  },
  dateFrom: getRandomDate(),
  dateTo: getRandomDate(),
  price: getRandomInteger(100, 1000),
  isFavorite: Boolean(getRandomInteger(0, 1)),
});
