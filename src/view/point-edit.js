import {getFullDateFormatted, isOfferChecked} from '../utils/point';
import SmartView from './smart.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import {DEFAULT_POINT_TYPE} from '../const.js';

const createPointEditTemplate = (data, destinations, allOffers) => {
  const {id, type, destination, offers, timeFrom, timeTo, price, isDisabled, isSaving, isDeleting} = data;

  let pointType = DEFAULT_POINT_TYPE;

  if (type !== undefined) {
    pointType = type;
  }

  const timeFromFormatted = timeFrom !== null
    ? getFullDateFormatted(timeFrom)
    : '';

  const timeToFormatted = timeTo !== null
    ? getFullDateFormatted(timeTo)
    : '';

  const createPhotosTemplate = () => {
    let photosTemplate = '';

    for (const photo of destination.pictures) {
      photosTemplate += `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`;
    }

    return photosTemplate;
  };

  const createAvailableOffersTemplate = () => {

    let currentType = DEFAULT_POINT_TYPE;

    if (type !== undefined) {
      currentType = type;
    }

    const offersForCurrentType = allOffers.find((element) => element.type === currentType);

    if (offersForCurrentType.offers.length > 0) {

      const createAvailableOffersValuesTemplate = () => {

        let selectedOffersTemplate = '';

        for (const offer of offersForCurrentType.offers) {

          selectedOffersTemplate += `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="${offer.title}-${id}" type="checkbox" name="${offer.title}" ${isOfferChecked(offers, offer) ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
            <label class="event__offer-label" for="${offer.title}-${id}">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>`;
        }

        return selectedOffersTemplate;
      };

      return `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
        ${createAvailableOffersValuesTemplate()}
        </div>
      </section>`;
    }

    return '';
  };

  const checkType = (value) => pointType === value ? 'checked' : '';

  const createDestinationTemplate = () => {
    let destinationTemplate = '';

    if (destination !== undefined) {
      destinationTemplate += `<section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>
          <div class="event__photos-container">
          <div class="event__photos-tape">
          ${createPhotosTemplate()}
          </div>
        </div>
        </section>`;
    }

    return destinationTemplate;

  };

  const createDestinationListValue = () => {
    let destinationListValue = '';

    for (const cityValue of destinations) {
      destinationListValue += `<option value="${cityValue.name}"></option>`;
    }

    return destinationListValue;
  };

  const deleteButtonName = () => {
    if (id === undefined) {
      return 'Cancel';
    } else if (isDeleting) {
      return 'Deleting...';
    } else {
      return 'Delete';
    }
  };

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${pointType}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${checkType('taxi')}>
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${checkType('bus')}>
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${checkType('train')}>
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${checkType('ship')}>
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${checkType('drive')}>
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${checkType('flight')}>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${checkType('check-in')}>
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${checkType('sightseeing')}>
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${checkType('restaurant')}>
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${pointType}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="search" name="event-destination" value="${destination !== undefined ? destination.name : ''}" list="destination-list-1" required ${isDisabled ? 'disabled' : ''}>
          <datalist id="destination-list-1">
            ${createDestinationListValue()}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeFromFormatted}" required ${isDisabled ? 'disabled' : ''}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeToFormatted}" required ${isDisabled ? 'disabled' : ''}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" min="0" name="event-price" value="${price !== undefined ? price : ''}" required ${isDisabled ? 'disabled' : ''}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
        <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${deleteButtonName()}</button>
        <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">


        ${createAvailableOffersTemplate()}

        ${createDestinationTemplate()}

      </section>
    </form>
  </li>`;
};

export default class PointEdit extends SmartView {
  constructor(point, destinations, allOffers) {
    super();
    this._data = PointEdit.parsePointToData(point);
    this._destinations = destinations;
    this._allOffers = allOffers;
    this._datepickerTimeFrom = null;
    this._datepickerTimeTo = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
    this._typeToggleHandler = this._typeToggleHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._timeFromChangeHandler = this._timeFromChangeHandler.bind(this);
    this._timeToChangeHandler = this._timeToChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this._datepickerTimeFrom) {
      this._datepickerTimeFrom.destroy();
      this._datepickerTimeFrom = null;
    }

    if (this._datepickerTimeTo) {
      this._datepickerTimeTo.destroy();
      this._datepickerTimeTo = null;
    }
  }

  reset(point) {
    this.updateData(
      PointEdit.parsePointToData(point),
    );
  }

  getTemplate() {
    return createPointEditTemplate(this._data, this._destinations, this._allOffers);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setRollupButtonClickHandler(this._callback.click);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setDatepicker() {
    if (this._datepickerTimeFrom) {
      this._datepickerTimeFrom.destroy();
      this._datepickerTimeFrom = null;
    }

    if (this._datepickerTimeTo) {
      this._datepickerTimeTo.destroy();
      this._datepickerTimeTo = null;
    }

    this._datepickerTimeFrom = flatpickr(
      this.getElement().querySelector('input[name="event-start-time"]'),
      {
        dateFormat: 'd/m/Y H:i',
        enableTime: true,
        // eslint-disable-next-line camelcase
        time_24hr: true,
        maxDate: this._data.timeTo,
        defaultDate: this._data.timeFrom,
        onChange: this._timeFromChangeHandler,
      },
    );

    this._datepickerTimeTo = flatpickr(
      this.getElement().querySelector('input[name="event-end-time"]'),
      {
        dateFormat: 'd/m/Y H:i',
        enableTime: true,
        // eslint-disable-next-line camelcase
        time_24hr: true,
        minDate: this._data.timeFrom,
        defaultDate: this._data.timeTo,
        onChange: this._timeToChangeHandler,
      },
    );
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelectorAll('.event__type-group input[type="radio"]')
      .forEach((input) => input.addEventListener('change', this._typeToggleHandler));
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._destinationChangeHandler);
    this.getElement()
      .querySelector('.event__input--price')
      .addEventListener('change', this._priceChangeHandler);
    this.getElement()
      .querySelectorAll('.event__offer-checkbox')
      .forEach((input) => input.addEventListener('change', this._offersChangeHandler));
  }

  _typeToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
    });
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();

    const currentDestnation = this._destinations.find((destination) => destination.name === evt.target.value);

    const input = this.getElement().querySelector('.event__input--destination');

    if (currentDestnation === undefined) {
      input.setCustomValidity('Выберите пункт назначения из предложенного списка');
    } else {
      input.setCustomValidity('');

      this.updateData({
        destination: {
          name: currentDestnation.name,
          description: currentDestnation.description,
          pictures: currentDestnation.pictures,
        },
      });
    }

    input.reportValidity();
  }

  _timeFromChangeHandler([userDateFrom]) {
    this.updateData({
      timeFrom: userDateFrom,
    });
  }

  _timeToChangeHandler([userDateTo]) {
    this.updateData({
      timeTo: userDateTo,
    });
  }

  _priceChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value,
    });
  }

  _offersChangeHandler(evt) {
    let pointType = DEFAULT_POINT_TYPE;

    if (this._data.type !== undefined) {
      pointType = this._data.type;
    }

    evt.preventDefault();
    const checkedOfferNames = [];
    this.getElement().querySelectorAll('.event__offer-checkbox:checked').forEach((element) => {checkedOfferNames.push(element.name);});
    const offersForCurrentType = this._allOffers.find((element) => element.type === pointType);
    const checkedOffers = [];
    checkedOfferNames.forEach((checkedOfferName) => {
      checkedOffers.push(offersForCurrentType.offers.find((offer) => offer.title === checkedOfferName));
    });

    this.updateData({
      offers: checkedOffers,
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(PointEdit.parseDataToPoint(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(PointEdit.parseDataToPoint(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  _rollupButtonClickHandler() {
    this._callback.click();
  }

  setRollupButtonClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollupButtonClickHandler);
  }

  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
      {
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      },
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}
