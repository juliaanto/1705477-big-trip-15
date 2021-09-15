import TripHeaderView from '../view/trip-header';
import NoPointsView from '../view/no-points';
import PointsListView from '../view/points-list';
import FiltersView from '../view/filters';
import SortView from '../view/sort';
import {remove, render, RenderPosition} from '../utils/render';
import PointPresenter, {State as PointPresenterViewState} from './point';
import {FilterType, SortType, UpdateType, UserAction} from '../const';
import {sortByDate, sortByDuration, sortByPrice} from '../utils/point';
import {filter} from '../utils/filter.js';
import PointNewPresenter from './point-new';
import LoadingView from '../view/loading';

export default class Trip {
  constructor(siteHeaderContainer, siteNavigationContainer, filtersContainer, pointsContainer, tripHeaderContainer, pointsModel, filterModel, destinationsModel, offersModel, api) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._siteHeaderContainer = siteHeaderContainer;
    this._siteNavigationContainer = siteNavigationContainer;
    this._filtersContainer = filtersContainer;
    this._pointsContainer = pointsContainer;
    this._tripHeaderContainer = tripHeaderContainer;
    this._pointPresenter = new Map();
    this._currentSortType = SortType.DAY;
    this._filterType = FilterType.EVERYTHING;
    this._isLoading = true;
    this._api = api;

    this._sortComponent = null;
    this._tripHeaderComponent = null;
    this._noPointComponent = null;

    this._pointsListComponent = new PointsListView();
    this._filtersComponent = new FiltersView();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointNewPresenter = new PointNewPresenter(this._pointsListComponent, this._handleViewAction, this._destinationsModel, this._offersModel);
  }

  init() {
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderTrip();
  }

  destroy() {
    this._clearTrip({resetSortType: true});

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createPoint(callback) {
    this._currentSortType = SortType.DAY;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init(callback);
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
    this.clearPointsList();
    this.renderPointsList();
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointPresenter.get(update.id).setViewState(PointPresenterViewState.SAVING);
        this._api.updatePoint(update)
          .then((response) => {
            this._pointsModel.updatePoint(updateType, response);
          })
          .catch(() => {
            this._pointPresenter.get(update.id).setViewState(PointPresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_POINT:
        this._pointNewPresenter.setSaving();
        this._api.addPoint(update)
          .then((response) => {
            this._pointsModel.addPoint(updateType, response);
          })
          .catch(() => {
            this._pointNewPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_POINT:
        this._pointPresenter.get(update.id).setViewState(PointPresenterViewState.DELETING);
        this._api.deletePoint(update)
          .then(() => {
            this._pointsModel.deletePoint(updateType, update);
          })
          .catch(() => {
            this._pointPresenter.get(update.id).setViewState(PointPresenterViewState.ABORTING);
          });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.clearPointsList({resetSortType: true});
        this.renderPointsList();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
    }
  }

  _renderTripHeader() {
    this._tripHeaderComponent = new TripHeaderView(this._getPoints());
    render(this._tripHeaderContainer, this._tripHeaderComponent, RenderPosition.AFTERBEGIN);
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
    const pointPresenter = new PointPresenter(this._pointsListComponent, this._handleViewAction, this._handleModeChange, this._destinationsModel, this._offersModel);
    pointPresenter.init(point);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _renderLoading() {
    render(this._pointsContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  clearPointsList({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
    remove(this._sortComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  renderPointsList() {
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
    remove(this._loadingComponent);

    if (this._noPointComponent) {
      remove(this._noPointComponent);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DAY;
    }
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const points = this._getPoints();
    const pointsCount = points.length;

    if (pointsCount === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderTripHeader();
    this.renderPointsList();

  }
}
