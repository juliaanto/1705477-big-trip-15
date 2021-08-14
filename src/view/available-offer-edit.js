export const createSelectedOfferEditTemplate = (offer, index) => {
  const {title, price} = offer[index];

  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer" type="checkbox" name="event-offer">
  <label class="event__offer-label" for="event-offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
  </label>
  </div>`;
};
