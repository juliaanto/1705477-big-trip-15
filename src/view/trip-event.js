/*global require*/
import dayjs from 'dayjs';

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

export const createTripEventTemplate = (point) => {
  const {timeFrom, timeTo, type, city, price, isFavorite} = point;

  const dateFromFormatted = timeFrom !== null
    ? dayjs(timeFrom).format('MMM D')
    : '';

  const timeFromFormatted = timeFrom !== null
    ? dayjs(timeFrom).format('HH:mm')
    : '';

  const timeToFormatted = timeTo !== null
    ? dayjs(timeTo).format('HH:mm')
    : '';

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

  const favoriteEvent = isFavorite
    ? `<button class="event__favorite-btn  event__favorite-btn--active" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
       </button>`
    : `<button class="event__favorite-btn" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>`;


  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${dateFromFormatted}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${city}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${timeFromFormatted}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${timeToFormatted}</time>
        </p>
        <p class="event__duration">${eventDuration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">

      </ul>
      ${favoriteEvent}
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};
