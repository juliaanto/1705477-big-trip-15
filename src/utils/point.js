import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const getFullDateFormatted = (date) => date === undefined ? '' : dayjs(date).format('DD/MM/YYYY HH:mm');

export const getDateFormatted = (date) => date === undefined ? '' : dayjs(date).format('MMM D');

export const getTimeFormatted = (date) => date === undefined ? '' : dayjs(date).format('HH:mm');

export const getDateHtmlFormatted = (date) => date === undefined ? '' : dayjs(date).format('YYYY-MM-DD');

export const getDateTimeHtmlFormatted = (date) => date === undefined ? '' : dayjs(date).format('YYYY-MM-DDTHH:mm');

const getDurationFormatted = (time) => {
  const durationInHours = time.as('hours');

  let eventDuration = '';

  if (durationInHours < 1) {
    eventDuration = time.format('mm[M]');
  } else if (durationInHours >= 1 && durationInHours < 24) {
    eventDuration = time.format('HH[H] mm[M]');
  } else {
    eventDuration = time.format('DD[D] HH[H] mm[M]');
  }

  return eventDuration;
};

export const getEventDuration = (timeTo, timeFrom) => {
  const durationUnformatted = dayjs.duration(dayjs(timeTo).diff(dayjs(timeFrom)));
  return getDurationFormatted(durationUnformatted);
};

export const getEventDurationFromTimestamp = (time) => {
  const durationUnformatted = dayjs.duration(time);
  return getDurationFormatted(durationUnformatted);
};

getEventDurationFromTimestamp(162120000);

export const isFuture = (date) => dayjs().isBefore(date, 's');

export const sortByDate = (pointA, pointB) => dayjs(pointA.timeFrom).diff(dayjs(pointB.timeFrom));

export const sortByDuration = (pointA, pointB) => {
  const pointADuration = dayjs.duration(dayjs(pointA.timeTo).diff(dayjs(pointA.timeFrom)));
  const pointBDuration = dayjs.duration(dayjs(pointB.timeTo).diff(dayjs(pointB.timeFrom)));

  return pointBDuration.as('s') - pointADuration.as('s');
};

export const sortByPrice = (pointA, pointB) => pointB.price - pointA.price;

export const isTimeEqual = (dateA, dateB) => dayjs(dateA).isSame(dateB, 's');

export const isPriceEqual = (priceA, priceB) => priceA === priceB;
