import {generatePoint} from './mock/data.js';
import {render, RenderPosition, replace} from './utils/render';
import EditFormView from './view/edit-form.js';
import EventsListView from './view/events-list.js';
import FiltersView from './view/filters.js';
import NavigationView from './view/navigation.js';
import SortView from './view/sort.js';
import TripEventView from './view/trip-event.js';
import TripHeaderView from './view/trip-header.js';
import NoEventView from './view/no-event.js';

const POINT_COUNT = 20;

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const tripHeaderElement = siteHeaderElement.querySelector('.trip-main');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

render(siteNavigationElement, new NavigationView(), RenderPosition.BEFOREEND);

render(filtersElement, new FiltersView(), RenderPosition.BEFOREEND);

render(tripEventsElement, new EventsListView(), RenderPosition.BEFOREEND);
const eventsListElement = siteMainElement.querySelector('.trip-events__list');

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const renderEvent = (element, event) => {
  const eventComponent = new TripEventView(event);
  const eventEditComponent = new EditFormView(event);

  const replaceEventToForm = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceFormToEvent = () => {
    replace(eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventComponent.setEditClickHandler(() => {
    replaceEventToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.setFormSubmitHandler(() => {
    replaceFormToEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.setClickHandler(() => {
    replaceFormToEvent();
  });

  render(element, eventComponent, RenderPosition.BEFOREEND);
};

if (points.length === 0) {
  render(eventsListElement, new NoEventView(), RenderPosition.AFTERBEGIN);
} else {
  render(tripEventsElement, new SortView(), RenderPosition.BEFOREEND);
  for (let i = 1; i < POINT_COUNT; i++) {
    renderEvent(eventsListElement, points[i]);
  }
}

render(tripHeaderElement, new TripHeaderView(points), RenderPosition.AFTERBEGIN);
