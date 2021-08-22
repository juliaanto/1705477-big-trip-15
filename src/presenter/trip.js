import TripHeaderView from './view/trip-header';
import NoPointsView from './view/no-points';
import PointsListView from './view/points-list';
import FiltersView from './view/filters';
import NavigationView from './view/navigation';
import SortView from './view/sort';
import {render, RenderPosition} from '../utils/render';
import PointPredenter from './point';

const POINT_COUNT = 20;

export default class Trip {
  constructor(siteHeaderContainer, siteMainContainer) {
    this._siteHeaderContainer = siteHeaderContainer;
    this._siteMainContainer = siteMainContainer;

    this._tripHeaderComponent = new TripHeaderView();
    this._noPointComponent = new NoPointsView();
    this._pointsListComponent = new PointsListView();
    this._filtersComponent = new FiltersView();
    this._navigationComponent = new NavigationView();
    this._sortComponent = new SortView();
  }

  init(points) {
    this._points = points.slice();

    this._renderSiteHeader();
    this._renderPointsList();
  }

  _renderTripHeader() {
    render(this._siteHeaderContainer, this._tripHeaderComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNavigation() {

  }

  _renderFilters() {

  }

  _renderSort() {
    render(pointsListElement, new SortView(), RenderPosition.BEFOREEND);
    render()

  }

  _renderNoPoints() {

  }

  _renderPoint(point) {
    const pointPresenter = new PointPredenter(this._pointsListComponent);
    pointPresenter.init(point);
  }

  _renderPoints(points, from, to) {
    for (let i = from; i < to; i++) {
      this._renderPoint(points[i]);
    }
  }

  _renderSiteHeader() {
    this._renderTripHeader();
    this._renderNavigation();
    this._renderFilters();
  }

  _renderPointsList(points) {
    if (points.length === 0) {
      this._renderNoPoints();
    } else {
      this._renderSort();
      this._renderPoints(points, 1, POINT_COUNT);

    }
  }

}
