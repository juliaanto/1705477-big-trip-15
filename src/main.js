import {generatePoint} from './mock/data.js';
import {createCreationFormTemplate} from './view/creation-form.js';
import {createEditFormTemplate} from './view/edit-form.js';
import {createEventsListTemplate} from './view/events-list.js';
import {createFiltersTemplate} from './view/filters.js';
import {createNavigationTemplate} from './view/navigation.js';
import {createSortTemplate} from './view/sort.js';
import {createTripEventTemplate} from './view/trip-event.js';
import {createTripHeaderTemplate} from './view/trip-header.js';

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

render(filtersElement, createFiltersTemplate(), 'beforeend');
render(tripEventsElement, createSortTemplate(), 'beforeend');

render(tripEventsElement, createEventsListTemplate(), 'beforeend');
const eventsListElement = siteMainElement.querySelector('.trip-events__list');

render(eventsListElement, createCreationFormTemplate(), 'beforeend');

const points = new Array(POINT_COUNT).fill().map(generatePoint);

console.log(points);

const renderSomeEvents = () => {

  render(eventsListElement, createEditFormTemplate(points[0]), 'beforeend');

  for (let i = 1; i < POINT_COUNT; i++) {
    render(eventsListElement, createTripEventTemplate(points[i]), 'beforeend');
  }
};

renderSomeEvents();

render(tripHeaderElement, createTripHeaderTemplate(points), 'afterbegin');
