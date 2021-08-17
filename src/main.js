import {generatePoint} from './mock/data.js';
import {renderTemplate} from './utils.js';
import {createCreationFormTemplate} from './view/creation-form.js';
import {createEditFormTemplate} from './view/edit-form.js';
import {createEventsListTemplate} from './view/events-list.js';
import {createFiltersTemplate} from './view/filters.js';
import {createNavigationTemplate} from './view/navigation.js';
import {createSortTemplate} from './view/sort.js';
import {createTripEventTemplate} from './view/trip-event.js';
import {createTripHeaderTemplate} from './view/trip-header.js';

const POINT_COUNT = 20;

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const tripHeaderElement = siteHeaderElement.querySelector('.trip-main');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

renderTemplate(siteNavigationElement, createNavigationTemplate(), 'beforeend');

renderTemplate(filtersElement, createFiltersTemplate(), 'beforeend');
renderTemplate(tripEventsElement, createSortTemplate(), 'beforeend');

renderTemplate(tripEventsElement, createEventsListTemplate(), 'beforeend');
const eventsListElement = siteMainElement.querySelector('.trip-events__list');

renderTemplate(eventsListElement, createCreationFormTemplate(), 'beforeend');

const points = new Array(POINT_COUNT).fill().map(generatePoint);

console.log(points);

const renderSomeEvents = () => {

  renderTemplate(eventsListElement, createEditFormTemplate(points[0]), 'beforeend');

  for (let i = 1; i < POINT_COUNT; i++) {
    renderTemplate(eventsListElement, createTripEventTemplate(points[i]), 'beforeend');
  }
};

renderSomeEvents();

renderTemplate(tripHeaderElement, createTripHeaderTemplate(points), 'afterbegin');
