import {generatePoint} from './mock/data.js';
import {render, RenderPosition, replace} from './utils/render';
import EditFormView from './view/edit-form.js';
import PointsListView from './view/points-list.js';
import FiltersView from './view/filters.js';
import NavigationView from './view/navigation.js';
import SortView from './view/sort.js';
import PointView from './view/point.js';
import TripHeaderView from './view/trip-header.js';
import NoPointView from './view/no-point.js';

const POINT_COUNT = 20;

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const tripHeaderElement = siteHeaderElement.querySelector('.trip-main');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const pointsElement = siteMainElement.querySelector('.trip-events');

render(siteNavigationElement, new NavigationView(), RenderPosition.BEFOREEND);

render(filtersElement, new FiltersView(), RenderPosition.BEFOREEND);

render(pointsElement, new PointsListView(), RenderPosition.BEFOREEND);
const pointsListElement = siteMainElement.querySelector('.trip-events__list');

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const renderPoint = (element, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new EditFormView(point);

  const replacePointToForm = () => {
    replace(pointEditComponent, pointComponent);
  };

  const replaceFormToPoint = () => {
    replace(pointComponent, pointEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.setEditClickHandler(() => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setClickHandler(() => {
    replaceFormToPoint();
  });

  render(element, pointComponent, RenderPosition.BEFOREEND);
};

if (points.length === 0) {
  render(pointsListElement, new NoPointView(), RenderPosition.AFTERBEGIN);
} else {
  render(pointsElement, new SortView(), RenderPosition.BEFOREEND);
  for (let i = 1; i < POINT_COUNT; i++) {
    renderPoint(pointsListElement, points[i]);
  }
}

render(tripHeaderElement, new TripHeaderView(points), RenderPosition.AFTERBEGIN);
