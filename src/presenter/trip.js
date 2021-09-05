import TripHeaderView from '../view/trip-header';
import NoPointsView from '../view/no-points';
import PointsListView from '../view/points-list';
import FiltersView from '../view/filters';
import NavigationView from '../view/navigation';
import SortView from '../view/sort';
import {remove, render, RenderPosition} from '../utils/render';
import PointPredenter from './point';
import {SortType, UpdateType, UserAction} from '../const';
import {sortByDate, sortByDuration, sortByPrice} from '../utils/point';

export default class Trip {
  constructor(siteHeaderContainer, siteNavigationContainer, filtersContainer, pointsContainer, tripHeaderContainer, pointsModel) {
    this._pointsModel = pointsModel;
    this._siteHeaderContainer = siteHeaderContainer;
    this._siteNavigationContainer = siteNavigationContainer;
    this._filtersContainer = filtersContainer;
    this._pointsContainer = pointsContainer;
    this._tripHeaderContainer = tripHeaderContainer;
    this._pointPresenter = new Map();
    this._currentSortType = SortType.DAY;

    this._sortComponent = null;
    this._tripHeaderComponent = null;
    this._noPointComponent = new NoPointsView();
    this._pointsListComponent = new PointsListView();
    this._filtersComponent = new FiltersView();
    this._navigationComponent = new NavigationView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {

    this._tripHeaderComponent = new TripHeaderView(this._getPoints());

    this._renderTrip();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortType.TIME:
        return this._pointsModel.getPoints().slice().sort(sortByDuration);
      case SortType.PRICE:
        return this._pointsModel.getPoints().slice().sort(sortByPrice);
      default:
        return this._pointsModel.getPoints().slice().sort(sortByDate);
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда изменилась цена)
        this._pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список
        this._clearPointsList();
        this._renderPointsList();
        break;
      case UpdateType.MAJOR:
        // - обновить весь маршрут (например, при переключении фильтра)
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
    }
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
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._pointsListComponent, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderNoPoints() {
    render(this._pointsListComponent, this._noPointComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPredenter(this._pointsListComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _renderSiteHeader() {
    this._renderNavigation();
    this._renderFilters();
  }

  _clearPointsList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }

  _renderPointsList() {
    render(this._pointsContainer, this._pointsListComponent, RenderPosition.BEFOREEND);
  }

  _clearTrip({resetSortType = false} = {}) {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();

    remove(this._sortComponent);
    remove(this._noPointComponent);
    remove(this._tripHeaderComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderTrip() {
    const points = this._getPoints();
    const pointsCount = points.length;

    this._renderSiteHeader();

    if (pointsCount === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderTripHeader();
    this._renderSort();
    this._renderPointsList();
    this._renderPoints(points.slice(0, pointsCount));
  }
}
