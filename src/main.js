import {FilterType, MenuItem, UpdateType} from './const.js';
import FilterModel from './model/filter.js';
import PointsModel from './model/points.js';
import FilterPresenter from './presenter/filter.js';
import StatsPresenter from './presenter/stats.js';
import TripPresenter from './presenter/trip';
import {remove, render, RenderPosition} from './utils/render.js';
import NavigationView from './view/navigation.js';
import Api from './api.js';
import FiltersView from './view/filters.js';
import DestinationsModel from './model/destinations.js';
import OffersModel from './model/offers.js';

const AUTHORIZATION = 'Basic 57b515a46ca6fab16';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';

const api = new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const tripHeaderElement = siteHeaderElement.querySelector('.trip-main');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const pointsElement = siteMainElement.querySelector('.trip-events');
const pageBodyElement = siteMainElement.querySelector('.page-body__container');

const navigationComponent = new NavigationView();
render(siteNavigationElement, navigationComponent, RenderPosition.BEFOREEND);
document.querySelector('.trip-main__event-add-btn').disabled = true;

const tripPresenter = new TripPresenter(siteHeaderElement, siteNavigationElement, filtersElement, pointsElement, tripHeaderElement, pointsModel, filterModel, destinationsModel, offersModel, api);
const filterPresenter = new FilterPresenter(filtersElement, filterModel, pointsModel);
const statsPresenter = new StatsPresenter(pageBodyElement, pointsModel);

const handlePointNewFormClose = () => {
  document.querySelector('.trip-main__event-add-btn').disabled = false;
  navigationComponent.setMenuItem(MenuItem.TABLE);
};

const handleNavigationClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      statsPresenter.desrtoy();
      tripPresenter.clearPointsList();
      tripPresenter.renderPointsList();
      tripPresenter.createPoint(handlePointNewFormClose);
      document.querySelector('.trip-main__event-add-btn').disabled = true;
      navigationComponent.setMenuItem(menuItem);
      break;
    case MenuItem.TABLE:
      statsPresenter.desrtoy();
      tripPresenter.clearPointsList();
      tripPresenter.renderPointsList();
      navigationComponent.setMenuItem(menuItem);
      filtersElement.querySelectorAll('.trip-filters__filter-input').forEach((element) => {element.disabled = false;});
      break;
    case MenuItem.STATS:
      tripPresenter.clearPointsList({resetSortType: true});
      navigationComponent.setMenuItem(menuItem);
      statsPresenter.desrtoy();
      statsPresenter.init();
      filtersElement.querySelectorAll('.trip-filters__filter-input').forEach((element) => {element.disabled = true;});
      break;
  }
};

const filtersView = new FiltersView(FilterType.EVERYTHING);
render(filtersElement, filtersView, RenderPosition.BEFOREEND);

tripPresenter.init();

Promise.all([api.getPoints(), api.getDestinations(), api.getOffers()])
  .then((data) => {
    const [points, destinations, offers] = data;
    destinationsModel.setDestinations(destinations);
    offersModel.setOffers(offers);
    pointsModel.setPoints(UpdateType.INIT, points);
    document.querySelector('.trip-main__event-add-btn').disabled = false;
    navigationComponent.setTableClickHandler(handleNavigationClick);
    navigationComponent.setStatsClickHandler(handleNavigationClick);
    navigationComponent.setNewPointClickHandler(handleNavigationClick);
    remove(filtersView);
    filterPresenter.init();
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    document.querySelector('.trip-main__event-add-btn').disabled = false;
    remove(filtersView);
    filtersElement.querySelectorAll('.trip-filters__filter-input').forEach((element) => {element.disabled = true;});
  });
