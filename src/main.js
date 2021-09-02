import {generatePoint} from './mock/data.js';
import PointsModel from './model/points.js';
import TripPresenter from './presenter/trip';

const POINT_COUNT = 20;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteNavigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const tripHeaderElement = siteHeaderElement.querySelector('.trip-main');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const pointsElement = siteMainElement.querySelector('.trip-events');

const tripPresenter = new TripPresenter(siteHeaderElement, siteNavigationElement, filtersElement, pointsElement, tripHeaderElement, pointsModel);

tripPresenter.init();
