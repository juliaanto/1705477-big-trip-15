import {FilterType, UpdateType} from '../const.js';
import {remove, render, RenderPosition, replace} from '../utils/render.js';
import FilterView from '../view/filters.js';

export default class Filter {
  constructor(filterContainer, filterModel, pointsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._pointsModel = pointsModel;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init({resetFilterType = false} = {}) {
    const prevFilterComponent = this._filterComponent;
    this._resertSortType = resetFilterType;

    let currentSortType = this._filterModel.getFilter();

    if (resetFilterType === true) {
      currentSortType = FilterType.EVERYTHING;
    }

    this._filterComponent = new FilterView(currentSortType);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MINOR, filterType);
  }
}
