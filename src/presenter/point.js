import PointView from '../view/point';
import PointEditView from '../view/point-edit';
import {remove, render, RenderPosition, replace} from '../utils/render';

export default class Point {
  constructor(pointsListContainer) {
    this._pointsListContainer = pointsListContainer;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleCloseEditFormClick = this._handleCloseEditFormClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new PointView(point);
    this._pointEditComponent = new PointEditView(point);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointEditComponent.setClickHandler(this._handleCloseEditFormClick);
    this._pointEditComponent.setClickHandler(this._handleFormSubmit);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._pointsListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._pointsListContainer.getElement().contains(prevPointComponent.getElement())) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._pointsListContainer.getElement().contains(prevPointEditComponent.getElement())) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  _replacePointToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToPoint();
    }
  }

  _handleEditClick() {
    this._replacePointToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToPoint();
  }

  _handleCloseEditFormClick() {
    this._replaceFormToPoint();
  }
}
