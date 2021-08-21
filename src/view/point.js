import {getDateFormatted, getTimeFormatted, getEventDuration} from '../utils/point';
import {OFFERS} from '../mock/const.js';
import AbstractView from './abstract';

const createPointTemplate = (point) => {
  const {timeFrom, timeTo, type, city, price, isFavorite} = point;

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

  const createSelectedOffersTemplate = () => {

    let selectedOffersTemplate = '';

    for (const offerElement of OFFERS) {
      if (type === offerElement.type) {
        const offers = offerElement.offers;

        for (const offer of offers) {
          selectedOffersTemplate += `<li class="event__offer">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </li>`;
        }
      }
    }
    return selectedOffersTemplate;
  };

  return `<ul class="trip-events__list">
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${getDateFormatted(timeFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${city}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${getTimeFormatted(timeFrom)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${getTimeFormatted(timeTo)}</time>
          </p>
          <p class="event__duration">${getEventDuration(timeTo, timeFrom)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${createSelectedOffersTemplate()}
        </ul>
        ${favoriteEvent}
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  </ul>`;
};

export default class Point extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }
}
