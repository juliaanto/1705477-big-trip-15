import {generatePoint} from './mock/data.js';
import {render, RenderPosition} from './utils.js';
import CreationFormView from './view/creation-form.js';
import EditFormView from './view/edit-form.js';
import EventsListView from './view/events-list.js';
import FiltersView from './view/filters.js';
import NavigationView from './view/navigation.js';
import SortView from './view/sort.js';
import TripEventView from './view/trip-event.js';
import TripHeaderView from './view/trip-header.js';

const POINT_COUNT = 20;

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const tripHeaderElement = siteHeaderElement.querySelector('.trip-main');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

render(siteNavigationElement, new NavigationView().getElement(), RenderPosition.BEFOREEND);

render(filtersElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND);

render(tripEventsElement, new EventsListView().getElement(), RenderPosition.BEFOREEND);
const eventsListElement = siteMainElement.querySelector('.trip-events__list');

render(eventsListElement, new CreationFormView().getElement(), RenderPosition.BEFOREEND);

const points = new Array(POINT_COUNT).fill().map(generatePoint);

console.log(points);

const renderSomeEvents = () => {

  render(eventsListElement, new EditFormView(points[0]).getElement(), RenderPosition.BEFOREEND);

  for (let i = 1; i < POINT_COUNT; i++) {
    render(eventsListElement, new TripEventView(points[i]).getElement(), RenderPosition.BEFOREEND);
  }
};

renderSomeEvents();

render(tripHeaderElement, new TripHeaderView(points).getElement(), RenderPosition.AFTERBEGIN);
