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

const handlePointNewFormClose = () => {
  document.querySelector('.trip-main__event-add-btn').disabled = false;
  navigationComponent.setMenuItem(MenuItem.TABLE);
};

const handleNavigationClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      // Скрыть статистику
      tripPresenter.destroy();
      tripPresenter.init();
      tripPresenter.createPoint(handlePointNewFormClose);
      document.querySelector('.trip-main__event-add-btn').disabled = true;
      navigationComponent.setMenuItem(menuItem);
      break;
    case MenuItem.TABLE:
      tripPresenter.destroy();
      tripPresenter.init();
      navigationComponent.setMenuItem(menuItem);
      // Скрыть статистику
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      navigationComponent.setMenuItem(menuItem);
      // Показать статистику
      break;
  }
};

navigationComponent.setTableClickHandler(handleNavigationClick);
navigationComponent.setStatsClickHandler(handleNavigationClick);
navigationComponent.setNewPointClickHandler(handleNavigationClick);

filterPresenter.init();
tripPresenter.init();
