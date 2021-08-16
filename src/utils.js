/*global require*/
import dayjs from 'dayjs';

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

export const getFullDateFormatted = (date) => dayjs(date).format('DD/MM/YY HH:mm');

export const getDateFormatted = (date) => dayjs(date).format('MMM D');

export const getTimeFormatted = (date) => dayjs(date).format('HH:mm');

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
