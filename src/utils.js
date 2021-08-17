import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const getFullDateFormatted = (date) => date === undefined ? '' : dayjs(date).format('DD/MM/YY HH:mm');

export const getDateFormatted = (date) => date === undefined ? '' : dayjs(date).format('MMM D');

export const getTimeFormatted = (date) => date === undefined ? '' : dayjs(date).format('HH:mm');

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
