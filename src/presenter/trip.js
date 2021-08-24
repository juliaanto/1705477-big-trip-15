import TripHeaderView from '../view/trip-header';
import NoPointsView from '../view/no-points';
import PointsListView from '../view/points-list';
import FiltersView from '../view/filters';
import NavigationView from '../view/navigation';
import SortView from '../view/sort';
import {render, RenderPosition} from '../utils/render';
import PointPredenter from './point';
import {updateItem} from '../utils/common';

export default class Trip {
  constructor(siteHeaderContainer, siteNavigationContainer, filtersContainer, pointsContainer, tripHeaderContainer) {
    this._siteHeaderContainer = siteHeaderContainer;
    this._siteNavigationContainer = siteNavigationContainer;
    this._filtersContainer = filtersContainer;
    this._pointsContainer = pointsContainer;
    this._tripHeaderContainer = tripHeaderContainer;
    this._pointPresenter = new Map();

    this._tripHeaderComponent = null;
    this._noPointComponent = new NoPointsView();
    this._pointsListComponent = new PointsListView();
    this._filtersComponent = new FiltersView();
    this._navigationComponent = new NavigationView();
    this._sortComponent = new SortView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(points) {
    this._points = points.slice();

    this._tripHeaderComponent = new TripHeaderView(points);

    this._renderSiteHeader();
    this._renderPointsList(points);
  }

  _handleSortTypeChange(sortType) {
    console.log(sortType);
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _renderTripHeader() {
    render(this._tripHeaderContainer, this._tripHeaderComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNavigation() {
    render(this._siteNavigationContainer, this._navigationComponent, RenderPosition.BEFOREEND);
  }

  _renderFilters() {
    render(this._filtersContainer, this._filtersComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._pointsListComponent, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderNoPoints() {
    render(this._pointsListComponent, this._noPointComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPredenter(this._pointsListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _renderPoints(points, from, to) {
    for (let i = from; i < to; i++) {
      this._renderPoint(points[i]);
    }
  }

  _renderSiteHeader() {
    this._renderNavigation();
    this._renderFilters();
  }

  _clearPointsList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }

  _renderPointsList(points) {
    render(this._pointsContainer, this._pointsListComponent, RenderPosition.BEFOREEND);
    if (points.length === 0) {
      this._renderNoPoints();
    } else {
      this._renderTripHeader();
      this._renderSort();
      this._renderPoints(points, 0, points.length);
    }
  }
}
