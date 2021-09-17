import {DEFAULT_POINT_TYPE, isEscape, UpdateType, UserAction} from '../const';
import {remove, render, RenderPosition} from '../utils/render';
import PointEditView from '../view/point-edit';

export default class PointNew {
  constructor(pointsListContainer, changeData, destinationsModel, offersModel) {
    this._pointsListContainer = pointsListContainer;
    this._changeData = changeData;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;

    this._pointEditComponent = null;
    this._destroyCallback = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(callback) {
    this._destroyCallback = callback;

    if (this._pointEditComponent !== null) {
      return;
    }

    const destinations = this._destinationsModel.getDestinations();
    const offers = this._offersModel.getOffers();
    this._pointEditComponent = new PointEditView(null, destinations, offers);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._pointsListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  setSaving() {
    this._pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this._pointEditComponent.shake(resetFormState);
  }

  _handleFormSubmit(point) {

    if (point.type === undefined) {
      point.type = DEFAULT_POINT_TYPE;
    }

    if (point.offers === undefined) {
      point.offers = [];
    }

    point.isFavorite = false;

    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      point,
    );
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (isEscape(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
