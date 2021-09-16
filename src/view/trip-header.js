import {getDateFormatted} from '../utils/point';
import AbstractView from './abstract';

const getTripPrice = (points) => {
  let tripPrice = 0;

  for (const point of points) {
    tripPrice += Number(point.price);
  }

  return tripPrice;

};

const createTripHeaderTemplate = (points) => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${points[0].destination.name}  &mdash; ... &mdash; ${points[points.length - 1].destination.name}</h1>

      <p class="trip-info__dates">${getDateFormatted(points[0].timeFrom)}&nbsp;&mdash;&nbsp;${getDateFormatted(points[points.length - 1].timeTo)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTripPrice(points)}</span>
    </p>
  </section>`
);

export default class TripHeader extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripHeaderTemplate(this._points);
  }
}
