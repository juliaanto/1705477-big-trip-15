import {MenuItem} from './const.js';
import {generatePoint} from './mock/data.js';
import FilterModel from './model/filter.js';
import PointsModel from './model/points.js';
import FilterPresenter from './presenter/filter.js';
import TripPresenter from './presenter/trip';
import {render, RenderPosition} from './utils/render.js';
import NavigationView from './view/navigation.js';

const POINT_COUNT = 20;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const tripHeaderElement = siteHeaderElement.querySelector('.trip-main');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const pointsElement = siteMainElement.querySelector('.trip-events');

const navigationComponent = new NavigationView();
render(siteNavigationElement, navigationComponent, RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(siteHeaderElement, siteNavigationElement, filtersElement, pointsElement, tripHeaderElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersElement, filterModel, pointsModel);

const handleNavigationClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      // Скрыть статистику
      // Показать маршрут
      // Показать форму добавления новой точки
      // Убрать выделение с NEW EVENT после сохранения
      break;
    case MenuItem.TABLE:
      // Показать маршрут
      // Скрыть статистику
      break;
    case MenuItem.STATS:
      // Скрыть маршрут
      // Показать статистику
      break;
  }
};

navigationComponent.setTableClickHandler(handleNavigationClick);
navigationComponent.setStatsClickHandler(handleNavigationClick);

filterPresenter.init();
tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});
