import { OFFERS, OFFERS_MAX_COUNT } from './mock/const.js';
import {generatePoint} from './mock/data.js';
import {createCreationFormTemplate } from './view/creation-form.js';
import {createEditFormTemplate } from './view/edit-form.js';
import {createEventsListTemplate } from './view/events-list.js';
import {createFiltersTemplate} from './view/filters.js';
import {createNavigationTemplate} from './view/navigation.js';
import { createSelectedOfferEditTemplate } from './view/available-offer-edit.js';
import { createSelectedOfferTemplate } from './view/selected-offer.js';
import {createSortTemplate} from './view/sort.js';
import {createTripEventTemplate } from './view/trip-event.js';
import {createTripInfoTemplate} from './view/trip-header.js';

const EVENTS_COUNT = 3;
const POINT_COUNT = 20;

export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const tripHeaderElement = siteHeaderElement.querySelector('.trip-main');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

render(siteNavigationElement, createNavigationTemplate(), 'beforeend');
render(tripHeaderElement, createTripInfoTemplate(), 'afterbegin');
render(filtersElement, createFiltersTemplate(), 'beforeend');
render(tripEventsElement, createSortTemplate(), 'beforeend');

render(tripEventsElement, createEventsListTemplate(), 'beforeend');
const eventsListElement = siteMainElement.querySelector('.trip-events__list');


render(eventsListElement, createCreationFormTemplate(), 'beforeend');

const points = new Array(POINT_COUNT).fill().map(generatePoint);

console.log(points);

const renderSomeEvents = () => {
  render(eventsListElement, createEditFormTemplate(points[0]), 'beforeend');
  const offersListEditElement = siteMainElement.querySelectorAll('.event__available-offers');
  const lastElementEdit = offersListEditElement[offersListEditElement.length - 1];

  for (let i = 0; i < OFFERS_MAX_COUNT; i++) {
    render(lastElementEdit, createSelectedOfferEditTemplate(OFFERS, i), 'beforeend');

    // const offersEditCount = points[0].offers.length;

    // for (let j = 0; j < offersEditCount; j++) {
    //   OFFERS.forEach((offer) => {
    //     if (points[0].offers[j].title === offer.title) {
    //       const offerElementEdit = lastElementEdit.querySelectorAll('.event__offer-checkbox');
    //       const lastOfferElementEdit = offerElementEdit[offerElementEdit.length - 1];
    //       lastOfferElementEdit.checked = true;
    //     }
    //   });
    // }
  }

  for (let i = 0; i < EVENTS_COUNT; i++) {
    render(eventsListElement, createTripEventTemplate(points[i]), 'beforeend');
    const offersListElement = eventsListElement.querySelectorAll('.event__selected-offers');
    const lastElement = offersListElement[offersListElement.length - 1];
    const offersCount = points[i].offers.length;

    for (let j = 0; j < offersCount; j++) {
      render(lastElement, createSelectedOfferTemplate(points[i].offers[j]), 'beforeend');
    }
  }
};

renderSomeEvents();
