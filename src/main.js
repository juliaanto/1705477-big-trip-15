import {generatePoint} from './mock/data.js';
import {render, RenderPosition} from './utils.js';
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

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const renderEvent = (element, event) => {
  const eventComponent = new TripEventView(event);
  const eventEditComponent = new EditFormView(event);

  const replaceEventToForm = () => {
    element.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToEvent = () => {
    element.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceEventToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToEvent();
  });

  render(element, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

for (let i = 1; i < POINT_COUNT; i++) {
  renderEvent(eventsListElement, points[i]);
}

render(tripHeaderElement, new TripHeaderView(points).getElement(), RenderPosition.AFTERBEGIN);
