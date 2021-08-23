import {nanoid} from 'nanoid';
import {CITIES, DESCRIPTIONS, DESCRIPTIONS_MAX_COUNT, DESCRIPTIONS_MIN_COUNT, TYPES} from './const.js';
import {generatePictures, generateRandomElement, getRandomTime, getRandomInteger, shuffle, getTimeTo} from './util.js';

export const generatePoint = () => {
  const timeFrom = getRandomTime();

  return {
    id: nanoid(),
    type: generateRandomElement(TYPES),
    city: generateRandomElement(CITIES),
    destination: {
      description: shuffle(DESCRIPTIONS).slice(0, getRandomInteger(DESCRIPTIONS_MIN_COUNT, DESCRIPTIONS_MAX_COUNT)).join(' '),
      pictures: generatePictures(),
    },
    timeFrom: timeFrom,
    timeTo: getTimeTo(timeFrom),
    price: getRandomInteger(100, 1000),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
