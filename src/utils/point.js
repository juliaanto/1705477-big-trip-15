import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const getFullDateFormatted = (date) => date === undefined ? '' : dayjs(date).format('DD/MM/YYYY HH:mm');

export const getDateFormatted = (date) => date === undefined ? '' : dayjs(date).format('MMM D');

export const getTimeFormatted = (date) => date === undefined ? '' : dayjs(date).format('HH:mm');

export const getDateHtmlFormatted = (date) => date === undefined ? '' : dayjs(date).format('YYYY-MM-DD');

export const getDateTimeHtmlFormatted = (date) => date === undefined ? '' : dayjs(date).format('YYYY-MM-DDTHH:mm');

export const getEventDuration = (timeTo, timeFrom) => {
  const durationUnformatted = dayjs.duration(dayjs(timeTo).diff(dayjs(timeFrom)));
  const durationInHours = durationUnformatted.as('hours');

  let eventDuration = '';

  if (durationInHours < 1) {
    eventDuration = durationUnformatted.format('mm[M]');
  } else if (durationInHours >= 1 && durationInHours < 24) {
    eventDuration = durationUnformatted.format('HH[H] mm[M]');
  } else {
    eventDuration = durationUnformatted.format('DD[D] HH[H] mm[M]');
  }

  return eventDuration;
};

export const isFuture = (date) => dayjs().isBefore(date);

export const sortByDate = (pointA, pointB) => dayjs(pointA.timeFrom).diff(dayjs(pointB.timeFrom));

export const sortByDuration = (pointA, pointB) => {
  const pointADuration = dayjs.duration(dayjs(pointA.timeTo).diff(dayjs(pointA.timeFrom)));
  const pointBDuration = dayjs.duration(dayjs(pointB.timeTo).diff(dayjs(pointB.timeFrom)));

  return pointBDuration.as('s') - pointADuration.as('s');
};

export const sortByPrice = (pointA, pointB) => pointB.price - pointA.price;
