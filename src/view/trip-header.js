import {createElement} from '../utils';

const getTripPrice = (points) => {
  let tripPrice = 0;

  for (const point of points) {
    tripPrice += point.price;
  }

  return tripPrice;

};

const createTripHeaderTemplate = (points) => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${points[0].city}  &mdash; ... &mdash; ${points[points.length - 1].city}</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTripPrice(points)}</span>
    </p>
  </section>`
);

export default class TripHeader {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createTripHeaderTemplate(this._points);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
