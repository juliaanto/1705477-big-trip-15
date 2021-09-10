import TripHeaderView from '../view/trip-header';
import NoPointsView from '../view/no-points';
import PointsListView from '../view/points-list';
import FiltersView from '../view/filters';
import NavigationView from '../view/navigation';
import SortView from '../view/sort';
import {remove, render, RenderPosition} from '../utils/render';
import PointPredenter from './point';
import {FilterType, SortType, UpdateType, UserAction} from '../const';
import {sortByDate, sortByDuration, sortByPrice} from '../utils/point';
import {filter} from '../utils/filter.js';
import PointNewPresenter from './point-new';

export default class Trip {
  constructor(siteHeaderContainer, siteNavigationContainer, filtersContainer, pointsContainer, tripHeaderContainer, pointsModel, filterModel) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._siteHeaderContainer = siteHeaderContainer;
    this._siteNavigationContainer = siteNavigationContainer;
    this._filtersContainer = filtersContainer;
    this._pointsContainer = pointsContainer;
    this._tripHeaderContainer = tripHeaderContainer;
    this._pointPresenter = new Map();
    this._currentSortType = SortType.DAY;
    this._filterType = FilterType.EVERYTHING;

    this._sortComponent = null;
    this._tripHeaderComponent = null;
    this._noPointComponent = null;

    this._pointsListComponent = new PointsListView();
    this._filtersComponent = new FiltersView();
    this._navigationComponent = new NavigationView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._pointNewPresenter = new PointNewPresenter(this._pointsListComponent, this._handleViewAction);
  }

  init() {
    this._renderTrip();
  }

  createPoint() {
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init();
  }

  _getPoints() {
    this._filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filter[this._filterType](points);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filtredPoints.sort(sortByDuration);
      case SortType.PRICE:
        return filtredPoints.sort(sortByPrice);
      default:
        return filtredPoints.sort(sortByDate);
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearPointsList();
    this._renderPointsList();
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
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
        // - обновить часть списка (при изменении типа точки)
        this._pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (при фильтрации, сортировке)
        this._clearPointsList();
        this._renderPointsList();
        break;
      case UpdateType.MAJOR:
        // - обновить весь маршрут (например, при добавлении/удалении точки, изменении дат начала/окончания, при изменении цены точки)
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
    }
  }

  _renderTripHeader() {
    this._tripHeaderComponent = new TripHeaderView(this._getPoints());
    render(this._tripHeaderContainer, this._tripHeaderComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNavigation() {
    render(this._siteNavigationContainer, this._navigationComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._pointsContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderNoPoints() {
    this._noPointComponent = new NoPointsView(this._filterType);
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
  }

  _clearPointsList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
    remove(this._sortComponent);
  }

  _renderPointsList() {
    const points = this._getPoints();
    const pointsCount = points.length;

    this._renderSort();
    render(this._pointsContainer, this._pointsListComponent, RenderPosition.BEFOREEND);
    this._renderPoints(points.slice(0, pointsCount));
  }

  _clearTrip({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();

    remove(this._sortComponent);
    remove(this._tripHeaderComponent);

    if (this._noPointComponent) {
      remove(this._noPointComponent);
    }

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
    this._renderPointsList();

  }
}
