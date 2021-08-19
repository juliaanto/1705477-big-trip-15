import dayjs from 'dayjs';
import {MINUTES_FROM_MAX_GAP, MINUTES_TO_MAX_GAP, PICTURES_MAX_COUNT} from './const.js';

/**
 * Генерирует случайное число из диапазона
 *
 * @param {number} [a=0] - нижняя граница диапазона
 * @param {number} [b=1] - верхняя граница диапазона
 * @return {number} - случайное число из диапазона
 */
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomIndex = (array) => getRandomInteger(0, array.length - 1);

/**
 * Выбирает случайный элемент из переданного массива
 *
 * @param {array} array - массив
 * @return {*} - случайный элемент массива
 */
const generateRandomElement = (array) => {
  const randomIndex = getRandomIndex(array);

  return array[randomIndex];
};

/**
 * Перемешивает массив
 *
 * @param {array} array - переданный массив
 * @return {array} - перемешанный массив
 */
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const generatePictures = () => {
  const pictures = [];
  for (let i = 0; i < PICTURES_MAX_COUNT; i++) {
    const randomNumber = getRandomInteger(1, 10000);
    const picture = `http://picsum.photos/248/152?r=${randomNumber}`;
    pictures.push(picture);
  }
  return pictures;
};

const getRandomTime = () => {
  const minutesGap = getRandomInteger(-MINUTES_FROM_MAX_GAP, MINUTES_FROM_MAX_GAP);
  const randomTime = dayjs().add(minutesGap, 'minute').toDate();
  return randomTime;
};

const getTimeTo = (timeFrom) => {
  const minutesGap = getRandomInteger(0, MINUTES_TO_MAX_GAP);
  const randomTime = dayjs(timeFrom).add(minutesGap, 'minute').toDate();
  return randomTime;
};

export {getRandomInteger, generateRandomElement, shuffle, generatePictures, getRandomTime, getTimeTo};
