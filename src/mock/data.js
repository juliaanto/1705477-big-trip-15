import {nanoid} from 'nanoid';
import {CITIES, TYPES} from './const.js';
import {generateRandomElement, getRandomTime, getRandomInteger, getTimeTo} from './util.js';

export const generatePoint = () => {
  const timeFrom = getRandomTime();

  return {
    id: nanoid(),
    type: generateRandomElement(TYPES),
    city: generateRandomElement(CITIES),
    timeFrom: timeFrom,
    timeTo: getTimeTo(timeFrom),
    price: getRandomInteger(100, 1000),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
