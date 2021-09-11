import {MenuItem} from '../const';
import AbstractView from './abstract';

const createNavigationTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn trip-tabs__btn--active" href="#" id="${MenuItem.TABLE}">Table</a>
    <a class="trip-tabs__btn" href="#" id="${MenuItem.STATS}">Stats</a>
  </nav>`
);

export default class Navigation extends AbstractView {
  constructor() {
    super();

    this._tableClickHandler = this._tableClickHandler.bind(this);
    this._statsClickHandler = this._statsClickHandler.bind(this);
    this._newPointClickHandler = this._newPointClickHandler.bind(this);
    this._filtersClickHandler = this._filtersClickHandler.bind(this);
  }

  getTemplate() {
    return createNavigationTemplate();
  }

  _tableClickHandler(evt) {
    evt.preventDefault();
    this._callback.tableClick(MenuItem.TABLE);
  }

  setTableClickHandler(callback) {
    this._callback.tableClick = callback;
    this.getElement().querySelector(`#${MenuItem.TABLE}`).addEventListener('click', this._tableClickHandler);
  }

  _statsClickHandler(evt) {
    evt.preventDefault();
    this._callback.statsClick(MenuItem.STATS);
  }

  setStatsClickHandler(callback) {
    this._callback.statsClick = callback;
    this.getElement().querySelector(`#${MenuItem.STATS}`).addEventListener('click', this._statsClickHandler);
  }

  _newPointClickHandler(evt) {
    evt.preventDefault();
    this._callback.newPointClick(MenuItem.ADD_NEW_POINT);
  }

  setNewPointClickHandler(callback) {
    this._callback.newPointClick = callback;
    document.querySelector('.trip-main__event-add-btn').addEventListener('click', this._newPointClickHandler);
  }

  _filtersClickHandler(evt) {
    evt.preventDefault();
    this._callback.filtersClick(MenuItem.FILTERS);
  }

  setFiltersClickHandler(callback) {
    this._callback.filtersClick = callback;
    document.querySelector('.trip-controls__filters').addEventListener('click', this._filtersClickHandler);
  }

  removeFiltersClickHandler() {
    document.querySelector('.trip-controls__filters').removeEventListener('click', this._filtersClickHandler);
  }

  setMenuItem(menuItem) {
    let item = this.getElement().querySelector(`#${menuItem}`);

    if (menuItem === MenuItem.ADD_NEW_POINT || menuItem === MenuItem.FILTERS) {
      item = this.getElement().querySelector(`#${MenuItem.TABLE}`);
    }

    if (item !== null) {
      this.getElement().querySelector(`#${MenuItem.TABLE}`).classList.remove('trip-tabs__btn--active');
      this.getElement().querySelector(`#${MenuItem.STATS}`).classList.remove('trip-tabs__btn--active');
      item.classList.add('trip-tabs__btn--active');
    }
  }
}
