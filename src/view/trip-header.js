import { tripCities, tripPrice } from '../main.js';

const getTripTitle = () => tripCities.join(' &mdash; ');

export const createTripInfoTemplate = () => {

  getTripTitle();

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${getTripTitle()}</h1>

    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripPrice}</span>
  </p>
</section>`;
};


